

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
	console.log(data)
	addInput(columns)
	var xAwnser = $(xml).find('x').text().split(",");
	var yAwnser = $(xml).find('y').text().split(",");
	xAwnser[0] = xAwnser[0].substring(1, xAwnser.length);
	xAwnser[xAwnser.length-1] = xAwnser[xAwnser.length-1].substring(0, xAwnser[xAwnser.length-1].length-1);
	yAwnser[0] = yAwnser[0].substring(1, yAwnser.length);
	yAwnser[yAwnser.length-1] = yAwnser[yAwnser.length-1].substring(0, yAwnser[yAwnser.length-1].length-1);
	for(var iii = 0; iii < xAwnser.length; iii++)
	{
		xAwnser[iii] = Number(xAwnser[iii])
		yAwnser[iii] = Number(yAwnser[iii])
	}
	var awnser = 
	{
		'x':xAwnser,
		'y':yAwnser
	}
	awnserGraph(awnser);
	updateGraph(data, awnser);

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
		if(updateGraph(data, awnser))
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
		alert("blah");
	});
}