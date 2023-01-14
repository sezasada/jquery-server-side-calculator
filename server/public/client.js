$(document).ready(function () {
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
        $.ajax ({
            method: 'POST',
            url: '/calculate',
            data: hand
        }).then(function (response) {
            $("#result").text(response);
        });
    });
    $("#clear").click(function () {
        $("#value1").val("");
        $("#value2").val("");
    });
});