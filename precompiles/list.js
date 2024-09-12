body["list"] = function() {
    return [...arguments];
}

body["list-len"] = function(list) {
    if (!Array.isArray(list)) throw new Error(`Runtime error: "list-len": Argument is not a list.`);
    
    return list.length;
}

body["list-get"] = function(list, index) {
    if (!Array.isArray(list)) throw new Error(`Runtime error: "list-get": Argument is not a list.`);
    if (typeof index !== "number") throw new Error(`Runtime error: "list-get": Index must be a number.`);
    if (typeof list[index] === "undefined") throw new Error(`Runtime error: "list-get": Can not find item in list.`);
    
    return list[index];
}

body["list-slice"] = function(list, start, end) {
    if (!Array.isArray(list)) throw new Error(`Runtime error: "list-slice": Argument is not a list.`);
    if (typeof start !== "undefined" && typeof start !== "number") throw new Error(`Runtime error: "list-slice": Start must be a number.`);
    if (typeof end !== "undefined" && typeof end !== "number") throw new Error(`Runtime error: "list-slice": End must be a number.`);

    return list.slice(start, end);
}

body["list-merge"] = function() {
    const lists = [ ...arguments ];

    // Only allow lists
    if (lists.some(el => !Array.isArray(el))) {
        throw new Error(`Runtime error: "list-merge" only supports list.`);
    }

    return lists.reduce((a, b) => a.concat(b));
}

body["list-with"] = function(list, index, value) {
    if (!Array.isArray(list)) throw new Error(`Runtime error: "list-with": Argument is not a list.`);
    if (typeof index !== "number") throw new Error(`Runtime error: "list-with": Index must be a number.`);

    return list.with(index, value);
}

body["list-reverse"] = function(list) {
    if (!Array.isArray(list)) throw new Error(`Runtime error: "list-with": Argument is not a list.`);

    return list.toReversed();
}

body["list-splice"] = function(list) {
    if (!Array.isArray(list)) throw new Error(`Runtime error: "list-splice": Argument is not a list.`);

    const args = [...arguments];
    const [ start, count ] = args;
    const items = args.slice(2);

    // Start must be a number
    if (typeof start !== "number") {
        throw new Error(`Runtime error: "list-splice": Start must be a number.`);
    }

    // If count exists, it must be a number
    if (count && typeof count !== "number") {
        throw new Error(`Runtime error: "list-splice": Count must be a number.`);
    }

    return list.toSpliced(start, count, ...items);
}

body["list-has"] = function(list, item, start) {
    if (!Array.isArray(list)) throw new Error(`Runtime error: "list-has": Argument is not a list.`);

    // If start exists, it must be a number
    if (typeof start !== "undefined" && typeof start !== "number") {
        throw new Error(`Runtime error: "list-has": Start must be a number.`);
    }

    return list.includes(item, start);
}

body["list-index-of"] = function(list, item, start) {
    if (!Array.isArray(list)) throw new Error(`Runtime error: "list-index-of": Argument is not a list.`);

    // If start exists, it must be a number
    if (typeof start !== "undefined" && typeof start !== "number") {
        throw new Error(`Runtime error: "list-index-of": Start must be a number.`);
    }

    return list.indexOf(item, start);
}

body["list-last-index-of"] = function(list, item, start) {
    if (!Array.isArray(list)) throw new Error(`Runtime error: "list-last-index-of": Argument is not a list.`);

    // If start exists, it must be a number
    if (typeof start !== "undefined" && typeof start !== "number") {
        throw new Error(`Runtime error: "list-last-index-of": Start must be a number.`);
    }

    return list.indexOf(item, start);
}

body["list-join"] = function(list, delim) {
    if (!Array.isArray(list)) throw new Error(`Runtime error: "list-join": Argument is not a list.`);

    // If delim exists, it must be a string
    if (typeof delim !== "undefined" && typeof delim !== "string") {
        throw new Error(`Runtime error: "list-join": Delim must be a string.`);
    }

    return list.join(delim);
}

body["list-copy-within"] = function(list, index, start, end) {
    if (!Array.isArray(list)) throw new Error(`Runtime error: "list-copy-within": Argument is not a list.`);

    // Index must be a number
    if (typeof index !== "number") {
        throw new Error(`Runtime error: "list-copy-within": Index must be a number.`);
    }

    // Start must be a number
    if (typeof start !== "number") {
        throw new Error(`Runtime error: "list-copy-within": Start must be a number.`);
    }

    // If end exists, it must be a number
    if (typeof end !== "undefined" && typeof end !== "number") {
        throw new Error(`Runtime error: "list-copy-within": End must be a number.`);
    }

    return list.copyWithin(start, end);
}

body["list-flat"] = function(list, depth) {
    if (!Array.isArray(list)) throw new Error(`Runtime error: "list-flat": Argument is not a list.`);

    // If depth exists, it must be a number
    if (typeof depth !== "undefined" && typeof depth !== "number") {
        throw new Error(`Runtime error: "list-flat": Depth must be a number.`);
    }

    return list.flat(depth);
}

body["list-every"] = function(list, callback) {
    if (!Array.isArray(list)) throw new Error(`Runtime error: "list-every": Argument is not a list.`);

    // Callback must be a function
    if (typeof callback !== "function") {
        throw new Error(`Runtime error: "list-every": Callback must be a function.`);
    }

    return list.every(callback);
}

body["list-filter"] = function(list, callback) {
    if (!Array.isArray(list)) throw new Error(`Runtime error: "list-filter": Argument is not a list.`);

    // Callback must be a function
    if (typeof callback !== "function") {
        throw new Error(`Runtime error: "list-filter": Callback must be a function.`);
    }

    return list.filter(callback);
}

body["list-some"] = function(list, callback) {
    if (!Array.isArray(list)) throw new Error(`Runtime error: "list-some": Argument is not a list.`);

    // Callback must be a function
    if (typeof callback !== "function") {
        throw new Error(`Runtime error: "list-some": Callback must be a function.`);
    }

    return list.some(callback);
}

body["list-map"] = function(list, callback) {
    if (!Array.isArray(list)) throw new Error(`Runtime error: "list-map": Argument is not a list.`);

    // Callback must be a function
    if (typeof callback !== "function") {
        throw new Error(`Runtime error: "list-map": Callback must be a function.`);
    }

    return list.map(callback);
}

body["list-reduce"] = function(list, callback) {
    if (!Array.isArray(list)) throw new Error(`Runtime error: "list-reduce": Argument is not a list.`);

    // Callback must be a function
    if (typeof callback !== "function") {
        throw new Error(`Runtime error: "list-reduce": Callback must be a function.`);
    }

    return list.reduce(callback);
}

body["list-reduce-right"] = function(list, callback) {
    if (!Array.isArray(list)) throw new Error(`Runtime error: "list-reduce-right": Argument is not a list.`);

    // Callback must be a function
    if (typeof callback !== "function") {
        throw new Error(`Runtime error: "list-reduce-right": Callback must be a function.`);
    }

    return list.reduceRight(callback);
}

body["list-sort"] = function(list, callback) {
    if (!Array.isArray(list)) throw new Error(`Runtime error: "list-sort": Argument is not a list.`);

    // Callback must be a function
    if (typeof callback !== "function") {
        throw new Error(`Runtime error: "list-sort": Callback must be a function.`);
    }

    return list.sort(callback);
}
