// Curried sum function

function sum(a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        }
    }
}
console.log(sum(1)(2)(3));

// A curried function that takes operation and operands as arguments

function calculate(operation) {
    return function (a) {
        return function (b) {
            if (operation === "add") {
                return a + b;
            } else if (operation === "subtract") {
                return a - b;
            } else if (operation === "multiply") {
                return a * b;
            } else if (operation === "divide") {
                return a / b;
            } else {
                throw new Error("Invalid operation")
            }
        }
    }
};

//making reusable functions of the curried function calculate
const mul = calculate("multiply");
const add = calculate("add");
const divide = calculate("divide");
const subtract = calculate("subtract");
console.log(mul(4)(2));
//       or
console.log(calculate("multiply")(4)(2));

// Infinite Currying
function addition(a) {
    return function (b) {
        if (b) return addition(a + b)
        return a;
    }
}

console.log(addition(2)(3)(4)(5)(6)())
//       or
const additionResult = addition(2)(3)(4)(5)(6);
console.log(additionResult());


//Manipulating DOM using currying for reusing purposes
function updateElementText(id) {
    return function (content) {
        document.querySelector("#" + id).textContent = content;
    }
}
const updateHeader = updateElementText("heading");
updateHeader("DOM successfully manipulated using currying. See index.html line no. 12");

//Making a function that converts any function into a curried function.

function curry(func) {
    return function curriedFunction(...args) {
        if (args.length >= func.length) {
            return func(...args)
        } else {
            return function (...nextArgs) {
                return curriedFunction(...args, ...nextArgs)
            }
        }
    }
}

const sumWithoutCurrying = (a, b, c) => a + b + c + 1;

const curriedSum = curry(sumWithoutCurrying);
console.log(curriedSum(1)(2)(3));