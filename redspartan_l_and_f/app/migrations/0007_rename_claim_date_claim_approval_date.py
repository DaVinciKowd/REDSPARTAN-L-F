# Generated by Django 5.2 on 2025-05-05 16:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_alter_item_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='claim',
            old_name='claim_date',
            new_name='approval_date',
        ),
    ]
