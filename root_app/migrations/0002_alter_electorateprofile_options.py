# Generated by Django 4.0.1 on 2024-02-03 08:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('root_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='electorateprofile',
            options={'permissions': [('add_electorate', 'Can add electorate'), ('delete_electorate', 'Can delete electorate'), ('change_electorate', 'Can change electorate'), ('view_electorate', 'Can view electorate'), ('upload_electorate_with_excel', 'Can upload electorate with excel')], 'verbose_name_plural': 'Electorate Profiles'},
        ),
    ]