from django.db.models.signals import post_save
from django.dispatch import receiver
from articleManagementAPP.models import Article
from .pdf_custom import convert_pdf_to_tei, extract_metadata_and_body_from_tei

@receiver(post_save, sender=Article)
def my_article_save_handler(sender, instance, created, **kwargs):
    if created:
        # Logic to execute when a new article is created
        pdf = instance.pdf_url 
        tei_xml = convert_pdf_to_tei(pdf)
        if tei_xml:
            result = extract_metadata_and_body_from_tei(tei_xml)
            
            if result:
                metadata = result['metadata']
                articleExists = Article.objects.filter(title=metadata.get('title')).first()
                if articleExists is None:
                    if instance.title =='': instance.title = metadata.get('title')
                    if instance.authors =='': instance.authors = ", ".join(metadata.get('authors', []))
                    if instance.abstract =='': instance.abstract = metadata.get('abstract')
                    if instance.keywords =='': instance.keywords = ", ".join(metadata.get('keywords', []))
                    if instance.references =='': instance.references = "\n".join(metadata.get('references', []))
                    if instance.text =='': instance.text = result.get('body')

                    # Concatenate affiliations into a single string
                    if instance.institutions =='':
                        affiliations = metadata.get('affiliations', {})
                        institutions_list = []
                        for key, org_name in affiliations.items():
                            institutions_list.append(f"{key}: {org_name}")
                        instance.institutions = "\n".join(institutions_list)

                    # Save the updated instance
                    instance.save()
                else:
                    instance.delete()
