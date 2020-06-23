import React, { Component }  from "react"

class CityCard extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            mInValue: 0,
            mOutValue: 0,
            // hemisphere: ""
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
    // sphereInCard =()=>{
    //     this.props.citySphere(this.props.key1)
        
    // }
    // sphere =() =>{
    //     console.log ("from sphere");
    //     if (this.props.latitude > 0) {
    //         this.setState({hemisphere: "Northern"});
    //     } else {
    //         this.setState({hemisphere: "Southern"});
    //     }
    // }

    /*

    sphereCall = () => {
        this.setState({hemisphere: this.props.latitude});
    }

    it has to be a function in the parent class, and be this.props.hemisphere

    */

    render() {
        
        // console.log(this.props)
        // console.log(this.sphere);
        // console.log(this.state.hemisphere);
        return (
        <div>
            <h2> City Name: {this.props.name} </h2>
            <h3> The City Population is {this.props.population} & it is a {this.props.communitySize}.</h3>
            <h3> This city is located at latitude of {this.props.latitude} degrees and
            longitude of {this.props.longitude} degrees.</h3>
            <h3>{this.props.name} is {this.props.hemisphere}</h3>
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