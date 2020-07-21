import stuff from "./comunitycity.js";

const divReference = document.getElementById("cardList")
const theCommunity = new stuff.Community();
addEventListener("load", myloadScript());
async function myloadScript() {
    await theCommunity.getCitiesfromServer();
    let cards = theCommunity.cities.map(tempcity => tempcity.show())
    cards.forEach(thediv => {
        divReference.appendChild(thediv);
    });
    updateGUI();
}

document.body.addEventListener("click", async e => {
    const el = e.target;
    const elID = el.id;
    const todo = el.getAttribute("todo");
    const key = el.getAttribute("key");
    
    if (todo === "register") {
        let newKey = await theCommunity.createCityfromWebPage(idCityName.value, idCityLat.value, idCityLong.value, idCityPopulation.value);
        let newCity = theCommunity.findCity(newKey);
        divReference.appendChild(newCity.show());
        idCityName.value = "";
        idCityLat.value = "";
        idCityLong.value = "";
        idCityPopulation.value = "";
        
    }
    if (key) {
        const chosenCity = theCommunity.findCity(key)
        idcurrentCity.value = chosenCity.name;
        idcurrentPopulation.value = chosenCity.population;
        
        idcurrentSphere.value = theCommunity.whichSphere(key);
        idKey.value = key;
    }
    if (todo === "MoveIn") {
        let ourCity1 = theCommunity.findCity(idKey.value);
        await theCommunity.addPopulation(idKey.value, idMoveIn.value)
        idcurrentPopulation.value = ourCity1.population;
    }
    if (todo === "MoveOut") {
        let ourCity2 = theCommunity.findCity(idKey.value);
        await theCommunity.subtractPopulation(idKey.value, idMOveOut.value)
        idcurrentPopulation.value = ourCity2.population;
    }
    if (todo === "delete") {
        await  theCommunity.deleteCity(idKey.value, divReference);
        idcurrentCity.value = "";
        idcurrentPopulation.value = "";
        idKey.value = "";
        idcurrentSphere.value = "";
        idMoveIn.value="";
        idMOveOut.value="";
    }
    if (todo){
        updateGUI();
    }
    
})

function updateGUI() {
    idTotalPop.value = theCommunity.updateDisplay()[0];
    cityNumbers.value = theCommunity.updateDisplay()[1];
    idMinLat.value = theCommunity.updateDisplay()[2];
    idMinCity.value = theCommunity.updateDisplay()[3];
    idMaxLat.value = theCommunity.updateDisplay()[4];
    idMaxCity.value = theCommunity.updateDisplay()[5];
}