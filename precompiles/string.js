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

    if (typeof str[index] === "undefined") {
        throw new Error(`Runtime error: "str-get": String index out of range.`);
    }
    
    return str[index];
}

body["str-get-code"] = function(str, index) {
    if (typeof str !== "string") {
        throw new Error(`Runtime error: "str-get-code" only supports strings.`);
    }

    const charCode = str.charCodeAt(index);
    
    if (charCode === NaN) {
        throw new Error(`Runtime error: "str-get-code": String index out of range.`);
    }

    return charCode;
}

body["str-merge"] = function() {
    const strings = [...arguments];

    // Only allow strings
    if (strings.some(el => typeof el !== "string")) {
        throw new Error(`Runtime error: "str-merge" only supports strings.`);
    }

    return strings.reduce((a, b) => a + b);
}

body["str-starts-with"] = function(str, child, pos) {
    // Only allow strings
    if (typeof str !== "string" || typeof child !== "string") {
        throw new Error(`Runtime error: "str-starts-with" only supports strings.`);
    }

    // If there is pos, it must be a number
    if (typeof pos !== "undefined" && typeof pos !== "number") {
        throw new Error(`Runtime error: "str-starts-with": pos must be a number.`);
    }

    return str.startsWith(child, pos);
}

body["str-ends-with"] = function(str, child, pos) {
    // Only allow strings
    if (typeof str !== "string" || typeof child !== "string") {
        throw new Error(`Runtime error: "str-ends-with" only supports strings.`);
    }

    // If there is pos, it must be a number
    if (typeof pos !== "undefined" && typeof pos !== "number") {
        throw new Error(`Runtime error: "str-ends-with": pos must be a number.`);
    }

    return str.endsWith(child, pos);
}

body["str-has"] = function(str, child, pos) {
    // Only allow strings
    if (typeof str !== "string" || typeof child !== "string") {
        throw new Error(`Runtime error: "str-has" only supports strings.`);
    }

    // If there is pos, it must be a number
    if (typeof pos !== "undefined" && typeof pos !== "number") {
        throw new Error(`Runtime error: "str-has": pos must be a number.`);
    }

    return str.includes(child, pos);
}

body["str-index-of"] = function(str, child, pos) {
    // Only allow strings
    if (typeof str !== "string" || typeof child !== "string") {
        throw new Error(`Runtime error: "str-index-of" only supports strings.`);
    }

    // If there is pos, it must be a number
    if (typeof pos !== "undefined" && typeof pos !== "number") {
        throw new Error(`Runtime error: "str-index-of": pos must be a number.`);
    }

    return str.indexOf(child, pos);
}

body["str-is-wellformed"] = function(str) {
    // Only allow strings
    if (typeof str !== "string") {
        throw new Error(`Runtime error: "str-is-wellformed" only supports strings.`);
    }

    return str.isWellFormed();
}

body["str-last-index-of"] = function(str, child, pos) {
    // Only allow strings
    if (typeof str !== "string" || typeof child !== "string") {
        throw new Error(`Runtime error: "str-last-index-of" only supports strings.`);
    }

    // If there is pos, it must be a number
    if (typeof pos !== "undefined" && typeof pos !== "number") {
        throw new Error(`Runtime error: "str-last-index-of": pos must be a number.`);
    }

    return str.lastIndexOf(child, pos);
}

body["str-trim"] = function(str) {
    // Only allow strings
    if (typeof str !== "string") {
        throw new Error(`Runtime error: "str-trim" only supports strings.`);
    }

    return str.trim();
}

body["str-trim-start"] = function(str) {
    // Only allow strings
    if (typeof str !== "string") {
        throw new Error(`Runtime error: "str-trim-start" only supports strings.`);
    }

    return str.trimStart();
}

body["str-trim-end"] = function(str) {
    // Only allow strings
    if (typeof str !== "string") {
        throw new Error(`Runtime error: "str-trim-end" only supports strings.`);
    }

    return str.trimEnd();
}

