from django.db import models
from articleManagementAPP.models import Article

# Create your models here.
class Mod(models.Model):
    userName = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    def modifyArticle(self, article_id, new_data):
        try:
            article = Article.objects.get(id=article_id)
            
            for field, value in new_data.items():
                setattr(article, field, value)

            # Save the modified article
            article.save()

            return article  # Return the modified article if needed
        except Article.DoesNotExist:

            return None
        
        
    def deleteArticle(self, article_id):
        try:
            article = Article.objects.get(id=article_id)
            article.delete()
            
            return True  # Return True indicating successful deletion
        except Article.DoesNotExist:
           
            return False     