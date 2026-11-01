from django.contrib import admin
from .models import Article

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'publication_date', 'authors')
    search_fields = ('title', 'authors', 'keywords', 'institutions')
    list_filter = ('publication_date',)
