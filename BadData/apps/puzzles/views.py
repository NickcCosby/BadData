from django.shortcuts import render, redirect, HttpResponse
from django.contrib import messages
from ..login.models import User

def index(request):
    context = {
        "user" : User.objects.get(id=request.session['user_id']),
    }
    return render(request,'puzzles/index.html',context)

def getPuzzle(request, number):
	context = {
		'puzzle':number
	}
	return render(request, "puzzles/puzzle.html", context)

def wonPuzzle(request, number):
	context = {
		'number':number,
		"user" : User.objects.get(id=request.session['user_id']),
	}
	return render(request, "puzzles/wonPuzzle.html", context)

def getXML(request, number):
	return HttpResponse(open('apps/puzzles/static/puzzles/xml/'+number+'.xml').read(), content_type='text/xml')