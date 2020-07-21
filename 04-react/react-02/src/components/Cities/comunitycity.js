
class Community {
    
    constructor() {
        this.cities = [];
        this.counter = 1;
    }
    
    nextKey() {
        return `${this.counter++}`;
    }
    
    findCity(key) {
        return this.cities.find(city => city.key === key);
    }

    whichSphere(key) {
        const thisCity = this.findCity(key);
        if (thisCity.latitude > 0) {
            return "Northern";
        }
        else if (thisCity.latitude < 0) {
            return "Southern";
        }
        else if (thisCity.latitude === 0) {
            return "Equator";
        }
        else return "NotValid"
    }

    getMostNorthen() {
        const sumNorthen = [0,"cityName"];
        if (this.cities.length === 0) {
            alert("Error! You are deleting the last city. Please create a new city.");
        } else {
            const allLatitudes = this.cities.map(temp => ({ "key": temp.key, "latitude": temp.latitude }));
            const Latitudes = allLatitudes.map(c => c.latitude);
            const maxLatitude = Math.max.apply(Math, Latitudes);
            const MNorthenCity = this.cities.find(x => x.latitude === maxLatitude);
            sumNorthen[0] = maxLatitude;
            sumNorthen[1] = MNorthenCity.name;
        }
        return sumNorthen;
        
    }
    getMostSouthern() {
        const sumSouthern = [0,"cityName"];
        if (this.cities.length === 0) {
            alert("Error! You are deleting the last city. Please create a new city.");
        } else {
            const southLatitudes = this.cities.map(tempSouth => ({ "key": tempSouth.key, "latitude": tempSouth.latitude }));
            const sLatitudes = southLatitudes.map(d => d.latitude);
            const minLatitude = Math.min.apply(Math, sLatitudes);
            const MSouthernCity = this.cities.find(y => y.latitude === minLatitude);
            sumSouthern[0] = minLatitude;
            sumSouthern[1] = MSouthernCity.name;
        }
        return sumSouthern;
    }
    
    getPopulation() {
        const totalCities = [0,0];
        if (this.cities.length === 0) {
            alert("Error! You are deleting the last city. Please create a new city.");
        } else {
            const allPop = this.cities.map(tempall => ({ "key": tempall.key, "population": tempall.population }));
            const pops = allPop.map(f => f.population);
            totalCities[0] = pops.reduce((total, num) => total + num, 0);
            
            totalCities[1] = this.cities.length;
        }
        return totalCities;
    }
    
    async createCityfromWebPage(name, latitude, longitude, population, hemisphere, communitySize) {
        let key = String(this.nextKey());
        const newCity = new City(key, name, latitude, longitude, population, hemisphere, communitySize);
        this.cities.push(newCity);
        await fetchCities.postData(fetchCities.url + "add", newCity);
        return newCity;
    }
    
    async deleteCity(key) {
        const deletedCity = this.cities.find(x => x.key === key);
        const deletedIndex = this.cities.indexOf(this.cities.find(x => x.key === key));
        await fetchCities.postData(fetchCities.url + "delete", { "key": deletedCity.key });
        this.cities.splice(deletedIndex, 1);
    }
    async getCitiesfromServer() {
        let newData = await fetchCities.postData(fetchCities.url + "all")
        this.cities = newData.map(city => new City(city.key, city.name, city.longitude, city.latitude, city.population, city.hemisphere, city.communitySize))
        this.counter = (this.cities.length) + 1;
        return this;
    }
    async addPopulation(key1, increasePop) {
        const currentCity1 = this.findCity(key1);
        const cc1 = new City(currentCity1.key, currentCity1.name, currentCity1.latitude, currentCity1.longitude, currentCity1.population);
        if (increasePop >= 0) {
            cc1.moveIn(Number(increasePop));
            currentCity1.population = Number(cc1.population);
            await fetchCities.postData(fetchCities.url + "update", {
                "key": String(currentCity1.key), 
                "name": currentCity1.name, 
                "latitude": currentCity1.latitude, 
                "longitude": currentCity1.longitude,
                "population": Number(currentCity1.population) });
            return currentCity1;
        }
        else if (increasePop < 0) { alert("Population must be positive!"); }
    }

    async subtractPopulation(key, decreasePop) {
        const currentCity2 = this.findCity(key);
        const cc2 = new City(currentCity2.key, currentCity2.name, currentCity2.latitude, currentCity2.longitude, currentCity2.population);
        
        if (decreasePop >= 0) {
            cc2.moveOut(Number(decreasePop));
            currentCity2.population = Number(cc2.population);
            await fetchCities.postData(fetchCities.url + "update", { 
                "key": String(currentCity2.key), 
                "name": currentCity2.name, 
                "latitude": currentCity2.latitude, 
                "longitude": currentCity2.longitude, 
                "population": Number(currentCity2.population) });
            return currentCity2;
        }
        else if (decreasePop < 0) { alert("Population must be positive!"); }
    }

    updateDisplay() {
        let summaries = [];
        summaries[0] = this.getPopulation()[0];
        summaries[1] = this.getPopulation()[1];
        summaries[2] = this.getMostNorthen()[0];
        summaries[3] = this.getMostNorthen()[1];
        summaries[4] = this.getMostSouthern()[0];
        summaries[5] = this.getMostSouthern()[1];
        return summaries;
    }
}

class City {
    
    constructor(key, name, latitude, longitude, population, hemisphere, communitySize) {
        this.name = String(name);
        this.latitude = parseFloat(latitude);
        this.longitude = parseFloat(longitude);
        this.population = Number(population);
        this.hemisphere = String(hemisphere);
        this.communitySize = String(communitySize);
        this.key = String(key);
    }

    show() {
        const divCardkey = this.key;
        const divCard = document.createElement("div");
        this.divCard = divCard;
        divCard.setAttribute("class", "card");
        divCard.setAttribute("key", divCardkey);
        divCard.innerText = "City: " + this.name + "\n" + "Latitude: " + this.latitude + "\n" + "Longitude: " + this.longitude + "\n" + "Population: " + this.population;
        return divCard;
    }
    
    moveIn(num) {
        return (this.population += num);
    }
    
    moveOut(num) {
        return (this.population -= num);
    }
    
    populationSize() {
        const cityPopulation = this.population;
        if (cityPopulation < 0) {
            return "[Error! Negative Population]";
        }
        else if (cityPopulation == 0) {
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
    
}

const fetchCities = {
    
    url: "http://localhost:5000/",
    
    async postData(url = "", data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: "POST",     // *GET, POST, PUT, DELETE, etc.
            mode: "cors",       // no-cors, *cors, same-origin
            cache: "no-cache",  // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",         // manual, *follow, error
            referrer: "no-referrer",    // no-referrer, *client
            body: JSON.stringify(data)  // body data type must match "Content-Type" header
        });
        
        const json = await response.json();    // parses JSON response into native JavaScript objects
        json.status = response.status;
        json.statusText = response.statusText;
        return json;
    },
}

export default { Community, City, fetchCities }