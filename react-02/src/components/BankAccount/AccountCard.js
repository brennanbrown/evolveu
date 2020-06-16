import React, { Component }  from "react"

class AccountCard extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
           
          }
    }
   
    render() {
        
        // console.log(this.props)
        return (
            <div>
                <h1> {this.props.accountName}  </h1>
                <h2> {this.props.balance} </h2>
                
            </div>
        )
    }
}
export default AccountCard;