from django.contrib import admin
from .models import Admin

@admin.register(Admin)
class ModeratorAdmin(admin.ModelAdmin):
    list_display = ('username', 'email')  # Fields to display in the admin panel's list view
    search_fields = ('username', 'email') # Fields to enable search functionality
    