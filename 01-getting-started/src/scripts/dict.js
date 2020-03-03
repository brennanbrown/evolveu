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
        // The Object.entries() method returns an array of 
        // a given object's own enumerable string-keyed 
        // property [key, value] pairs, in the order provided.
        for (let [key, value] of Object.entries(prov)) {
            // If a key matches the given abbreviation, it
            // will return the corresponding value/name.
            if (key == abb) {
                var provName = value;
                dictWrite(provName);
                return provName;
            }
            else {
                errorWrite();
            }
        }
    }
}

export default dict;

function dictWrite(provName) {
    document.getElementById("dictDisplay").innerHTML = provName;
    return null;
}

function errorWrite() {
    document.getElementById("dictDisplay").innerHTML = "Error!";
    return undefined;
}