'''from django.test import TestCase
from .models import Article
from datetime import date

class ArticleTestCase(TestCase):
    def test_set_article(self):
        # Create a new article
        new_article_data = {
            'title': 'Test Article',
            'publication_date': date(2023,12,30),  
            'authors':'hamouda , abdellah',
            'abstract':'dsdsdsds',
            'institutions':'hamouda_stadium , abdellah_stadium',
            'keywords':'engineering , power',
            'pdf_url':'file:///D:/Downloads/Article_12.pdf',
            'references':'dqsdqsd,qsdqdq',
            # Add other required fields
        }

        # Call the set_article method to create a new article
        new_article = Article.set_article(new_article_data)

        # Check if the article was created successfully
        self.assertIsNotNone(new_article)
        self.assertIsInstance(new_article, Article)
        
        # Update the article with modified data
        updated_article_data = {
            'id': new_article.id,  # Provide the ID of the newly created article
            'title': 'Updated Test Article',
            'publication_date': '2022-01-01',  # Update with a valid date
            # Update other fields as needed
        }

        # Call the set_article method to update the article
        updated_article = Article.set_article(updated_article_data)

        # Check if the article was updated successfully
        self.assertIsNotNone(updated_article)
        self.assertIsInstance(updated_article, Article)
        self.assertEqual(updated_article.title, 'Updated Test Article')
        # Check other updated fields
        
        # Ensure the article doesn't exist if incorrect ID is provided
        non_existing_article_data = {
            'id': 9999,  # An ID that does not exist
            'title': 'Non-existing Article',
            # Other fields...
        }

        non_existing_article = Article.set_article(non_existing_article_data)
        self.assertIsNone(non_existing_article)'''
from unittest import TestCase, mock
from .models import Article

class ArticleTestCase(TestCase):
    @mock.patch('requests.get')
    def test_download_article_success(self, mock_get):
        # Mock the requests.get method
        mock_get.return_value.status_code = 200
        mock_get.return_value.iter_content.return_value = [b'mocked content']

        pdf_url = 'file:///D:/Downloads/Article_12.pdf'  # Replace with a valid PDF URL
        is_downloaded = Article.download_article(pdf_url)

        mock_get.assert_called_once_with(pdf_url, stream=True)
        self.assertTrue(is_downloaded)

    @mock.patch('requests.get')
    def test_download_article_failure(self, mock_get):
        # Mock the requests.get method to simulate a failed download
        mock_get.return_value.status_code = 404

        pdf_url = 'file:///D:/Downloads/Article_12.pdf'  # Replace with a non-existent URL
        is_downloaded = Article.download_article(pdf_url)

        mock_get.assert_called_once_with(pdf_url, stream=True)
        self.assertFalse(is_downloaded)
