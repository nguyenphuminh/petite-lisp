body["print"] = function() {
    console.log(...arguments);

    return 0;
}

body["type"] = function(value) {
    return Array.isArray(value) ? "list" : typeof value;
}
