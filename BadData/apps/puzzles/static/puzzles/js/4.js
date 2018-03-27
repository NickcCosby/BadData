function updateGraph(data, awnser)
{
    var x = [];
	var y = [];
    for(var iii=0; iii < data['id'].length; iii++)
    {
        y.push(Math.pow(Number(data['count'][iii]), 2));
	}
    for(iii = 0; iii < data['id'].length; iii++)
    {
        x.push((Number(data['company_id'][iii])%4)+3);
	}
	console.log(y);
	console.log(x);
    var trace1 = 
    {
        x:x,
        y:y,
        type:"scatter"
    };
    var layout = 
    {
		xaxis: {showgrid: true, gridcolor:'#bdbdbd', gridwidth:2, dtick: 1,
		 range: [awnser['x'].reduce(function(a,b){return Math.min(a,b)})-.25,awnser['x'].reduce(function(a,b){return Math.max(a,b)})+.25]},
		yaxis: {showgrid: true, gridcolor:'#bdbdbd', gridwidth:2, dtick: 2, 
		range: [awnser['y'].reduce(function(a,b){return Math.min(a,b)})-1.4,awnser['y'].reduce(function(a,b){return Math.max(a,b)})+1]},
		margin:
		{
			l: 30,
			r: 30,
			b: 30,
			t: 30
		}
    }
    Plotly.newPlot('variable-graph', [trace1],layout, {displayModeBar: false, staticPlot:true});
    if (compareFunction(x, awnser['x']) && compareFunction(y, awnser['y']))
    {
        return true;
    }
    else
    {
        return false;
    }
}
function awnserGraph(awnser)
{
    var trace1 = 
    {
        x:awnser['x'],
        y:awnser['y'],
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