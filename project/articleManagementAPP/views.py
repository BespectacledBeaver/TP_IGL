from django.shortcuts import render
from .models import Article
from django.shortcuts import render, get_object_or_404

# Create your views here.
def searchArticle(criterion, search_string):
    # Perform a search based on the criterion and search_string
    # For example:
    if criterion == "title":
        articles = Article.objects.filter(title__icontains=search_string)
    elif criterion == "authors":
        articles = Article.objects.filter(authors__icontains=search_string)
    # Add other criterion options and search logic here as needed
    else:
        articles = []  # Return an empty list if criterion not recognized
    return articles

def showArticle():
    # Retrieve all articles
    articles = Article.objects.all()
    return articles

def favoriteArticle(account, article):
    # Add the article to the favorites of the account
    account.favorite_articles.add(article)
    account.save()

def unFavoriteArticle(account, article):
    # Remove the article from the favorites of the account
    account.favorite_articles.remove(article)
    account.save()

def showFavorites(account):
    # Retrieve the favorite articles of the account
    favorite_articles = account.favorite_articles.all()
    return favorite_articles



def article_detail_view(request, pk):
    article = get_object_or_404(Article, pk=pk)
    return render(request, 'article_detail.html', {'article': article})


