# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2018-03-29 18:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('puzzles', '0003_remove_puzzle_times_rated'),
    ]

    operations = [
        migrations.AddField(
            model_name='puzzle',
            name='times_rated',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
