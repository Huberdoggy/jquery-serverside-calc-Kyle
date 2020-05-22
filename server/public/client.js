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
let firstNumber = $('#firstNumber').val();
let secondNumber = $('#secondNumber').val();
}

function clearVals() {
    $('#firstNumber').val('');
    $('#secondNumber').val('');
}