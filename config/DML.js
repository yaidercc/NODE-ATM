const fs = require("fs");
const saveAccount=(data)=>{
    const path="./accounts/accounts.json"
    fs.writeFileSync(path,JSON.stringify(data));
}

module.exports={
    saveAccount
}