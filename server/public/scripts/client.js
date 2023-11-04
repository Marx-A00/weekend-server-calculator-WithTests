function onReady(){
    axios({
        url:"/calculations",
        method: "GET"

    }).then((response) =>{
        console.log("response.data",response.data);
        let calcArray = response.data;
        renderCalculations(calcArray);
    })
}
console.log('client.js is sourced!');
let globalOperator;
let num1;
let num2;
//function to handle what happens on submission AKA when the `=` is pressed
function handleSubmit(event){
    // post goes here
    event.preventDefault();
    let calculation = {
        num1:num1,
        num2:num2,
        operator: globalOperator
    }
    console.log(calculation);
    // sending data to server 
    axios({
        method:"POST",
        url:"/calculations",
        data: calculation
    }).then((response) =>{
        console.log("response.data: ",response.data);
        getCalculationsArray();

        let totalCalculation = response.data;

    })

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
        num1 = Number(event.target.value);
    }
    else if(event_id == `num2`){
        num2 = Number(event.target.value);
    }
    console.log(`num1`,num1);
    console.log(`num2:`,num2);

}
function getCalculationsArray(){
    axios({
        url:"/calculations",
        method: "GET"

    }).then((response) =>{
        console.log("response.data",response.data);
        let calcArray = response.data;
        renderCalculations(calcArray);
    })
}
// dont forget to look at get in server
function renderCalculations(calcArray){
    let mostRecent = document.getElementById("mostRecent");
    let history = document.getElementById("history");

    document.getElementById("mostRecent").innerHTML = "";
    document.getElementById("history").innerHTML = "";

        if(calcArray.length == 0){
            mostRecent.innerHTML +=
            `
            <h2>Most Recent Calculation: N/A </h2>
            `
        }
        else if( calcArray.length == 1){
            let mostRecentCalculation = calcArray.pop();
            mostRecent.innerHTML += 
            `
            <h2>${mostRecentCalculation.num1} ${mostRecentCalculation.operator} ${mostRecentCalculation.num2} = ${mostRecentCalculation.result}</h2>
            `
        }
        else
        {
            for(calculationObject of calcArray){
                history.innerHTML+=
                `
                <h2>${calculationObject.num1} ${calculationObject.operator} ${calculationObject.num2} = ${calculationObject.result}</h2>
                `
            }

       }

}

onReady();




// }


// handleSubmit(event)
/* axios stuff with method


*/
// you can have 3 global variables, num1, num2, and operator.

// when you click a button, (+,-,* or /) it sets that global variable to whatever symbol. when you enter a number, it also does that for num 1 and num 2. ONLY when the = button is clicked, the data is actually calculated and sent and whatever. 
// btw this happens in server.js