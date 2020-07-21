import functions from './fetch.js'

class City {
    
    constructor(name, population, latitude, longitude, key) {
        this.name = name;
        this.population = Number(population);
        this.latitude = Number(latitude);
        this.longitude = Number(longitude);
        this.key = key;
    }
    
    display() {
        try {
            return `City: ${this.name}, Population: ${this.population}, Latitude: ${this.latitude}°, Longitude: ${this.longitude}°`;
        } catch (error) {
            console.error("Error:", error);
        }
    }
    
    transferIn(num) {
        try {
            this.population = this.population + Number(num);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    
    transferOut(num) {
        try {
            this.population = this.population - Number(num);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    
    classification() {
        try {
            if (this.population > 100000) {
                return "City";
            } if (this.population >= 20000 && this.population < 100000) {
                return "Large Town";
            } if (this.population >= 1000 && this.population < 20000) {
                return "Town";
            } if (this.population >= 100 && this.population < 1000) {
                return "Village";
            } else if (this.population >= 1 && this.population < 100) {
                return "Hamlet";
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
}

class Community {
    
    constructor() {
        this.url = 'http://localhost:5000/';
        this.comms = [];
    }
    
    async createCity(city, latitude, longitude, population) {
        try {
            let data = await functions.postData(this.url + 'all');
            let i;
            
            if (data.length === 0) { i = 0 } else {
                i = data.sort((a, b) => { return b.key - a.key });
                i = i[0].key;
            }
            let myCity = new City(city, latitude, longitude, population, i + 1);
            data = await functions.postData(this.url + 'add', myCity);
            if (data.status === 200) {
                return data;
            } return 'SERVER ERROR';
        } catch (error) {
            console.error("Error:", error);
        }
    }
    
    async getCommunity() {
        try {
            let data = await functions.postData(this.url + 'all');
            if (data.length > 0) {
                this.community = [];
                this.community = await JSON.parse(JSON.stringify(data));
                return this.community;
            } return 'SERVER ERROR';
        } catch (error) {
            console.error("Error:", error);
        }
    }
    
    getLocalData() {
        if (this.community.length > 0) {
            return this.community;
        }
    }
    
    async updatePopulation(city) {
        try {
            let data = await functions.postData(this.url + 'all');
            if (data.status === 200) {
                data = await functions.postData(this.url + 'update', { 
                    key: city.key, 
                    name: city.name, 
                    latitude: city.latitude, 
                    longitude: city.longitude, 
                    population: city.population });
                    return data;
                } return 'SERVER ERROR';
            } catch (error) {
                console.error("Error:", error);
            }
        }
        
        whichHemiphere(city) {
            try {
                let myCity = this.community.find(communityCity => communityCity.name === city);
                if (myCity.latitude >= 0) {
                    return "Northern Hemisphere";
                } if (myCity.latitude < 0) {
                    return 'Southern Hemisphere';
                } return 'ERROR';
            } catch (error) {
                console.error("Error:", error);
            }
        }
        
        async getNorthMost() {
            try {
                let data = await functions.postData(this.url + 'all');
                if (data.length > 0) {
                    data = data.sort((a, b) => { return b.latitude - a.latitude });
                    return data[0].name;
                } return 'ERROR';
            } catch (error) {
                console.error("Error:", error);
            }
        }
        
        async getSouthMost() {
            try {
                let data = await functions.postData(this.url + 'all');
                if (data.length > 0) {
                    data = data.sort((a, b) => { return a.latitude - b.latitude });
                    return data[0].name;
                } return 'ERROR';
            } catch (error) {
                console.error("Error:", error);
            }
        }
        
        async getTotalPopulation() {
            try {
                let data = await functions.postData(this.url + 'all');
                if (data.length > 0) {
                    let population = data.map(testCity => testCity.population);
                    population = population.reduce((a, b) => (Number(a) + Number(b)));
                    return Number(pop).toLocaleString();
                } return 'ERROR';
            } catch (error) {
                console.error("Error:", error);
            }
        }
        
        async deleteCity(city) {
            try {
                let data = await functions.postData(this.url + 'all');
                if (data.length > 0) {
                    let myCity = data.find(testCity => testCity.name === city);
                    let i = { key: myCity.key };
                    data = await functions.postData(this.url + 'delete', i);
                    return data;
                } return 'SERVER ERROR';
            } catch (error) {
                console.error("Error:", error);
            }
        }
        
        isNewCity(city) {
            try {
                for (let thisCity in this.community) {
                    if (this.community[thisCity].name === city) {
                        return 'ERROR';
                    }
                } return city;
            } catch (error) {
                console.error("Error:", error);
            }
        }
        
        isCoordinate(num) {
            if (isNaN(num)) {
                return 'ERROR';
            } return num;
        }
    }
    
    export { City, Community };