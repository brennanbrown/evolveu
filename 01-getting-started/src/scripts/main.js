import functions from './functions.js';
import calculator from './calculator.js'
// **********
//
// Add the event listeners
// 

/*idNumber.addEventListener('change', (() => {
    idNumberSize.textContent = functions.size(idNumber.value);
}));*/

var num1; var num2;
var answerDisplay = document.getElementById("answer").innerHTML;


document.getElementById('calculateButton').onclick = (function(){
	let num1 = parseInt(document.getElementById("firstNum").value);
	let num2 = parseInt(document.getElementById("secondNum").value);

	if(add.checked){
		calculator.addFunc(num1, num2);
		calculator.addWrite(num1, num2);
	}
	if(subtract.checked){
		calculator.subtractFunc(num1, num2);
		calculator.subtractWrite(num1, num2);
	}
	if(multiply.checked){
		calculator.multiplyFunc(num1, num2);
		calculator.multiplyWrite(num1, num2);
	}
	if(divide.checked){
		calculator.divideFunc(num1, num2);
		calculator.divideWrite(num1, num2);
	}
});


/*export default main;*/