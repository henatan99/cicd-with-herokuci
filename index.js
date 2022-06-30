const express = require('express');
const factorial = require('./factorial');

const app = express();

app.get('/', (req, res) => {
    const { host } = req.headers;
    res.status(200).json({
        message: 'Welcome to factorial calculator'
    });
});

app.get('/docs', (req, res) => {
    const { host } = req.headers;
    res.status(200).json({
        message: 'Documentaion',
        request: `http://${host}/factorial/3`,
        response: 'The factorial of 3 is 6'
    });
});

app.get('/factorial/:number', (req, res) => {
    const { number } = req.params;
    if(isNaN(number)) return res.status(400).json({
        message: `'${req.params.number}' is not a number.`
    });
    if (number > 200) return res.status(200).json({
        message: `The factorial of ${number} is Infinity` });
    return res.status(200).json({ 
        message: `The factorial of ${number} is ${factorial(number)}` });  
})

app.get('*', (req, res) => {
    res.status(404).json({
        message: 'Resource not found'
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(
    `Listening on port ${port}`
));