from django.shortcuts import render
from django.db import models
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from articleManagementAPP.models import Article
from articleManagementAPP.serializers import ArticleSerializer
from django.db.models import Q
from .models import Mod




# Create your views here.



class SentarticlesModview(APIView):

    def post(self , request): 
        articles = Article.objects.all().values('id','title')
        articles = articles.order_by('-publication_date')
        articles_list = list(articles)
    
        #response = Response(articles_list)
        return Response(articles_list)
    

class deleteArticleview(APIView):
    def post(self, request):
        article_id = request.data.get("article_id")
        mod_id = request.data.get("moderator_id")

        if article_id is not None and mod_id is not None:
            try:
                moderator = Mod.objects.get(id=mod_id)
            except Mod.DoesNotExist:
                return Response({"message": "Le modérateur n'existe pas."}, status=404)


            article = moderator.deleteArticle(article_id)
            if article:
                return Response({"message": "L'article a été supprimé avec succès."}, status=200)
            else:
                return Response({"message": "L'article avec l'ID spécifié n'existe pas."}, status=404)
        else:
            return Response({"message": "Les identifiants d'article et de modérateur sont requis."}, status=400)
