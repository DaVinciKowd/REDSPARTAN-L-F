from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
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
    is_claimed = models.BooleanField(default=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="items") 

    def __str__(self):
        return f"{self.name} ({self.get_status_display()})"
    
class Claim(models.Model):
    item = models.ForeignKey('Item', on_delete=models.CASCADE, related_name="claims")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="claims")
    claim_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('approved', 'Approved'),
            ('denied', 'Denied'),
            ('claimed', 'Claimed')
        ],
        default='pending'
    )

    class Meta:
        # Same user can't claim same item more than once
        unique_together = ('item', 'user')  

    def __str__(self):
        return f"{self.user.username} claims {self.item.name}"

    def clean(self):
        from django.core.exceptions import ValidationError

        # Only found items can be claimed
        if self.item.status != 'found':
            raise ValidationError("Only items with 'found' status can be claimed.")

        # Prevent users from claiming already claimed items
        existing_claims = Claim.objects.filter(item=self.item).exclude(pk=self.pk)
        if existing_claims.exists():
            raise ValidationError("This item has already been claimed by another user.")
        
        # Prevent users from having multiple claims at an instance
        user_claims = Claim.objects.filter(user=self.user).exclude(pk=self.pk)
        if user_claims.exists():
            raise ValidationError("A user can only have one active claim at a time.")
    
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)