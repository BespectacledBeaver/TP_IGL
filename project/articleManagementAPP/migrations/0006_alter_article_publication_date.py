# Generated by Django 5.0 on 2024-02-06 13:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articleManagementAPP', '0005_alter_article_abstract_alter_article_authors_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='publication_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]