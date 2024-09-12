body["add"] = function() {
    const nums = [...arguments];

    // Only allow numbers
    if (nums.some(el => typeof el !== "number")) {
        throw new Error(`Runtime error: "add" only supports numbers.`);
    }

    return nums.reduce((a, b) => a + b);
}

body["sub"] = function() {
    const nums = [...arguments];

    // Only allow numbers
    if (nums.some(el => typeof el !== "number")) {
        throw new Error(`Runtime error: "sub" only supports numbers.`);
    }

    return nums.reduce((a, b) => a - b);
}

body["mul"] = function() {
    const nums = [...arguments];

    // Only allow numbers
    if (nums.some(el => typeof el !== "number")) {
        throw new Error(`Runtime error: "mul" only supports numbers.`);
    }

    return nums.reduce((a, b) => a * b);
}

body["div"] = function() {
    const nums = [...arguments];

    // Only allow numbers
    if (nums.some((el, index) => typeof el !== "number" || (index !== 0 && el === 0))) {
        throw new Error(`Runtime error: "div" only supports numbers and does not allow division by zero.`);
    }

    return nums.reduce((a, b) => a / b);
}

body["mod"] = function() {
    const nums = [...arguments];

    // Only allow numbers
    if (nums.some((el, index) => typeof el !== "number" || (index !== 0 && el === 0))) {
        throw new Error(`Runtime error: "mod" only supports numbers and does not allow division by zero.`);
    }

    return nums.reduce((a, b) => a % b);
}

body["pow"] = function() {
    const nums = [...arguments];

    // Only allow numbers
    if (nums.some(el => typeof el !== "number")) {
        throw new Error(`Runtime error: "pow" only supports numbers.`);
    }

    return nums.reduce((a, b) => a ** b);
}

body["bit-and"] = function() {
    const nums = [...arguments];

    // Only allow numbers
    if (nums.some(el => typeof el !== "number")) {
        throw new Error(`Runtime error: "bit-and" only supports numbers.`);
    }

    return nums.reduce((a, b) => a & b);
}

body["bit-or"] = function() {
    const nums = [...arguments];

    // Only allow numbers
    if (nums.some(el => typeof el !== "number")) {
        throw new Error(`Runtime error: "bit-or" only supports numbers.`);
    }

    return nums.reduce((a, b) => a | b);
}

body["bit-xor"] = function() {
    const nums = [...arguments];

    // Only allow numbers
    if (nums.some(el => typeof el !== "number")) {
        throw new Error(`Runtime error: "bit-xor" only supports numbers.`);
    }

    return nums.reduce((a, b) => a ^ b);
}

body["bit-not"] = function(num) {
    // Only allow numbers
    if (typeof num !== "number") {
        throw new Error(`Runtime error: "bit-not" only supports numbers.`);
    }

    return ~num;
}

body["bit-ls"] = function() {
    const nums = [...arguments];

    // Only allow numbers
    if (nums.some(el => typeof el !== "number")) {
        throw new Error(`Runtime error: "bit-ls" only supports numbers.`);
    }

    return nums.reduce((a, b) => a << b);
}

body["bit-rs"] = function() {
    const nums = [...arguments];

    // Only allow numbers
    if (nums.some(el => typeof el !== "number")) {
        throw new Error(`Runtime error: "bit-rs" only supports numbers.`);
    }

    return nums.reduce((a, b) => a >> b);
}

body["bit-urs"] = function() {
    const nums = [...arguments];

    // Only allow numbers
    if (nums.some(el => typeof el !== "number")) {
        throw new Error(`Runtime error: "bit-urs" only supports numbers.`);
    }

    return nums.reduce((a, b) => a >>> b);
}

body["not"] = function(item) {
    // Only allow booleans
    if (typeof item !== "boolean") {
        throw new Error(`Runtime error: "not" only supports booleans.`);
    }

    return !item;
}

body["equ"] = function() {
    const items = [...arguments];

    return items.every(item => item === items[0]);
}

body["neq"] = function() {
    const items = [...arguments];

    return items.some(item => item !== items[0]);
}

body["gtr"] = function() {
    const items = [...arguments];

    // Only allow numbers
    if (items.some(el => typeof el !== "number")) {
        throw new Error(`Runtime error: "gtr" only supports numbers.`);
    }

    return items.every((item, index) => (index === 0 || item < items[index-1]));
}

