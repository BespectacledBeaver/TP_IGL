from django.db import models
from articleManagementAPP.models import Article
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(models.Model):
    linked_user = models.OneToOneField('self', on_delete=models.CASCADE, null=True, blank=True)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    def getAccount(self):
        return self.linked_user

    def setAccount(self, username, password):
        if not self.linked_user:
            new_user = User.objects.create(userName=username, password=password)
            self.linked_user = new_user
            self.save()
            return new_user
        return None
    
class FavoriteArticle(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    article = models.ForeignKey('articleManagementAPP.Article', on_delete=models.CASCADE)

class ModAccount(User):
    
    def modifyArticle(self, article_id, new_data):
        try:
            article = Article.objects.get(id=article_id)
            
            # Modify the article fields based on the new_data provided
            for field, value in new_data.items():
                setattr(article, field, value)

            # Save the modified article
            article.save()

            return article  # Return the modified article if needed
        except Article.DoesNotExist:
            # For example, you can raise an exception or return None
            return None
        
