$(document).ready(function()
{
    update();
    $(".update").click(update);
    $(".submit").click(update);
});

function update()
{
    //update columns
    if($($(".columnDef th:last-child")[0]).find("input").val() != "")
    {
        var columnCount = $(".columnCount");
        columnCount.val(Number(columnCount.val())+1);
        $(".columnDef").append("<th><input type='text' name='column" + columnCount.val() + "'></th>");
        for(var iii = 1; iii <= $(".rowCount").val(); iii++)
        {
            $($(".stuff tr")[iii-1]).append("<td><input type='text' name='column" + columnCount.val() + "row" +iii+ "'></td>")
        }
    }
    //update rows
    if($($(".stuff tr:last-child").find("td")[0]).find("input").val() != "")
    {
        var columnCount = $(".columnCount");
        var rowCount = $(".rowCount");
        $(".stuff").append("<tr></tr>");
        for(var iii = 1; iii <= columnCount.val(); iii++)
        {
            $(".stuff tr:last-child").append("<td><input type='text' name='column" + iii + "row" + rowCount.val()+1 + "'></td>")
        }
        rowCount.val(Number(rowCount.val())+1)
    }
    //update graphs
    data = {};
    for(var iii = 0; iii < $(".columnCount").val() - 1; iii++)
    {
        data[$($(".columnDef th")[iii]).find("input").val()] = [];
        for(var zzz = 0; zzz < $(".rowCount").val() - 1; zzz++)
        {
            data[$($(".columnDef th")[iii]).find("input").val()].push($($($(".stuff tr")[zzz]).find("td")[iii]).find("input").val())
        }
    }
    if($(".xAxisAwnser").val() != "" && $(".yAxisAwnser").val() != "")
    {
        var xAwnser = $(".xAxisAwnser").val().split(",");
        var yAwnser = $(".yAxisAwnser").val().split(",");
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
        var relationships = 
        {
            'x':$(".relationshipX").val(),
            'y':$(".relationshipY").val()
        }
        updateGraph(data, awnser, relationships);
        awnserGraph(awnser);
    }
}