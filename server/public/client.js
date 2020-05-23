$(document).ready(onReady);

function onReady() {
// load data from the server, put it on the DOM
// On button click, create quote
    $('#submitBtn').on('click', captureNumbers);
    $('#clearBtn').on('click', clearVals);
    
}

// create a number object and push it onto the server 
function captureNumbers() {
    //here I set variables for each of the number input fields on the page
    let numberObj = {
        firstNumber: $('#firstNumber').val(),
        secondNumber: $('#secondNumber').val()
    };
    $.ajax({
        type: "POST", //here we post
        url: "/numbers", //to a 'numbers' dir
        data: { //the data object
            numberObj: numberObj, //with keys of first and second user inputted numbers
        } //end data
    }).then(function () {
        console.log('numberObj POST to server with AJAX');

    });
}// end captureNumbers

function clearVals() {
    $('#firstNumber').val('');
    $('#secondNumber').val('');
}