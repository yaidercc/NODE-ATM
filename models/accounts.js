
const Account = require("./Account.js");
require("colors");
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
    /**
     * returns an user account specified
     * @param {*} id 
     * @returns user account
     */
    getUser(id){
        return this.listadoArr.filter(list=>list.identification==id)[0];
    }

    /**
     * fill accounts object with accounts from accounts file
     * @param {*} accounts 
     */
    fillAccountsObj(accounts=[]){
        console.clear();
        accounts.map(account=>{
            this._accounts[account.accountNumber]=account;
        })
    }
    listAllAccounts(){
        this.listadoArr.map((account,index)=>{
            console.log("================================".brightGreen)
            console.log(`${'Nombre: '.green}${account.full_name}`);
            console.log(`${'Numero cuenta: '.green}${account.accountNumber}`);
        })
    }
}

module.exports=accounts;