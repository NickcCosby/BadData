from __future__ import unicode_literals

from django.db import models
from ..login.models import User

# Create your models here.
class Puzzle(models.Model):
    name = models.CharField(max_length=255)
    quality_rating = models.IntegerField()
    times_rated = models.IntegerField()
    difficulty = models.IntegerField()
    creator = models.ForeignKey(User, related_name="puzzles_created")
    completed_by = models.ManyToManyField(User, related_name="puzzles_completed")
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    def __repr__(self):
        return "<Puzzle object: {}, {}, {}, {}>".format(self.name,self.quality_rating,self.times_rated,self.difficulty,self.creator,self.completed_by)