body["field"] = function(key, value) {
    if (typeof key !== "string" && typeof key !== "number") {
        throw new Error(`Runtime error: "field": Key must be a string or a number.`);
    }

    return [ key, value ];
}

body["record"] = function() {
    const fields = [...arguments];

    // All fields must be an array with length 2, key must be string or number
    if (
        fields.some(field => (
            !Array.isArray(field) ||
            field.length !== 2 ||
            (typeof field[0] !== "number" && typeof field[0] !== "string")
        ))
    ) {
        throw new Error(`Runtime error: "record": A field is invalid.`);
    }

    const record = {};

    for (const field of fields) {
        record[field[0]] = field[1];
    }

    return record;
}

body["record-get"] = function(record, key) {
    if (typeof record !== "object") {
        throw new Error(`Runtime error: "record-get": Argument must be a record.`);
    }

    if (typeof key !== "string" && typeof key !== "number") {
        throw new Error(`Runtime error: "record-get": Key must be a string or a number.`);
    }

    if (typeof record[key] === "undefined") {
        throw new Error(`Runtime error: "record-get": Can not find item with specified key.`);
    }

    return record[key];
}

body["record-set"] = function(record, key, value) {
    if (typeof record !== "object") {
        throw new Error(`Runtime error: "record-set": Argument must be a record.`);
    }

    if (typeof key !== "string" && typeof key !== "number") {
        throw new Error(`Runtime error: "record-set": Key must be a string or a number.`);
    }

    const newRecord = { ...record };
    newRecord[key] = value;

    return newRecord;
}

body["record-del"] = function(record, key) {
    if (typeof record !== "object") {
        throw new Error(`Runtime error: "record-del": Argument must be a record.`);
    }

    if (typeof key !== "string" && typeof key !== "number") {
        throw new Error(`Runtime error: "record-del": Key must be a string or a number.`);
    }

    const newRecord = { ...record };
    delete newRecord[key];

    return newRecord;
}

body["record-has"] = function(record, key) {
    if (typeof record !== "object") {
        throw new Error(`Runtime error: "record-has": Argument must be a record.`);
    }

    if (typeof key !== "string" && typeof key !== "number") {
        throw new Error(`Runtime error: "record-has": Key must be a string or a number.`);
    }

    return typeof record[key] !== "undefined";
}

body["record-keys"] = function(record) {
    if (typeof record !== "object") {
        throw new Error(`Runtime error: "record-keys": Argument must be a record.`);
    }

    return Object.keys(record);
}

body["record-values"] = function(record) {
    if (typeof record !== "object") {
        throw new Error(`Runtime error: "record-values": Argument must be a record.`);
    }

    return Object.values(record);
}

body["record-fields"] = function(record) {
    if (typeof record !== "object") {
        throw new Error(`Runtime error: "record-fields": Argument must be a record.`);
    }

    return Object.entries(record);
}

body["record-to-json"] = function(record) {
    if (typeof record !== "object") {
        throw new Error(`Runtime error: "record-to-json": Argument must be a record.`);
    }

    return JSON.stringify(record);
}

body["record-from-json"] = function(str) {
    if (typeof str !== "string") {
        throw new Error(`Runtime error: "record-from-json": Argument must be a string.`);
    }

    return JSON.parse(record);
}
