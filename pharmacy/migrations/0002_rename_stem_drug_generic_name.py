# Generated by Django 3.2.6 on 2023-05-26 17:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pharmacy', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='drug',
            old_name='Stem',
            new_name='generic_name',
        ),
    ]