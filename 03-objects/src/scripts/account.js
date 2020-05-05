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

    deleteAcc(name) {
        let myAccount = this.accs.find(x => x.name === name);
        let i = this.accs.indexOf(myAcc);
        this.accs.splice(i, 1);
    }

    accsTotal() {
        let value = this.accs.map((x) => x.balance);
 
            value = value.reduce((a, b) => (Number(a) + Number(b)));
            return '$' + Number.parseFloat(value).toFixed(2);
    }

    biggestAcc() {
        this.accs.sort((a, b) => { return b.balance - a.balance });
        let value = [this.accs[0].name, ' : $' + this.accs[0].balance.toFixed(2)];
        return value.join('');
    }

    smallestAcc() {
        this.accs.sort((a, b) => { return a.balance - b.balance });
        let value = [this.accs[0].name, ' : $' + (this.accs[0].balance.toFixed(2))];
        return value.join('');
    }

    isNewAcc(name) {
        for (let v in this.accs) {
            if (this.accs[v].name === name) {
                return 'ERROR';
            }
        } return name;
    }

    isNewAmount(num) {
        if (isNaN(num)) {
            return 'ERROR';
        } return num;
    }
}

export { Account, AccountController };