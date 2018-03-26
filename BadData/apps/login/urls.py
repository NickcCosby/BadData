from django.conf.urls import url
from . import views
urlpatterns = [
    url(r'^$', views.index),
    url(r'^login$', views.login),
    url(r'^register$', views.register),
    url(r'^logout$', views.logout),
    url(r'^view_user/(?P<id>\d+)$', views.view_user),  
    url(r'^user_info/(?P<id>\d+)$', views.view_user),  
]