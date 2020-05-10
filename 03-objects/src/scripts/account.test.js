import { Account, AccountController } from "./account.js"

test("Does the Account function work?", () => {
    let myAccount = new Account("Chequing", 40);
    expect(myAccount.name).toBe("Chequing");
    expect(myAccount.balance).toBe(40);
    expect(myAccount).toEqual({ "name": "Chequing", "balance": 40 });
});

test("Does the Deposit function work?", () => {
    let myAccount1 = new Account("Chequing", 35);
    myAccount1.deposit(20);
    expect(myAccount1.balance).toBe(55);
    myAccount1.deposit(50.50);
    expect(myAccount1.balance).toBe(105.50);
});

test("Does the Withdraw function work?", () => {
    let myAccount2 = new Account("Chequing", 100);
    myAccount2.withdraw(25);
    expect(myAccount2.balance).toBe(75);
    myAccount2.withdraw(120);
    expect(myAccount2.balance).toBe(-45);
});

test("Does the Show function work?", () => {
    let myAccount3 = new Account("Chequing", 100);
    let myAccount4 = new Account("Savings", 200);
    expect(myAccount3.show()).toStrictEqual("Chequing : $100.00");
    expect(myAccount4.show()).toStrictEqual("Savings : $200.00");
});

test("Does the addAccount function work?", () => {
    const control = new AccountController;

    control.addAccount("Savings", 50);
    control.addAccount("Credit", 60);

    expect(control.account[0].name).toBe("Savings");
    expect(control.account[0].balance).toBe(50);

    expect(control.account[1].name).toBe("Credit");
    expect(control.account[1].balance).toBe(60);
});


test("Does the displayAddedAccount function work?", () => {
    const control0 = new AccountController;
    control0.addAccount("Savings", 50);
    control0.addAccount("Credit", 60);

    expect(control0.displayAddedAccount("Savings")).toStrictEqual("Savings : $50.00");
    expect(control0.displayAddedAccount("Credit")).toStrictEqual("Credit : $60.00");
});

test("Does the deleteAccount function work?", () => {
    const control1 = new AccountController;
  
    control1.addAccount("Savings", "50.00");
    control1.addAccount("Credit", "60.00");

    control1.deleteAccount("Credit");
    expect(control1.account).toEqual([{ "name": "Savings", "balance": 50 }]);

    control1.deleteAccount("Savings");
    expect(control1.account).toEqual([]);
});

test("Does the accountTotal function work?", () => {
    const control2 = new AccountController;

    control2.addAccount("Chequing", 20);
    control2.addAccount("Credit", 30);
    expect(control2.accountTotal()).toBe("$50.00");

    control2.deleteAccount("Chequing");
    expect(control2.accountTotal()).toBe("$30.00");
});

test("Does the largestAccount function work?", () => {
    const control3 = new AccountController;

    control3.addAccount("Chequing", 20);
    control3.addAccount("Credit", 30);
    expect(control3.largestAccount()).toBe("Credit : $30.00");

    control3.addAccount("Savings", 100);
    expect(control3.largestAccount()).toBe("Savings : $100.00");
});

test("Does the smallestAccount function work?", () => {
    const control4 = new AccountController;

    control4.addAccount("Chequing", 20);
    control4.addAccount("Credit", 30);
    expect(control4.smallestAccount()).toBe("Chequing : $20.00");

    control4.addAccount("Savings", 10);
    expect(control4.smallestAccount()).toBe("Savings : $10.00");
});

test("Does the isNewAccount function work?", () => {
    const control5 = new AccountController;
    control5.addAccount("Chequing", 50);
    control5.addAccount("Savings", 50);

    expect(control5.isNewAccount("Chequing")).toEqual("Chequing");
    expect(control5.isNewAccount("Savings")).toEqual("Savings");
    expect(control5.isNewAccount("Credit")).toEqual("Credit");
    expect(control5.isNewAccount("Travel")).toEqual("Travel");
});

test("Does the isNewAmount function work?", () => {
    const control6 = new AccountController;
    expect(control6.isNewAmount(5)).toEqual(5);
    expect(control6.isNewAmount(6)).toEqual(6);
    expect(control6.isNewAmount("Test")).toEqual(undefined);
});