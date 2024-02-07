from django.db import models
from django.contrib.auth.models import User
import requests
import datetime
# Create your models here.

class Article(models.Model):

    title = models.CharField(blank=True)
    publication_date = models.DateField(default=datetime.date.today)
    authors = models.CharField(blank=True)  
    abstract = models.TextField(blank=True)
    institutions = models.CharField(blank=True)  
    keywords = models.CharField(blank=True)  
    text = models.TextField(null=True,blank=True)  
    pdf_url = models.FileField(blank=True)
    references = models.TextField(blank=True)  


    def __str__(self):
        return self.title
    
    def get_article(article_id):
        try:
            article = Article.objects.get(id=article_id)
            return article
        except Article.DoesNotExist:
            return None
        
    def set_article(article_data):
        article_id = article_data.get('id')  # If the article ID is provided in the data

        if article_id:
            # If article ID is provided, update existing article
            try:
                article = Article.objects.get(id=article_id)
                # Update the existing article fields based on new data
                for field, value in article_data.items():
                    setattr(article, field, value)
                article.save()
                return article
            except Article.DoesNotExist:
                return None
        else:
            # If article ID is not provided, create a new article
            new_article = Article(**article_data)
            new_article.save()
            return new_article

    def modify_article(article_id, modified_data):
        try:
            article = Article.objects.get(id=article_id)
            for field, value in modified_data.items():
                setattr(article, field, value)
            article.save()
            return article
        except Article.DoesNotExist:
            return None        
        
    def delete_article(article_id):
        try:
            article = Article.objects.get(id=article_id)
            article.delete()
            return True
        except Article.DoesNotExist:
            return False
        
    def download_article(pdf_url):
        try:
            response = requests.get(pdf_url, stream=True)
            if response.status_code == 200:
                with open('downloaded_article.pdf', 'wb') as pdf_file:
                    for chunk in response.iter_content(chunk_size=1024):
                        pdf_file.write(chunk)
                return True
        except Exception as e:
            print(f"Error downloading article: {e}")
        return False    
    
   #not completed yet there are more functions to add that are related to the favoriteArticles part 


