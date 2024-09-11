const { CLI } = require("./dist/cli");

const cli = new CLI({
    dir: __dirname
});

cli.start();
