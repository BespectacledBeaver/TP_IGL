import os
import re
import requests
from bs4 import BeautifulSoup

try:
    import pypdf
except ImportError:
    pypdf = None


def convert_pdf_to_tei(pdf_path):
    """
    GROBID API endpoint for processing PDF to TEI XML.
    Takes a file path or file-like object.
    """
    grobid_api_url = "https://kermitt2-grobid.hf.space/api/processFulltextDocument"
    headers = {"Content-Type": "multipart/form-data"}

    try:
        # Check if grobid space is active
        if hasattr(pdf_path, 'read'):
            pdf_path.seek(0)
            files = {'input': pdf_path}
            response = requests.post(grobid_api_url, files=files, timeout=8)
        elif isinstance(pdf_path, str) and os.path.exists(pdf_path):
            with open(pdf_path, 'rb') as f:
                files = {'input': f}
                response = requests.post(grobid_api_url, files=files, timeout=8)
        else:
            return None

        if response.status_code == 200:
            return response.text
    except Exception as e:
        print(f"GROBID API unavailable or timed out: {e}")

    return None


def extract_metadata_and_body_from_tei(tei_xml):
    """Parses TEI XML returned by GROBID."""
    result = {}
    soup = BeautifulSoup(tei_xml, 'xml')
    metadata = {}

    title_tag = soup.find('titleStmt')
    if title_tag and title_tag.find('title'):
        metadata['title'] = title_tag.find('title').text.strip()

    authors = []
    affiliations = {}

    for author_tag in soup.find_all('author'):
        forename_tag = author_tag.find('forename')
        surname_tag = author_tag.find('surname')
        forename = forename_tag.text.strip() if forename_tag else ''
        surname = surname_tag.text.strip() if surname_tag else ''
        full_name = f"{forename} {surname}".strip()
        if full_name:
            authors.append(full_name)

        affiliation_tag = author_tag.find('affiliation')
        if affiliation_tag:
            key = affiliation_tag.get('key') or str(len(affiliations) + 1)
            org_tag = affiliation_tag.find('orgName')
            if org_tag:
                affiliations[key] = org_tag.text.strip()

    metadata['authors'] = authors
    metadata['affiliations'] = affiliations

    abstract_tag = soup.find('abstract')
    if abstract_tag:
        metadata['abstract'] = abstract_tag.text.strip()

    keywords_tag = soup.find('keywords')
    if keywords_tag:
        keywords = [term.text.strip() for term in keywords_tag.find_all('term')]
        metadata['keywords'] = keywords

    references_tag = soup.find('listBibl')
    if references_tag:
        references = [bibl.text.strip() for bibl in references_tag.find_all('biblStruct')]
        metadata['references'] = references

    result['metadata'] = metadata

    body_tag = soup.find('body')
    if body_tag:
        result['body'] = body_tag.text.strip()

    return result


def extract_metadata_locally(pdf_file_or_path):
    """
    Fallback local extractor using pypdf when external GROBID service is unreachable.
    Reads title, authors, abstract, keywords, and body directly from the PDF stream.
    """
    if not pypdf:
        return None

    try:
        reader = pypdf.PdfReader(pdf_file_or_path)
        if not reader.pages:
            return None

        full_text = ""
        for page in reader.pages:
            pt = page.extract_text()
            if pt:
                full_text += pt + "\n"

        first_page = reader.pages[0].extract_text() or ""
        lines = [line.strip() for line in first_page.split("\n") if line.strip()]

        title = lines[0] if lines else "Scientific Article"
        if len(title) < 10 and len(lines) > 1:
            title = lines[0] + " " + lines[1]

        # Extract abstract
        abstract = ""
        ab_match = re.search(r'(?i)abstract[:\s]*(.*?)(?:(?:\n\s*(?:1\.?|I\.?|Introduction|Keywords|Index Terms))|\Z)', full_text, re.DOTALL)
        if ab_match:
            abstract = ab_match.group(1).strip()[:1000]

        # Extract keywords
        keywords = []
        kw_match = re.search(r'(?i)(?:keywords|index terms)[:\s]*(.*?)(?:\n\s*(?:1\.?|I\.?|Introduction)|\n\n|\Z)', full_text, re.DOTALL)
        if kw_match:
            raw_kw = kw_match.group(1).strip().replace('\n', ' ')
            keywords = [k.strip() for k in re.split(r'[,;•]', raw_kw) if k.strip()][:8]

        # Extract potential authors from early lines
        authors = []
        for line in lines[1:5]:
            if any(term in line.lower() for term in ['abstract', 'university', 'department', 'institute', 'ieee', 'acm', '@']):
                continue
            if len(line) < 80 and not line.isdigit():
                authors.append(line)

        # Extract institutions
        institutions = {}
        for idx, line in enumerate(lines[:12]):
            if any(term in line.lower() for term in ['university', 'institute', 'department', 'laboratory', 'school', 'faculty']):
                institutions[f"aff_{idx}"] = line

        return {
            "metadata": {
                "title": title[:450],
                "authors": authors,
                "affiliations": institutions,
                "abstract": abstract,
                "keywords": keywords,
                "references": []
            },
            "body": full_text[:4000]
        }
    except Exception as e:
        print(f"Local PDF extraction note: {e}")
        return None
