// function: operate
function operate(operator, initial, value) {
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

// function: add
function addNums(initial, addend) {
    return initial + addend;
}

// function: substract
function substrNums(minuend, subtrahend) {
    return minuend - subtrahend;
}
// function: multiply
function multiplyNums(multiplier, multiplicand) {
    return multiplier * multiplicand;
}

// function: divide
function divideNums(dividend, divisor) {
    return dividend / divisor;
}