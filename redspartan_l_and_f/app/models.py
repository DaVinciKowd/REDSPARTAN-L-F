from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
import re

# Custom validators
def validate_username_format(value):
    if not re.match(r"^\d{2}-\d{5}$", value):
        raise ValidationError("Username must follow the format YY-NNNNN (e.g., 22-09335)")

def validate_email_domain(value):
    required_domain = "@g.batstate-u.edu.ph"
    if not value.endswith(required_domain):
        raise ValidationError(f"Email must end with {required_domain}")
    
def validate_username_matches_email(username, email):
    """
    Ensures username == first 8 characters of email.
    """
    if email and username != email[:8]:
        raise ValidationError(
            f"Username must match the first 8 characters of the email ({email[:8]})."
        )

# Custom user model
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True, validators=[validate_email_domain])
    username = models.CharField(
        max_length=20,
        unique=True,
        validators=[validate_username_format],
    )

    def clean(self):
        super().clean()
        # Check if email already exists (excluding self on update)
        if CustomUser.objects.filter(email=self.email).exclude(pk=self.pk).exists():
            raise ValidationError({"email": "A user with this email already exists."})

        # Check if username already exists (excluding self on update)
        if CustomUser.objects.filter(username=self.username).exclude(pk=self.pk).exists():
            raise ValidationError({"username": "A user with this username already exists."})
        
        # Enforce username == email[:8]
        validate_username_matches_email(self.username, self.email)

# Note model
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey('app.CustomUser', on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title

# Constants for Item model
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
    ('available', 'Available'),
    ('pending', 'Pending Review'),
    ('claimed', 'Claimed'),
]

class Item(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=ITEM_CATEGORIES)
    description = models.TextField(blank=True)
    date_reported = models.DateTimeField(auto_now_add=True)
    location = models.CharField(max_length=255)
    image = models.ImageField(upload_to='item_images/', blank=True, null=True)
    status = models.CharField(max_length=10, choices=ITEM_STATUS, default='available')
    author = models.ForeignKey('app.CustomUser', on_delete=models.CASCADE, related_name="items") 

    def __str__(self):
        return f"{self.name} ({self.get_status_display()})"

class Claim(models.Model):
    item = models.ForeignKey('Item', on_delete=models.CASCADE, related_name="claims")
    user = models.ForeignKey('app.CustomUser', on_delete=models.CASCADE, related_name="claims")
    approval_date = models.DateTimeField(auto_now_add=True)
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
        unique_together = ('item', 'user')

    def __str__(self):
        return f"{self.user.username} claims {self.item.name}"

    def clean(self):
        # Only allow claims on available items
        if self.item.status != 'available':
            raise ValidationError("Only items with 'available' status can be claimed.")

        # Prevent repeat denied claims by same user
        if Claim.objects.filter(
            item=self.item,
            user=self.user,
            status='denied'
        ).exclude(pk=self.pk).exists():
            raise ValidationError("You have already been denied a claim for this item.")

        # Prevent conflicting claims from others
        if Claim.objects.filter(
            item=self.item,
            status='pending'
        ).exclude(pk=self.pk).exists():
            raise ValidationError("This item already has a pending claim.")

        if Claim.objects.filter(
            item=self.item,
            status__in=['approved', 'claimed']
        ).exclude(pk=self.pk).exists():
            raise ValidationError("This item has already been claimed or approved for claim.")

        # Prevent user from having multiple active claims
        if Claim.objects.filter(
            user=self.user,
            status__in=['pending', 'approved', 'claimed']
        ).exclude(pk=self.pk).exists():
            raise ValidationError("You already have an active claim.")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

        # Update item status based on claim outcome
        if self.status in ['approved', 'claimed']:
            self.item.status = 'claimed'
            self.item.save()
        elif self.status == 'denied':
            # Restore item status if no remaining active claims
            has_other_active = Claim.objects.filter(
                item=self.item,
                status__in=['approved', 'pending']
            ).exclude(pk=self.pk).exists()
            if not has_other_active:
                self.item.status = 'available'
                self.item.save()

