import stuff from './comunitycity.js';


const divReference = document.getElementById('cardList')
const theCommunity = new stuff.Community();
// theCommunity. getCitiesfromServer();
addEventListener("load", myloadScript());
async function myloadScript() {
    await theCommunity.getCitiesfromServer();
    // console.log(theCommunity);
    let cards = theCommunity.cities.map(tempcity => tempcity.show())
    //    console.log(cards);
    //    console.log( typeof cards);
    cards.forEach(thediv => {
        divReference.appendChild(thediv);
    });
    updateGUI();
}
// updateGUI();

document.body.addEventListener('click', async e => {


    const el = e.target;
    const elID = el.id;
    const todo = el.getAttribute("todo");
    const key = el.getAttribute("key");

    if (todo === "register") {
        console.log(theCommunity)
        let newKey = await theCommunity.createCityfromWebPage(idCityName.value, idCityLat.value, idCityLong.value, idCityPopulation.value);

        console.log(newKey);
        let newCity = theCommunity.findCity(newKey);
        console.log(newCity);
        divReference.appendChild(newCity.show());
        idCityName.value = "";
        idCityLat.value = "";
        idCityLong.value = "";
        idCityPopulation.value = "";
        console.log(theCommunity);
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
            // console.log(theCommunity)
        
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









// theCommunity.createCity ('Edmonton',53.5461,113.4938,981280,divReferenceTest)
// theCommunity.createCity ('Calgary',51.0447,114.0719, 1547484,divReferenceTest);
// console.log(theCommunity);
// console.log( theCommunity.cities.length)
// console.log(theCommunity.getCitiesfromServer)
// theCommunity.getMostNorthen();
// theCommunity.updateWebPage(divReferenceTest);
// console.log(newCommunity)
// theCommunity.getMostSouthern();
// console.log(theCommunity.findMaxKey());
// newComunity.stuff.findMaxKey();

// theCommunity.createCity ( 'Airdrie', 51.2927,114.0134, 68091,divReferenceTest);
// console.log( theCommunity.counter);
// console.log(updateCommunity);
// console.log(theCommunity.counter)
// theCommunity.updatecounter ();
// let theCities= await theCommunity.getCities();
// let data=stuff.fetchCities.getCities();

// 
// console.log (data);

// const allAccounts = new ooStuff.AccountController();
// console.log(allAccounts);

// document.body.addEventListener("click", e => {

//     const divReference = document.getElementById("idcontainerLeft");
//     const el = e.target;
//     const elID = el.id;
//     const todo = el.getAttribute("todo");
//     const key = el.getAttribute("key");

//     if (todo === "register") 
//     {
//         allAccounts.createAccount(idaccountN.value, idstartingB.value, divReference);
//         idaccountN.value = "";
//         idstartingB.value = "";
//     }

//     if (key) 
//     {
//         const showAccount = allAccounts.getAccount(key);
//         idcurrentAccount.value = showAccount.accountName;
//         idcurrentBalance.value = showAccount.balance;
//     }

//     if (todo === "deposite") {
//         // if (typeof (idcurrentAccount.value) === "string" && allAccounts.findAccount(idcurrentAccount.value));
//         // {
//             let ourAccount1 = allAccounts.findAccount(idcurrentAccount.value);
//             allAccounts.depositeIT(idcurrentAccount.value, iddepositeNow.value);
//             idcurrentBalance.value = ourAccount1.balance;
//         // }
//         iddepositeNow.value = "";
//     }
//     if (todo === "withdraw") {
//         // if (typeof (idcurrentAccount.value) === "string" && allAccounts.findAccount(idcurrentAccount.value));
//         // {
//             let ourAccount2 = allAccounts.findAccount(idcurrentAccount.value);
//             allAccounts.withdrawIT(idcurrentAccount.value, idwithdrawNow.value);
//             idcurrentBalance.value = ourAccount2.balance;
//         // }
//         idwithdrawNow.value = "";
//     }

//     if (todo === "delete") {
//         if (typeof (idcurrentAccount.value) === "string" && allAccounts.findAccount(idcurrentAccount.value));
//         {
//             allAccounts.deleteAccount(idcurrentAccount.value, divReference);
//         }
//         idcurrentAccount.value = "";
//         idcurrentBalance.value = "";
//         iddepositeNow.value = "";
//         idwithdrawNow.value = "";
//     }
//     if (todo) {
//         idTotalBalance.value = allAccounts.accountSummary()[0];
//         idAccountsNumber.value = allAccounts.accountSummary()[1];
//         idLowestValueName.value = allAccounts.accountSummary()[2];
//         idLowestValueMoney.value = allAccounts.accountSummary()[3];
//         idHighestValueName.value = allAccounts.accountSummary()[4];
//         idHighestValueMoney.value = allAccounts.accountSummary()[5];
//     }

// });
