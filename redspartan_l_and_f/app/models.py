from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title

ITEM_CATEGORIES = [
    ('electronics', 'Electronics'),
    ('hygiene', 'Hygiene'),
    ('clothing', 'Clothing'),
    ('accessories', 'Accessories'),
    ('documents', 'Documents'),
    ('stationery', 'Stationery'),
    ('sports', 'Sports Equipment'),
    ('toys', 'Toys'),
    ('food', 'Food/Drink'),
    ('tools', 'Tools'),
    ('pet_items', 'Pet Items'),
    ('medical', 'Medical Items'),
    ('musical', 'Musical Instruments'),
    ('others', 'Others'),
]

ITEM_STATUS = [
    ('lost', 'Lost'),
    ('found', 'Found'),
]

class Item(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=ITEM_CATEGORIES)
    description = models.TextField(blank=True)
    date_reported = models.DateTimeField(auto_now_add=True)
    location = models.CharField(max_length=255)
    image = models.ImageField(upload_to='item_images/', blank=True, null=True)
    status = models.CharField(max_length=10, choices=ITEM_STATUS)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="items") 

    def __str__(self):
        return f"{self.name} ({self.get_status_display()})"