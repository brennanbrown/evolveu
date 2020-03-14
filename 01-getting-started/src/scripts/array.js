let arr = [];

const array = {

    // createArray: () => {
    //     let arr = [];
    //     return arr;
    // }

    addElement: (element) => {
        //createArray();
        arr.push(element);
        // return arr;
    },

    delElement: (element) => {
        arr.splice(element);
        return arr;
    },

    displayArray: (element) => {
        let arrDisp = arr.join(', ');
        return arrDisp;
    },

    sumArray: (element) => {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum = sum + arr[i];
        }
        return sum;
    },

    clearArray: (element) => {
        arr = [];
        return arr;
    }
}

export default array;