import domfunc from "./domfunc.js"

let textSelectedType = "";
let inputTransaction = "";
let initalAmount = "";
let newAccountName = "";

window.addEventListener("change", (e) => {
  if (e.target.id === "inputInitBalance") {
    domfunc.deleteNumberErrorMessage();
    initalAmount = e.target.value;
    initalAmount = domfunc.checkAmountUserInput(initalAmount);
  }
});

window.addEventListener("change", (e) => {
  if (e.target.id === "inputAccountName") {
    domfunc.deleteStrErrorMessage();
    newAccountName = e.target.value;
    newAccountName = domfunc.checkAccountNameUserInput(newAccountName);
  }
});

window.addEventListener("click", (e) => {
  if (e.target.id === "buttonCreateAccount") {

    domfunc.deleteNumberErrorMessage();
    domfunc.deleteStrErrorMessage();

    if (domfunc.inputIsError(initalAmount) === "ERROR") {
      initalAmount = domfunc.checkAmountUserInput(initalAmount);
    }

    if (domfunc.inputIsError(newAccountName) === "ERROR") {
      newAccountName = domfunc.checkAccountNameUserInput(newAccountName);
    } else if (domfunc.inputNotAnError(initalAmount) != "ERROR" &&
      domfunc.inputNotAnError(newAccountName) != "ERROR") {
      domfunc.addAccountToDom(newAccountName, initalAmount);
      domfunc.showSummary();
      domfunc.resetUserInputs();
      initalAmount = ""; newAccountName = "";
    }
  }
});



window.addEventListener("change", (e) => {
  if (e.target.id === "inputTransaction") {
    inputTransaction = e.target.value;
    domfunc.deleteTextNumberErrMessage();
    inputTransaction = domfunc.checkTextUserInput(inputTransaction);
  }
});

window.addEventListener("change", (e) => {
  if (e.target.id === "textAccount") {
    domfunc.deleteTextNumberErrMessage();
    inputTransaction = e.target.value;
  }
});

window.addEventListener("change", (e) => {
  if (e.target.id === "transactions") {
    domfunc.deleteTextNumErrMessage();
    textSelectedType = document.getElementById(e.target.id);
    textSelectedType = textSelectedType.value;
  }
});
