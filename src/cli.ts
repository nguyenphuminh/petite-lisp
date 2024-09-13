import fs from "fs";
import { Compiler } from "./compiler";

export interface CLIOptions {
    dir: string;
}

export class CLI {
    public dir: string;
    
    constructor(options: CLIOptions) {
        this.dir = options.dir || ".";
    }

    start() {
        const args = process.argv;
        const compiler = new Compiler();

        let index = 1;

        // If we are running from node
        if (args[0] === "node") {
            index = 2;
        }

        // Compiler options
        const options = {
            input: "",
            output: ""
        }

        for (; index < args.length; index++) {
            const arg = args[index];

            switch (arg) {
                case "--input":
                    options.input = args[index+1];

                    break;
                
                case "--output":
                    options.output = args[index+1];

                    break;
            }
        }

        try {
            const tokens = compiler.tokenize(fs.readFileSync(options.input).toString());
            const ast = compiler.parse(tokens);
            const code = compiler.transpile(
                ast,
                fs.readFileSync(`${this.dir}/precompiles/math.js`).toString()   +
                fs.readFileSync(`${this.dir}/precompiles/list.js`).toString()   +
                fs.readFileSync(`${this.dir}/precompiles/string.js`).toString() +
                fs.readFileSync(`${this.dir}/precompiles/record.js`).toString() +
                fs.readFileSync(`${this.dir}/precompiles/concurrency.js`).toString() +
                fs.readFileSync(`${this.dir}/precompiles/utils.js`).toString() 
            );

            fs.writeFileSync(options.output, code);
        } catch (e) {
            console.log(e);
        } 
    }
}
