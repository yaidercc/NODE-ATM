const Account = require("./Account.js");
require("colors");
class accounts {

    _accounts = {};

    constructor() {
        this._accounts = {};
    }

    get listadoArr() {
        const listado = [];
        Object.keys(this._accounts).forEach(key => {
            const tarea = this._accounts[key];
            listado.push(tarea);
        })
        return listado;
    }

    /**
     * function to create account
     * @param {*} id 
     * @param {*} full_name 
     * @param {*} cvv 
     */
    createAccount({
        id,
        name,
        cvv
    }) {
        const account = new Account(id, name, cvv);
        this._accounts[account.accountNumber] = account;
    }

    /**
     * returns an user account specified
     * @param {*} id 
     * @returns user account
     */
    getAccount(typeSearch = "id", infoSearch) {
        if (typeSearch == "id") {
            return this.listadoArr.filter(list => list.identification == infoSearch)[0];
        }
        return this.listadoArr.filter(list => list.accountNumber == infoSearch)[0];
    }

    /**
     * fill accounts object with accounts from accounts file
     * @param {*} accounts 
     */
    fillAccountsObj(accounts = []) {
        console.clear();
        accounts.map(account => {
            this._accounts[account.accountNumber] = account;
        })
    }

    /**
     * deposit money to account
     */
    depositMoney({
        account,
        amount
    }) {
        const balance = this.getAccount("accountNumber", account).balance;
        this.getAccount("accountNumber", account).balance = Number(amount) + Number(balance);
    }
}

module.exports = accounts;