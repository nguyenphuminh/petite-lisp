import definition from "./precompiles/definition";

export const IDEN_CHARACTERS = "0123456789abcdefghijklmnopqrstuvwxyz-._";
export const NUMERALS = "0123456789";

export interface Token {
    type: "punc" | "string" | "number" | "boolean" | "identifier";
    value: string;
    line: number;
    col: number;
}

export interface Body {
    type: "define" | "call" | "value" | "if" | "logic" | "empty";
    name?: string;
    args?: string[];
    expressions?: Body[];
    dataType?: "string" | "number" | "identifier" | "function" | "boolean";
}

export type AST = Body[];

export class Compiler {
    tokenize(input: string): Token[] {
        input = input.replaceAll("\r", "");
        const tokens: Token[] = [];

        // Stores identifier or string values
        let temp = "";

        // A flag used to record string tokens
        let isString = false;
        // A flag used to record comments
        let isComment = false;
        // A flag used to record numbers
        let isNumber = false;
        // Variable to record current line num, used for errors
        let currentLine = 1;

        for (let pointer = 0; pointer < input.length; pointer++) {
            const prevChar = input[pointer-1];
            const char = input[pointer];
            const nextChar = input[pointer+1];

            // New line
            if (char === "\n") {
                currentLine++;

                // For strings, this is an error
                if (isString) {
                    throw new Error(`Compile time error: Unexpected line break at line ${currentLine}.`);
                }
                // Comments are handled down below
            }

            // Handle comments
            if (isComment) {
                // If current char is a new line, we will reset the flag
                if (char === "\n") {
                    isComment = false;
                }

                // Or else just keep skipping characters
                continue;
            }

            // Handle strings
            if (isString) {
                // If current char is a quotation mark and the previous char is not a \, the string is complete
                if (char === "\"" && prevChar !== "\\") {
                    // Reset flag
                    isString = false;
                    // Push token
                    tokens.push({
                        type: "string",
                        value: temp,
                        line: currentLine,
                        col: pointer+1
                    });
                    // Reset temp value
                    temp = "";
                }
                // Or else we will push into temp
                else {
                    temp += char;
                }

                continue;
            }

            switch (char) {
                // Comments
                case ";":
                    isComment = true;

                    break;

                // Punctuations
                case "(":
                case ")":
                    {
                        tokens.push({
                            type: "punc",
                            value: char,
                            line: currentLine,
                            col: pointer+1
                        });

                        break;
                    }

                // Strings
                case "\"":
                    {
                        isString = true;

                        break;
                    }

                // Identifiers
                case " ":
                case "\n":
                    break;

                default:
                    if (IDEN_CHARACTERS.includes(char.toLowerCase())) {
                        // If first char of token is a number, then it is a number
                        if (temp === "" && NUMERALS.includes(char)) {
                            isNumber = true;
                        }

                        // If token is a number
                        if (isNumber) {
                            // If token is a float, there should be a dot and a numeral character next
                            if (char === "." && NUMERALS.includes(nextChar)) {}
                            // If token is a integer, there should only be numeral characters
                            else if (!NUMERALS.includes(char)) {
                                throw new Error(`Compile time error: Unexpected character at line ${currentLine}: "${char}".`);
                            }                           
                        } else {
                            // Dots are not allowed in anything not a number
                            if (char === ".")
                                throw new Error(`Compile time error: Unexpected character at line ${currentLine}: "${char}".`);
                        }

                        temp += char;

                        // Check if next character is a whitespace, new line, or closing parentheses
                        // If not, we will stop recording this identifier immediately
                        if (
                            nextChar === " "  ||
                            nextChar === "\n" ||
                            nextChar === ")"  ||
                            nextChar === "\t"
                        ) {
                            // Push token
                            tokens.push({
                                type: (isNumber ? "number" : (temp === "true" || temp === "false" ? "boolean" : "identifier")),
                                value: temp,
                                line: currentLine,
                                col: pointer+1
                            });
                            // Reset temp value
                            temp = "";
                            // Reset flags
                            isNumber = false;
                        }
                    } else {
                        console.log(isString, char, prevChar, nextChar)

                        throw new Error(`Compile time error: Unexpected character at line ${currentLine}: "${char}".`);
                    }
            }
        }

        // If there is no closing quotation mark, throw en error
        if (isString) throw new Error(`Compile time error: No ending quotation mark.`);

        return tokens;
    }

