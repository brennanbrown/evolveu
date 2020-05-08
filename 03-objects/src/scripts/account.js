class Account {

    constructor(name, num) {
        this.name = name;
        this.balance = Number(num);
    }

    deposit(num) {
        this.balance += Number(num);
    }

    withdraw(num) {
        this.balance -= Number(num);
    }

    show() {
        let myAccount = [this.name, " : $" + this.balance.toFixed(2)];
        return myAccount.join("");
    }
}

class AccountController {

    constructor() {
        this.account = [];
    }

    addAccount(name, num) {
        let pushAccount = new Account(name, num);
        this.account.push(pushAccount);
    }

    displayAddedAccount(name) {
        let myAccount = this.account.find(x => x.name === name);
        myAccount = [myAccount.name, " : $" + myAccount.balance.toFixed(2)];
        return myAccount.join("");
    }

    deleteAccount(name) {
        let myAccount = this.account.find(x => x.name === name);
        let i = this.account.indexOf(myAccount);
        this.account.splice(i, 1);
    }

    accountTotal() {
        let value = this.account.map((x) => x.balance);
        value = value.reduce((a, b) => (Number(a) + Number(b)));
        return "$" + Number.parseFloat(value).toFixed(2);
    }

    isNewAccount(name) {
        return name;
    }

    isNewAmount(num) {
        return num;
    }

    largestAccount() {
        this.account.sort((a, b) => { return b.balance - a.balance });
        let value = [this.account[0].name, " : $" + this.account[0].balance.toFixed(2)];
        return value.join("");
    }

    smallestAccount() {
        this.account.sort((a, b) => { return a.balance - b.balance });
        let value = [this.account[0].name, " : $" + (this.account[0].balance.toFixed(2))];
        return value.join("");
    }


}

export { Account, AccountController };