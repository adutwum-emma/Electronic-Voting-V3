# Generated by Django 4.0.1 on 2024-02-14 22:42

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('root_app', '0010_verifiedelectorates_verified_by'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='VerifiedElectorates',
            new_name='VerifiedElectorate',
        ),
    ]
