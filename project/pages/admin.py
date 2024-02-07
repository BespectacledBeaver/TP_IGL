from django.contrib import admin
from articleManagementAPP.models import Article
from modAccount.models import Mod
# Register your models here.

admin.site.register(Article)
admin.site.register(Mod)