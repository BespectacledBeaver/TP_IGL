import requests
from bs4 import BeautifulSoup


def convert_pdf_to_tei(pdf_path):
    # GROBID API endpoint for processing PDF to TEI XML
    grobid_api_url = "https://kermitt2-grobid.hf.space/api/processFulltextDocument"

    # Set up the headers and payload
    headers = {"Content-Type": "multipart/form-data"}
    files = {'input': (pdf_path, open(pdf_path, 'rb'))}

    # Make a POST request to the GROBID API
    response = requests.post(grobid_api_url, files=files)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Extracted TEI XML will be in the response text
        tei_xml = response.text
        return tei_xml
    else:
        print(f"Error: {response.status_code}")
        return None


def extract_metadata_and_body_from_tei(tei_xml):
    result = {}

    # Parse the TEI XML using BeautifulSoup
    soup = BeautifulSoup(tei_xml, 'xml')

    # Extract metadata
    metadata = {}
    title_tag = soup.find('titleStmt').find('title')
    if title_tag:
        metadata['title'] = title_tag.text.strip()

    authors = []
    affiliations = {}

    for author_tag in soup.find_all('author'):
        forename = author_tag.find('forename').text.strip()
        surname = author_tag.find('surname').text.strip()
        full_name = f"{forename} {surname}"
        authors.append(full_name)

        # Extract affiliation information
        affiliation_tag = author_tag.find('affiliation')
        if affiliation_tag:
            affiliation_key = affiliation_tag.get('key')
            org_name = affiliation_tag.find('orgName').text.strip()
            affiliations[affiliation_key] = org_name

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

    # Extract body content
    body_tag = soup.find('body')
    if body_tag:
        result['body'] = body_tag.text.strip()

    return result


# Example usage
pdf_path = "../Article_04.pdf"
tei_xml = convert_pdf_to_tei(pdf_path)

# Extract metadata and body content from the TEI XML
if tei_xml:
    result = extract_metadata_and_body_from_tei(tei_xml)
    # Print the extracted metadata, affiliations, and body content
    if result:
        metadata = result['metadata']
        print("Title:", metadata.get('title'))
        print("Authors:", metadata.get('authors'))

        affiliations = metadata.get('affiliations')
        print("\nAffiliations:")
        for key, org_name in affiliations.items():
            print(f"  {key}: {org_name}")

        print("Abstract:", metadata.get('abstract'))
        print("Keywords:", metadata.get('keywords'))
        print("References:", metadata.get('references'))

        body_content = result.get('body')
        print("\nBody Content:\n", body_content)
