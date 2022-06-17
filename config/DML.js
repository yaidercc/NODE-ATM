const fs = require("fs");
const { array } = require("yargs");
const path="./accounts/accounts.json";

/**
 * save info account in the accounts file
 * @param {*} data acctount data
 */
const saveAccount=(data)=>{
    fs.writeFileSync(path,JSON.stringify(data));
}

/**
 * return all data from the account file
 * @returns 
 */
const readFile=()=>{
    if(!fs.existsSync(path)){
        return null;
    }
    const data = fs.readFileSync(path,{encoding:"utf-8"});
    return data.length>0?JSON.parse(data):null ;
}

module.exports={
    saveAccount,
    readFile
}