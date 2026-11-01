from django.contrib import admin
from .models import Mod

@admin.register(Mod)
class ModAdmin(admin.ModelAdmin):
    list_display = ('id', 'username')
    search_fields = ('username',)
