$(document).ready(onReady);

function onReady() {
    console.log('jquery is loaded');
    appendDiv();
    $('#submit-button').on('click', handleSubmit);
}

function handleSubmit() {
    let history = {
        value1: $('#value1').val(),
        value2: $('#value2').val(),
        operation: $('#operation').val()
    };
    $ajax({
        type: 'POST',
        url: '/calculate',
        data: history
    }).then(function (response) {
        appendDiv();
    });
}

function appendDiv() {
    console.log('in append div');
}