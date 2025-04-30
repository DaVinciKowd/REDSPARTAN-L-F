from django.contrib import admin
from .models import Note
from .models import Item
from .models import Claim
# Register your models here

admin.site.register(Note)

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'status', 'is_claimed', 'location', 'date_reported', 'author')
    list_filter = ('category', 'status', 'date_reported')
    search_fields = ('name', 'description', 'location')

admin.site.register(Claim)