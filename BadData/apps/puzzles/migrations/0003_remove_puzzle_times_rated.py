# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2018-03-29 18:25
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('puzzles', '0002_puzzle_times_rated'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='puzzle',
            name='times_rated',
        ),
    ]
