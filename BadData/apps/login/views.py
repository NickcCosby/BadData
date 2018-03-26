from __future__ import unicode_literals

from django.shortcuts import render, HttpResponse, redirect
from django.contrib import messages
from models import *
import bcrypt

def index(request):
    context = {
        "users" : User.objects.all()
    }
    return render(request,'login/index.html',context)

def register(request):
    errors = User.objects.register_validator(request.POST)
    if len(errors):
        for tag, error in errors.iteritems():
            messages.error(request, error, extra_tags=tag)
        return redirect('/')
    else:
        User.objects.create(
            first_name = str(request.POST['first_name']),
            last_name = str(request.POST['last_name']),
            email = str(request.POST['email']),
            password = str(bcrypt.hashpw(request.POST['password'].encode(), bcrypt.gensalt())),
            )
        user = User.objects.get(email = request.POST['email'])
        request.session['user_id'] = user.id
    return redirect('/BadData')

def login(request):
    errors = User.objects.login_validator(request.POST)
    if len(errors):
        for tag, error in errors.iteritems():
            messages.error(request, error, extra_tags=tag)
        return redirect('/')
    else:
        user = User.objects.get(email = request.POST['email'])
        request.session['user_id'] = user.id
    return redirect('/BadData')

def logout(request):
    request.session.clear()    
    return redirect('/')

def view_user(request, id):
    if 'user_id' not in request.session:
        return redirect('/')
    context = {
        "user" : User.objects.get(id=id),
    }
    return render(request,'login/view_user.html',context)














