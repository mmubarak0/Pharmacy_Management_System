# Generated by Django 4.2.1 on 2023-06-01 12:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pharmacy', '0005_drug_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='drug',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='img/drugs/'),
        ),
    ]
