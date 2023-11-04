console.log('client.js is sourced!');
let globalOperator;
let num1;
let num2;
//function to handle what happens on submission AKA when the `=` is pressed
function handleSubmit(event){
    // post goes here
    event.preventDefault();
    console.log("Joe Momma");
    let calculation = {
        num1:num1,
        num2:num2,
        operator: globalOperator
    }
    console.log(calculation);

}

function HandleOperator(event){
    event.preventDefault();
    if(event.target.textContent == `+`){
        globalOperator = `+`
    }
    else if(event.target.textContent == `-`){
        globalOperator = `-`;
    }
    else if(event.target.textContent == `*`){
        globalOperator = `*`;
    }
    else if(event.target.textContent == `/`){
        globalOperator = `/`;
    }        
    console.log(globalOperator);
}
function handleNumbers(event){
    let event_id = event.target.getAttribute("id");
    if(event_id == `num1`){
        num1 = event.target.value;
    }
    else if(event_id == `num2`){
        num2 = event.target.value;
    }
    console.log(`num1`,num1);
    console.log(`num2:`,num2);

}



// }


// handleSubmit(event)
/* axios stuff with method


*/
// you can have 3 global variables, num1, num2, and operator.

// when you click a button, (+,-,* or /) it sets that global variable to whatever symbol. when you enter a number, it also does that for num 1 and num 2. ONLY when the = button is clicked, the data is actually calculated and sent and whatever. 
// btw this happens in server.js