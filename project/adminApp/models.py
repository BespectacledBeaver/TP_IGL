from django.db import models
from userManagementApp.models import ModAccount
from articleManagementAPP.models import Article

# Create your models here.
class Admin(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    # Add other fields as needed

    def addModerator(self, username, password):
        # Create a new ModAccount (Moderator) instance
        moderator = ModAccount.objects.create(username=username, password=password, is_staff=True)
        # Customize as needed and return the created ModAccount instance
        return moderator
    
    def removeModerator(self, mod_account):
        # Remove the specified ModAccount (Moderator)
        mod_account.delete()

    def modifyModerator(self,mod_account):
        return 0 #not implemented yet 

    def uploadArticle(self, article_data):
        # not implemented yet 
        # working on the logic 
        return Article.objects.create(**article_data) 