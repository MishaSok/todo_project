# Generated by Django 4.1.7 on 2023-03-07 21:58

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tasks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=150)),
                ('folder_name', models.CharField(max_length=30)),
                ('task_text', models.CharField(default='None', max_length=100)),
                ('created_time', models.DateTimeField(default=datetime.datetime(2023, 3, 7, 21, 58, 37, 606372, tzinfo=datetime.timezone.utc))),
                ('time_today', models.DateTimeField()),
                ('time_all', models.DateTimeField()),
            ],
        ),
    ]
