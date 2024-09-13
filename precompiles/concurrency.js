body["promise"] = function() {
    const args = [...arguments];

    const callback = args[0];
    const childFunctions = args.slice(1);

    let promise = new Promise((resolve, reject) => {
        // This prevents undefined behavior
        const customResolve = function(value) {
            if (typeof value === "undefined") {
                throw new Error(`Runtime error: "promise": Resolve must have an argument.`);
            }

            resolve(value);
        };

        const customReject = function(value) {
            if (typeof value === "undefined") {
                throw new Error(`Runtime error: "promise": Reject must have an argument.`);
            }

            reject(value);
        };

        callback(customResolve, customReject);
    });

    for (const childFunction of childFunctions) {
        if (typeof childFunction !== "object") {
            throw new Error(`Runtime error: "promise": Invalid then or callback.`);
        }

        if (typeof childFunction.callback !== "function") {
            throw new Error(`Runtime error: "promise": Callbacks of then or catch must be a function.`);
        }
        
        if (childFunction.type === "then") {
            promise = promise.then(childFunction.callback);
        } else if (childFunction.type === "catch") {
            promise = promise.catch(childFunction.callback);
        } else {
            throw new Error(`Runtime error: "promise": Invalid then or callback.`);
        }
    }

    return promise;
}

body["then"] = function(callback) {
    if (typeof callback !== "function") {
        throw new Error(`Runtime error: "then": Callback must be a function.`);
    }

    return {
        type: "then",
        callback
    }
}

body["then-catch"] = function(callback) {
    if (typeof callback !== "function") {
        throw new Error(`Runtime error: "then-catch": Callback must be a function.`);
    }

    return {
        type: "catch",
        callback
    }
}

body["attach-then"] = function(promise, callback) {
    if (!(promise instanceof Promise)) {
        throw new Error(`Runtime error: "attach-then": Argument must be a promise.`);
    }

    if (typeof callback !== "function") {
        throw new Error(`Runtime error: "attach-then": Callback must be a function.`);
    }

    return {
        type: "catch",
        callback
    }
}

body["wait"] = function(callback, time) {
    if (typeof callback !== "function") {
        throw new Error(`Runtime error: "wait": Callback must be a function.`);
    }

    if (typeof time !== "undefined" && typeof time !== "number") {
        throw new Error(`Runtime error: "wait": Time must be a number.`);
    }

    return setTimeout(callback, time);
}
