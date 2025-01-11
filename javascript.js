// Define math functions
function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

// Test the math functions
// console.log(add(3, 5))
// console.log(subtract(4, 2))
// console.log(subtract(4, 6))
// console.log(multiply(4,5))
// console.log(multiply(-2,4))
// console.log(divide(1, 4))
// console.log(divide(1, 0))

let firstNumber = 0;
let operation = '';
let secondNumber = 0;

function operator(firstNumber, secondNumber, operation) {
    return operation(firstNumber, secondNumber);
};

divObject = {'clear':['CE', 'helper'], 
             'sign':['+/-', 'helper'], 
             'percent':['%', 'helper'],
             'divide':['/', 'operator'], 
             'seven':['7', 'number'], 
             'eight':['8', 'number'], 
             'nine':['9', 'number'], 
             'multiply':['x', 'operator'], 
             'four':['4', 'number'], 
             'five':['5', 'number'], 
             'six':['6', 'number'], 
             'minus':['-', 'operator'], 
             'one':['1', 'number'], 
             'two':['2', 'number'],
             'three':['3', 'number'],
             'plus':['+', 'operator'],
             'zero':['0', 'number'],
             'decimal':['.', 'number'],
             'equal': ['=', 'operator']};
let container = document.querySelector(".button-panel");

for (key in divObject) {
    let calcButton = document.createElement("button");
    calcButton.id = key;
    calcButton.classList.add(divObject[key][1])
    calcButton.textContent = divObject[key][0];
    container.appendChild(calcButton);
};
// console.log(operator(3, 5, add));