import functions from "./fetch.js"
global.fetch = require("node-fetch");

// Created via: https://mockaroo.com/
const dummyData = [{
    "id": 1,
    "first_name": "Danni",
    "last_name": "Bastistini",
    "email": "dbastistini0@arstechnica.com",
    "gender": "Female",
    "ip_address": "214.117.237.73"
}, {
    "id": 2,
    "first_name": "Cyb",
    "last_name": "Vant",
    "email": "cvant1@ucoz.ru",
    "gender": "Female",
    "ip_address": "56.138.55.176"
}, {
    "id": 3,
    "first_name": "Trever",
    "last_name": "Lacelett",
    "email": "tlacelett2@wordpress.com",
    "gender": "Male",
    "ip_address": "181.60.155.89"
}, {
    "id": 4,
    "first_name": "Olly",
    "last_name": "Brellin",
    "email": "obrellin3@google.it",
    "gender": "Male",
    "ip_address": "144.81.248.43"
}, {
    "id": 5,
    "first_name": "Rene",
    "last_name": "Munkton",
    "email": "rmunkton4@prweb.com",
    "gender": "Male",
    "ip_address": "187.14.246.95"
}, {
    "id": 6,
    "first_name": "Minnnie",
    "last_name": "Maylour",
    "email": "mmaylour5@paypal.com",
    "gender": "Female",
    "ip_address": "127.80.2.150"
}, {
    "id": 7,
    "first_name": "Atlante",
    "last_name": "Corn",
    "email": "acorn6@dion.ne.jp",
    "gender": "Female",
    "ip_address": "82.234.232.170"
}, {
    "id": 8,
    "first_name": "Yancy",
    "last_name": "Shortin",
    "email": "yshortin7@1688.com",
    "gender": "Male",
    "ip_address": "245.148.197.176"
}]

test("Does the retrieveNames function work?", () => {
    expect(functions.retrieveNames(dummyData, 0)).toBe("Danni");
    expect(functions.retrieveNames(dummyData, 1)).toBe("Cyb");
    expect(functions.retrieveNames(dummyData, 2)).toBe("Trever");
});

test("Does the retrieveAllNames function work?", () => {
    expect(functions.retrieveAllNames(dummyData)).toStrictEqual(["Danni", "Cyb", "Trever", "Olly", "Rene", "Minnnie", "Atlante", "Yancy"]);
});

test("Does the retrieveAllNames function work?", () => {
    let dummyData = functions.infoTestFunc();
    expect(dummyData.length).toBe(9);

});