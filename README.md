## Petite Lisp

Petite Lisp is a Lisp dialect designed to be extremely simple to learn and use. It is highly opinionated and I will try not to shift its original style as I move further. Currently I plan to transpile Petite Lisp into Javascript, but in the future I might add more options.

Note that Petite Lisp is still in development, so there are still a lot of things missing and bugs, and you should expect the syntax or standard libraries changed often.


## Using Petite Lisp

Download the binary, then you can compile your Petite Lisp code like this:
```
plisp --input input.plisp --output output.js
```

### From source

If you are using Petite Lisp from this repo:
- Clone this repo.
- Install deps with `npm install`.
- Compile with `npx tsc`.

Then, in your console, type:
```
node plisp --input input.plisp --output output.js
```

You can build the cli into an executable using:
```
npm run build
```


## Concepts

### Brief look at the syntax

```lisp
; Define a function
(define hello-world
    (print "Hello, World!")
    )

; Call the function, printing out "Hello, World!"
(hello-world)
```

### Comments

```lisp
; This is a comment, you can use this to document your code.
; Comments are discarded by the compiler and do not affect your program.
```

### Expressions

An expression is something that returns a value:
```lisp
; Strings are values, so they are expressions
"bobby bob"

; Numbers are also values, so they are also expressions
123
0.5

; Booleans too
true
false

; This is a function call, it calls the function "add" and returns the result of the function
(add 1 2 3)
```

### Function definitions

You can define a function with this format:
```lisp
(define func-name (arg1 arg2 arg3)
    expression1
    expression2
    expression3
    )
```
With the last expression being the returned value. Note that only expressions are allowed in the function body, you can not define a function inside a function (for now, I might add closures in the future).

### Immutability

Variables do not exist in Petite Lisp, and functions can not be redefined. This helps achieve immutability which makes your code less unexpected and more comfortable to work with in a concurrent or parallel fashion.

### Control flow

You can do conditional branching by using the `if` expression:

```lisp
(if condition
    expression_if_true
    expression_if_false
    )
```

For example, here we are comparing if two variables are equal:
```lisp
(define is-equal (var1 var2)
    (if (equ var1 var2)
        (print "These variables are equal")
        (print "These variables are not equal")
        )
    )
; 
(is-equal 1 2)
```

There is no loop statements in Petite Lisp, you can create loops through recursions and built-in iterative functions.

### Concurrency

To do.

### Modules

To do.


## Stdlib

To do. For now, you can have a look in `./precompiles` which contains all built-in functions for Petite Lisp.


## Copyrights

Copyrights © 2024 Nguyen Phu Minh.

This project is licensed under the GPL-3.0 License.
