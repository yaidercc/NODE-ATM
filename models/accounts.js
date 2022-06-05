const Account = require("./Account.js");

class accounts{
    _accounts={};
    constructor(){  
        this._accounts={};
    }
    get listadoArr(){
        const listado=[];
        Object.keys(this._accounts).forEach(key=> {
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
    createAccount(identifiation,full_name,cvv){
        const account = new Account(identifiation,full_name,cvv);
        this._accounts[account.accountNumber]=account;
    }
}

module.exports=accounts;