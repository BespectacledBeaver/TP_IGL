from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        date = serializers.DateField(format="d/m/Y")
        fields = ['id', 'title', 'publication_date', 
                  'authors','abstract','institutions',
                  'keywords','text','references']
