import React, { Component } from "react"
import CityCard from "./CityCard.js"
import comunitycity from "./comunitycity.js"

let x = new comunitycity.Community();

function get(id) {
    return document.getElementById(id).value;
}
function whichSphere(latitude) {
    
    if (latitude > 0) {
        return "in the Northern Hemisphere.";
    }
    else if (latitude < 0) {
        return "in the Southern Hemisphere.";
    }
    else return "on the Equator.";
}

function populationSize(cityPopulation) {
    if (cityPopulation < 0) {
        return "[Error! Negative Population]";
    }
    else if (cityPopulation === 0) {
        return "Ghost Town"
    }
    else if (cityPopulation >= 1 && cityPopulation < 100) {
        return "Hamlet"
    }
    else if (cityPopulation >= 100 && cityPopulation < 1000) {
        return "Village";
    }
    else if (cityPopulation >= 1000 && cityPopulation < 20000) {
        return "Town";
    }
    else if (cityPopulation >= 20000 && cityPopulation <= 100000) {
        return " Large Town";
    }
    else if (cityPopulation <= 100000) {
        return "City";
    }
    else {
        return "[Error! Undefined]";
    }
}

class CityCTRL extends Component {
    
    constructor(props) {
        super(props)
        this.moveInPopulation = this.moveInPopulation.bind(this);
        this.moveOutPopulation = this.moveOutPopulation.bind(this);
        this.delete = this.delete.bind(this);
        this.state = {
            x: x,
            populationArray: [0, 0],
            northernArray: [0, "cityName"],
            southernArray: [0, "cityName"]
        }
        
    }
    async loadScript() {
        await x.getCitiesfromServer();
        this.CreateReactComponents();
    }
    componentDidMount() {
        
        this.loadScript();
        this.CreateReactComponents();
    }
    
    async mySave() {
        const cityName = get("idCityName");
        const cityPopulation = get("idCityPopulation");
        const cityLat = get("idCityLat");
        const cityLong = get("idCityLong");
        const cityHemisphere = whichSphere(cityLat);
        const citySize=populationSize(cityPopulation);
        await x.createCityfromWebPage(cityName, cityLat, cityLong, cityPopulation,cityHemisphere,citySize);
        await this.CreateReactComponents();
    }
    
    CreateReactComponents = () => {
        // this.state.x.cities;
        let array1 = []
        let size = x.cities.length;
        for (let i = 0; i < size; i++) {
            array1.push(
                <CityCard
                // "key" is a reserved word, 
                // so use "key1" if access is required.
                key={x.cities[i].key}
                key1={x.cities[i].key}
                name={x.cities[i].name}
                latitude={x.cities[i].latitude}
                longitude={x.cities[i].longitude}
                population={x.cities[i].population}
                hemisphere={x.cities[i].hemisphere}
                communitySize={x.cities[i].communitySize}
                moveInPopulation={this.moveInPopulation}
                moveOutPopulation={this.moveOutPopulation}
                delete= {this.delete}
                />
                )
            }
            this.setState({ cities: array1 })
        }
        
        clickMe = (e) => {
            const todo = e.target.getAttribute("todo")
            if (todo === "register") {
                this.mySave();
                this.cityPopulation();
                this.cityNorthern();
                this.citySouthern();
            }
        }
        
        async  moveInPopulation (key1, pop) {
            await this.state.x.addPopulation(key1, pop)
            this.CreateReactComponents();
            this.cityPopulation();
            this.cityNorthern();
            this.citySouthern();
        }
        
        async moveOutPopulation (key1, pop) {
            await this.state.x.subtractPopulation(key1,pop)
            this.CreateReactComponents();
            this.cityPopulation();
            this.cityNorthern();
            this.citySouthern();
            
            
        }
        
        async delete (key1) {
            await  this.state.x.deleteCity(key1)
            this.CreateReactComponents();
            this.cityPopulation();
            this.cityNorthern();
            this.citySouthern();
        }

        async cityPopulation () {
            const totalPopulation = this.state.x.getPopulation();
            this.setState({ populationArray: totalPopulation })
        }
        
        cityNorthern = () => { 
            const cNorthern = this.state.x.getMostNorthen(); 
            this.setState({ northernArray: cNorthern })
        }
        
        citySouthern = () => {
            const cSouthern = this.state.x.getMostSouthern();
            this.setState({ southernArray: cSouthern })
        }
        
        render() {
            return (
                <div onClick={this.clickMe}>
                <p>Application #4 is Cities and Population</p><br/>

                <p><strong>Total Population: </strong>{this.state.populationArray[0]}</p>
                <p><strong>Total Number of Cities: </strong>{this.state.populationArray[1]} </p>
                
                <p><strong>Most Northern City: </strong>{this.state.northernArray[1]} </p>
                
                <p><strong>Most Southern City: </strong>{this.state.southernArray[1]} </p>
                
                <h3>City Creation</h3>
                <div className="city">
                <div><label>City Name: </label>
                    <input type="text" id="idCityName" required /></div>
                <div><label>Population: </label>
                    <input type="number" id="idCityPopulation" required /></div>
                <div><label>City Latitude: </label>
                    <input type="number" id="idCityLat" required /></div>
                <div><label>City Longitude: </label>
                    <input type="number" id="idCityLong" required /></div>
                </div>
                <button className="city-button" todo="register">Create City </button>
                {this.state.cities}
                </div>
                )
            }
        }
        
        export default CityCTRL;