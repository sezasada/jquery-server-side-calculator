// importing express from node 
const express = require('express');
// initializing express to be used on the app variable
const app = express();
// not exaclty sure what this does: just know i need it
const bodyParser = require('body-parser');
// not exaclty sure what this does: just know i need it
app.use(bodyParser.urlencoded({ extended: true }))
// determined port
const PORT = process.env.PORT || 8080;
// the files in the public folder are able to be accessed by the client 
app.use(express.static('server/public'));
// created history array to track calculations
let history = [];
// sending the history array to client
app.get('/history', (req, res) => {
  res.send(history)
})
// 
app.post('/calculate', (req, res) => {
  // getting values/operation from the request body
  // parseFloat will parse the value as a string and return a number 
  let value1 = parseFloat(req.body.value1);
  let value2 = parseFloat(req.body.value2);
  let operation = req.body.operation;
  // this will ensure that upon clicking the clear button, NAN/null/undefinded will not be shown.
  // instead, an empty string will be displayed.
  if (!value1 || !value2 || !operation) {
    return res.send('');
  }
  // declaring the result variable with no value
  let result;
  // setting up if statements for performing the calculations 
  if (operation === '+') {
    result = value1 + value2;
  } else if (operation === '-') {
    result = value1 - value2;
  } else if (operation === '*') {
    result = value1 * value2;
  } else if (operation === '/') {
    result = value1 / value2;
  }
  // pushing the values/operation/result to the history array
  history.push({
    value1: value1,
    value2: value2,
    operation: operation,
    result: result
  })
  // sending the result to client 
  // the toString() method will convert the string object into a string.
  res.status(201).send(result.toString())
  // logging the calculations so the can be seen in the terminal. 
  console.log(req.body);
});
// sending the history array to client
app.get('/history', (req, res) => {
  // this is res
  res.status(200).send(history);
});

app.listen(PORT, () => {
  console.log(process.env);
  console.log('listening on port', PORT);
});