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
    
        


class SearchArticlesView(APIView):
    def post(self, request):

        userid = request.data.get("userid")
        if userid is not None:
            user = User.objects.get(id=userid)


        search_options = request.data.get('search_options', [])
        keywords = request.data.get('keywords', [])
        str_start_date = request.data.get('start_date', [])
        str_end_date = request.data.get('end_date', [])

        start_date = datetime.strptime(str_start_date, "%Y-%m-%d")
        end_date = datetime.strptime(str_end_date, "%Y-%m-%d")

        if not keywords or not search_options:
            return Response({'error': 'Please provide keywords and search options for the search'}, status=status.HTTP_400_BAD_REQUEST)

        # Initialize an empty queryset
        queryset = Article.objects.none()

                       
        if search_options == 'title':
            queryset |= Article.objects.filter(title__icontains=keywords)
        elif search_options == 'authors':
            queryset |= Article.objects.filter(authors__icontains=keywords)
        elif search_options == 'keywords':
            queryset |= Article.objects.filter(keywords__icontains=keywords)
        elif search_options == 'institutions':
            queryset |= Article.objects.filter(institutions__icontains=keywords)

        filtered_results = Article.objects.none()
        for article in queryset:    
            if (not start_date or article.publication_date >= start_date) and \
               (not end_date or article.publication_date <= end_date):
                filtered_results |= article
        

         # Sort the queryset by publication_date in descending order (most recent first)
        filtered_results = filtered_results.order_by('-publication_date') # - is for descending order 
        
        articles = filtered_results.all().values('id','title', 'publication_date', 'authors')
        articles_list = list(articles)
        return Response(articles_list)
        
    