from django.contrib import admin
from django.urls import path, include
from .views import *


urlpatterns = [
    path('',Signupview.as_view()) ,
    path('login',Loginview.as_view()),
]
