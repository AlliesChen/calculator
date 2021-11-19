const monitor = document.querySelector('.screen');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const clear_btn = document.getElementById('clear');
const operation = ['0'];

// Show digits that user clicked on the monitor
digits.forEach((element) => {
    element.addEventListener('click', (e) => {
        (operation[0] === '0') ? operation[0] = e.target.textContent : operation[0] += e.target.textContent;
        monitor.textContent = operation[0];
    })
});

operators.forEach((element) => {
    element.addEventListener('click', (e) => {
        if (!operation[1] || operation[1] === '=') {
            operation[1] = e.target.textContent;
            operation[0] = '';
        } else if (operation[1] != '=' && e.target.textContent != '=') {
            operation[1] = e.target.textContent;
            operation[0] = '';
        } else if (e.target.textContent === '=') {
            operation[0] = operation[0] || monitor.textContent;
            monitor.textContent = operate(operation[2], operation[1], operation[0]);
        } else {
            monitor.textContent = operate(operation[2], operation[1], operation[0]);
        }
        operation[2] = monitor.textContent;
    });
});

// Clear the current input
clear_btn.addEventListener('click', () => {
    operation[0] = '0';
})

// function: divide
function divideNums(dividend, divisor) {
    return dividend / divisor;
}

// function: multiply
function multiplyNums(multiplier, multiplicand) {
    return multiplier * multiplicand;
}

// function: substract
function substrNums(minuend, subtrahend) {
    return minuend - subtrahend;
}

// function: add
function addNums(initial, addend) {
    return Number(initial) + Number(addend);
}

// function: operate
function operate(initial, operator, value) {
    switch (operator) {
        case '+':
            return addNums(initial, value);
        case '-':
            return substrNums(initial, value);
        case '*':
            return multiplyNums(initial, value);
        case '/':
            return divideNums(initial, value);
        default:
            return 'Error: issue found on operate'
    }

}