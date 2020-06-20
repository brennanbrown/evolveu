import React, { Component }  from "react"

class CityCard extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            mInValue: 0,
            mOutValue: 0
          }
    }

    moveInValue=(e)=>{
        // console.log(e.target.value)
        this.setState({mInValue: e.target.value})
    }

    moveOutValue=(e)=>{
        // console.log(e.target.value)
        this.setState({mOutValue: e.target.value})
    }

    moveInCityCard=()=>{
        console.log(this.state.mInValue)
        this.props.moveInPopulation(this.props.key1, this.state.mInValue)
        this.setState({mInValue: 0})
    }

    moveOutCityCard=()=>{
        // console.log(this.state.depValue)
        this.props.moveOutPopulation(this.props.key1 , this.state.mOutValue)
        this.setState({mOutValue: 0})
    }

    deleteCityCard=()=>{
        this.props.delete (this.props.key1)
    }

    render() {
        
        // console.log(this.props)
        return (
        
        <div>

            <h2> {this.props.name}</h2>
            <h3> {this.props.population}</h3>
            
            <input value={this.state.mInValue} onChange={this.moveInValue} type="number"></input>
            <button onClick={this.moveInCityCard}>Move In Population: </button><br/>
            
            <input value={this.state.mOutValue} onChange={this.moveOutValue} type="number"></input>
            <button onClick={this.moveOutCityCard}>Move Out Population: </button><br/>
            
            <button onClick={this.deleteCityCard}>Remove City</button>

            
        </div>
        )
    }
}
export default CityCard;