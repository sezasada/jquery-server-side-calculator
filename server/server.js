const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))

const PORT = 5000;

app.use(express.static('server/public'));



app.post('/calculate', (req, res) => {
  let value1 = req.body.value1;
  let value2 = req.body.value2;
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
  res.send(result.toString())
})

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});