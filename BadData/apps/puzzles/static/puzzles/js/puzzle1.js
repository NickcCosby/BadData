function updateGraph(data, answer)
{
    var x = [];
    var y = [];
    for(var iii=0; iii < data['name'].length; iii++)
    {
        y.push(data['name'][iii].length);
    }
    for(iii = 0; iii < data['id'].length; iii++)
    {
        x.push(Number(data['id'][iii]));
    }
    var trace1 = 
    {
        x:x,
        y:y,
        type:"scatter"
    };
    var layout = 
    {
        xaxis: {range: [awnser['x'].reduce(function(a,b){return Math.min(a,b)})-.4,awnser['x'].reduce(function(a,b){return Math.max(a,b)})+.4]},
        yaxis: {range: [awnser['y'].reduce(function(a,b){return Math.min(a,b)})-.4,awnser['y'].reduce(function(a,b){return Math.max(a,b)})+.4]}
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
function awnserGraph(awnser)
{
    var trace1 = 
    {
        x:awnser['x'],
        y:awnser['y'],
        type:"scatter"
    };
    Plotly.newPlot('origin-graph', [trace1], {},{displayModeBar: false, staticPlot:true});
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