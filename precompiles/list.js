body["list"] = function() {
    return [...arguments];
}

body["list-get"] = function(list, index) {
    if (!Array.isArray(list)) throw new Error(`Runtime error: Argument is not a list.`);
    if (typeof index !== "number") throw new Error(`Runtime error: Index must be a number.`);
    if (!list[index]) throw new Error(`Runtime error: Can not find item in list.`);
    
    return list[index];
}

body["list-slice"] = function(list, start, end) {
    if (!Array.isArray(list)) throw new Error(`Runtime error: Argument is not a list.`);
    if (start && typeof start !== "number") throw new Error(`Runtime error: Start must be a number.`);
    if (end && typeof end !== "number") throw new Error(`Runtime error: End must be a number.`);

    return list.slice(start, end);
}
