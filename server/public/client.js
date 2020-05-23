$(document).ready(onReady);

function onReady() {
// load data from the server, put it on the DOM
// On button click, create quote
    $('#submitBtn').on('click', handleSubmit);
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
        data: numberObj//the data object with keys of first and second user inputted numbers
    //end data
    }).then(function () {
        console.log(numberObj); // I use this log to determine the format of how the heck my number object is packaged on the server. Will help me navigate the key/vals later..
        console.log('numberObjs POST to server with AJAX');

    });
}// end captureNumbers

function getTheNumbers() {
    $.ajax({
        type: 'GET',
        url: '/numbers' // "route", "endpoint"
    }).then(function (arrayResponse) {
        let el = $('#numbersOut');
        el.empty();
        for (let i = 0; i < arrayResponse.length; i++) {
            let el2 = arrayResponse[i];
            el.append(`<li>${el2.firstNumber}, ${el2.secondNumber}</li>`);
        }//end for
    });
    }

function handleSubmit() {
    console.log('Running POST AND GET routes onclick');
    
    captureNumbers();
    getTheNumbers();
}//end handleSubmit


function clearVals() {
    $('#firstNumber').val('');
    $('#secondNumber').val('');
}