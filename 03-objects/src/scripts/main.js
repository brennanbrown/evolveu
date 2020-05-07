import domFunc from './domFunc.js'

console.log("Hello world!");

window.addEventListener('change', (e) => {
    if (e.target.id === 'inputInitBalance') {
        if (e.target.id == falsey) {
            window.alert("Please enter an amount for your initial balance.");
        }
      initAmount = e.target.value;
      initAmount = domFunc.checkAmountUserInput(initAmount);
    }
  });