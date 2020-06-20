
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
        const sumNorthen = [];
        const allLatitudes = this.cities.map(temp => ({ "key": temp.key, "latitude": temp.latitude }));
        // console.log (allLatitudes)
        const Latitudes = allLatitudes.map(c => c.latitude);
        // console.log(Latitudes);
        const maxLatitude = Math.max.apply(Math, Latitudes);
        const MNorthenCity = this.cities.find(x => x.latitude === maxLatitude);
        sumNorthen[0] = maxLatitude;
        sumNorthen[1] = MNorthenCity.name;
        // console.log (sumNorthen);
        return sumNorthen;
    }
    getMostSouthern() {
        const sumSouthern = [];
        // console.log(this.cities);
        const southLatitudes = this.cities.map(tempSouth => ({ "key": tempSouth.key, "latitude": tempSouth.latitude }));
        // console.log(southLatitudes)
        const sLatitudes = southLatitudes.map(d => d.latitude);
        // console.log(sLatitudes);
        const minLatitude = Math.min.apply(Math, sLatitudes);
        const MSouthernCity = this.cities.find(y => y.latitude === minLatitude);
        // console.log(MSouthernCity)
        sumSouthern[0] = minLatitude;
        sumSouthern[1] = MSouthernCity.name;
        // console.log(sumSouthern);
        return sumSouthern;
    }

    getPopulation() {
        const totalCities = [];
        const allPop = this.cities.map(tempall => ({ "key": tempall.key, "population": tempall.population }));
        const pops = allPop.map(f => f.population);
        totalCities[0] = pops.reduce((total, num) => total + num, 0);
        console.log('hello from getPopulation', totalCities);
        // allSummeries[0] = allBalances.reduce((total, num) => total + num, 0);
        totalCities[1] = this.cities.length;
        return totalCities;
    }

   async createCityfromWebPage(name, latitude, longitude, population) {

        let key = String(this.nextKey());


        const newCity = new City(key, name, latitude, longitude, population);
        console.log(key);
        this.cities.push(newCity);
        await fetchCities.postData (fetchCities.url+'add', newCity);

        return newCity;
    }

    async deleteCity(key) {
        const deletedCity = this.cities.find(x => x.key === key);
        const deletedIndex = this.cities.indexOf(this.cities.find(x => x.key === key));
        // const deleteKey = this.cities.find(x => x.accountName === name).key;
        // const deleteddiv = deletedCity.divCard;

        // deleteddiv.parentNode.removeChild(deleteddiv);
        await fetchCities.postData(fetchCities.url + 'delete', {"key":deletedCity.key});

        this.cities.splice(deletedIndex, 1);
    }
    async getCitiesfromServer() {
        //  const thisnode=node;
        let newData = await fetchCities.postData(fetchCities.url + 'all')
        console.log(newData);

        this.cities = newData.map(city => new City(city.key, city.name, city.longitude, city.latitude, city.population))
        console.log(this.cities);
        this.counter = (this.cities.length) + 1;
        console.log(this.counter)
       
        return this;
    }
    async addPopulation (key1, increasePop) {
        const currentCity1 = this.findCity(key1);
        console.log(currentCity1);
        const cc1 = new City (currentCity1.key, currentCity1.name, currentCity1.latitude, currentCity1.longitude, currentCity1.population);
        console.log (cc1);
        if ( increasePop>= 0) {
            
            cc1.moveIn(Number(increasePop));
            currentCity1.population = Number(cc1.population);
            // currentCity1.divCard.innerText = "City: " + currentCity1.name + '\n' + 'Latitude: ' + currentCity1.latitude +'\n' +'Longitude: '+ currentCity1.longitude +
            // '\n'+ "Population: "+ currentCity1.population;
            await fetchCities.postData(fetchCities.url + 'update', {"key":String(currentCity1.key), "name" :currentCity1.name, "latitude" :currentCity1.latitude, "longitude" : currentCity1.longitude, "population": Number(currentCity1.population)});
            return currentCity1;
        }
        else if (increasePop < 0) { alert('deposite must be positive!'); }
    }
    
    async subtractPopulation (key, decreasePop) {
        const currentCity2 = this.findCity(key);
        console.log(currentCity2);
        const cc2 = new City (currentCity2.key, currentCity2.name, currentCity2.latitude, currentCity2.longitude, currentCity2.population);
        console.log (cc2);
        if (decreasePop >= 0) {
            
            cc2.moveOut(Number(decreasePop));
            currentCity2.population = Number(cc2.population);
            // currentCity2.divCard.innerText = "City: " + currentCity2.name + '\n' + 'Latitude: ' + currentCity2.latitude +'\n' +'Longitude: '+ currentCity2.longitude +
            // '\n'+ "Population: "+ currentCity2.population;
            await fetchCities.postData(fetchCities.url + 'update', {"key":String(currentCity2.key), "name" :currentCity2.name,"latitude" :currentCity2.latitude, "longitude" : currentCity2.longitude, "population": Number(currentCity2.population)});
            return currentCity2;
        }
        else if (decreasePop < 0) { alert('deposite must be positive!'); }
    }
    updateDisplay() {
       let summeries=[];
      summeries[0]  =this.getPopulation()[0];
      summeries[1]  =this.getPopulation()[1];
      summeries[2]  =this.getMostNorthen()[0];
      summeries[3]  =this.getMostNorthen()[1];
      summeries[4]  =this.getMostSouthern()[0];
      summeries[5]  =this.getMostSouthern()[1];
      return summeries;

    }
    
}

class City {

    constructor(key, name, latitude, longitude, population) {

        this.name = String(name);
        this.latitude = parseFloat(latitude);
        this.longitude = parseFloat(longitude);
        this.population = Number(population);
        this.key = String(key);
    }
    show() {
        const divCardkey = this.key;
        const divCard = document.createElement("div");
        this.divCard = divCard;
        divCard.setAttribute("class", "leftCard");
        divCard.setAttribute("key", divCardkey);
        divCard.innerText = "City: " + this.name + '\n' + 'Latitude: ' + this.latitude + '\n' + 'Longitude: ' + this.longitude + '\n' + 'Population: ' + this.population;
        return divCard;
    }

    moveIn(num) {

        return (this.population += num);
    }
    moveOut(num) {
        return (this.population -= num);
    }

    howBig() {
        const thepopulation = this.population;
        if (thepopulation > 1 && thepopulation < 100) {
            return "Hamlet"
        }
        if (thepopulation >= 100 && thepopulation < 1000) {
            return "Village";
        }
        if (thepopulation >= 1000 && thepopulation < 20000) {
            return "Town";
        }
        if (thepopulation >= 20000 && thepopulation <= 100000) {
            return " Large Town";
        }
        if (thepopulation > 100000) {
            return "City";
        }
    }

}
const fetchCities = {

    url: 'http://localhost:5000/',

    async postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST',     // *GET, POST, PUT, DELETE, etc.
            mode: 'cors',       // no-cors, *cors, same-origin
            cache: 'no-cache',  // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow',         // manual, *follow, error
            referrer: 'no-referrer',    // no-referrer, *client
            body: JSON.stringify(data)  // body data type must match "Content-Type" header
        });

        const json = await response.json();    // parses JSON response into native JavaScript objects
        json.status = response.status;
        json.statusText = response.statusText;
        // console.log(json, typeof(json));
        return json;
    },
}
export default { Community, City, fetchCities }