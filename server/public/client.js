$(document).ready(function () {
    $.get('/history', function (history) {
        history.forEach(function (event) {
            $("#history").append("<li>" + event.value1 + " " + event.operation + " " + event.value2 + " = " + event.result + "</li>");
        });
    });
    $('form').submit(function (event) {
        event.preventDefault();
        let value1 = $('#value1').val();
        let value2 = $('#value2').val();
        let operation = $('#operation').val();
        let objectOf = {
            value1: value1,
            value2: value2,
            operation: operation
        };
        $.ajax({
            method: 'POST',
            url: '/calculate',
            data: objectOf
        }).then(function (response) {
            $("#result").text(response);
            $.get('/history', function (history) {
                $("#history").empty();
                history.forEach(function (event) {
                    $("#history").append("<li>" + event.value1 + " " + event.operation + " " + event.value2 + " = " + event.result + "</li>");
                });
            });
        });
        $("#clear").click(function () {
            $("#value1").val("");
            $("#value2").val("");
        });
    });
});