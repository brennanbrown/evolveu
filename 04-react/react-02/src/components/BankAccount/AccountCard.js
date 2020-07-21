import React, { Component }  from "react"

class AccountCard extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            depValue: 0,
            withValue: 0
        }
    }
    
    depositValue = (e) => {
        this.setState({depValue: e.target.value})
    }
    
    withdrawValue = (e) => {
        this.setState({withValue: e.target.value})
    }
    
    depositInAcctCard = () => {
        this.props.deposit(this.state.depValue, this.props.key1)
        this.setState({depValue: 0})
    }
    
    withdrawInAcctCard = () => {
        this.props.withdraw(this.state.withValue, this.props.key1)
        this.setState({withValue: 0})
    }
    
    deleteAcctCard = () => {
        this.props.delete (this.props.key1)
    }
    
    render() {
        return (
            <div className="card">
            
            <h2> {this.props.name}</h2>
            <h3> ${this.props.balance}</h3>
            
            <input value={this.state.depValue} onChange={this.depositValue} type="number"></input>
            <button onClick={this.depositInAcctCard}>Deposit</button><br/>
            
            <input value={this.state.withValue} onChange={this.withdrawValue} type="number"></input>
            <button onClick={this.withdrawInAcctCard}>Withdraw</button><br/>
            
            <button onClick={this.deleteAcctCard}>Delete</button>
            
            </div>
            )
        }
    }
    export default AccountCard;