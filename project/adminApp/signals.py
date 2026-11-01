import os
from django.db.models.signals import post_save
from django.dispatch import receiver
from articleManagementAPP.models import Article
from .pdf_custom import (
    convert_pdf_to_tei,
    extract_metadata_and_body_from_tei,
    extract_metadata_locally,
)

@receiver(post_save, sender=Article)
def my_article_save_handler(sender, instance, created, **kwargs):
    """
    Automatically triggered when an Article is created or saved.
    Extracts title, authors, abstract, keywords, institutions, and text
    from the uploaded PDF file if those fields are empty.
    """
    if created and instance.pdf_url:
        try:
            pdf_field = instance.pdf_url
            pdf_path = None
            if hasattr(pdf_field, 'path') and os.path.exists(pdf_field.path):
                pdf_path = pdf_field.path
            elif hasattr(pdf_field, 'name') and os.path.exists(pdf_field.name):
                pdf_path = pdf_field.name

            result = None

            # 1. Try GROBID service first
            if pdf_path:
                tei_xml = convert_pdf_to_tei(pdf_path)
                if tei_xml:
                    result = extract_metadata_and_body_from_tei(tei_xml)

            # 2. If GROBID is unavailable or returns nothing, use local PDF parser
            if not result and pdf_path:
                result = extract_metadata_locally(pdf_path)

            if result:
                metadata = result.get('metadata', {})
                modified = False

                if not instance.title and metadata.get('title'):
                    instance.title = metadata.get('title')[:480]
                    modified = True
                if not instance.authors and metadata.get('authors'):
                    authors = metadata.get('authors')
                    instance.authors = (", ".join(authors) if isinstance(authors, list) else str(authors))[:480]
                    modified = True
                if not instance.abstract and metadata.get('abstract'):
                    instance.abstract = metadata.get('abstract')
                    modified = True
                if not instance.keywords and metadata.get('keywords'):
                    keywords = metadata.get('keywords')
                    instance.keywords = (", ".join(keywords) if isinstance(keywords, list) else str(keywords))[:480]
                    modified = True
                if not instance.references and metadata.get('references'):
                    refs = metadata.get('references')
                    instance.references = ("\n".join(refs) if isinstance(refs, list) else str(refs))
                    modified = True
                if not instance.text and result.get('body'):
                    instance.text = result.get('body')
                    modified = True

                affiliations = metadata.get('affiliations', {})
                if not instance.institutions and affiliations:
                    if isinstance(affiliations, dict):
                        institutions_list = [f"{k}: {v}" for k, v in affiliations.items()]
                        instance.institutions = ("\n".join(institutions_list))[:480]
                    else:
                        instance.institutions = str(affiliations)[:480]
                    modified = True

                if modified:
                    # Update fields directly without triggering recursion
                    Article.objects.filter(id=instance.id).update(
                        title=instance.title,
                        authors=instance.authors,
                        abstract=instance.abstract,
                        keywords=instance.keywords,
                        references=instance.references,
                        text=instance.text,
                        institutions=instance.institutions,
                    )
        except Exception as e:
            print(f"Signal note: PDF auto-extraction skipped: {e}")
