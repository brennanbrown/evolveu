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
        let myAccount = [this.name, ' : $' + this.balance.toFixed(2)];
        return myAccount.join('');
    }
}

class AccountController {

    constructor() {
        this.account = [];
    }

    addAccount(name, num) {
        let pushAcc = new Account(name, num);
        this.account.push(pushAccount);
    }

    showAddedAcc(name) {
        let myAccount = this.account.find(x => x.name == name);
        myAccount = [myAccount.name, ' : $' + myAccount.balance.toFixed(2)];
        return myAccount.join('');
    }

}

export { Account, AccountController };