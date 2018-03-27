from django.shortcuts import render, redirect, HttpResponse
from django.contrib import messages
from ..login.models import User
from models import *

def index(request):
	if 'user_id' not in request.session:
		return redirect('/')
	if 'user-puzzles' not in request.session:
		request.session['user-puzzles'] = 'id'
	adminCreated = Puzzle.objects.filter(creator=User.objects.get(id=1))
	userCreated = Puzzle.objects.exclude(creator=User.objects.get(id=1))
	context = {
		"adminPuzzles" : adminCreated.order_by('id'),
		"userPuzzles" : userCreated.order_by(request.session['user-puzzles']),
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

def orderByDate(request):
	request.session['user-puzzles'] = 'created_at'
	return redirect('/BadData')

def orderByDifficulty(request):
	request.session['user-puzzles'] = 'difficulty'
	return redirect('/BadData')

def orderByName(request):
	request.session['user-puzzles'] = 'name'
	return redirect('/BadData')