const express = require('express'); //express requires npm express
const bodyParser = require('body-parser'); //requires npm body-parser
const calculationHistory = [];
const app = express();
const PORT = 5000; //port is 5000

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({
    extended: true
}));
// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));
// initialize id to track the calculation history

let id1; //for calculationHistory

//create a get route for all history for base goal
app.get('/history', (req, res) => {
    res.send(calculationHistory);
});
//Build logic for the calculator
//create a post route for the calculation for base goal
app.post('/calculation', (req, res) => {
    //receive values from the post request made at client side
    let firstNumber = req.body.firstNumber;
    let secondNumber = req.body.secondNumber;
    let operator = req.body.operator;
    let result = 0;
    //do the calculation via switch case syntax
    switch (operator) {
        case '+':
            result = Number(firstNumber) + Number(secondNumber);
            break;
        case '-':
            result = Number(firstNumber) - Number(secondNumber);
            break;
        case '*':
            result = Number(firstNumber) * Number(secondNumber);
            break;
        case '/':
            result = Number(firstNumber) / Number(secondNumber);
            break;
    }
    //Bundle entries into objects with unique IDS...
    let calculated = {
        firstNumber: firstNumber,
        secondNumber: secondNumber,
        operator: operator,
        result: result,
        id: id1
    };
    //counter increment to 'id1' to create a unique id for each entry
    id1 += 1;
    //push to my arr....
    calculationHistory.push(calculated);
    res.send(calculated);
});

//create a DEL route to clear the appended history of calculations
app.delete('/delete', (req, res) => {
    //empty the array
    calculationHistory.splice(0, calculationHistory.length);
    res.sendStatus(201); //201 means req fullfilled and resource modified
});

app.listen(PORT, () => {
    console.log('Now listening  on', PORT);
});