from django.contrib import admin
from .models import User, FavoriteArticle

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'username')
    search_fields = ('username',)

@admin.register(FavoriteArticle)
class FavoriteArticleAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'article')
    search_fields = ('user__username', 'article__title')
