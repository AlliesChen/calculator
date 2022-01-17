const monitor = document.querySelector('.screen');
const decimal_btn = document.querySelector('.decimal');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const commands = document.querySelectorAll('.command');
const operation = [];

// Button: digits, key in numbers
digits.forEach((element) => {
    element.addEventListener('click', (e) => {
        touchDegits(e.target.textContent);
        return 1;
    })
});

// Button: operators, do the math
operators.forEach((element) => {
    element.addEventListener('click', (e) => {
        touchOperators(e.target.textContent);
        return 1;
    });
});

commands.forEach((element) => {
    element.addEventListener('click', (e) => {
        switch (e.target.textContent) {
            case 'Backspace':
                popDegit();
                break;
            case 'Escape':
                clearAll();
                break;
            case String(e.target.textContent.match(/[cC]/)):
                monitor.textContent = '0';
                break;
            default:
                return 0;
        }
    });
});

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case String(e.key.match(/[0-9]/)):
            touchDegits(e.key);
            break;
        case String(e.key.match(/[\\+\\-\\*\\/\\=]/)):
            touchOperators(e.key);
            break;
        case '.':
            addDecimal();
            break;
        case 'Backspace':
            popDegit();
            break;
        case 'Escape':
            clearAll();
            break;
        case String(e.target.textContent.match(/[cC]/)):
            monitor.textContent = '0';
            break;
        default:
            return 0;
    }
});

// Button: apply floating point to the number
decimal_btn.addEventListener('click', () => {
    addDecimal();
    return 1;
});

// **Functions**

function clearAll() {
    for (let i = 0; i < 3; i++) {
        operation[i] = '';
    }
    setOperatorStyle();
    monitor.textContent = '0';
    return 1;
}

function popDegit() {
    let arr = monitor.textContent.split('');
    if(monitor.textContent != '0') {
        arr.pop();
        // If nothing remaied or the negative symbol is the only one remained
        while(!arr.length || (arr.length === 1 && arr[0] === '-')) {
            arr[0] = '0';
        }
        monitor.textContent = arr.join('');
        return 1;
    } else {
        monitor.textContent = '0';
        return 2;
    }
}

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
        let o = Math.min(k, Number.MAX_SAFE_INTEGER).toExponential();
        return (o.length > 14) ? 'OVERFLOW' : o;
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

function addDecimal() {
    if(monitor.textContent.includes('.')) {
        return 0;
    } else {
        monitor.textContent += '.'
        return 1;
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

// Highlight the operator button in an ongoing operation
function setOperatorStyle(operator) {
    for (let value of operators.values()) {
        if (value.getAttribute('style')) {
            value.removeAttribute('style');
            return 2;
        } else if (value.textContent === operator) {
            value.setAttribute('style', 'color: #fff; background: #F07167');
            return 1;
        }
    }
    return 0;
}

function touchOperators(key) {
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
        setOperatorStyle(operation[1]);
        // operators[1].removeAttribute('style');
    }
    // Store an operator to a buffer
    if (key != '=') {
        operation[1] = key;
        setOperatorStyle(operation[1]);
        operation[0] = monitor.textContent; // Store the result for next operation
    } else {
        operation[1] = '=';
        operation[0] = ''; // Reset the buffer
        return 1;
    }    
}

function touchDegits(key) {
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
    (monitor.textContent === '0') ? monitor.textContent = key : monitor.textContent += key;
    return 1;
}