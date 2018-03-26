from django.shortcuts import render, redirect
from django.contrib import messages
from ..login.models import User

def index(request):
    context = {
        "user" : User.objects.get(id=request.session['user_id']),
    }
    return render(request,'puzzles/index.html',context)

def getPuzzle(request, number):
	context = {
		'puzzle':"static/puzzles/" + str(number) + ".xml/"
	}
	return render(request, "puzzles/puzzle.html", context)

def wonPuzzle(request, number):
	context = {
		'number':number,
		"user" : User.objects.get(id=request.session['user_id']),
	}
	return render(request, "puzzles/wonPuzzle.html", context)