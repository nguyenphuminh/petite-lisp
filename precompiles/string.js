body["str-len"] = function(str) {
    if (typeof str !== "string") {
        throw new Error(`Runtime error: "str-len" only supports strings.`);
    }
    
    return str.length;
}

body["str-get"] = function(str, index) {
    if (typeof str !== "string") {
        throw new Error(`Runtime error: "str-get" only supports strings.`);
    }
    
    return str[index] || "";
}
