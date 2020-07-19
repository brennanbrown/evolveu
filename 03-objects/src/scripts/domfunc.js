import { AccountController } from "./account.js"

const MyAccountController = new AccountController;

let i = 0;

let stringMessage = "";
let numberMessage = "";
let textNumberMessage = "";

const textAccount = document.getElementById("textAccount");
const textField = document.getElementById("texts");
const newAccountField = document.getElementById("createAccount");
const accountHistory = document.getElementById("accountHistory");

const domfunc = {
  
  addAccountToDom: (name, number) => {
    MyAccountController.addAccount(name, number);
    i++;
    
    let accountCardName = document.createElement("p");
    accountCardName.className = name + "accountCardClass";
    accountCardName.textContent = "Account #";
    let accountNumberSpan = document.createElement("span");
    accountNumberSpan.className = "accountNumberSpan";
    accountCardName.appendChild(accountNumberSpan);
    
    accountHistory.insertBefore(accountCardName, accountHistory.firstChild);
    
    let accountList = document.createElement("ol");
    let accountItem = document.createElement("li");
    accountItem.id = name + "id";
    accountItem.textContent = " (Initial Balance) ";
    
    let addedAccount = document.createElement("span");
    addedAccount.className = name + "added";
    addedAccount.textContent = name + " : $" + Number(number).toFixed(2);
    accountItem.insertBefore(addedAccount, accountItem.lastChild);
    
    accountCardName.appendChild(accountList);
    accountList.insertBefore(accountItem, accountList.lastChild);
    
    let span = document.createElement("span");
    let text = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(text);
    accountCardName.appendChild(span);
    
    let selectAccount = document.createElement("option");
    selectAccount.value = name;
    selectAccount.textContent = name;
    selectAccount.className = name + "accountClass";
    textAccount.insertBefore(selectAccount, textAccount.lastChild);
    domfunc.setAccountTitleNumbers();
  },
  
  setAccountTitleNumbers: () => {
    let accountTitleNumber = document.getElementsByClassName("accountNumberSpan");
    for (let i = accountTitleNumber.length - 1; i >= 0; i--) {
      accountTitleNumber[i].textContent = i + 1;
    }
  },
  
  resetUserInputs: () => {
    document.getElementById("inputInitBalance").value = "";
    document.getElementById("inputAccountName").value = "";
    document.getElementById("inputTransaction").value = "";
    document.getElementById("textAccount").value = "";
    document.getElementById("transactions").value = "";
  },
  
  showSummary: () => {
    if (i >= 1) {
      document.getElementById("dispCurrentBalance").textContent = MyAccountController.accountTotal();
      document.getElementById("dispLargestAccount").textContent = MyAccountController.largestAccount();
      document.getElementById("dispSmallestAccount").textContent = MyAccountController.smallestAccount();
    } else {
      document.getElementById("dispCurrentBalance").textContent = "";
      document.getElementById("dispLargestAccount").textContent = "";
      document.getElementById("dispSmallestAccount").textContent = "";
    }
  },
  
  inputIsError(userInput) {
    if (userInput === "" || userInput === "ERROR") {
      return "ERROR"
    } return userInput;
  },
  
  inputNotAnError(userInput) {
    if (userInput != "" || userInput != "ERROR") {
      return userInput
    } return "ERROR";
  },
  
  showNumberErrorMessage: () => {
    domfunc.deleteNumberErrorMessage();
    numberMessage = document.createElement("P");
    numberMessage.innerText = "Not a valid number";
    numberMessage.style.color = "red";
    newAccountField.appendChild(numberMessage);
  },
  
  showStrErrorMessage: () => {
    domfunc.deleteStrErrorMessage();
    stringMessage = document.createElement("P");
    stringMessage.innerText = "Not a valid name";
    stringMessage.style.color = "red";
    newAccountField.appendChild(stringMessage);
  },
  
  deleteNumberErrorMessage: () => {
    if (numberMessage) {
      numberMessage.remove();
    }
  },
  
  deleteStrErrorMessage: () => {
    if (stringMessage) {
      stringMessage.remove();
    }
  },
  
  checkTextUserInput: (number) => {
    number = MyAccountController.isNewAmount(number);
    if (number === "ERROR") {
      domfunc.showTextNumberErrMessage();
      return "ERROR";
    } else {
      domfunc.deleteTextNumberErrMessage();
      return number;
    }
  },
  
  makeTransaction: (number, name, type) => {
    if (i > 0) {
      let myAccount = MyAccountController.account.find((a) => { return a.name === name });
      if (type === "Deposit" && MyAccountController.account.length > -1) {
        myAccount.deposit(number);
        domfunc.showSummary();
        domfunc.addTextToDom(name, type, number);
      } else if (type === "Withdraw" && MyAccountController.account.length > -1) {
        myAccount.withdraw(number);
        domfunc.showSummary();
        domfunc.addTextToDom(name, type, number);
      }
    }
  },
  
  addTextToDom: (myAccount, type, number) => {
    myAccount = MyAccountController.account.find((el) => { return el.name === myAccount });
    
    let textItem = document.createElement("li");
    textItem.className = myAccount.name + "myAppend";
    textItem.textContent = "      (" + type + " " + number + ")";
    
    let addedAccount = document.createElement("span");
    addedAccount.className = myAccount.name + "added";
    addedAccount.textContent = myAccount.show();
    textItem.insertBefore(addedAccount, textItem.lastChild);
    
    const existingItem = document.getElementById(myAccount.name + "id");
    existingItem.insertBefore(textItem, existingItem.firstChild);
  },
  
  showTextNumberErrMessage: () => {
    domfunc.deleteTextNumberErrMessage();
    textNumberMessage = document.createElement("P");
    textNumberMessage.innerText = "Please check your inputs";
    textNumberMessage.style.color = "red";
    textField.appendChild(textNumberMessage);
  },
  
  deleteTextNumberErrMessage: () => {
    if (textNumberMessage) {
      textNumberMessage.remove();
    }
  },
  
  checkAmountUserInput: (number) => {
    if (number === "") {
      domfunc.showNumberErrorMessage();
      return "ERROR";
    }
    if (number != "") {
      number = MyAccountController.isNewAmount(number);
      if (number === "ERROR") {
        domfunc.showNumberErrorMessage();
        return "ERROR";
      } else {
        domfunc.deleteNumberErrorMessage();
        return number;
      }
    }
  },
  
  checkAccountNameUserInput: (name) => {
    if (name === "") {
      domfunc.showStrErrorMessage();
      return "ERROR";
    }
    if (name != "") {
      name = name.toUpperCase();
      name = MyAccountController.isNewAccount(name);
      if (name === "ERROR") {
        domfunc.showStrErrorMessage();
        return "ERROR";
      } else {
        domfunc.deleteStrErrorMessage();
        return name;
      }
    }
  },
  
  
  closeButton: window.addEventListener("click", (e) => {
    if (e.target.className === "close") {
      if (i > 0) { i--; }
      let removeItems = document.getElementsByClassName(e.target.parentElement.className);
      for (let i = removeItems.length - 1; i >= 0; i--) {
        removeItems[i].remove();
      }
      let deleteAccountName = e.target.parentElement.className.slice(0, -13);
      MyAccountController.deleteAccount(deleteAccountName);
      domfunc.showSummary();
      domfunc.setAccountTitleNumbers();
    }
  })
};

export default domfunc;