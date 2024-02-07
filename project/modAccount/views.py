from django.shortcuts import render
from django.db import models
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from articleManagementAPP.models import Article
from articleManagementAPP.serializers import ArticleSerializer
from django.db.models import Q
from .models import Mod
import jwt , datetime  



# Create your views here.

class Loginview(APIView):
    def post(self , request):
        username = request.data.get("username")
        password = request.data.get("password")
        moderateur = Mod.objects.filter(username=username).first()
        
        visitor = "Not Found"
        is_authenticated = False 
        if moderateur is not None:
            if  moderateur.password == password :
                visitor = "moderateur"
                is_authenticated = True
       
        
        if is_authenticated:
            payload = {
                "id": moderateur.id,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=10),
                "iat": datetime.datetime.utcnow()
            }
            token = jwt.encode(payload, 'secret', algorithm="HS256")
            
            # Send additional data to frontend
            data_to_frontend = {
                "moderateur_id": moderateur.id,
                "moderateur": moderateur.username,
                "is_authenticated": True
            }
        else:
            token = None
            data_to_frontend = {
                "is_authenticated": False
            }
        
        response = Response(data_to_frontend)
        
        if token:
            response.set_cookie("SESSION", value=token)
        
        return response


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

        if article_id is not None:
            article = Mod.deleteArticle(article_id)
            if article:
                return Response({"message": "L'article a été supprimé avec succès."}, status=200)
            else:
                return Response({"message": "L'article avec l'ID spécifié n'existe pas."}, status=404)
        else:
            return Response({"message": "Les identifiants d'article est requis."}, status=400)


class SaveArticleview(APIView):
    def post(self, request):
        article_id = request.data.get("id")
        article_title = request.data.get("title")
        article_publication_date = request.data.get("publication_date")
        article_authors = request.data.get("authors")
        article_abstract = request.data.get("abstract")
        article_institutions = request.data.get("institutions")
        article_keywords = request.data.get("keywords")
        article_text = request.data.get("text")
        article_references = request.data.get("references")

        if article_id is not None:
            article = Article.objects.get(id=article_id)
            if article:
                article.title = article_title
                article.publication_date = article_publication_date
                article.authors =article_authors
                article.abstract =article_abstract
                article.institutions =article_institutions
                article.keywords =article_keywords
                article.text =article_text
                article.references =article_references
                article.save()
                return Response({"message": "L'article a été modifié avec succès."}, status=200)
            else:
                return Response({"message": "L'article avec l'ID spécifié n'existe pas."}, status=404)
        else:
            return Response({"message": "Les identifiants d'article est requis."}, status=400)