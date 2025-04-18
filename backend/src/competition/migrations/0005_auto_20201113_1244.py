# Generated by Django 2.2.6 on 2020-11-13 11:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('competition', '0004_competition_answers_csv'),
    ]

    operations = [
        migrations.AddField(
            model_name='competition',
            name='weight',
            field=models.FloatField(default=1),
        ),
        migrations.AlterField(
            model_name='submission',
            name='team',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='submissions', to=settings.AUTH_USER_MODEL),
        ),
    ]
