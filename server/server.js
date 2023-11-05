const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let PORT = process.env.PORT || 5000;

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Global variable that will contain all of the
// calculation objects:
let calculations = [];

// Here's a wonderful place to make some routes:

// GET /calculations
//Create a `GET '/calculations'` route that will send the `calculations` array back to the client.
// app.get()
app.get("/calculations", (req,res) =>{
  res.send(calculations);
})

// POST /calculations
app.post("/calculations",(req,res) => {
  let expression = req.body;
  let equationResult = handleCalculation(expression);
  calculations.push({
    num1: expression.num1,
    num2: expression.num2,
    operator: expression.operator,
    result: equationResult
  });

  res.send(201);
});

function handleCalculation(expression){
  if(expression.operator === "+"){
    return (Number(expression.num1) + Number(expression.num2));
  }
  else if(expression.operator === "-"){
    return (Number(expression.num1) - Number(expression.num2));
  }
  else if(expression.operator === "*"){
    return (Number(expression.num1) * Number(expression.num2));
  }
  else if(expression.operator === "/"){
    return (Number(expression.num1) / Number(expression.num2));
  }
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
