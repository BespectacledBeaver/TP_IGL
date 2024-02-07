from django.shortcuts import render
from django.db import models
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from userManagementApp.models import User
from articleManagementAPP.models import Article
from articleManagementAPP.serializers import ArticleSerializer
from django.http import FileResponse
from django.views.decorators.csrf import csrf_exempt


# Create your views here.

class ArticlePDFview(APIView):
    @csrf_exempt
    def post(self , request): 
        articleid = request.data.get("articleid")
        if articleid is not None:
            article = Article.objects.get(id=articleid)
            
            response = FileResponse(article.pdf_url, content_type='application/pdf')
            response['Content-Disposition'] = 'inline; filename="your_pdf.pdf"'
            return response
        else:
            return Response("Article does not exist", status=status.HTTP_400_BAD_REQUEST)