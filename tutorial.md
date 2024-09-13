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

The list down below will follow the format of `(function-name data-type-of-arg-1 data-type-of-arg-2 data-type-of-arg-3) -> data-type-of-result`. If a data type is written as `...data-type`, it means that you can insert infinitely many args with that data type into the function. If it is written as `data-type?`, it means that the argument is optional.

### Math

These are functions for basic mathematical operations:

* `(add ...number) -> number`: Add numbers together.
* `(sub number ...number) -> number`: Subtract a number by the values provided after it.
* `(mul ...number) -> number`: Multiply numbers together.
* `(div number ...number) -> number`: Divide a number by the values provided after it.
* `(mod number ...number) -> number`: Mod a number by the values provided after it.
* `(pow number ...number) -> number`: Power of a number to the values provided after it.
* `(bit-and ...number) -> number`: Bitwise AND numbers together.
* `(bit-or ...number) -> number`: Bitwise OR numbers together.
* `(bit-xor ...number) -> number`: Bitwise XOR numbers together.
* `(bit-not number)`: Bitwise NOT a number.
* `(bit-ls number ...number) -> number`: Bitwise left shift a numnber with the numbers provided after it.
* `(bit-rs number ...number) -> number`: Bitwise right shift a numnber with the numbers provided after it.
* `(bit-urs number ...number) -> number`: Bitwise unsigned right shift a numnber with the numbers provided after it.

These are functions for logical conditions:

* `(not boolean) -> boolean`: Returns true if argument is false.
* `(equ ...any) -> boolean`: Returns true if all arguments are equal.
* `(neq ...any) -> boolean`: Returns true if one pair of arguments is unequal.
* `(gtr ...any) -> boolean`: Returns true if the preceding argument is greater than the following argument.
* `(geq ...any) -> boolean`: Returns true if the preceding argument is greater than or equal to the following argument.
* `(lss ...any) -> boolean`: Returns true if the preceding argument is less than the following argument.
* `(leq ...any) -> boolean`: Returns true if the preceding argument is less than or equal to the following argument.

These are functions for specific mathematical problems:

* `(round number) -> number`: Rounds a floating point number into an integer.
* `(floor number) -> number`: Rounds down and returns the largest integer less than or equal to a given number.
* `(ceil number) -> number`: Rounds up and returns the smallest integer greater than or equal to a given number.
* `(trunc number) -> number`: Returns the integer part of a number by removing any fractional digits.
* `(abs number) -> number`: Returns the absolute value of a number.
* `(asin number) -> number`: Arcsin.
* `(asinh number) -> number`: Hyperbolic arcsin.
* `(acos number) -> number`: Arccos.
* `(acosh number) -> number`: Hyperbolic arccos.
* `(atan number) -> number`: Arctan.
* `(atan2 number number) -> number`: Returns the angle in the plane (in radians) between the positive x-axis and the ray from (0, 0) to the point (x, y). First arg is y, second arg is x.
* `(atanh number) -> number`: Hyperbolic arctan.
* `(sin number) -> number`: Sin.
* `(sinh number) -> number`: Hyperbolic sin.
* `(cos number) -> number`: Cos.
* `(cosh number) -> number`: Hyperbolic cos.
* `(tan number) -> number`: Tan.
* `(tanh number) -> number`: Hyperbolic tan.
* `(log number) -> number`: Natural log.
* `(num-to-str number) -> string`: Converts a number to a string.
* `(rand) -> number`: Returns a floating-point, pseudo-random number that's greater than or equal to 0 and less than 1.
* `(exp number) -> number`: Returns e^x with x being the argument.

### List

* `(list ...any) -> list`: Returns a list with the specified items passed as arguments.
* `(list-get list number) -> any`: Returns an item from the list with the specified list and index.
* `(list-slice list number? number?) -> list`: Returns a new list, sliced from the specified list, from start to end. Start defaults to 0, end defaults to the end of the list.
* `(list-merge ...list) -> list`: Returns a list merged from specified lists.
* `(list-with list number any) -> list`: Returns a new list from the specified list with the item at index set to the new value.
* `(list-reverse list) -> list`: Returns a reversed list.
* `(list-splice list number number?) -> list`: Returns a new list with "n" items removed from start. "n" defaults to 1.
* `(list-has list any number?) -> boolean`: Check if list has a value or not. The third argument is an optional starting position of the list.
* `(list-index-of list any number?) -> number`: Returns the first found position of an item. The third argument is an optional starting position of the list.
* `(list-last-index-of list any number?) -> number`: Returns the last found position of an item. The third argument is an optional starting position of the list.
* `(list-join list string) -> string`: Returns the list with all items joined into a string, separated by an optional delimiter.
* `(list-copy-within list number number number) -> list`: Returns the list with items from start to end copied to index.
* `(list-flat list number) -> list`: Returns the list, flatten with a specified depth.
* `(list-every list callback) -> boolean`: Returns true if all items make the callback return true.
* `(list-filter list callback) -> list`: Returns the list with items that makes the callback return true.
* `(list-some list callback) -> boolean`: Returns true if there is an item that makes the callback return true.
* `(list-map list callback) -> list`: Returns a new list with all values switched to `callback(value)`.
* `(list-reduce list callback) -> any`: The callback will be provided two arguments - the first one being what would be returned, the second one being the current item of the current iteration. The first arg will be changed to the returned value of the callback after each iteration.
* `(list-reduce-right list callback) -> any`: Same thing as reduce but loops from right to left.
* `(list-sort list callback) -> list`: Sort the list, decide to sort two items if callback returns true.


### String

### Record

### Concurrency

### Utils

* `(print ...any) -> 0`: Prints the items specified to the console.
* `(type any) -> string`: Returns the type of a value.
