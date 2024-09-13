## Petite Lisp

Petite Lisp is a Lisp dialect designed to be extremely simple to learn and use. It is highly opinionated and I will try not to shift its original style as I move further. Currently I plan to transpile Petite Lisp into Javascript, but in the future I might add more options.

Note that Petite Lisp is still in development, so there are still a lot of things missing and bugs, and you should expect the syntax or standard libraries changed often.


## Using Petite Lisp

### Installation
- Clone this repo.
- Install necessary packages with `npm install`.
- Compile the compiler with `npx tsc`.

### Running your code

Then, in your console, type:
```
node plisp --input input.plisp --output output.js
```

An `output.js` file will appear which contains the Javascript code which you can run:
```
node output
```


## Tutorial

To learn how to write Petite Lisp, check out [this tutorial](./tutorial.md).


## Todos

(Not in order)

- Closures and scope.
- Error handling.
- Modules.
- Custom bindings.
- Improve concurrency.
- Improve the CLI.
- Finish the docs.
- Better compiler errors.


## Copyrights

Copyrights © 2024 Nguyen Phu Minh.

This project is licensed under the GPL-3.0 License.
