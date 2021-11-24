const monitor = document.querySelector('.screen');
const decimal_btn = document.querySelector('.decimal');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const clear_btn = document.getElementById('clear');
const allClear_btn = document.getElementById('allClear');
const operation = [];

// When user use the digits plate
digits.forEach((element) => {
    element.addEventListener('click', (e) => {
        // When an error came from trying to divide a number by 0
        if (monitor.textContent === 'E') return 10;
        // Check if any operation is on pending or has been completed
        if (operation[0]) {
            operation[2] = operation[0]; // Commit the stored number to an repository
            operation[0] = ''; // Reset the buffer
            monitor.textContent = '0'; // Reset the display
        } else if (operation[1] === '=') { // For a completed operation
            monitor.textContent = '0'; // Reset the display
            operation[1] = ''; // Reset the operator buffer
        }
        // Make the calculator a 12-digit limited
        if (checkInputLength()) return 12;
        // As the screen display 0 in default, Write over it first, and then do concatenation
        (monitor.textContent === '0') ? monitor.textContent = e.target.textContent : monitor.textContent += e.target.textContent;
    })
});

operators.forEach((element) => {
    element.addEventListener('click', (e) => {
        // Store the number showing on the monitor to a buffer
        operation[0] = monitor.textContent;
        // Check if there is a completed operation
        if (operation[1] === '=') {
            operation[1] = ''; // Reset the operator buffer
        }
        // Check if an operation is on pending
        if (operation[2]) {
            operation[2] = operate(operation[2], operation[1], operation[0]);
            monitor.textContent = operation[2]; // Show the result on the display
            operation[2] = ''; // Reset the repository
        }
        // Store an operator to a buffer
        if (e.target.textContent != '=') {
            operation[1] = e.target.textContent;
            operation[0] = monitor.textContent; // Store the result for next operation
        } else {
            operation[1] = '=';
            operation[0] = ''; // Reset the buffer
        }
    });
});

// Button: clear the current input
clear_btn.addEventListener('click', () => {
    monitor.textContent = '0';
})

// Button: clear all the input
allClear_btn.addEventListener('click', () => {
    for (let i = 0; i < 3; i++) {
        operation[i] = '';
    }
    monitor.textContent = '0';
})

// Button: apply floating point to the number
decimal_btn.addEventListener('click', () => {
    if(monitor.textContent.includes('.')) {
        return 0;
    } else {
        monitor.textContent += '.'
        return 1;
    }
});

// **Functions**

// Make the string value 12-digit at most
function checkOutputLength(value) {
    let k = Number(value);
    // Count the length without the negative symbol
    let l = (value.startsWith('-')) ? value.length - 1 : value.length;
    // If the number with a float point
    if (k % 1 != 0 && l > 13) {
        let i = value.slice(0, value.indexOf('.')).length;
        return k.toFixed(12 - i);
    } else if (l > 12) {
        return k.toExponential();
    } else {
        return k;
    }
}

function checkInputLength() {
    // If there isn't an operation on pending
    if (!operation[1]) {
        return (monitor.textContent.includes('.')) ? monitor.textContent.length > 12 : monitor.textContent.length > 11;
    } else if (!operation[0]) { // For the operation that needs the other operand
        return (monitor.textContent.includes('.')) ? monitor.textContent.length > 12 : monitor.textContent.length > 11;
    }
}

function calcFloat(value1, value2, operator) {
    let prec = Math.max(value1.slice(value1.indexOf('.')).length, value2.slice(value2.indexOf('.')).length) - 1;
    value1 *= Math.pow(10, prec);
    value2 *= Math.pow(10, prec);
    if (operator === '/') {
        return operate(`${value1}`, operator, `${value2}`);
    } else {
        return operate(`${value1}`, operator, `${value2}`) / Math.pow(10, prec);
    }
}

// function: divide
function divideNums(dividend, divisor, operator) {
    if (divisor == 0) {
        // Divide by 0 is undifined')
        return 'E';
    } else if (dividend.includes('.') || divisor.includes('.')) {
        return calcFloat(dividend, divisor, operator);
    } else {
        let num = dividend / divisor;
        let n = num.toFixed(11);
        while (n.endsWith(0)) {
            n = n.slice(0, -1);
        }
        return checkOutputLength(n);
    }
}

// function: multiply
function multiplyNums(multiplier, multiplicand) {
    let n = multiplier * multiplicand;
    return checkOutputLength(n.toString());
}

// function: substract
function substrNums(minuend, subtrahend, operator) {
    if (minuend.includes('.') || subtrahend.includes('.')) return calcFloat(minuend, subtrahend, operator);
    let k = minuend - subtrahend; 
    return checkOutputLength(k.toString());
}

// function: add
function addNums(initial, addend, operator) {
    if (initial.includes('.') || addend.includes('.')) return calcFloat(initial, addend, operator);
    let k = Number(initial) + Number(addend);
    return checkOutputLength(k.toString());
}

// function: operate
function operate(initial, operator, value) {
    switch (operator) {
        case '+':
            return addNums(initial, value, operator);
        case '-':
            return substrNums(initial, value, operator);
        case '*':
            return multiplyNums(initial, value);
        case '/':
            return divideNums(initial, value, operator);
        default:
            return '01'
    }

}