

function xmlParser(xml)
{
	var columns = $(xml).find('column')
	var data = {};
	columns.each(function()
	{
		$(".columnDef").append('<th>' + $(this).attr("value") + '</th>');
		data[$(this).attr("value")] = [];
	});
	for(var iii = 0; iii < $(columns[0]).find("row").length; iii++)
	{
		$(".stuff").append('<tr></tr>');
		for(var zzz = 0; zzz < columns.length; zzz++)
		{
			$(".stuff tr:last-child").append("<td><input type='text' class='"+ $(columns[zzz]).attr("value") +"' value='"+$($(columns[zzz]).find("row")[iii]).text()+"'></td>");
			data[$(columns[zzz]).attr('value')].push($($(columns[zzz]).find("row").get(iii)).text())
		}
	}
	addInput(columns)
	var xanswer = $(xml).find("answer").find('x').text().split(",");
	var yanswer = $(xml).find("answer").find('y').text().split(",");
	xanswer[0] = xanswer[0].substring(1, xanswer.length);
	xanswer[xanswer.length-1] = xanswer[xanswer.length-1].substring(0, xanswer[xanswer.length-1].length-1);
	yanswer[0] = yanswer[0].substring(1, yanswer.length);
	yanswer[yanswer.length-1] = yanswer[yanswer.length-1].substring(0, yanswer[yanswer.length-1].length-1);
	for(var iii = 0; iii < xanswer.length; iii++)
	{
		xanswer[iii] = Number(xanswer[iii])
		yanswer[iii] = Number(yanswer[iii])
	}
	var answer = 
	{
		'x':xanswer,
		'y':yanswer
	}
	var relationships = 
	{
		'x':$(xml).find('relationships').find('x').text(),
		'y':$(xml).find('relationships').find('y').text()
	}
	answerGraph(answer);
	updateGraph(data, answer, relationships);

	$(".submit").click(function()
	{
		data = {}
		
		columns.each(function()
		{
			data[$(this).attr("value")] = [];
		});
		$(".stuff td").each(function()
		{
			var input = $(this).find("input");
			data[input.attr("class")].push(input.val());
		})
		if ($($(".stuff tr:last-child").find("td").find("input").get(0)).val() != "")
		{
			addInput(columns);
		}
		else
		{
			for (var key in data)
			{
				data[key].pop()
			}
		}
		if(updateGraph(data, answer, relationships))
		{
			window.location.href= "win/"
		}
	});
}

function addInput(columns)
{
	$(".stuff").append('<tr></tr>');
	for(var iii = 0; iii < columns.length; iii++)
	{
		$(".stuff tr:last-child").append("<td><input type='text' class='"+ $(columns[iii]).attr("value") +"'></td>");
	}
}

function documentReady(puzzle)
{
	$.ajax(
	{
		type: "GET",
		url: "http://localhost:8000/BadData/puzzle/"+ puzzle +"/xml",
		dataType: "xml",
		success: xmlParser
	}).fail(function()
	{
		alert("Puzzle info failed to load. Does the puzzle you're trying to access exist?");
	});
	$(window).resize(function()
	{
		$(".submit").click();
	});
	$(".origin-graph").hover(function()
	{
		$(".tutorial").text("Get the Variable Graph to look exactly like the Target Graph, including the dots")
	}, function()
	{
		$(".tutorial").text("")
	})
}