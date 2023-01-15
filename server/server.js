const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))

const PORT = 5000;

app.use(express.static('server/public'));

let history = [];

app.get('/history', (req, res) => {
  res.send(history)
})

app.post('/calculate', (req, res) => {
  let value1 = parseFloat(req.body.value1);
  let value2 = parseFloat(req.body.value2);
  let operation = req.body.operation;
  let result;
  if (operation === 'add') {
    result = value1 + value2;
  } else if (operation === 'subtract') {
    result = value1 - value2;
  } else if (operation === 'multiply') {
    result = value1 * value2;
  } else if (operation === 'divide') {
    result = value1 / value2;
  }
  history.push({ 
    value1: value1, 
    value2: value2, 
    operation: operation,
    result: result 
})
  res.send(result.toString())
})

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});