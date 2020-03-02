import functions from './functions.js';
import calculator from './calculator.js'
import tax from './tax.js'
import array from './array.js'

var num1; var num2;
var answerDisplay = document.getElementById("answer").innerHTML;

/* CALCULATOR */

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

/* TAX CALCULATOR */

document.getElementById('taxButton').onclick = (function(){
	let gross_income = parseInt(document.getElementById("gross_income").value);
	tax.taxCal(gross_income);
});

/* ARRAYS */

document.getElementById('addElement').onclick = (function(){
	let element = parseInt(document.getElementById("element").value);
	array.addElement(element);
});

document.getElementById('displayArr').onclick = (function(){
	let element = parseInt(document.getElementById("element").value);
	array.displayArray();
});

document.getElementById('sumArr').onclick = (function(){
	let element = parseInt(document.getElementById("element").value);
	array.sumArray();
});

document.getElementById('clearArr').onclick = (function(){
	let element = parseInt(document.getElementById("element").value);
	array.clearArray();
});
/*export default main;*/

