from django.shortcuts import render, redirect, HttpResponse
from django.contrib import messages
from ..login.models import User
import xml.etree.cElementTree as ET

def index(request):
	if 'user_id' not in request.session:
		return redirect('/')
	context = {
		"user" : User.objects.get(id=request.session['user_id']),
	}
	return render(request,'puzzles/index.html',context)

def getPuzzle(request, number):
	if 'user_id' not in request.session:
		return redirect('/')
	context = {
		'number': number,
		'url' : 'puzzles/js/'+str(number)+'.js'
	}
	return render(request, "puzzles/puzzle.html", context)

def wonPuzzle(request, number):
	if 'user_id' not in request.session:
		return redirect('/')
	context = {
		'number': number,
		"user" : User.objects.get(id=request.session['user_id']),
	}
	return render(request, "puzzles/wonPuzzle.html", context)

def getXML(request, number):
	return HttpResponse(open('apps/puzzles/static/puzzles/xml/'+number+'.xml').read(), content_type='text/xml')

def newPuzzle(request):
	return render(request, "puzzles/newPuzzle.html")

def createPuzzle(request):
	