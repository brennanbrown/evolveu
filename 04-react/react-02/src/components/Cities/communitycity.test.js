//  npm test shapes -- -t plumb
// Mock fetch globally for testing - requires Flask server on port 5002
global.fetch = jest.fn(() => Promise.resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve({})
}));

import stuff from "./comunitycity.js" ;

const url = "http://localhost:5002/";
test.skip("test that the fetchCity works (requires Flask server)", async () => {
    
    const allCities = [
        {key :"1",name:"Calgary", latitude:51.0447, longitude:114.0719 ,population :1547484} 
        ,{key:"2",name:"Edmonton",latitude:53.5461,longitude:113.4938,population: 981280},
    ]
    
    let data = await stuff.fetchCities.postData(url + "clear");
    data = await stuff.fetchCities.postData(url + "all");
    expect(data.status).toEqual(200);
    expect(data.length).toBe(0);
    data = await stuff.fetchCities.postData(url + "add", allCities[0]);
    expect(data.status).toEqual(200);
    data = await stuff.fetchCities.postData(url + "all");
    expect(data.status).toEqual(200);
    expect(data.length).toBe(1);
    expect(data[0].name).toBe("Calgary");
    data = await stuff.fetchCities.postData(url + "add", allCities[0]);
    expect(data.status).toEqual(400);
    data = await stuff.fetchCities.postData(url + "add", allCities[1]);
    expect(data.status).toEqual(200);
    data = await stuff.fetchCities.postData(url + "all");
    expect(data.status).toEqual(200);
    expect(data.length).toBe(2);
    expect(data[1].name).toBe("Edmonton");
    data = await stuff.fetchCities.postData(url + "read", {key:"1"});
    expect(data.status).toEqual(200);
    expect(data.length).toBe(1);
    expect(data[0].name).toBe("Calgary");
    data = await stuff.fetchCities.postData(url + "update", {key:"1", name:"CALGARY"});
    expect(data.status).toEqual(200);
    data = await stuff.fetchCities.postData(url + "delete", {key:"1"});
    expect(data.status).toEqual(200);
    data = await stuff.fetchCities.postData(url + "delete", {key:"2"});
    expect(data.status).toEqual(200);
    data = await stuff.fetchCities.postData(url + "read", {key:"1"});
    expect(data.status).toEqual(400);
})

test.skip("test the  getCitiesfromServer (requires Flask server)", async () => {
    
    const allCities2 = [
        {key: "1",name:"Calgary", latitude:51.0447, longitude:114.0719 ,population :1547484 } 
        ,{key: "2", name:"Edmonton",latitude:53.5461,longitude:113.4938,population: 981280},
        {key: "3", name:"Innesfail", latitude:52.0274,longitude:113.9502, population:8868}
    ]

    let data = await stuff.fetchCities.postData(url + "clear");
    data = await stuff.fetchCities.postData(url + "all");
    expect(data.status).toEqual(200);
    expect(data.length).toBe(0);
    
    data = await stuff.fetchCities.postData(url + "add", allCities2[0]);
    data = await stuff.fetchCities.postData(url + "add", allCities2[1]);
    data = await stuff.fetchCities.postData(url + "add", allCities2[2]);
    data = await stuff.fetchCities.postData(url + "all");
    
    expect(data.status).toEqual(200);
    
    expect(data.length).toBe(3);
    
    let community1 =new stuff.Community();
    
    await community1.getCitiesfromServer();
    expect (community1.cities.length).toBe(3);
    expect (community1.counter).toBe(4);
    community1.addPopulation("3",3000);
    expect (community1.cities[2].population).toBe(11868);
    community1.subtractPopulation("1",47000);
    expect (community1.cities[0].population).toBe (1500484);
    community1.addPopulation("2",600000 );
    expect (community1.getPopulation()).toStrictEqual([3093632,3]);
    const divReferenceTest1=document.createElement("div");
    
})


test ("test the class City", async() => {
    const city1= new stuff.City("1", "Calgary",51.0447,114.0719, 1547484);
    const city2= new stuff.City("2", "Edmonton",53.5461,113.4938,981280);
    const city3= new stuff.City ("3", "Innesfail", 52.0274,113.9502, 8868)
    const city4= new stuff.City ("4", "Airdrie", 51.2927,114.0134, 68091)
    expect (city1.key).toBe("1");
    
    expect ((city3.population)>0). toBe(true);
    const Card2=city2.show();
    const Card1 =city1.show();
    expect (Card1.innerText).toBe ("City: Calgary"+"\n"+" Latitude: 51.0447" +"\n"+" Longitude: 114.0719"+"\n"+ " Population: 1547484");
    city4.moveIn(50000)
    expect (city4.population).toBe(118091);
    city2.moveOut(2000);
    expect (city2.population).toBe(979280);
    city1.moveOut(10000);
    city1.moveIn(7000);
    expect (city1.population). toBe(1544484);
    expect (city1.populationSize()).toBe("City");
    expect (city3.populationSize()).toBe ("Town");
})

test.skip("test Community (requires Flask server)", async() => {
    const divReferenceTest=document.createElement("div");
    const thecities= new stuff.Community();
    expect(thecities.counter).toBe (1);
    
    await thecities.createCityfromWebPage ("Calgary",51.0447,114.0719, 1547484);
    expect (thecities.cities.length).toBe (1);

    await thecities.createCityfromWebPage("Edmonton",53.5461,113.4938,981280);
    expect (thecities.cities[1].name).toBe("Edmonton");
    expect (thecities.cities[0].population).toBe(1547484);
    expect (thecities.nextKey()).toBe("3");
    
    await thecities.createCityfromWebPage ("Innesfail", 52.0274,113.9502, 8868);
    expect(thecities.findCity("3").latitude).toBe(52.0274);
    expect (thecities.whichSphere("1")).toBe("Northern");
    expect (thecities.getMostNorthen()).toStrictEqual([53.5461,"Edmonton"]);
    expect (thecities.getMostSouthern()).toStrictEqual([51.0447,"Calgary"]);

    const all=thecities.getPopulation();
    expect (all[1]).toBe(3);
    expect(all[0]).toBe(2537632);
    
    await thecities.deleteCity("3");
    expect (thecities.cities.length).toBe(2);
    expect (thecities.nextKey()).toBe ("4")
})

test ("130E Object reference", () => {
    const myCity = new stuff.City (4, "Red Deer", 52.26, 113.81, 128000);
    const myFav = myCity;
    
    expect(myCity.population).toBe(128000);
    expect(myFav.population).toBe(128000);
    myCity.moveIn(2500);
    
    expect(myCity.population).toBe(130500);
    expect(myFav.population).toBe(130500);
    
    myFav.moveOut(500);
    expect(myCity.population).toBe(130000);
    expect(myFav.population).toBe(130000);
});