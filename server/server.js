const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Global variable that will contain all of the
// calculation objects:
let calculations = [];
// an object containing num1,num2, and operation




// Here's a wonderful place to make some routes:

// GET /calculations


// POST /calculations
app.post("/calculation",(req,res) => {

  let calculation = req.body;
  console.log(calculation);
  calculations.push(calculation);

  let handledCalculation = handleCalculation(calculation);
  // actual calculation
  res.send(calculation);
  console.log(handledCalculation);
});
// sumthing happening here with the empty shit

function handleCalculation(){
  let currentCalculation = calculations.pop;
  // may have 2 parse here
  (currentCalculation.num1 + currentCalculation.operator + currentCalculation.num2);
}


// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT,() => {
  console.log(`server running on: http://localhost:${PORT}`);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
