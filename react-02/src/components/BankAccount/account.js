class AccountController {

    constructor() {
        this.accountsHolder = [];
        this.accountCards = []
        this.counter = 1;
    }

    nextKey() {
        return `k${this.counter++}`;

    }

    createAccount(name, balance) {
        
        const key = this.nextKey();
        
        if (balance >= 0) {
            const newAccount = new Account(key, name, balance);

            // this.accountsHolder.push(newAccount);

            // const newCardID = [newAccount.createAccountCard().getAttribute("key")];
            // node.appendChild(newAccount.createAccountCard());
            
            this.accountCards.push(newAccount);

            return key;


        } else {
            alert('Amount must be positive!');
        }
    }
    
    getAccount(k) {
        const theKey = k;
        const finding = this.accountsHolder.find(x => x.key === theKey);
        return finding;
    }
    findAccount(name) {
        const changingAccount = this.accountsHolder.find(x => x.accountName === name);
        return (changingAccount);
    }

    depositeIT(name, depositAmount) {
        const currentAccount1 = this.findAccount(name);
        const acc1 = new Account(currentAccount1.key, currentAccount1.accountName, currentAccount1.balance);
        
        if (depositAmount >= 0) {
            
            acc1.accountDeposite(depositAmount);
            currentAccount1.balance = acc1.balance;
            currentAccount1.divCard.innerText = "Account: " + currentAccount1.accountName + '\n' + 'Balance: ' + currentAccount1.balance + '$';
            return currentAccount1;
        }
        else if (depositAmount < 0) { alert('deposite must be positive!'); }
    }
    withdrawIT(name, withdrawamount) {
        const currentAccount2 = this.findAccount(name);
        console.log(currentAccount2);
        const acc2 = new Account(currentAccount2.key, currentAccount2.accountName, currentAccount2.balance);
        console.log(acc2);
        console.log(acc2.balance);

        if (withdrawamount >= 0) {
            acc2.accountWithdraw(withdrawamount);
            currentAccount2.balance = acc2.balance;
            currentAccount2.divCard.innerText = "Account: " + currentAccount2.accountName + '\n' + 'Balance: ' + currentAccount2.balance + '$';
            
            if (acc2.balance < 0) {
                alert('You have negative balance! Please deposite money or bank charges will be applied in 5 business days.');
            }
            return currentAccount2;
        }
        else if (withdrawamount < 0) { alert('Withdraw must be positive') }
    }

    deleteAccount(name, node) {
            const deletedAccount = this.accountsHolder.find(x => x.accountName === name);
            const deleteIndex = this.accountsHolder.indexOf(this.accountsHolder.find(x => x.accountName === name));
            const deleteKey = this.accountsHolder.find(x => x.accountName === name).key;
            const deletediv = deletedAccount.divCard;
            
            deletediv.parentNode.removeChild(deletediv);

            this.accountsHolder.splice(deleteIndex, 1);
            
            this.accountCards.splice(deleteIndex, 1);
    }
    accountSummary() {
        
        const allSummeries = [];
        const balancesK = this.accountsHolder.map(temp => ({ "key": temp.key, "balance": temp.balance }));
        
        const allBalances = balancesK.map(d => d.balance);
        
        allSummeries[0] = allBalances.reduce((total, num) => total + num, 0);
        allSummeries[1] = this.accountsHolder.length;


        const minBalance = Math.min.apply(Math, allBalances);
       
        const minAccount = this.accountsHolder.find(x => x.balance === minBalance);
     
        allSummeries[2] = minAccount.accountName;
        allSummeries[3] = minBalance;

        const maxBalance = Math.max.apply(Math, allBalances);
      
        const maxAccount = this.accountsHolder.find(x => x.balance === maxBalance);
      
        allSummeries[4] = maxAccount.accountName;
        allSummeries[5] = maxBalance;
       
        return allSummeries;
    }
}


class Account {
    constructor(key, _accountName, StartingBalance) {
        this.key = key;
        this.accountName = String(_accountName);
        this.balance = Number(StartingBalance);
    }

    createAccountCard() {
        const divCardkey = this.key;
        const divCard = document.createElement("div");
        this.divCard = divCard;
        divCard.setAttribute("class", "leftCard");
        divCard.setAttribute("key", divCardkey);
        divCard.innerText = "Account: " + this.accountName + '\n' + 'Balance: ' + this.balance + '$';
        return divCard;
    }
    accountDeposite(amount) {
        return (this.balance += parseFloat(amount));
    }
    accountWithdraw(amount) {
        return (this.balance -= parseFloat(amount));
    }
}
export default { Account, AccountController }