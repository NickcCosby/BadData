$(document).ready(function()
{
    update();
    $(".update").click(update);
    $(".submit").click(update);
    $('.xAxisanswer').keypress(function(e){
        // allowed char: 1 , 2 , 3, 4, 5, N, O, A, B, C
        let allow_char = [49,50,51,52,53, 54, 55, 56, 57, 48, 44];
        if(allow_char.indexOf(e.which) !== -1 ){
          return true;
        }
        else{
          return false;
        }
      });
    $('.yAxisanswer').keypress(function(e){
        // allowed char: 1 , 2 , 3, 4, 5, N, O, A, B, C
        var allow_char = [49,50,51,52,53, 54, 55, 56, 57, 48, 44];
        if(allow_char.indexOf(e.which) !== -1 ){
            return true;
        }
        else{
            return false;
        }
    });
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
function submitPuzzle()
{
    update();
    //validate
    var data = {};
    var errors = [];
    for(var iii = 0; iii < $(".columnCount").val() - 1; iii++)
    {
        data[$($(".columnDef th")[iii]).find("input").val()] = [];
        for(var zzz = 0; zzz < $(".rowCount").val() - 1; zzz++)
        {
            data[$($(".columnDef th")[iii]).find("input").val()].push($($($(".stuff tr")[zzz]).find("td")[iii]).find("input").val())
        }
    }
    var relationships = 
    {
        'x':$(".relationshipX").val(),
        'y':$(".relationshipY").val()
    }
    var answer = 
    {
        'x':null,
        'y':null
    }
    if($(".xAxisanswer").val() != "" && $(".yAxisanswer").val() != "")
    {
        var xanswer = $(".xAxisanswer").val().split(",");
        var yanswer = $(".yAxisanswer").val().split(",");
        answer['x'] = xanswer;
        answer['y'] = yanswer;
        for(var iii = 0; iii < xanswer.length; iii++)
        {
            answer['x'][iii] = Number(answer['x'][iii])
            answer['y'][iii] = Number(answer['y'][iii])
        }

        
        
    }
    

    if($(".name").val() == "")
        errors.push("Puzzle needs a name")
    if($(".difficulty").val() == "")
        errors.push("Puzzle needs a difficulty")
    else if(Number($(".difficulty").val()) < 1 || Number($(".difficulty").val() > 11))
        errors.push("Puzzle difficulty must be within 1-10");
    if($(".columnCount").val() == 1)
        errors.push("Puzzle needs columns")
    if($(".rowCount").val() == 1)
        errors.push("Puzzle needs default values")
    if($(".xAxisanswer").val() == "")
        errors.push("Puzzle needs an awnser for the x axis")
    if($(".yAxisanswer").val() == "")
        errors.push("Puzzle needs an awnser for the y axis")
    if($(".relationshipX").val() == "")
        errors.push("Puzzle needs a relationship for the x axis")
    if($(".relationshipY").val() == "")
        errors.push("Puzzle needs a relationship for the y axis")
    if (!(validateJsep(jsep(relationships['x']), data, getProperties()) && validateJsep(jsep(relationships['y']), data, getProperties())))
    {
        errors.push("Cannot parse relationships (illegal statement or non-existant identifier)")
    }
    if(errors.length == 0)
    {
        var tempx = $(".xAxisanswer").val()
        var tempy = $(".yAxisanswer").val()
        $(".xAxisanswer").val("[" + tempx + ']')
        $(".yAxisanswer").val("[" + tempy + ']')
        $("form").submit();
    }
    else
    {
        $(".errors").html("")
        for(var iii = 0; iii < errors.length; iii++)
        {
            $(".errors").append("<p>"+errors[iii]+"</p>")
        }
        return false;
    }
}
function validateJsep(jsepObj, data, properties)
{
    try
    {
        if(jsepObj.type == "BinaryExpression")
        {
            return (validateJsep(jsepObj.right, data, properties) && validateJsep(jsepObj.left, data, properties));
        }
        else if (jsepObj.type == "Identifier")
        {
            if(jsepObj.name in data)
                return true;
            else
                return false;
        }
        else if (jsepObj.type == "MemberExpression")
        {
            if(jsepObj.object.name in data)
            {
                if(jsepObj.property.name in properties)
                    return true;
                else
                    return false;
            }
            else 
                return false;
        }
        else if (jsepObj.type == "Literal")
            return true;
        else
            return false;
    }
    catch(err)
    {
        return false;
    }
}
