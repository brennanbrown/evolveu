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
            
            
            
            <div key={this.props.key} className="leftCard">
        
        {/* this.divCard = divCard; */}
        {/* divCard.setAttribute("class", "leftCard"); */}
        {/* divCard.setAttribute("key", divCardkey); */}
        <h2> { this.props.accountName}</h2>
        <h3> {this.props.balance}</h3>
                
            </div>
        )
    }
}
export default AccountCard;