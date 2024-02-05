from django.contrib import admin
from django.urls import path, include
from .views import *


urlpatterns = [
    path('SentarticlesMod',SentarticlesModview.as_view()),
    path('DeleteArticleMod',deleteArticleview.as_view()), 
    
    
]