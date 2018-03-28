function updateGraph(data, answer, relationships)
{
    var x = [];
	var y = [];
	for(var key in data)
	{
		for(var iii=0; iii < data[key].length; iii++)
		{
			y.push(evalJsep(jsep(relationships['y']), data, iii));
		}
		for(iii = 0; iii < data[key].length; iii++)
		{
			x.push(evalJsep(jsep(relationships['x']), data, iii));
		}
		break;
	}
    var trace1 = 
    {
        x:x,
        y:y,
        type:"scatter"
	};
    var layout = 
    {
		xaxis: {showgrid: true, gridcolor:'#bdbdbd', gridwidth:2, dtick: 1,
		 range: [answer['x'].reduce(function(a,b){return Math.min(a,b)})-.25,answer['x'].reduce(function(a,b){return Math.max(a,b)})+.25]},
		yaxis: {showgrid: true, gridcolor:'#bdbdbd', gridwidth:2, dtick: 2, 
		range: [answer['y'].reduce(function(a,b){return Math.min(a,b)})-1.4,answer['y'].reduce(function(a,b){return Math.max(a,b)})+1]},
		margin:
		{
			l: 30,
			r: 30,
			b: 30,
			t: 30
		}
    }
	Plotly.newPlot('variable-graph', [trace1],layout, {displayModeBar: false, staticPlot:true});
	if (compareFunction(x, answer['x']) && compareFunction(y, answer['y']))
    {
        return true;
    }
    else
    {
        return false;
    }
}
function compareFunction(a1, a2)
{
    if (a1.length >= a2.length)
    {
        var temp = a1.length;
    }
    else
    {
        var temp = a2.length;
    }
    for(var iii = 0; iii < temp; iii++)
    {
        if (a1[iii] != a2[iii])
            return false;
    }
    return true;
}
function evalJsep(jsepObj, data, idx)
{
	if(jsepObj.type == "BinaryExpression")
	{
		if(jsepObj.operator == '+')
			return evalJsep(jsepObj.left, data, idx) + evalJsep(jsepObj.right, data, idx);
		else if(jsepObj.operator == '%')
			return evalJsep(jsepObj.left, data, idx) % evalJsep(jsepObj.right, data, idx);
		else if(jsepObj.operator == '-')
			return (evalJsep(jsepObj.left, data, idx)) - (evalJsep(jsepObj.right, data, idx));
		else if(jsepObj.operator == '*')
			return evalJsep(jsepObj.left, data, idx) * evalJsep(jsepObj.right, data, idx);
		else if(jsepObj.operator == '/')
			return evalJsep(jsepObj.left, data, idx) / evalJsep(jsepObj.right, data, idx);
		else if(jsepObj.operator == '^')
			return Math.pow(evalJsep(jsepObj.left, data, idx), evalJsep(jsepObj.right, data, idx))
	}
	else if(jsepObj.type == "Literal")
		return jsepObj.value;
	else if(jsepObj.type == "Identifier")
	{
		if(jsepObj.name in data)
		{
			return Number(data[jsepObj.name][idx]);
		}
	}
	else if(jsepObj.type == "MemberExpression")
	{
		if(jsepObj.object.name in data)
		{
			if (jsepObj.property.name == "length")
			{
				return data[jsepObj.object.name][idx].length;
			}
			if(jsepObj.property.name == "countUpper")
			{
				return countUpper(data[jsepObj.object.name][idx])
			}
			if(jsepObj.property.name == "countLower")
			{
				return countLower(data[jsepObj.object.name][idx])
			}
		}
	}
}

function answerGraph(answer)
{
    var trace1 = 
    {
        x:answer['x'],
        y:answer['y'],
        type:"scatter"
	};
	var layout = 
	{
		xaxis: {showgrid: true, gridcolor:'#bdbdbd', gridwidth:2, dtick: 1},
		yaxis: {showgrid: true, gridcolor:'#bdbdbd', gridwidth:2, dtick: 2},
		margin:
		{
			l: 30,
			r: 30,
			b: 30,
			t: 30
		}
	}
    Plotly.newPlot('origin-graph', [trace1], layout,{displayModeBar: false, staticPlot:true});
}

function countUpper(str)
{
	var character = '';
	var sum = 0;
	for(var iii = 0; iii < str.length; iii++)
	{
		character = str.charAt(iii);
		if(character == character.toUpperCase() && isNaN(character * 1))
			sum++;
	}
	return sum;
}
function countLower(str)
{
	var character = '';
	var sum = 0;
	for(var iii = 0; iii < str.length; iii++)
	{
		character = str.charAt(iii);
		if(character == character.toLowerCase() && isNaN(character * 1))
			sum++;
	}
	return sum;
}
