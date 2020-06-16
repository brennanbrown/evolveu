import React, { Component }  from "react"
import AccountCard from "./AccountCard.js"
import accounts from './account.js'


let x = new accounts.AccountController();
x.createAccount('sav',100)
x.createAccount('chq',150)
console.log(x);


class AccountCTRL extends Component {
    
    constructor(props) {
        super(props)
        
        this.state = {
           accountCards: x.accountCards
          }
    }

    // functions go here
    clickMe = () =>{
        let size = x.accountCards.length;
        for (let i=0;i<size;i++){
            this.state.accountCards.push(
                <AccountCard 
                    key = {x.accountCards[i].key}
                    name = {x.accountCards[i].accountName}
                    balance = {x.accountCards[i].balance}
                />
                )
        }
        console.log(this.state.accountCards);
    }



   
    render() {
    

        
        // console.log(this.key,this.counter)
        
        
        // conditional rendering can go here

        return (
            <div>
                <h1> Total:  </h1>
                <h2> Highest: </h2>
                <button onClick={this.state.clickMe} >click</button>
               {/* <div> {this.state.accountCards}</div> */}
            </div>
        )
    }
}
export default AccountCTRL;




//         createAccountCard() { 
//             const divCardkey = this.key;
//             const divCard = document.createElement("div");
//             this.divCard = divCard;
//             divCard.setAttribute("class", "leftCard");
//             divCard.setAttribute("key", divCardkey);
//             divCard.innerText = "Account: " + this.accountName + '\n' + 'Balance: ' + this.balance + '$';
//             return divCard;
//         }
//         accountDeposite(amount) {
//             return (this.balance += parseFloat(amount));
//         }
//         accountWithdraw(amount) {
//             return (this.balance -= parseFloat(amount));
//         }
//     }

//     render() {
//         // for debugging:
//         console.log(this.state);
//         return (
            
//         )
//     }
// // }

// render (
//     document.getElementById("root")
// )