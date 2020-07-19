/*---------------------------------------

TODO 
====

OBJECTIVE: Write tests and code to prove 
to understanding of these concepts.

attributes / variables
number
string
boolean
array
dictionary / objects
undefined

sample if / else

functions
parameters
returns

arrays
add to the front
add to the end
update values

loops 
for
for/in
while
do while
forEach (with array and function)

Objects / Dictionaries
declare object
lookup key to retrieve value

---------------------------------------*/
const syntax = {
    
    
    numberCheck: (input) => {
        if (typeof input == "number"){
            return true;
        }
        return false;
    },
    
    stringCheck: (input) => {
        if (typeof input == "string"){
            return true;
        }
        return false;
    },
    
    booleanCheck: (input) => {
        if (typeof input == "boolean"){
            return true;
        }
        return false;
    },
    
    arrayCheck: (input) => {
        if (Array.isArray(input) === true){
            /*input.unshift("test");*/
            return true;
        }
        return false;
    },
    
    arrayCreateFor: (input) => {
        if (Array.isArray(input)) {
            for(let i=0; i<5; i++)
            {
                input.push(i);
            }
            return input;
        } else {
            return false;
        }
    },
    
    arrayCreateWhile: (input) => {
        if (Array.isArray(input)) {
            var i = 0;
            do {
                input.push(i);
                i++;
            }
            while (i < 5);
            return input;
        } else {
            return false;
        }
    },
    
    stringConcat: (input) => {
        if (typeof input == "string"){
            input = input.concat(input);
            return input;
        } 
        else {
            return false;
        }
        
    },
    
    dictionaryCheck: (input) => {
        // Checks if the parameter's constructor
        // property is an object, 
        if (input.constructor == Object){
            return true;
        }
        return false;
    },
    
    undefinedCheck: (input) => {
        if (typeof input == "undefined"){
            return true;
        }
        return false;
    },
}

export default syntax;