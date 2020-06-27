import React, { Component } from "react"
import AccountCard from "./AccountCard.js"
import accounts from './account.js'


let x = new accounts.AccountController();

function get(id) {
    return document.getElementById(id).value;
}
class AccountCTRL extends Component {

    constructor(props) {
        super(props)

        this.state = {
            x : x,
            totalArray:[0,0,"Chequing",0,"Savings",0],
        }
    }
    
    mySave() {
       
        const acName = get("idaccountN");
        const acBalance = get("idstartingB");
        const theAC = x.createAccount(acName, acBalance);
        this.CreateReactComponents();
    }

    CreateReactComponents=()=>{
       let cards= this.state.x.accountCards;
        console.log(cards); 
        // const listCards= cards.map(card) =>
        // <AccountCard key={cards.key} accountName={cards.accountName} balance={cards.balance}>
        // return {listCards}
        // <
            let array1 = []
            let size = x.accountCards.length;
            // console.log("Checking length of accountCards: ", size, this.state.accountCards);
            for (let i=0;i<size;i++){
            array1.push(
                <AccountCard

                    key = {x.accountCards[i].key}
                    key1 = {x.accountCards[i].key}
                    //key is a reserved word, so use key1 if access is required.
                    name = {x.accountCards[i].accountName}
                    balance = {x.accountCards[i].balance}
                    deposit ={this.deposit}
                    withdraw = {this.withdraw}
                    delete = {this.delete}
                    
                />
            )}
            this.setState({ accountCards: array1 })
    }
        
        clickMe = (e) => {
            const todo = e.target.getAttribute("todo")
            if (todo === "register") {
                this.mySave();
                this.totalBalance();
            }
        }

        deposit =(amt,key1)=>{
            // if/else
            const changingAccount = this.state.x.accountsHolder.find(x => x.key === key1);
            const changingAccountCards = this.state.x.accountCards.find(x => x.key === key1);
            // (this.state.x.accountCards.find(x => x.key === key1)).balance=changingAccount.balance
            changingAccount.accountDeposite(amt)
            // changingAccountCards.balance=changingAccount.balance
            console.log(`deposited ${amt} to`);
            console.log(changingAccount);
            this.CreateReactComponents();
            this.totalBalance();
        }

        withdraw =(amt,key1)=>{
            // if/else
            const changingAccount1 = this.state.x.accountsHolder.find(x => x.key === key1);
            const changingAccountCards1 = this.state.x.accountCards.find(x => x.key === key1);
            // (this.state.x.accountCards.find(x => x.key === key1)).balance=changingAccount.balance
            changingAccount1.accountWithdraw(amt);
            // changingAccountCards.balance=changingAccount.balance
            console.log(`withdrew ${amt} to`);
            console.log(changingAccount1);
            this.CreateReactComponents();
            this.totalBalance();
            
            
        }
        delete = (key1) => {
            const deletedAccount = this.state.x.accountsHolder.find(x => x.key === key1);
            const deleteIndex = this.state.x.accountsHolder.indexOf(deletedAccount);
            this.state.x.accountsHolder.splice(deleteIndex, 1);
            this.state.x.accountCards.splice(deleteIndex, 1);
            this.CreateReactComponents();
            this.totalBalance();
            
        }
        totalBalance =() =>{
            console.log("from total balance")
            const total= this.state.x.accountSummary();
            console.log(total)
            
            this.setState({totalArray:total})
            // this.CreateReactComponents();
        }

        render() {
        
            return (

                <div className="account-details" onClick={this.clickMe}>
                    
                    <p><strong>Total Accounts Value:</strong>${this.state.totalArray[0]}</p>
                    <p><strong>Total Number of Accounts:</strong>{this.state.totalArray[1]}</p>
                    
                    <p><strong>Smallest Account Name:</strong>{this.state.totalArray[2]} <strong>Value:</strong>${this.state.totalArray[3]}</p>

                    <p><strong>Largest Account Name:</strong>{this.state.totalArray[4]} <strong>Value:</strong>${this.state.totalArray[5]}</p>
                    
                    <h3>Account Registration</h3>
                    <div><label>Account Name: </label><input type="text" id="idaccountN" required /></div>
                    <div><label>Starting Balance: </label><input type="number" id="idstartingB" required /></div>
                    <button todo="register">Register My Account </button>
                    {this.state.accountCards}
                </div>
            )

        }
    }

    export default AccountCTRL;