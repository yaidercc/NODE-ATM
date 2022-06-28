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
     * funcion para crear cuenta
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
     * devuelve una cuenta de usuario especificado
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
     * Metodo para llenar objeto de cuentas con cuentas del archivo de cuentas
     * @param {*} accounts 
     */
    fillAccountsObj(accounts = []) {
        console.clear();
        accounts.map(account => {
            this._accounts[account.accountNumber] = account;
        })
    }

    /**
     * Metodo para depositar dinero en una cuenta
     */
    depositMoney({
        account,
        amount
    }) {
        const balance = this.getAccount("accountNumber", account).balance;
        this.getAccount("accountNumber", account).balance = Number(amount) + Number(balance);
    }

    /**
     * Metodo para enviar dinero a otra cuenta
     */
    TrasnactMoney({
        accountFrom,
        accountTo,
        amount
    }) {
        const balancAccountFrom = this.getAccount("accountNumber", accountFrom).balance;
        const balancAccountTo = this.getAccount("accountNumber", accountTo).balance;
        this.getAccount("accountNumber", accountTo).balance = Number(amount) + Number(balancAccountTo);
        this.getAccount("accountNumber", accountFrom).balance = Number(balancAccountFrom) - Number(amount);
    }

    /**
     * Metodo para retirar dinero de una cuenta
     */
    withdrawMoney({
        account,
        amount
    }) {
        const balance = this.getAccount("accountNumber", account).balance;
        this.getAccount("accountNumber", account).balance = Number(balance) - Number(amount);
    }

    /**
     * Metodo que guarda el historial de transacciones de las cuentas.
     * @param {}} moveInfo 
     */
    addHistory(moveInfo) {
        // valida el tipo de movimiento
        switch (moveInfo.typeMove) {
            case "deposit":
                this.getAccount("accountNumber", moveInfo.account).transaction_history.push({
                    date: moveInfo.date,
                    amount: `+ $${moveInfo.amount}`,
                    from: "Cajero",
                    to: null,
                    substraction: false
                });
                break;
            case "transaction":
                // cuenta origen
                this.getAccount("accountNumber", moveInfo.accountFrom).transaction_history.push({
                    date: moveInfo.date,
                    amount: `- $${moveInfo.amount}`,
                    from: null,
                    to: moveInfo.accountTo,
                    substraction: true
                });
                // cuenta destino
                this.getAccount("accountNumber", moveInfo.accountTo).transaction_history.push({
                    date: moveInfo.date,
                    amount: `+ $${moveInfo.amount}`,
                    from: moveInfo.accountTo,
                    to: null,
                    substraction: false
                });
                break;
            case "withdraw":
                this.getAccount("accountNumber", moveInfo.account).transaction_history.push({
                    date: moveInfo.date,
                    amount: `- $${moveInfo.amount}`,
                    from: "Cajero",
                    to: null,
                    substraction: true
                });
                break;

        }
    }

    
}

module.exports = accounts;