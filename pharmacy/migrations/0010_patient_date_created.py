# Generated by Django 4.2.1 on 2023-06-02 23:02

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('pharmacy', '0009_patient_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
