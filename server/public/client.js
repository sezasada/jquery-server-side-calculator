$(document).ready(function () {
    $.get('/history', function (history) {
        history.forEach(function (calculation) {
            $("#history").append("<li>" + calculation.value1 + " " + calculation.operation + " " + calculation.value2 + " = " + calculation.result + "</li>");
        });
    });
    $('form').submit(function (event) {
        event.preventDefault();
        let value1 = $('#value1').val();
        let value2 = $('#value2').val();
        let operation = $('#operation').val();
        let hand = {
            value1: value1,
            value2: value2,
            operation: operation
        };
        $.ajax({
            method: 'POST',
            url: '/calculate',
            data: hand
        }).then(function (response) {
            $("#result").text(response);
            $.get('/history', function (history) {
                $("#history").empty();
                history.forEach(function (calculation) {
                    $("#history").append("<li>" + calculation.value1 + " " + calculation.operation + " " + calculation.value2 + " = " + calculation.result + "</li>");
                });
            });
        });
        $("#clear").click(function () {
            $("#value1").val("");
            $("#value2").val("");
        });
    });
});