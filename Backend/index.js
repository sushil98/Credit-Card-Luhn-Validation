const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/validate-credit-card', (req, res) => {
  const creditCardNumber = req.body.creditCardNumber.replace(/\s/g, '');
  const isValid = luhnAlgorithmValidation(creditCardNumber);

  res.json({ isValid });
});

function luhnAlgorithmValidation(number) {
  let num = 0;
  let digits = number.length;
  let eql = digits % 2;

  for (let i = 0; i < digits; i++) {
    let digit = parseInt(number.charAt(i));

    if (i % 2 === eql) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    num += digit;
  }

  return num % 10 === 0;
}

app.listen(PORT);
