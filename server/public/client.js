$(document).ready(onReady);

let operator = '';

function onReady() {
//display calc history at each browser refresh
displayHistory();
//add click event listener to the operator keys to get the calculation operator using 'this' html() method
    $('.operatorButton').on('click', function () {
        operator = $(this).html();
        //change color when clicked
        $(this).css('background-color', 'rgb(255, 0, 162)');
        
    });
//add click event listener to the submit button to get input fields value 
//and do the calculation
$('#submitBtn').on('click', caputureNumbersAndCalc);
//add click event listener to the clear button to clear the input fields
$('#clearBtn').on('click', clearVals);
//add click event listener to the clear history button to clear history
$('#clearHistory').on('click', clearHistory);
 
}
//////////////

function displayHistory() {
    $.ajax({
        //link GET route with /history from my server
        method: 'GET',
        url: "/history"
    }).then(function (response) {
        //clear the existing content in browser => avoid duplication
        $('#calcHistory').empty();
        //loop through the response array and append items
        response.forEach(element => {
            let itemToAppend = $(`
                <li>${element.firstNumber} ${element.operator} ${element.secondNumber} = ${element.result}</li>
                `);
            $('#calcHistory').append(itemToAppend);
        });
    });
}// end of displayHistory


//function to grab user input values and calc
function caputureNumbersAndCalc() {
    //get value from number input fields
    let firstNumber = $('#firstNumber').val();
    let secondNumber = $('#secondNumber').val();
    let calculated = {
        firstNumber: firstNumber,
        secondNumber: secondNumber,
        operator: operator
    };

    //reset the operator to default appearance...
    operator = '';
    $('.operatorButton').css('background-color', 'aquamarine');

    $.ajax({
        //hit the post route at /calculation from server side
        //where the calculation will be done and new obj will be pushed to array
        method: 'POST',
        url: "/calculation",
        data: calculated
    }).then(function (response) {
        //receive calculation result from the response object from server side
        let result = response.result;
        //display result ---> append it to my h2
        $('#appendageResults').prepend(`<h2>${result}</h2>`);
        //run displayHistory
        displayHistory();
    });
}//end of caputureNumbersAndCalc

//Clear the inputs on click of 'C' button...
function clearVals() {
    $('#firstNumber').val('');
    $('#secondNumber').val('');
    
}

//function to clear history
function clearHistory() {
    $.ajax({
        //DEL route over on the server
        method: 'DELETE',
        url: "/delete"
    }).then(() => {
        //refresh to empty the history
        displayHistory();
        $('#appendageResults').empty();
        $('#firstNumber').val('');
        $('#secondNumber').val('');
        
    });
} //end of clearHistory