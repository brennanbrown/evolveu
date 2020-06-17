import React, { Component } from "react"
import AccountCard from "./AccountCard.js"
import accounts from './account.js'


let x = new accounts.AccountController();
// x.createAccount('Savings', 100)
// x.createAccount('Cheqing', 150)
console.log(x);

function get(id) {
    return document.getElementById(id).value;
}
class AccountCTRL extends Component {

    constructor(props) {
        super(props)

        this.state = {x
            // accountsHolder = [],
            // accountCards = []
            // counter = 1;
           

        }
        console.log("Hello from state: ", this.state.accountCards)
    }
    
    mySave() {
        console.log("In My Save");
        const acName = get("idaccountN");
        const acBalance = get("idstartingB");
        console.log("Account name and balance: ", acName, acBalance);
        console.log("This is x before setState: ", x);
        // const theAC=new accounts.Account(acName, acBalance);
        const theAC = x.createAccount(acName, acBalance);
        // const ACCard = theAC.createAccountCard(theAC.key, theAC._accountName, theAC.StartingBalance);
        // x.accountsHolder.push(theAC);
        console.log(theAC)
        // console.log(ACCard)


                // if (!acName) {
                //     setMsg('You must enter an account name');
                //     return;
        //  }
    }


        
        clickMe = (e) => {
            const todo = e.target.getAttribute("todo")
            if (todo === "register") {
                this.mySave();
            }
            
            let array1 = []

            let size = x.accountCards.length;
            console.log("Checking length of accountCards: ", size, this.state.accountCards);

            // array1.push(
            //     <AccountCard
            //         key = {x.accountCards[0].key}
            //         name = {x.accountCards[0].accountName}
            //         balance = {x.accountCards[0].balance}
            //     />z
            // )
            this.setState({ accountCards: array1 })
            console.log("This is x after setState: ", x);

        }

        render() {
           
            return (

                <div className="account-details" onClick={this.clickMe}>

                    <h3>Account Registration</h3>
                    <div><label>Account Name: </label><input type="text" id="idaccountN" required /></div>
                    <div><label>Starting Balance: </label><input type="number" id="idstartingB" required /></div>
                    <button todo="register">Register My Account </button>
                    <AccountCard/>
                </div>
            )

        }
    }

    export default AccountCTRL;
     