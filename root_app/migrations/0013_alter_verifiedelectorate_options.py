# Generated by Django 4.0.1 on 2024-02-15 22:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('root_app', '0012_alter_verifiedelectorate_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='verifiedelectorate',
            options={'permissions': [('view_verified_electorates', 'Can view verifed electorates'), ('unverify_electorates', 'Can unverify electorates')], 'verbose_name_plural': 'Verified Electorates'},
        ),
    ]