body["str-pad-start"] = function(str, len, child) {
    // Only allow strings
    if (typeof str !== "string") {
        throw new Error(`Runtime error: "str-pad-start" only supports strings.`);
    }

    // If there is len, it must be a number
    if (typeof len !== "undefined" && typeof len !== "number") {
        throw new Error(`Runtime error: "str-pad-start": len must be a number.`);
    }

    // If there is child, it must be a string
    if (typeof child !== "undefined" && typeof child !== "string") {
        throw new Error(`Runtime error: "str-pad-start": child must be a string.`);
    }

    return str.padStart(len, child);
}

body["str-pad-end"] = function(str, len, child) {
    // Only allow strings
    if (typeof str !== "string") {
        throw new Error(`Runtime error: "str-pad-end" only supports strings.`);
    }

    // If there is len, it must be a number
    if (typeof len !== "undefined" && typeof len !== "number") {
        throw new Error(`Runtime error: "str-pad-end": len must be a number.`);
    }

    // If there is child, it must be a string
    if (typeof child !== "undefined" && typeof child !== "string") {
        throw new Error(`Runtime error: "str-pad-end": child must be a string.`);
    }

    return str.padEnd(len, child);
}

body["str-repeat"] = function(str, count) {
    // Only allow strings
    if (typeof str !== "string") {
        throw new Error(`Runtime error: "str-repeat" only supports strings.`);
    }

    // Count must be a number
    if (typeof count !== "number") {
        throw new Error(`Runtime error: "str-repeat": count must be a number.`);
    }

    return str.repeat(count);
}

body["str-replace"] = function(str, toReplace, replaced) {
    // Only allow strings
    if (typeof str !== "string" || typeof toReplace !== "string" || typeof replaced !== "string") {
        throw new Error(`Runtime error: "str-replace" only supports strings.`);
    }

    return str.replace(toReplace, replaced);
}

body["str-replace-all"] = function(str, toReplace, replaced) {
    // Only allow strings
    if (typeof str !== "string" || typeof toReplace !== "string" || typeof replaced !== "string") {
        throw new Error(`Runtime error: "str-replace-all" only supports strings.`);
    }

    return str.replaceAll(toReplace, replaced);
}

body["str-slice"] = function(str, start, end) {
    // Only allow strings
    if (typeof str !== "string") {
        throw new Error(`Runtime error: "str-slice" only supports strings.`);
    }

    // Start, if exists, must be a number
    if (typeof start !== "undefined" && typeof start !== "number") {
        throw new Error(`Runtime error: "str-slice": Start must be a number.`);
    }

    // End, if exists, must be a number
    if (typeof end !== "undefined" && typeof end !== "number") {
        throw new Error(`Runtime error: "str-slice": End must be a number.`);
    }

    return str.slice(start, end);
}

body["str-substring"] = function(str, start, end) {
    // Only allow strings
    if (typeof str !== "string") {
        throw new Error(`Runtime error: "str-substring" only supports strings.`);
    }

    // Start must be a number
    if (typeof start !== "number") {
        throw new Error(`Runtime error: "str-substring": Start must be a number.`);
    }

    // End, if exists, must be a number
    if (typeof end !== "undefined" && typeof end !== "number") {
        throw new Error(`Runtime error: "str-substring": End must be a number.`);
    }

    return str.substring(start, end);
}

body["str-split"] = function(str, delim, limit) {
    // Only allow strings
    if (typeof str !== "string" || typeof delim !== "string") {
        throw new Error(`Runtime error: "str-split" only supports strings.`);
    }

    // If limit exists, it must be a number
    if (typeof limit !== "undefined" && typeof limit !== "number") {
        throw new Error(`Runtime error: "str-split": Limit must be a number.`);
    }

    return str.split(delim, replaced);
}

body["str-upper"] = function(str) {
    // Only allow strings
    if (typeof str !== "string") {
        throw new Error(`Runtime error: "str-upper" only supports strings.`);
    }

    return str.toUpperCase();
}

body["str-lower"] = function(str) {
    // Only allow strings
    if (typeof str !== "string") {
        throw new Error(`Runtime error: "str-lower" only supports strings.`);
    }

    return str.toLowerCase();
}

body["str-wellform"] = function(str) {
    // Only allow strings
    if (typeof str !== "string") {
        throw new Error(`Runtime error: "str-lower" only supports strings.`);
    }

    return str.toWellFormed();
}