    parse(tokens: Token[], alreadyDefined: Record<string, boolean> = definition): AST {
        const ast: AST = [];
        
        // Used to check which function is defined
        let defined: Record<string, boolean> = { ...alreadyDefined };
        // Used to get the legal number of arguments for a function
        let argCounts: Record<string, number> = {};
        let bodies: Body[] = [];
        let pointer = 0;

        for (let count = 0; count < tokens.length; count++) {
            const token = tokens[count];

            if (!bodies[pointer]) {
                if (
                    token.type === "number"     ||
                    token.type === "string"     ||
                    token.type === "boolean"    ||
                    token.type === "identifier"
                ) {
                    const body: Body = {
                        type: "value",
                        dataType: (defined[token.value] && token.type === "identifier") ? "function" : token.type,
                        name: token.value
                    };

                    // If top node, push to the AST directly
                    if (pointer === 0) {
                        ast.push(body);
                    }
                    // Can not have an independent value except in top node (aka after a paren)
                    else {
                        throw new Error(`Compile time error: Can not have value after paren at line ${token.line}.`);
                    }
                } else if (token.type === "punc" && token.value === "(") {
                    bodies[pointer] = { type: "empty" }
                } else {
                    throw new Error(`Compile time error: Expression or value expected at line ${token.line}.`);
                }
            } else {
                if (token.type === "punc" && token.value === "(") {
                    // Must have a body to increase the depth
                    if (bodies[pointer].type === "empty" || bodies[pointer].type === "value") {
                        throw new Error(`Compile time error: An expression is empty at line ${token.line}.`);
                    }

                    pointer++;
                    bodies[pointer] = { type: "empty" }
                } else if (token.type === "punc" && token.value === ")") {
                    // Choose what to do based on parent

                    // If no parents, this node is independent and pushable to the AST
                    if (pointer === 0) {
                        ast.push(bodies[pointer]);
                    } else {
                        const parent = bodies[pointer-1];
                        const self = bodies[pointer];

                        // If parent is "if", it shall have only 3 expressions
                        if (parent.type === "if" && parent.expressions?.length === 3) {
                            throw new Error(`Compile time error: "if" shall only have 3 arguments at line ${token.line}.`);
                        }

                        // If self is a function call, the exp amount shall be equal to function's arg amount
                        let realCount = argCounts[self.name || ""];
                        let selfCount = self.expressions?.length

                        if (
                            self.type === "call" &&
                            typeof realCount !== "undefined" &&
                            realCount !== selfCount
                        ) {
                            throw new Error(`Compile time error: Only had ${selfCount} arguments, expected ${realCount} at line ${token.line}.`);
                        }

                        parent.expressions?.push(self);
                    }
                    
                    bodies.splice(pointer, 1);
                    if (pointer > 0) { pointer--; }
                } else if (token.type === "identifier") {
                    // Function definition
                    if (token.value === "define") {
                        // Currently we don't support closures
                        if (bodies[pointer-1] && bodies[pointer-1].type === "define") {
                            throw new Error(`Compile time error: Nested function definition at line ${token.line}.`);
                        }

                        // Check if current slot is already occupied
                        if (bodies[pointer].type !== "empty") {
                            throw new Error(`Compile time error: Missing "(" at line ${token.line}.`);
                        }

                        // Get function name
                        let name = "";
                        if (tokens[count+1].type === "identifier" && tokens[count+1].value !== "define") {
                            name = tokens[count+1].value;
                        } else {
                            throw new Error(`Compile time error: Invalid funtion name at line ${tokens[count+1].line}.`);
                        }

                        // Check if function is already defined for immutability
                        if (defined[name]) {
                            throw new Error(`Compile time error: Duplicated function name at line ${tokens[count+1].line}.`);
                        }
                        defined[name] = true;

                        // Get args
                        let args: string[] = [];
                        if (tokens[count+2].type === "punc" && tokens[count+2].value === "(") {
                            let argCount = 0;

                            while (true) {
                                const argToken = tokens[count+3+argCount];

                                if (argToken.type === "identifier") {
                                    args.push(argToken.value);
                                } else if (argToken.type === "punc" && argToken.value === ")") {
                                    break;
                                } else {
                                    throw new Error(`Compile time error: Invalid funtion argument at line ${argToken.line}.`);
                                }

                                argCount++;
                            }

                            bodies[pointer] = {
                                type: "define",
                                name,
                                args,
                                expressions: []
                            };

                            argCounts[name] = argCount;

                            count += 3 + argCount;
                        } else {
                            throw new Error(`Compile time error: Invalid funtion argument at line ${tokens[count+2].line}.`);
                        }
                    }
                    // If expressions and logical expressions
                    else if (
                        token.value === "if"  ||
                        token.value === "and" ||
                        token.value === "or"
                    ) {
                        // Check if current slot is already occupied
                        if (bodies[pointer].type !== "empty") {
                            throw new Error(`Compile time error: Missing "(" at line ${token.line}.`);
                        }

                        bodies[pointer] = {
                            type: token.value === "if" ? "if" : "logic",
                            name: token.value,
                            expressions: []
                        }
                    }
                    // No specific name specified
                    else {
                        // If the current slot is of type empty, it is a function call waiting for a body
                        if (bodies[pointer].type === "empty") {
                            // Get function name
                            let name = "";
                            if (token.type === "identifier" && token.value !== "define") {
                                name = token.value;
                            } else {
                                throw new Error(`Compile time error: Invalid funtion name at line ${token.line}.`);
                            }

                            // Can only call function if it is already defined
                            if (!defined[name]) {
                                throw new Error(`Compile time error: Function ${name} is not defined at line ${token.line}.`);
                            }

                            bodies[pointer] = {
                                type: "call",
                                name,
                                expressions: []
                            };
                        }
                        // If not, the identifier is just a function argument or a function body
                        else {
                            const body: Body = { type: "value", dataType: defined[token.value] ? "function" : token.type, name: token.value };
                            const parent = bodies[pointer];
                            
                            // If parent is "if", it shall have only 3 expressions
                            if (parent.type === "if" && parent.expressions?.length === 3) {
                                throw new Error(`Compile time error: "if" shall only have 3 arguments at line ${token.line}.`);
                            }

                            // If identifier is a function arg, check if arg is defined
                            if (!defined[token.value]) {
                                let argDefined = false;

                                for (let count = pointer; count >= 0; count--) {
                                    const parent = bodies[count];
                                    const args = parent.args as string[];

                                    if (parent.type === "define" && args.includes(token.value)) {
                                        argDefined = true;
                                        break;
                                    }
                                }

                                if (!argDefined) {
                                    throw new Error(`Compile time error: ${token.value} is undefined at line ${token.line}.`);
                                }
                            }

                            parent.expressions?.push(body);
                        }
                    }
                } else if (token.type === "string" || token.type === "number" || token.type === "boolean") {
                    const parent = bodies[pointer];
                    const body: Body = { type: "value", dataType: token.type, name: token.value };

                    if (parent.type === "empty") {
                        throw new Error(`Compile time error: Nameless expression at line ${token.line}.`);
                    }

                    // If parent is "if", it shall have only 3 expressions
                    if (parent.type === "if" && parent.expressions?.length === 3) {
                        throw new Error(`Compile time error: "if" shall only have 3 arguments at line ${token.line}.`);
                    }

                    parent.expressions?.push(body);
                } else {
                    throw new Error(`Compile time error: Invalid expression at line ${token.line}`);
                }
            }
        }

        return ast;
    }

