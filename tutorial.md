## Comments

```lisp
; This is a comment, you can use comments to document your code.
; Comments are discarded by the compiler and do not affect your program.
```

## Expressions

A Petite Lisp program consists of expressions. An expression is a piece of code that returns a value:
```clojure
; Strings are values, so they are expressions
"bobby bob"

; Numbers are also values, so they are also expressions
123
0.5

; Booleans too
true
false

; This is a function call, it calls the function "add" and returns the result of the function
; A function call returns a value after its execution, so it is also an expression
(add 1 2 3)
```

Here is a Hello, World! program in Petite Lisp:
```clojure
(print "Hello, World!")
```

## Functions

A function contains multiple expressions, when you call a function, the expressions in the function get executed, and the value of the last expression will be returned.

You can define a function with this format:
```clojure
(define func-name (arg1 arg2 arg3)
    expression1
    expression2
    expression3
    )
```

For example, here is a function to add a number to another number:
```clojure
(define a-plus-b (a b)
    (add a b)
    )

; The console will show "7"
(print (a-plus-b 3 4))
```

You must always provide enough arguments when calling a function, take this case for instance:
```clojure
(define a-plus-b (a b)
    (add a b)
    )

; Oopsie
(print (a-plus-b 3))
```

The function expects two arguments, here we have only provided one. This will result in a compiler error.

## Immutability

If you are coming from a non functional (as in coding style) programming language, note that variables do not exist in Petite Lisp, and functions can not be redefined. This helps achieve immutability which makes your code less unexpected and more comfortable to work with in a concurrent or parallel fashion.

## Control flow

### Conditions

Conditional branching can be done using the `if` expression:
```clojure
(if condition
    expression_if_true
    expression_if_false
    )
```

For example, here we are comparing if two values are equal:
```clojure
(define is-equal (var1 var2)
    (if (equ var1 var2)
        (print "These values are equal")
        (print "These values are not equal")
        )
    )
; 
(is-equal 1 2)
```

You can group multiple conditions using `and` and `or`:
```clojure
; Returns true if a = b and c = d and d = e
(and (equ a b) (equ c d) (equ d e))
; Returns true if a = b or c = d or d = e
(or (equ a b) (equ c d) (equ d e))
```

Conditions in Petite Lisp are lazy evaluated, which means if a condition already satisfy, there is no need to evaluate other branches. For example:
```clojure
; Returns true immediately and do not care whatever the second expression is because 1 = 1 is true
(or (equ 1 1) (big-costly-function))
; Prints "4 > 1, yo" immediately and do not care whatever the last expression is because 4 > 1
(if (gtr 4 1)
    (print "4 > 1, yo")
    (big-costly-function)
    )
```

For a full list of conditional functions, go to the **Built-in functions** section down below.

### Loops

There are no for or while statements in Petite Lisp, you can create loops through recursions and built-in iterative functions.

If you are not already familiar with recursion, it just means calling a function inside the function itself. For demonstration, I will write a program that calculates the sum from a to b:
```clojure
(define sum (a b result)
    (if (equ a b)
        ; if a is equal to b, add b to result and return the result
        (add result b)
        ; or else call the function again, add 1 to a and add a to result
        (sum (add a 1) b (add result a))
        )
    )

; Prints out 15
(print (sum 1 5 0))
```

There are multiple built-in iterative functions in Petite Lisp to handle specific tasks, we will go through that in the following section.

## Lists

List, as its name suggests, is a list of values. You can create a list like this:
```clojure
(list item1 item2 item3)
```

You can access items in a list like this:
```clojure
(list-get some-list index)
```

There are a lot of built-in utility functions for lists, go to the **Built-in functions** section down below for more info.

### First-class functions

Not really related to lists, but first-class functions play a significant role when dealing with lists so I might as well mention it here. Functions in Petite Lisp are first-class, meaning you can treat them as values, this is especially handy when combined with an utility function like `list-filter`. `list-filter` takes in a list, filter its items with a specific "rule", then returns a new list. This "rule" can be defined using a function. For example, I will write a program to filter out odd numbers in a list:
```clojure
; A function containing the rule
(define is-odd (n)
    ; If n mod 2 is not 0, it is odd
    (neq (mod n 2) 0)
    )

; Prints out our list, which would be 1 3 5 now
(print (list-filter (1 2 3 4 5) is-odd))
```

You can see that we are passing `is-odd` like a value as an argument for `list-filter`.

This is also an example of built-in iterative functions that I have mentioned above. You will be using these utility functions a lot while working with Petite Lisp.


## Records

Record is a data structure where you can map a value to a key, and the value is accessible through the record with a key.

Here is how you can create a record:
```clojure
(record
    (field key1 value1)
    (field key2 value2)
    (field key3 value3)
    ...
    )
```

A key can be of type string or number, a value can be of any type.

Here are some things you can do with a record:
```clojure
(define item-price ()
    (record
        (field "Apple" "1 dollar")
        (field "Can" "2 dollars")
        (field "Bag" "3 dollars")
        )
    )

; Get value from key
(record-get (item-price) "Apple")
; Return a new record with an item changed
(record-set (item-price) "Orange" "50 cents")
; Return a new record with an item deleted
(record-del (item-price) "Can")
```

More record-related functions can be found down below.


## Concurrency

In real-world applications, there must be a way to write non-blocking code. For example, consider an http request:
```clojure
(fetch "https://google.com")
```

We need to wait for some time for the server to respond before other code can continue executing. This effectively freezes up the entire program. To prevent this, a concurrency system for non-blocking code is crucial.

Petite Lisp inherits Javascript's concurrency system and its APIs behind the scene. Here are some built-in ways for you to handle concurrency in Petite Lisp:

### Promises

Promises in Petite Lisp are promises in Javascript, here is how you can create one:
```clojure
(promise callback
    (then func-to-run-when-resolved-1)
    (then func-to-run-when-resolved-2)
    (then func-to-run-when-resolved-3)
    (catch func-to-run-when-error)
    ...
    )
```

A callback must have a format like this:
```clojure
(define callback (resolve reject)
    ; Call resolve to resolve the promise, giving the promise the value passed to resolve 
    (resolve 123)
    ; Call reject when there is an error
    (reject "This function is faulty")
    )
    ; Both resolve and reject must have an argument btw
```

And you can also use `then` like this:
```clojure
(attach-then some-promise func-to-run-when-resolved)
```


## Error handling

To do.


## Modules

To do.


## Built-in functions

To do.

### Math

### List

### String

### Record

### Utils
