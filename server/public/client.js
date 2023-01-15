// script runs when document is fully loaded 
$(document).ready(function () {
    // adding click event listeners to each button and settingn the value to + - * /
    $("#add").click(function () {
        $("#operation").val('+');
    });
    $("#subtract").click(function () {
        $("#operation").val('-');
    });
    $("#multiply").click(function () {
        $("#operation").val('*');
    });
    $("#divide").click(function () {
        $("#operation").val('/');
    });
    // making a GET request to the server to retrieve the history
    $.get('/history', function (history) {
        // the .forEach will execute the function once per item in the history array
        history.forEach(function (event) {
            $("#history").append
            ("<li>"
            + event.value1 + " " + event.operation +
            " " + event.value2 + " = " + event.result +
            "</li>");
        });
    });
    // added a event listener to the form (event.preventDefault) to prevent the submit button from submitting a form and tp
    // prevent the browser from executing the default action of the selected element 
    $('form').submit(function (event) {
        event.preventDefault();
        let value1 = $('#value1').val();
        let value2 = $('#value2').val();
        let operation = $('#operation').val();
        let calculation = {
            value1: value1,
            value2: value2,
            operation: operation
        };
        // making a POST request to the server passing the calculation object
        $.ajax({
            method: 'POST',
            url: '/calculate',
            data: calculation
            // the .then function will accept the response from the server and update the result and history.
        }).then(function (response) {
            $("#result").text(response);
            $.get('/history', function (history) {
                // clears history element
                $("#history").empty();
                // the forEach method will execute the function on each item in the history array
                history.forEach(function (event) {
                    $("#history").append
                    ("<li>"
                    + event.value1 + " " + event.operation +
                    " " + event.value2 + " = " + event.result + 
                    "</li>");
                });
            });
        });
        // clearing the inputs and result element. 
        $("#clear").click(function () {
            $("#value1").val('');
            $("#value2").val('');
            $("#operation").val('');
            $("#result").text('');
        });
    });
});