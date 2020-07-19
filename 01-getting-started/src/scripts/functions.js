
const functions = {
    
    size: (num) => {
        if (num < 0) return "negative"
        if (num < 10) return "small";
        if (num < 20) return "medium";
        if (num < 1000) return "large"
        return "very large";
    },
    
    add: (num1, num2) => {
        return num1 + num2;
    },
    
    subtract: (num1, num2) => {
        return num1 - num2;
    },
    
    multiply: (num1, num2) => {
        return num1 * num2;
    },
    
    divide: (num1, num2) => {
        // Truncation required to
        // change floats into ints.
        return Math.trunc(num1 / num2);
    },
    
    largerNumber: (num1, num2) => {
        if (num1 > num2) {
            return num1;
        } else {
            return num2;
        }
    },
    
    powerOf: (num1, num2) => {
        return Math.pow(num1, num2);
    },
    
    isEven: (num1) => {
        if (num1 % 2 == 0) {
            return true;
        }
        
        return false
    },
    
    
};



export default functions;
