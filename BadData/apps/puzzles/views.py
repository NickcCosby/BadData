from django.shortcuts import render, redirect, HttpResponse
from django.contrib import messages
from ..login.models import User
import xml.etree.cElementTree as ET
from models import *
import datetime
import math
import os

def index(request):
	if 'user_id' not in request.session:
		return redirect('/baddata/')
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
		return redirect('/baddata/')
	context = {
		'number': number,
		'url' : 'puzzles/js/'+str(number)+'.js',
		'puzzle' : Puzzle.objects.get(id = number),
	}
	request.session['startTime'] = str(datetime.datetime.now())
	return render(request, "puzzles/puzzle.html", context)

def wonPuzzle(request, number):
	if 'user_id' not in request.session:
		return redirect('/baddata/')
	if 'startTime' not in request.session:
		return redirect('/baddata/BadData/puzzle/' + str(number) + '/')
	puzzle = Puzzle.objects.get(id = number)
	puzzle.completed_by.add(User.objects.get(id=request.session['user_id']))
	puzzle.save()
	if len(puzzle.rated_by.filter(id=request.session['user_id'])) == 0:
		rated = True
	else:
		rated = False
	delta = datetime.datetime.now() - datetime.datetime.strptime(request.session['startTime'], "%Y-%m-%d %H:%M:%S.%f")
	minutes = int(math.floor(delta.seconds / 60))
	seconds = int(delta.seconds % 60)
	time = "{} minutes {} seconds".format(minutes, seconds)
	context = {
		'number': number,
		"user" : User.objects.get(id=request.session['user_id']),
		'puzzle' : Puzzle.objects.get(id = number),
		'rated' :rated,
		'time':time
	}
	del request.session['startTime']
	return render(request, "puzzles/wonPuzzle.html", context)

def getXML(request, number):
	return HttpResponse(open('apps/puzzles/static/puzzles/xml/'+number+'.xml').read(), content_type='text/xml')

def newPuzzle(request):
	return render(request, "puzzles/newPuzzle.html")

def createPuzzle(request):
	#create xml file
	puzzle = ET.Element("puzzle")
	table = ET.SubElement(puzzle, "table")
	for iii in range(1, int(request.POST['columnCount'])):
		column = ET.SubElement(table, "column", value=request.POST['column' + str(iii)])
		for zzz in range(1, int(request.POST['rowCount'])):
			ET.SubElement(column, "row").text = request.POST['column'+str(iii)+'row'+str(zzz)]
	answer = ET.SubElement(puzzle, "answer")
	ET.SubElement(answer, "y").text = request.POST['yAxisanswer']
	ET.SubElement(answer, 'x').text = request.POST['xAxisanswer']
	relationships = ET.SubElement(puzzle, "relationships")
	ET.SubElement(relationships, 'x').text = request.POST['relationshipX']
	ET.SubElement(relationships, 'y').text = request.POST['relationshipY']
	tree = ET.ElementTree(puzzle)
	newPuzzle = Puzzle.objects.create(name=request.POST['name'], quality_rating=0, times_rated = 0,difficulty=request.POST['difficulty'], creator=User.objects.get(id=request.session['user_id']))
	tree.write("apps/puzzles/static/puzzles/xml/"+ str(newPuzzle.id) +".xml")
	return redirect('/baddata/BadData')

def orderByDate(request):
	if request.session['user-puzzles'] == 'created_at':
		request.session['user-puzzles'] = '-created_at'
	else:
		request.session['user-puzzles'] = 'created_at'
	return redirect('/baddata/BadData')

def orderByDifficulty(request):
	if request.session['user-puzzles'] == 'difficulty':
		request.session['user-puzzles'] = '-difficulty'
	else:
		request.session['user-puzzles'] = 'difficulty'
	return redirect('/baddata/BadData')

def orderByRating(request):
	if request.session['user-puzzles'] == 'quality_rating':
		request.session['user-puzzles'] = '-quality_rating'
	else:
		request.session['user-puzzles'] = 'quality_rating'
	return redirect('/baddata/BadData')

def orderByName(request):
	if request.session['user-puzzles'] == 'name':
		request.session['user-puzzles'] = '-name'
	else:
		request.session['user-puzzles'] = 'name'
	return redirect('/baddata/BadData')

def qRate(request, number):
	rating = Puzzle.objects.get(id = number)
	if len(rating.rated_by.filter(id=request.session['user_id'])) == 0:
		rating.times_rated = rating.times_rated + 1
		rating.quality_rating = ((rating.quality_rating * (rating.times_rated -1)) + int(request.POST['qRate']))/rating.times_rated
		rating.rated_by.add(User.objects.get(id=request.session['user_id']))
		rating.save()
	return redirect('/baddata/BadData')

def deletePuzzle(request, number):
	Puzzle.objects.get(id=number).delete()
	os.remove("apps/puzzles/static/puzzles/xml/"+ str(number) +".xml")
	return redirect('/baddata/user_info/'+str(request.session['user_id']))