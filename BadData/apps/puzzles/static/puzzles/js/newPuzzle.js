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
    if($(".xAxisanswer").val() != "" && $(".yAxisanswer").val() != "")
    {
        var xanswer = $(".xAxisanswer").val().split(",");
        var yanswer = $(".yAxisanswer").val().split(",");
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
            'x':$(".relationshipX").val(),
            'y':$(".relationshipY").val()
        }
        updateGraph(data, answer, relationships);
        answerGraph(answer);
    }
}