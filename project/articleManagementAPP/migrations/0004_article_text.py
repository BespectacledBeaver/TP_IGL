# Generated by Django 5.0 on 2024-02-06 13:51

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articleManagementAPP', '0003_delete_userarticle'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='text',
            field=models.FileField(default=django.utils.timezone.now, upload_to=''),
            preserve_default=False,
        ),
    ]