from django.shortcuts import render
from django.db import models
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from articleManagementAPP.models import Article
from userManagementApp.models import User , FavoriteArticle
from articleManagementAPP.serializers import ArticleSerializer
from django.db.models import Q
from datetime import datetime
from articleManagementAPP.serializers import ArticleSerializer  

# Create your views here.



class Sentarticlesview(APIView):

    def post(self , request): 
        userid = request.data.get("userid")
        if userid is not None:
            user = User.objects.get(id=userid)

            # Récupérer tous les articles avec une indication sur s'ils sont favoris ou non pour l'utilisateur actuel
            articles = []
            all_articles = Article.objects.all().values('id', 'title', 'publication_date', 'authors')
            for article_data in all_articles:
                article_id = article_data['id']
                is_favorite = FavoriteArticle.objects.filter(user=user, article_id=article_id).exists()
                article_data['is_favorite'] = is_favorite
                articles.append(article_data)

            # Trier les articles par date de publication
            articles = sorted(articles, key=lambda x: x['publication_date'], reverse=True)
            list_articles =  list(articles)
        
            return Response(list_articles)
        else:
            return Response("Missing user id ", status=status.HTTP_400_BAD_REQUEST)
        
    
        



class Sentdetailsview(APIView):
    def post(self, request): 
        article_id = request.data.get("articleid") 
        if article_id is not None:
            try:
                article = Article.objects.get(id=article_id)
                serializer = ArticleSerializer(article)  # Utilisez le sérialiseur pour convertir l'instance de l'article en données JSON
                return Response(serializer.data, status=status.HTTP_200_OK)  # Retournez les données JSON dans la réponse HTTP
            except Article.DoesNotExist:
                return Response({"error": "Article not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "Article ID not provided"}, status=status.HTTP_400_BAD_REQUEST)

            
        
    
        

class SearchArticlesView(APIView):
    def post(self, request):
        
        userid = request.data.get("userid")
        if userid is not None:
            user = User.objects.get(id=userid)


            search_options = request.data.get('search_options', [])
            keywords = request.data.get('keywords', [])
            start_date = request.data.get('start_date', [])
            end_date = request.data.get('end_date', [])

            # Initialize an empty queryset
            filter_conditions = Q()

            if search_options == 'title':
                filter_conditions |= Q(title__icontains=keywords)
            elif search_options == 'authors':
                filter_conditions |= Q(authors__icontains=keywords)
            elif search_options == 'keywords':
                filter_conditions |= Q(keywords__icontains=keywords)
            elif search_options == 'institutions':
                filter_conditions |= Q(institutions__icontains=keywords)

            # Debugging: Print constructed filter conditions
            print(f"filter_conditions: {filter_conditions}")

            # Add date filtering conditions
            if start_date:
                filter_conditions &= Q(publication_date__gte=start_date)
            if end_date:
                filter_conditions &= Q(publication_date__lte=end_date)

        
            articles = []
            filtered_results = Article.objects.filter(filter_conditions)
            all_articles = filtered_results.all().values('id','title', 'publication_date', 'authors')
            for article_data in all_articles:
                article_id = article_data['id']
                is_favorite = FavoriteArticle.objects.filter(user=user, article_id=article_id).exists()
                article_data['is_favorite'] = is_favorite
                articles.append(article_data)

            # Trier les articles par date de publication
            articles = sorted(articles, key=lambda x: x['publication_date'], reverse=True)
            list_articles =  list(articles)
        
            return Response(list_articles)
        else:
            return Response("Missing user id ", status=status.HTTP_400_BAD_REQUEST)
        
            
        