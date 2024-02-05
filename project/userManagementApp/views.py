from django.shortcuts import render
from django.db import models
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from articleManagementAPP.models import Article
from .models import FavoriteArticle
from .models import User
from articleManagementAPP.serializers import ArticleSerializer
from django.db.models import Q
from .serializers import FavoriteArticleSerializer


# Create your views here.



class SauvegarderFavview(APIView):

    def post(self , request): 
        userid = request.data.get("userid")
        articleid = request.data.get("articleid")

        if userid is not None and articleid is not None :
            try:
                user = User.objects.get(id=userid)
                article = Article.objects.get(id=articleid)
                favorite_article = FavoriteArticle(user=user, article=article)
                favorite_article.id = str(userid)+"0"+str(articleid)
                favorite_article.save()
                return Response("Favorite article saved successfully", status=status.HTTP_201_CREATED)
            
            except User.DoesNotExist:
                return Response("User does not exist", status=status.HTTP_400_BAD_REQUEST)
            
            except Article.DoesNotExist:
                return Response("Article does not exist", status=status.HTTP_400_BAD_REQUEST)
            
        else:
            return Response("Missing usernameid or articleid", status=status.HTTP_400_BAD_REQUEST)
        
class EnleverFavview(APIView):

    def post(self , request): 
        userid = request.data.get("userid")
        articleid = request.data.get("articleid")

        if userid is not None and articleid is not None :
            try:
                user = User.objects.get(id=userid)
                article = Article.objects.get(id=articleid)
                favorite_article = FavoriteArticle.objects.get(user=user, article=article)
                favorite_article.delete()
                return Response("Favorited article deleted successfully", status=status.HTTP_201_CREATED)
            
            except User.DoesNotExist:
                return Response("User does not exist", status=status.HTTP_400_BAD_REQUEST)
            
            except Article.DoesNotExist:
                return Response("Article does not exist", status=status.HTTP_400_BAD_REQUEST)
            
        else:
            return Response("Missing usernameid or articleid", status=status.HTTP_400_BAD_REQUEST)




class ConsulterFavView(APIView):
    def post(self, request):
        userid = request.data.get("userid")

        if userid is not None:
            try:
                user = User.objects.get(id=userid)
            except User.DoesNotExist:
                return Response({"message": "L'utilisateur n'existe pas."}, status=status.HTTP_404_NOT_FOUND)

            favorite_articles = FavoriteArticle.objects.filter(user=user)
            
            articles_data = []
            for fav_article in favorite_articles:
                article_data = {
                    "id": fav_article.article.id,
                    "title": fav_article.article.title,
                    "authors": fav_article.article.authors,
                    "publication_date": fav_article.article.publication_date,
                }
                articles_data.append(article_data)
                
            articles_champs = list(articles_data)
            return Response(articles_champs)
        else:
            return Response({"message": "L'identifiant de l'utilisateur est requis."}, status=status.HTTP_400_BAD_REQUEST)
