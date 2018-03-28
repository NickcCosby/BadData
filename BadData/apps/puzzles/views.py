from django.shortcuts import render, redirect, HttpResponse
from django.contrib import messages
from ..login.models import User
import xml.etree.cElementTree as ET
from models import *

def index(request):
	if 'user_id' not in request.session:
		return redirect('/')
	if 'user-puzzles' not in request.session:
		request.session['user-puzzles'] = 'id'
	adminCreated = Puzzle.objects.filter(creator=User.objects.get(id=1))
	userCreated = Puzzle.objects.filter(creator=User.objects.get(id=1))
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
		'url' : 'puzzles/js/'+str(number)+'.js',
		'puzzle' : Puzzle.objects.get(id = number),
	}
	return render(request, "puzzles/puzzle.html", context)

def wonPuzzle(request, number):
	if 'user_id' not in request.session:
		return redirect('/')
	puzzle = Puzzle.objects.get(id = number)
	puzzle.completed_by.add(User.objects.get(id=request.session['user_id']))
	puzzle.save()

	context = {
		'number': number,
		"user" : User.objects.get(id=request.session['user_id']),
		'puzzle' : Puzzle.objects.get(id = number),
	}
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
	newPuzzle = Puzzle.objects.create(name=request.POST['name'], quality_rating=0, difficulty=request.POST['difficulty'], creator=User.objects.get(id=request.session['user_id']))
	tree.write("apps/puzzles/static/puzzles/xml/"+ str(newPuzzle.id) +".xml")
	return redirect('/BadData')

def orderByDate(request):
	if request.session['user-puzzles'] == 'created_at':
		request.session['user-puzzles'] = '-created_at'
	else:
		request.session['user-puzzles'] = 'created_at'
	return redirect('/BadData')

def orderByDifficulty(request):
	if request.session['user-puzzles'] == 'difficulty':
		request.session['user-puzzles'] = '-difficulty'
	else:
		request.session['user-puzzles'] = 'difficulty'
	return redirect('/BadData')

def orderByRating(request):
	if request.session['user-puzzles'] == 'quality_rating':
		request.session['user-puzzles'] = '-quality_rating'
	else:
		request.session['user-puzzles'] = 'quality_rating'
	return redirect('/BadData')

def orderByName(request):
	if request.session['user-puzzles'] == 'name':
		request.session['user-puzzles'] = '-name'
	else:
		request.session['user-puzzles'] = 'name'
	return redirect('/BadData')

def qRate(request, number):
	rating = Puzzle.objects.get(id = number)
	rating.times_rated = rating.times_rated + 1
	print rating.times_rated
	rating.quality_rating = (rating.quality_rating + int(request.POST['qRate']))/2
	print rating.quality_rating
	rating.save()
	return redirect('/BadData')
