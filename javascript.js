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
    parsedInput = parseForError(input);
    screenContainer.textContent = parsedInput;

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

function round(num, decimalPlaces = 0) {
    let p = Math.pow(10, decimalPlaces);
    let n = (num * p) * (1 + Number.EPSILON);
    return Math.round(n) / p;
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

function parseForError(screenInput) {
    if (screenInput == Infinity) {
        state = 'error';
        input = 'STOP THAT';
    }
    
    else if (screenInput.includes('-') && !screenInput.includes('.')) {
        if (screenInput.length > 13) {
            state = 'error';
            input = 'OVERFLOW';
        }

        else {
            input = screenInput;
        }
    }

    else if (!screenInput.includes('-') && !screenInput.includes('.')) {
        if (screenInput.length > 12) {
            state = 'error';
            input = 'OVERFLOW';
        }

        else {
            input = screenInput;
        }
    }

    // else if (screenInput.includes('.') && screenInput.includes('-')) {
    //     if (screenInput.length > 13) {

    //     }
    // }

    else {
        input = screenInput;
    }
    return input;
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

        else if (state === 'equal') {
            firstNumber = '';
            firstNumber = parseNumber(firstNumber, selectedNumber.textContent);
            state = 'first'
            writeToScreen(firstNumber);            
        }
        console.log(state)
    }
}

function operatorPress(e) {
    if (e.target && e.target.matches(".operator") && !e.target.matches("#equal")) {
        const selectedOperator = e.target;
        
        if (state === 'first' && firstNumber) {
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
        else if (state === 'equal') {
            state = 'second';
            operation = divObject[selectedOperator.id][2];
        }
        console.log(state)
    }
}

function clearPress(e) {
    if (e.target && e.target.matches("#clear")) {
        resetCalculator();
        clearScreen();
    }
}

function equalPress(e) {
    if (e.target && e.target.matches("#equal")) {
        if (state === 'second' && secondNumber) {
            result = String(operator(Number(firstNumber), Number(secondNumber), operation));
            state = 'equal';
            writeToScreen(result);
            firstNumber = result;
            secondNumber = '';            
        }
        console.log(state)
    }
}

function decimalPress(e) {
    if (e.target && e.target.matches("#decimal")) {
        if (state === 'first' && !firstNumber.includes('.')) {
            firstNumber = parseDecimal(firstNumber);
            writeToScreen(firstNumber);
        }

        else if (state === 'second' && !secondNumber.includes('.')) {
            secondNumber = parseDecimal(secondNumber);
            writeToScreen(secondNumber);
        }

        else if (state === 'equal') {
            firstNumber = '';
            firstNumber = parseDecimal(firstNumber);
            state = 'first';
            writeToScreen(firstNumber);
        }
    }
}

function signPress(e) {
    if (e.target && e.target.matches('#sign')) {
        if (state === 'first' && firstNumber !== '0') {
            firstNumber = String((-1) * Number(firstNumber));
            writeToScreen(firstNumber);
        }

        else if (state === 'second') {
            secondNumber = String((-1) * Number(secondNumber));
            writeToScreen(secondNumber);
        }

        else if (state === 'equal') {
            firstNumber = String((-1) * Number(firstNumber));
            writeToScreen(firstNumber);
        }
        console.log(state)
    }
}

buttonPanelContainer.addEventListener("click", function(e) {
    numberPress(e);
    operatorPress(e);
    equalPress(e);
    clearPress(e);
    decimalPress(e)
    signPress(e);
});

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