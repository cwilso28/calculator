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

let firstNumber = '0';
let state = 'first';
let operation;
let secondNumber = '';
let buttonPanelContainer = document.querySelector(".button-panel");
let screenContainer = document.querySelector("#screen");

function operator(firstNumber, secondNumber, operation) {
    return operation(firstNumber, secondNumber);
};

divObject = {'clear':['CE', 'helper'], 
             'sign':['+/-', 'helper'], 
             'percent':['%', 'helper'],
             'divide':['/', 'operator', divide], 
             'seven':['7', 'number'], 
             'eight':['8', 'number'], 
             'nine':['9', 'number'], 
             'multiply':['x', 'operator', multiply], 
             'four':['4', 'number'], 
             'five':['5', 'number'], 
             'six':['6', 'number'], 
             'minus':['-', 'operator', subtract], 
             'one':['1', 'number'], 
             'two':['2', 'number'],
             'three':['3', 'number'],
             'plus':['+', 'operator', add],
             'zero':['0', 'number'],
             'decimal':['.', 'number'],
             'equal': ['=', 'operator']};



for (key in divObject) {
    let calcButton = document.createElement("button");
    calcButton.id = key;
    calcButton.classList.add(divObject[key][1])
    calcButton.textContent = divObject[key][0];
    buttonPanelContainer.appendChild(calcButton);
};
// console.log(operator(3, 5, add));

// Console display functions


function writeToScreen(input) {
    screenContainer.textContent = input;
    // if (screenContainer.textContent === '0') {
    //     if (input === '.') {
    //         screenContainer.textContent += input;
    //     }

    //     else {
    //         screenContainer.textContent = '';
    //         screenContainer.textContent = input;
    //     }
    // }

    // else if (input === '.' && screenContainer.textContent.includes('.')) {
    //     screenContainer.textContent += '';
    // }

    // else if (screenContainer.textContent.length >= 12) {
    //     screenContainer.textContent += '';
    // }

    // else {
    //     screenContainer.textContent += input;
    // }
}

function parseNumber(storageNumber, inputNumber) {
    if (storageNumber === '0') {
        storageNumber = inputNumber;
    }

    else if (storageNumber.length >= 12) {
        storageNumber += '';
    }

    else {
        storageNumber += inputNumber;
    }
    return storageNumber;
}

function parseDecimal(storageNumber) {
    if (storageNumber === '0') {
        storageNumber += '.';
    }
    
    else if (storageNumber === '') {
        storageNumber = '0.';
    }

    else {
        storageNumber += '.';
    };
    return storageNumber;
}

function clearScreen() {
    writeToScreen(firstNumber);
}

function resetCalculator() {
    firstNumber = '0';
    operation = '';
    secondNumber = '';
    state = 'first';
}

clearScreen();

function numberPress(e) {
    if (e.target && e.target.matches(".number") && !e.target.matches("#decimal")) {
        const selectedNumber = e.target;
        if (state === 'first') {
            firstNumber = parseNumber(firstNumber, selectedNumber.textContent);
            writeToScreen(firstNumber);
        }

        else if (state === 'second') {
            secondNumber = parseNumber(secondNumber, selectedNumber.textContent);
            writeToScreen(secondNumber);
        }
        console.log(state)
    }
}

function operatorPress(e) {
    if (e.target && e.target.matches(".operator") && !e.target.matches("#equal")) {
        const selectedOperator = e.target;
        
        if (state === 'first') {
            operation = divObject[selectedOperator.id][2];
            state = 'second';
        }

        else if (state === 'second' && secondNumber) {
            result = String(operator(Number(firstNumber), Number(secondNumber), operation));
            writeToScreen(result);
            firstNumber = result;
            secondNumber = '';
            operation = divObject[selectedOperator.id][2];
            // state = 'first';
        }
    }
}

function clearPress(e) {
    if (e.target && e.target.matches("#clear")) {
        resetCalculator();
        clearScreen();
    }
}

buttonPanelContainer.addEventListener("click", numberPress)
buttonPanelContainer.addEventListener("click", operatorPress)
buttonPanelContainer.addEventListener("click", clearPress)

// buttonPanelContainer.addEventListener("click", function(e) {
//     if (e.target && e.target.matches(".number")) {
//         const selectedNumber = e.target;
//         if (firstNumber && operation && !secondNumber) {
//             screenContainer.textContent = '';
//         }
//         writeToScreen(selectedNumber.textContent)

//         if (!firstNumber || !operation) {
//             firstNumber = Number(screenContainer.textContent);
//         }

//         else {
//             secondNumber = Number(screenContainer.textContent);
//         }
//     }

//     if (e.target && e.target.matches("#clear")) {
//         resetCalculator();
//         clearScreen();
//     }

//     if (e.target && e.target.matches(".operator") && !e.target.matches("#equal")) {
        
//         if (operation && secondNumber) {
//             result = String(operator(firstNumber, secondNumber, operation));
//             screenContainer.textContent = result;
//             firstNumber = Number(result);
//             secondNumber = '';
//         }
//         else {
//             operation = divObject[e.target.id][2];
//         }



//     }

//     if (e.target && e.target.matches("#equal")) {
//         if (operation && secondNumber) {
//             result = String(operator(firstNumber, secondNumber, operation));
//             screenContainer.textContent = result;
//             firstNumber = Number(result);
//             secondNumber = '';
//         }
//     }
// })