# Generated by Django 5.0.1 on 2024-02-07 08:55

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articleManagementAPP', '0008_alter_article_authors_alter_article_institutions_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='publication_date',
            field=models.DateField(default=datetime.date.today),
        ),
    ]
