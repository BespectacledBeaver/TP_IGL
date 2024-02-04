from django.shortcuts import render
from django.db import models
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from articleManagementAPP.models import Article
from articleManagementAPP.serializers import ArticleSerializer
from django.db.models import Q
from elasticsearch_dsl import Search
import fitz
from elasticsearch import Elasticsearch
import os
import subprocess
from elasticsearch import Elasticsearch

# Create your views here.



class Sentarticlesview(APIView):

    def post(self , request): 
        articles = Article.objects.all().values('id','title', 'publication_date', 'authors')
        articles = articles.order_by('-publication_date')
        articles_list = list(articles)
    
        #response = Response(articles_list)
        return Response({'articles': articles_list})
    
        


class SearchArticlesView(APIView):
    def post(self, request):
        search_options = request.data.get('search_options', [])
        keywords = request.data.get('keywords', [])
        start_date = request.data.get('start_date', [])
        end_date = request.data.get('end_date', [])

        if not keywords or not search_options:
            return Response({'error': 'Please provide keywords and search options for the search'}, status=status.HTTP_400_BAD_REQUEST)

        # Initialize an empty queryset
        queryset = Article.objects.none()

        # Iterate over search options and filter the queryset for each option
        for option in search_options:                   
            if option == 'title':
                queryset |= Article.objects.filter(title__icontains=keywords)
            elif option == 'authors':
                queryset |= Article.objects.filter(authors__icontains=keywords)
            elif option == 'keywords':
                queryset |= Article.objects.filter(keywords__icontains=keywords)
            elif option == 'institutions':
                queryset |= Article.objects.filter(institutions__icontains=keywords)

        filtered_results = []
        for article in queryset:    
            if (not start_date or option['publication_date'] >= start_date) and \
               (not end_date or option['publication_date'] <= end_date):
                filtered_results.append(article)
        

         # Sort the queryset by publication_date in descending order (most recent first)
        filtered_results = filtered_results.order_by('-publication_date') # - is for descending order 
        
        articles = filtered_results.objects.all().values('id','title', 'publication_date', 'authors')
        articles_list = list(articles)
        response = Response(articles_list)
        return response



# Connect to the Elasticsearch instance
es = Elasticsearch([{'host': 'localhost', 'port': 9200 , 'scheme': 'http'}])

# Define the index name and document type
index_name = "pdf_index"
doc_type = "_doc"

# Define the PDF file path
pdf_file_path = "C:/Users/ASUS/Documents/TP_IGL/project/static/pdfs/Article_12.pdf"

# Define the search keyword
search_keyword = "example"

# Extract the text from the PDF file using fitz
pdf_file = fitz.open(pdf_file_path)
pdf_text = ""
for page in pdf_file:
    pdf_text += page.get_text("text")

# Create a new Elasticsearch document with the PDF text
doc_id = 1
es_doc = {
    "title": os.path.basename(pdf_file_path),
    "text": pdf_text
}
res = es.index(index=index_name, id=doc_id, body=es_doc)

# Search for the keyword in the Elasticsearch index
search_query = {
    "query": {
        "match": {
            "text": search_keyword
        }
    }
}
res = es.search(index=index_name, doc_type=doc_type, body=search_query)
hits = res["hits"]["hits"]

# Output the search results to a text file
with open("search_results.txt", "w") as f:
    for hit in hits:
        f.write(hit["_source"]["title"] + ": " + hit["_source"]["text"][hit["_source"]["text"].index(search_keyword):hit["_source"]["text"].index(search_keyword) + len(search_keyword)] + "\n")