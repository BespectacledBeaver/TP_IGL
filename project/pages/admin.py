from django.contrib import admin

from userManagementApp.models import User
from articleManagementAPP.models import Article
from userManagementApp.models import FavoriteArticle
# Register your models here.

admin.site.register(User)
admin.site.register(Article)
admin.site.register(FavoriteArticle)