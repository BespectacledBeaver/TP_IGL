from django.contrib import admin
from django.urls import path, include
from .views import *


urlpatterns = [
    path('Sentarticles',Sentarticlesview.as_view()),
    path('Searcharticles',SearchArticlesView.as_view()),
]