from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import Item

@receiver(post_delete, sender=Item)
def delete_item_image(sender, instance, **kwargs):
    if instance.image:
        instance.image.delete(save=False)
