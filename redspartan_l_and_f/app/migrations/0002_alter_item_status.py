# Generated by Django 5.1.7 on 2025-05-03 09:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='status',
            field=models.CharField(choices=[('upload', 'Upload'), ('claim', 'Claim')], max_length=10),
        ),
    ]
