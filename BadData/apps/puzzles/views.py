from django.shortcuts import render, redirect, HttpResponse

def index(request):
	return render(request, "puzzles/index.html")

def getPuzzle(request, number):
	context = {
		'puzzle':number
	}
	return render(request, "puzzles/puzzle.html", context)

def wonPuzzle(request, number):
	context = {
		'number':number
	}
	return render(request, "puzzles/wonPuzzle.html", context)

def getXML(request, number):
	return HttpResponse(open('apps/puzzles/static/puzzles/xml/'+number+'.xml').read(), content_type='text/xml')