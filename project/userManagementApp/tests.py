from django.test import TestCase
from .models import User
# Create your tests here.
class UserTestCase(TestCase):
    def test_set_account(self):
        # Create a user
        user = User.objects.create(userName='test_user', password='test_password')

        # Set an account for the user
        new_account = user.setAccount('account_username', 'account_password')

        # Check if the account was set
        self.assertIsNotNone(new_account)

    def test_get_account(self):
        # Create a user
        user = User.objects.create(userName='test_user', password='test_password')

        # Set an account for the user
        user.setAccount('account_username', 'account_password')

        # Get the account
        user_account = user.getAccount()

        # Check if the account is retrieved correctly
        self.assertIsNotNone(user_account)
        self.assertEqual(user_account.userName, 'account_username')
        self.assertEqual(user_account.password, 'account_password')