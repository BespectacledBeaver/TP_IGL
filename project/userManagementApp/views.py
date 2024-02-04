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
                favorite_article.save()
                return Response("Favorite article saved successfully", status=status.HTTP_201_CREATED)
            
            except User.DoesNotExist:
                return Response("User does not exist", status=status.HTTP_400_BAD_REQUEST)
            
            except Article.DoesNotExist:
                return Response("Article does not exist", status=status.HTTP_400_BAD_REQUEST)
            
        else:
            return Response("Missing usernameid or articleid", status=status.HTTP_400_BAD_REQUEST)




class ConsulterFavView(APIView):
    def get(self, request):
        userid = request.query_params.get("userid")

        if userid is not None:
            try:
                user = User.objects.get(id=userid)
            except User.DoesNotExist:
                return Response({"message": "L'utilisateur n'existe pas."}, status=status.HTTP_404_NOT_FOUND)

            favorite_articles = FavoriteArticle.objects.filter(user=user)
            serializer = FavoriteArticleSerializer(favorite_articles, many=True)
            return Response(serializer.data)
        else:
            return Response({"message": "L'identifiant de l'utilisateur est requis."}, status=status.HTTP_400_BAD_REQUEST)
