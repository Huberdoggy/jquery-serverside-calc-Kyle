const express = require('express'); //express requires npm express
const bodyParser = require('body-parser'); //requires npm body-parser
const numbersArray = require('./modules/userNumbers');
const app = express();
const PORT = 5000; //port is 5000
// This must be added before GET & POST routes.
// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('./server/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

//GET AND POST ROUTES GO HERE... ////////
app.post('/numbers', (req, res) => {
    console.log('Now logging out ... req.body', req.body);
    numbersArray.push(req.body);
    res.sendStatus(200);
});








app.listen(PORT, () => {
    console.log('Now listening  on', PORT);
});