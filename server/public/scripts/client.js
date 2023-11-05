// function for instructions on start up, makes a preliminarly
// get call to get any calculations from the server
function onReady(){
    axios({
        url:"/calculations",
        method: "GET"
    }).then((response) =>{
        let calcArray = response.data;
        renderCalculations(calcArray);
    })
}
// global variables set from input, meant to be sent to server for storage/calculation
let globalOperator;
let num1;
let num2;

//function to handle what happens on submission AKA when the `=` is pressed
function handleSubmit(event){
    event.preventDefault();
    let calculation = {
        num1:num1,
        num2:num2,
        operator: globalOperator
    }
    // sending data to server for storage/calculation
    axios({
        method:"POST",
        url:"/calculations",
        data: calculation
    }).then((response) =>{
        getCalculationsArray();
    })
}
// function made to parse the operator input, and set the global operator variable
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
}
// function meant to handle the numbers input into the calculator, sets the global variable
// for num1 and num2 
function handleNumbers(event){
    let event_id = event.target.getAttribute("id");
    if(event_id == `num1`){
        num1 = event.target.value;
    }
    else if(event_id == `num2`){
        num2 = event.target.value;
    }
}

function getCalculationsArray(){
    axios({
        url:"/calculations",
        method: "GET"

    }).then((response) =>{
        let calcArray = response.data;
        renderCalculations(calcArray);
    })
}
function reset(){
    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";

    num1 = 0;
    num2 = 0;
    globalOperator = "";
}

function handleCalcGridPress(event){
    // if num1 is already set then set the second number
    if (num1 == undefined || num1 == 0){
    num1 = Number(event.target.textContent);
    document.getElementById("num1").value = `${num1}`;
    }
    else{
        num2 = Number(event.target.textContent);
        document.getElementById("num2").value = `${num2}`;
    }
}

function renderCalculations(calcArray){
    let mostRecent = document.getElementById("mostRecent");
    let history = document.getElementById("history");

    document.getElementById("mostRecent").innerHTML = "";
    document.getElementById("history").innerHTML = "";

    let mostRecentCalculation = calcArray[calcArray.length -1];
    mostRecent.innerHTML+=
    `
    <h2>${mostRecentCalculation.result}</h2>

    `
    for(let i=0; i< calcArray.length;i++){
    
        history.innerHTML +=
        `
        <h1>${calcArray[i].num1} ${calcArray[i].operator} ${calcArray[i].num2} = ${calcArray[i].result}</h1>
        `
    }

}

onReady();

