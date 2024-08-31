const calculatorScreen = document.getElementById('calculator-screen');
const keys = document.querySelector('.calculator-keys');

let currentInput = '0';
let operator = '';
let previousInput = '';
let shouldResetScreen = false;

keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;

    if (!target.matches('button')) return;

    if (target.classList.contains('operator')) {
        handleOperator(value);
    } else if (target.classList.contains('equal-sign')) {
        handleEquals();
    } else if (target.classList.contains('all-clear')) {
        clearScreen();
    } else if (target.classList.contains('decimal')) {
        inputDecimal();
    } else {
        inputDigit(value);
    }
    updateScreen();
});

function handleOperator(nextOperator) {
    if (operator && !shouldResetScreen) {
        handleEquals();
    }
    operator = nextOperator;
    previousInput = currentInput;
    shouldResetScreen = true;
    updateScreen();
}

function handleEquals() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentInput = String(result);
    operator = '';
    previousInput = '';
    shouldResetScreen = true;
    updateScreen();
}

function inputDigit(digit) {
    if (currentInput === '0' || shouldResetScreen) {
        currentInput = digit;
        shouldResetScreen = false;
    } else {
        currentInput += digit;
    }
}

function inputDecimal() {
    if (shouldResetScreen) {
        currentInput = '0';
        shouldResetScreen = false;
    }

    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function clearScreen() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    shouldResetScreen = false;
    updateScreen();
}

function updateScreen() {
    calculatorScreen.value = currentInput;
    if (operator) {
        calculatorScreen.value = `${previousInput} ${operator} ${shouldResetScreen ? '' : currentInput}`;
    }
}