    transpile(ast: AST, precompiles: string = ""): string {
        let output = "const body = {}\n\n" + precompiles;

        for (const body of ast) {
            output += `${this.getCodeFromBody(body)}\n\n`;
        }

        return output;
    }

    getCodeFromBody(body: Body): string {
        if (body.type === "value") {
            if (body.dataType === "string") {
                return `"${body.name}"`;
            }

            if (body.dataType === "number" || body.dataType === "identifier" || body.dataType === "boolean") {
                return `${body.name}`;
            }

            if (body.dataType === "function") {
                return `body["${body.name}"]`;
            }
        }

        if (body.type === "call") {
            const expressions = body.expressions?.map(expression => this.getCodeFromBody(expression)).join(", ");

            return `body["${body.name}"](${expressions})`;
        }

        if (body.type === "define") {
            const expressions = body.expressions
                                    ?.slice(0, body.expressions.length-1)
                                    .map(expression => this.getCodeFromBody(expression))
                                    .join("\n    ");
            const lastExpression = "return " + this.getCodeFromBody((body.expressions as any)[(body.expressions as any).length-1] as any);

            return `body["${body.name}"] = function(${body.args?.join(", ")}) {\n` +
                   `    ${expressions}\n` +
                   `    ${lastExpression}\n` +
                   `}`
        }

        if (body.type === "if") {
            const expressions = body.expressions as any;

            const condition = this.getCodeFromBody(expressions[0]);
            const ifTrue = this.getCodeFromBody(expressions[1]);
            const ifFalse = this.getCodeFromBody(expressions[2]);

            return `(${condition} ? ${ifTrue} : ${ifFalse})`;
        }

        if (body.type === "logic") {
            const expressions = (body.expressions as any).map((exp: any) => this.getCodeFromBody(exp));

            const operator: Record<string, string> = {
                "and": "&&",
                "or": "||"
            }

            return `(${expressions.join(operator[body.name || ""])})`
        }

        throw new Error("Invalid AST");
    }
}
