$(document).ready(function(){
    $("#openInfoProject").click(function(){
        $(".block-student-info").show();
        $("#openInfoProject").hide();
        $("#closeInfoProject").show();
    });

    $("#closeInfoProject").click(function(){
        $(".block-student-info").hide();
        $("#closeInfoProject").hide();
        $("#openInfoProject").show();
    });
});