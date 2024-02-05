from django.contrib import admin
from django.urls import path, include
from .views import *


urlpatterns = [
    path('SauvegarderFav',SauvegarderFavview.as_view()),
    path('EnleverFav',EnleverFavview.as_view()),
    path('ConsulterFav',ConsulterFavView.as_view()),
    
]