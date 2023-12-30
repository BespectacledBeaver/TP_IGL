# Generated by Django 5.0 on 2023-12-30 14:08

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userName', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('linked_user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='userManagementApp.user')),
            ],
        ),
    ]