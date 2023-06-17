# Generated by Django 3.2.6 on 2023-05-26 12:52

import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='auth.user')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('auth.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Drug',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('brand_name', models.CharField(blank=True, max_length=200, null=True)),
                ('Stem', models.CharField(blank=True, help_text='Generic Name', max_length=200, null=True)),
                ('price', models.IntegerField(blank=True, null=True)),
                ('expiry_date', models.DateField()),
                ('description', models.TextField(blank=True, null=True)),
                ('quantity', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='auth.user')),
                ('current_status', models.TextField(blank=True, null=True)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('auth.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Prescription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now=True)),
                ('quantity', models.IntegerField()),
                ('recieved', models.BooleanField(default=False)),
                ('notes', models.TextField()),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Doctor', to='pharmacy.doctor')),
                ('drug', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Drug', to='pharmacy.drug')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Patient', to='pharmacy.patient')),
            ],
        ),
    ]
