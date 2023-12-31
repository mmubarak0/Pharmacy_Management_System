# Generated by Django 4.2.1 on 2023-06-01 22:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pharmacy', '0006_alter_drug_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='drug',
            name='expiry_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='drug',
            name='generic_name',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='drug',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='frontend/static/img/drugs/'),
        ),
        migrations.AlterField(
            model_name='drug',
            name='quantity',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
