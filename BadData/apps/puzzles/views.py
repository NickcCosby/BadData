from django.shortcuts import render, redirect

def index(request):
	return render(request, "puzzles/index.html")

def getPuzzle(request, puzzle):
	context = {
		'puzzle':puzzle
	}
	return render(request, "puzzles/puzzle.html", context)

def wonPuzzle(request, number):
	context = {
		'number':number
	}
	return render(request, "puzzles/wonPuzzle.html", context)