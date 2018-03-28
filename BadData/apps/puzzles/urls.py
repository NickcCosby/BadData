from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^$', views.index),
	url(r'^puzzle/(?P<number>[0-9]+)/$', views.getPuzzle),
	url(r'^puzzle/(?P<number>[0-9]+)/win/$', views.wonPuzzle),
	url(r'^puzzle/(?P<number>[0-9]+)/xml$', views.getXML),
	url(r'^create_puzzle$', views.newPuzzle),
	url(r'^create/$', views.createPuzzle),
	url(r'^date$', views.orderByDate),
	url(r'^difficulty$', views.orderByDifficulty),
	url(r'^title$', views.orderByName),
]