from django.db import models
from django.contrib.auth.models import User
import requests

# Create your models here.

class Article(models.Model):

    title = models.CharField(max_length=200)
    publication_date = models.DateField()
    authors = models.CharField(max_length=200)  
    abstract = models.TextField()
    institutions = models.CharField(max_length=200)  
    keywords = models.CharField(max_length=200)  
    #text = models.FileField(upload_to='article_texts/')  
    pdf_url = models.URLField()
    references = models.TextField()  


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


