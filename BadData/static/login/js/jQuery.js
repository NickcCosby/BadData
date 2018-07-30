$(document).ready(function () {
    $(".link").click(function(){
        if($(this).attr("href")){
            window.location = $(this).attr("href")
        }
    });
})