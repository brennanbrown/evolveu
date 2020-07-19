import { City, Community } from "./geography.js"
import functions from "./fetch.js"

global.fetch = require("node-fetch");
const url = "http://localhost:5000/";

beforeEach(async () => {
    await functions.postData(url + "clear");
})

test("Does the Display function work?", () => {
    let testCity = new City("Banff", 7847, 51.178364, 115.57077);
    expect(testCity.display()).toBe("City: Banff, Population: 7847, Latitude: 51.178364°, Longitude: 115.57077°");
    let testCity2 = new City("Winnipeg", 749534, 49.895138, 97.138374);
    expect(testCity2.display()).toBe("City: Winnipeg, Population: 749534, Latitude: 49.895138°, Longitude: 97.138374°");
});

test("Does the transferIn function work?", () => {
    let testCity = new City("Winnipeg", 49.895138, 97.138374, 749534);
    testCity.transferIn(1);
    expect(testCity.population).toBe(749535);
    testCity.movedIn(10);
    expect(testCity.population).toBe(749545);
    testCity.movedIn(100);
    expect(testCity.population).toBe(749645);
});

test("Does the transferOut function work?", () => {
    let testCity = new City("Winnipeg", 49.895138, 97.138374, 749534);
    testCity.transferOut(2);
    expect(testCity.population).toBe(749532);
    testCity.movedOut(11);
    expect(testCity.population).toBe(749521);
    testCity.movedOut(111);
    expect(testCity.population).toBe(749410);
});

test("Does the Classification function work?", () => {
    let testCity = new City("Winnipeg", 49.895138, 97.138374, 749534);
    expect(testCity.classification()).toBe("City");
    let testLargeTown = new City("Chestermere", 51.0382, 113.8425, 19887);
    expect(testLargeTown.classification()).toBe("Large Town");
    let testTown = new City("Banff", 51.178364, 115.570770, 7847);
    expect(testTown.classification()).toBe("Town");
    let testVillage = new City("Rainbow Lake", 58.4999, 119.3996, 795);
    expect(testVillage.classification()).toBe("Village");
    let testHamlet = new City("Gadsby", 52.2954, 112.3564, 40);
    expect(testHamlet.classification()).toBe("Hamlet");
});

test("Does the createCity function work?", async () => {
    const community = new Community;
    let info = await community.createCity("Chestermere", 51.0382, 113.8425, 19887);
    expect(info.status).toBe(200);
    info = await community.createCity("Winnipeg", 49.895138, 97.138374, 749534);
    expect(info.status).toBe(200);
});

test("Does the getCommunity function work?", async () => {
    const community = new Community;
    let info = await community.createCity("Winnipeg", 49.895138, 97.138374, 749534);
    expect(info.status).toBe(200);
    
    info = await community.getCommunity();
    expect(info[0].name).toBe("Winnipeg");
});

test("Does the getLocalData function work?", async () => {
    const community = new Community;
    let info = await community.createCity("Winnipeg", 49.895138, 97.138374, 749534);
    expect(info.status).toBe(200);
    
    info = await community.getCommunity();
    expect(info[0].name).toBe("Winnipeg");
    
    info = await community.getLocalData();
    expect(info[0].name).toBe("Winnipeg");
});

test("Does the updatePopulation function work?", async () => {
    const community = new Community;
    let info = await community.createCity("Winnipeg", 49.895138, 97.138374, 749534);
    expect(info.status).toBe(200);
    info = await community.getCommunity();
    expect(info[0].name).toBe("Winnipeg");
    
    let testCity = new City("Winnipeg", 49.895138, 97.138374, 749534);
    await community.updatePopulation(testCity);
    let update = await community.getCommunity();
    expect(update[0].population).toBe(849534);
});

test("Does the whichHemiphere function work?", async () => {
    const community = new Community;
    let info = await community.createCity("Winnipeg", 49.895138, 97.138374, 749534);
    expect(info.status).toBe(200);
    info = await community.getCommunity();
    if (info.status == 200)
    expect(community.whichHemiphere("Winnipeg")).toBe("Northern Hemisphere");
});

test("Does the getNorthMost function work?", async () => {
    const community = new Community;
    let info = await community.createCity("Gadsby", 52.2954, 112.3564, 40);
    expect(info.status).toBe(200);
    info = await community.createCity("Rainbow Lake", 58.4999, 119.3996, 795);
    expect(info.status).toBe(200);
    
    expect(await community.getNorthMost()).toBe("Rainbow Lake");
});

test("Does the getSouthMost function work?", async () => {
    const community = new Community;
    let info = await community.createCity("Gadsby", 52.2954, 112.3564, 40);
    expect(info.status).toBe(200);
    info = await community.createCity("Rainbow Lake", 58.4999, 119.3996, 795);
    expect(info.status).toBe(200);
    
    expect(await community.getSouthMost()).toBe("Gadsby");
});

test("Does the getTotalPopulation function work?", async () => {
    const community = new Community;
    let info = await community.createCity("Gadsby", 52.2954, 112.3564, 40);
    expect(info.status).toBe(200);
    info = await community.createCity("Rainbow Lake", 58.4999, 119.3996, 795);
    expect(info.status).toBe(200);
    
    expect(await community.getPopulation()).toBe("835");
});

test("Does the deleteCity function work?", async () => {
    const community = new Community;
    let info = await community.createCity("Gadsby", 52.2954, 112.3564, 40);
    expect(info.status).toBe(200);
    info = await community.createCity("Rainbow Lake", 58.4999, 119.3996, 795);
    expect(info.status).toBe(200);
    
    info = await community.deleteCity("Rainbow Lake");
    expect(info.status).toBe(200);
});

test("Does the isNewCity function work?", async () => {
    const community = new Community;
    let info = await community.createCity("Gadsby", 52.2954, 112.3564, 40);
    expect(info.status).toBe(200);
    info = await community.createCity("Rainbow Lake", 58.4999, 119.3996, 795);
    expect(info.status).toBe(200);
    let duplicateCity = await community.getCommunity();
    if (duplicateCity.status == 200)
    expect(community.isNewCity("Rainbow Lake")).toBe("ERROR");
    expect(community.isNewCity("Edmonton")).toBe("Edmonton");
});

test("Does the isAcoordinate function work?", async () => {
    const community = new Community;
    expect(community.isCoordinate("String Test")).toBe("ERROR");
    expect(community.isCoordinate(52.2954)).toBe(52.2954);
});