import React, { Component } from "react"
import CityCard from "./CityCard.js"
import comunitycity from './comunitycity.js'


let x = new comunitycity.Community();
// const city1= new comunitycity.City ("Calgary", "1200000","51", "114" )
// x.cities.push(city1);

function get(id) {
    return document.getElementById(id).value;
}
class CityCTRL extends Component {

    constructor(props) {
        super(props)
        this.moveInPopulation = this.moveInPopulation.bind(this);
        this.moveOutPopulation = this.moveOutPopulation.bind(this);
        this.delete = this.delete.bind(this);
        this.state = {
            x: x,
            // in population array the 0 is the total population and the next is
            // the number of cities
            populationArray: [0, 0],
            northernArray: [0, "cityName"],
            southernArray: [0, "cityName"]
        }
        
    }
  async loadScript() {
    await x.getCitiesfromServer();
    this.CreateReactComponents();
    // console.log(theCommunity);
    // let cards = x.cities.map(tempcity => tempcity.show())
  }
    componentDidMount() {
        console.log("in component")
        this.loadScript();
        this.CreateReactComponents();
    }
   
    // componentDidUpdate(prevProps,prevState,SS){
    //     console.log('Update:', prevState.x);
    //     console.log(this.state.x)
    //     if (prevState.x.cities === this.state.x.cities){ 
            
    //         // this.loadScript();
    //         this.CreateReactComponents();
    //     }
    // }
      

    async mySave() {

        const cityName = get("idCityName");
        const cityPopulation = get("idCityPopulation");
        const cityLat = get("idCityLat");
        const cityLong = get("idCityLong");
        const theCity = await x.createCityfromWebPage(cityName, cityLat, cityLong, cityPopulation);
        await this.CreateReactComponents();
    }

    CreateReactComponents = () => {
        let cards = this.state.x.cities;
        console.log(cards);
        // const listCards= cards.map(card) =>
        // <AccountCard key={cards.key} accountName={cards.accountName} balance={cards.balance}>
        // return {listCards}
        // <
        let array1 = []
        let size = x.cities.length;
        // console.log("Checking length of accountCards: ", size, this.state.accountCards);
        for (let i = 0; i < size; i++) {
            array1.push(
                <CityCard

                    key={x.cities[i].key}
                    key1={x.cities[i].key}
                    //key is a reserved word, so use key1 if access is required.
                    name={x.cities[i].name}
                    latitude={x.cities[i].latitude}
                    longitude={x.cities[i].longitude}
                    population={x.cities[i].population}
                    moveInPopulation={this.moveInPopulation}
                    moveOutPopulation={this.moveOutPopulation}
                    delete= {this.delete}
                // deposit ={this.deposit}
                // withdraw = {this.withdraw}
                // delete = {this.delete}

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
        // if/else
        const movingPeople =  await this.state.x.addPopulation(key1, pop)
        // const changingAccountCards = this.state.x.accountCards.find(x => x.key === key1);
        // (this.state.x.accountCards.find(x => x.key === key1)).balance=changingAccount.balance
        // changingAccount.accountDeposite(amt)
        console.log(`move In ${pop} to`);        // changingAccountCards.balance=changingAccount.balance




        console.log(movingPeople);
        this.CreateReactComponents();
        this.cityPopulation();
        this.cityNorthern();
        this.citySouthern();
    }

    async moveOutPopulation (key1, pop) {
        // if/else
        const movingPeople1 = await this.state.x.subtractPopulation(key1,pop)
        // const changingAccountCards1 = this.state.x.accountCards.find(x => x.key === key1);
        // (this.state.x.accountCards.find(x => x.key === key1)).balance=changingAccount.balance
        // movingPeople1.moveOut(pop);
        // changingAccountCards.balance=changingAccount.balance
        console.log(`moved out ${pop} to`);
        console.log(movingPeople1);
        this.CreateReactComponents();
        this.cityPopulation();
        this.cityNorthern();
        this.citySouthern();


    }

    async delete (key1) {
      await  this.state.x.deleteCity(key1)
        // const deleteIndex = this.state.x.accountsHolder.indexOf(deletedAccount);
        // this.state.x.accountsHolder.splice(deleteIndex, 1);
        // this.state.x.accountCards.splice(deleteIndex, 1);
        this.CreateReactComponents();
        this.cityPopulation();
        this.cityNorthern();
        this.citySouthern();

    }

    async cityPopulation () {
        console.log("from total pop, most N/S")
        const totalPopulation = this.state.x.getPopulation();
        console.log(totalPopulation)

        this.setState({ populationArray: totalPopulation })
        // this.CreateReactComponents();
    }
    
    cityNorthern = () => {
        console.log("from city Northern, most N/S")
        const cNorthern = this.state.x.getMostNorthen();
        console.log(cNorthern)

        this.setState({ northernArray: cNorthern })
        // this.CreateReactComponents();
    }

    citySouthern = () => {
        console.log("from city southern")
        const cSouthern = this.state.x.getMostSouthern();
        console.log(cSouthern)

        this.setState({ southernArray: cSouthern })
        // this.CreateReactComponents();
    }

    render() {

        return (
            
            <div onClick={this.clickMe}>

                <p><strong>Total Population:</strong>{this.state.populationArray[0]}</p>
                <p><strong>Total Number of Cities:</strong>{this.state.populationArray[1]} </p>

                    <p><strong>Most Northern City:</strong>{this.state.northernArray[1]} </p>

                    <p><strong>Most Southern City:</strong>{this.state.southernArray[1]} </p>

                    <h3>City Creation</h3>
                    <div><label>City Name: </label><input type="text" id="idCityName" required /></div>
                    <div><label>Population: </label><input type="number" id="idCityPopulation" required /></div>
                    <div><label>City Latitude: </label><input type="number" id="idCityLat" required /></div>
                    <div><label>City Longitude: </label><input type="number" id="idCityLong" required /></div>
                    <button todo="register">Create City </button>
                    {this.state.cities}
            </div>
            )
        }
}

export default CityCTRL;