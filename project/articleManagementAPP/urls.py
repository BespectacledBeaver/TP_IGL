from django.urls import path
from . import views  # Import your views

urlpatterns = [
    # Other URL patterns...
    path('article/<int:pk>/', views.article_detail_view, name='article_detail'),
    # Define a URL pattern for displaying article detail by ID (assuming 'pk' is the article ID)
]
