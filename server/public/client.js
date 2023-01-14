$(document).ready(onReady);

function onReady() {
    console.log('jquery is loaded');
    appendTable();
    $('#submit-button').on('click', handleSubmit);
}

function handleSubmit() {
    console.log('eknfenf');
    let value1 = $('#value1').val();
    let value2 = $('#value2').val();
    let operation = $('#operation').val();
    let history = {
        value1: value1,
        value2: value2,
        operation: operation
    };
    $ajax({
        type: 'POST',
        url: '/calculate',
        data: history
    }).then(function (response) {
        appendTable();
    });
}

function appendTable() {
    console.log('sdff');
}
function appendTable() {
    console.log('in appendtable');
    $.ajax({
        method: 'GET',
        url: '/get-history'
    }).then(function (response) {
        $('tableOf').empty();
        $('#tableOf').append(`
            <tr>
                <td>${response.value1}</td>
                <td>${response.value2}</td>
                <td>${response.operation}</td>
            </tr>
        `);
    })
}