body["geq"] = function() {
    const items = [...arguments];

    // Only allow numbers
    if (items.some(el => typeof el !== "number")) {
        throw new Error(`Runtime error: "geq" only supports numbers.`);
    }

    return items.every((item, index) => (index === 0 || item <= items[index-1]));
}

body["lss"] = function() {
    const items = [...arguments];

    // Only allow numbers
    if (items.some(el => typeof el !== "number")) {
        throw new Error(`Runtime error: "lss" only supports numbers.`);
    }

    return items.every((item, index) => (index === 0 || item > items[index-1]));
}

body["leq"] = function() {
    const items = [...arguments];

    // Only allow numbers
    if (items.some(el => typeof el !== "number")) {
        throw new Error(`Runtime error: "leq" only supports numbers.`);
    }

    return items.every((item, index) => (index === 0 || item >= items[index-1]));
}

body["round"] = function(num) {
    if (typeof num !== "number") {
        throw new Error(`Runtime error: "round" only supports numbers.`);
    }

    return Math.round(num);
}

body["floor"] = function(num) {
    if (typeof num !== "number") {
        throw new Error(`Runtime error: "floor" only supports numbers.`);
    }

    return Math.floor(num);
}

body["ceil"] = function(num) {
    if (typeof num !== "number") {
        throw new Error(`Runtime error: "ceil" only supports numbers.`);
    }

    return Math.ceil(num);
}

body["abs"] = function(num) {
    if (typeof num !== "number") {
        throw new Error(`Runtime error: "abs" only supports numbers.`);
    }

    return Math.abs(num);
}

body["asin"] = function(num) {
    if (typeof num !== "number") {
        throw new Error(`Runtime error: "asin" only supports numbers.`);
    }

    return Math.asin(num);
}

body["asinh"] = function(num) {
    if (typeof num !== "number") {
        throw new Error(`Runtime error: "asinh" only supports numbers.`);
    }

    return Math.asinh(num);
}

body["acos"] = function(num) {
    if (typeof num !== "number") {
        throw new Error(`Runtime error: "acos" only supports numbers.`);
    }

    return Math.acos(num);
}

body["acosh"] = function(num) {
    if (typeof num !== "number") {
        throw new Error(`Runtime error: "acosh" only supports numbers.`);
    }

    return Math.acosh(num);
}

body["atan"] = function(num) {
    if (typeof num !== "number") {
        throw new Error(`Runtime error: "atan" only supports numbers.`);
    }

    return Math.atan(num);
}

body["atan2"] = function(num) {
    if (typeof num !== "number") {
        throw new Error(`Runtime error: "atan2" only supports numbers.`);
    }

    return Math.atan2(num);
}

body["atanh"] = function(num) {
    if (typeof num !== "number") {
        throw new Error(`Runtime error: "atanh" only supports numbers.`);
    }

    return Math.atanh(num);
}

body["sin"] = function(num) {
    if (typeof num !== "number") {
        throw new Error(`Runtime error: "sin" only supports numbers.`);
    }

    return Math.sin(num);
}

body["sinh"] = function(num) {
    if (typeof num !== "number") {
        throw new Error(`Runtime error: "sinh" only supports numbers.`);
    }

    return Math.sinh(num);
}

body["cos"] = function(num) {
    if (typeof num !== "number") {
        throw new Error(`Runtime error: "cos" only supports numbers.`);
    }

    return Math.cos(num);
}

body["cosh"] = function(num) {
    if (typeof num !== "number") {
        throw new Error(`Runtime error: "cosh" only supports numbers.`);
    }

    return Math.cos(num);
}

body["tan"] = function(num) {
    if (typeof num !== "number") {
        throw new Error(`Runtime error: "tan" only supports numbers.`);
    }

    return Math.tan(num);
}

body["tanh"] = function(num) {
    if (typeof num !== "number") {
        throw new Error(`Runtime error: "tanh" only supports numbers.`);
    }

    return Math.tanh(num);
}

body["num-to-str"] = function(num) {
    if (typeof num !== "number") {
        throw new Error(`Runtime error: "num-to-str" only supports numbers.`);
    }

    return num.toString();
}

body["rand"] = function() {
    return Math.random();
}

body["log"] = function(num) {
    if (typeof num !== "number") {
        throw new Error(`Runtime error: "log" only supports numbers.`);
    }

    return Math.log(num);
}

body["exp"] = function(num) {
    if (typeof num !== "number") {
        throw new Error(`Runtime error: "exp" only supports numbers.`);
    }

    return Math.exp(num);
}
