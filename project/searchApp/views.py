from django.shortcuts import render
from django.db import models
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from articleManagementApp.models import Article
from articleManagementApp.serializers import ArticleSerializer
from django.db.models import Q

class SearchArticlesView(APIView):
    def post(self, request):
        search_options = request.data.get('search_options', [])
        keywords = request.data.get('keywords', [])

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
            elif option == 'abstract':
                queryset |= Article.objects.filter(abstract__icontains=keywords)
            elif option == 'text':
                queryset |= Article.objects.filter(text__icontains=keywords)

         # Sort the queryset by publication_date in descending order (most recent first)
        queryset = queryset.order_by('-publication_date') # - is for descending order 

        serializer = ArticleSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)




class DisplayArticlesView(APIView):
    def post(self, request):
        # Retrieve the search results from SearchArticlesView
        search_results = SearchArticlesView().post(request).data

        # Additional filtering options
        keywords_filter = request.data.get('keywords_filter', [])
        authors_filter = request.data.get('authors_filter', [])
        institutions_filter = request.data.get('institutions_filter', [])
        start_date = request.data.get('start_date')
        end_date = request.data.get('end_date')

        # Apply additional filters
        filtered_results = []
        for article in search_results:
            if all(keyword in article['keywords'] for keyword in keywords_filter) and \
               all(author in article['authors'] for author in authors_filter) and \
               all(institution in article['institutions'] for institution in institutions_filter) and \
               (not start_date or article['publication_date'] >= start_date) and \
               (not end_date or article['publication_date'] <= end_date):
                filtered_results.append(article)

        return Response(filtered_results, status=status.HTTP_200_OK)
