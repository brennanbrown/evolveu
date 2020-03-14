const prov = {"AB":"Alberta", 
              "BC":"British Columbia",
              "MB":"Manitoba",
              "NB":"New Brunswick",
              "NL":"Newfoundland and Labrador",
              "NS":"Nova Scotia",
              "ON":"Ontario",
              "PEI": "Prince Edward Island",
              "QB":"Quebec",
              "SK":"Saskatchewan"};

const dict = {
    findProvinceFromAbb: (abb) =>  {
        // .entries() returns an array of an object's
        //  own enumerable, string-keyed property 
        //  [key, value] pairs, in the order provided.
        let result = abb.toUpperCase();
        for (let [key, value] of Object.entries(prov)) {
            // If a key matches the given abbreviation, it
            // will return the corresponding value/name.
            if (key == result) {
                var provName = value;
                return provName;
            }
        }
        for (let [key, value] of Object.entries(prov)) {
            if (key != abb) {
                return "error!"
            }
        }
    }
}

export default dict;

// function dictWrite(provName) {
//     document.getElementById("dictDisplay").innerHTML = provName;
//     return null;
// }

// function errorWrite() {
//     document.getElementById("dictDisplay").innerHTML = "Error!";
//     return undefined;
// }