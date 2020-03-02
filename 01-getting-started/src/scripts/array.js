var arr = [];

const array = {
    
    addElement: (element) => {
        arr.push(element);
        return arr;
    },

    delElement: (element) => {
        arr.splice(element);
        return arr;
    },

    displayArray: () => {
        arr = arr.join(', ');
        arrayWrite(arr);
        return arr;
    },

    sumArray: () => {
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i]
          }
        sumWrite(sum);
        return sum;
    },

    clearArray: (arr) => {
        arr = [];
        clearWrite();
        return arr;
    }
}

export default array;

function arrayWrite(arr) {
	document.getElementById("arrayDisplay").innerHTML = arr;
	return null;
}

function sumWrite(sum) {
	document.getElementById("arrayDisplay").innerHTML = sum;
	return null;
}

function clearWrite() {
	document.getElementById("arrayDisplay").innerHTML = null;
	return null;
}