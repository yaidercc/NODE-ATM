const { menuOptions,pause,createAccount } = require("./config/inquirer");
const {saveAccount,readFile}= require("./config/DML");
const accounts= require("./models/accounts");
const infoUser= require("./config/infoAccount");
const main=async()=>{
    console.clear();
    const account=new accounts();
    const accountsFile= readFile();
    if(accountsFile){
        account.fillAccountsObj(accountsFile);
    }
    
    let opt='',i=0;
    do{
        opt=await menuOptions();
        switch (opt) {
            case 1:
                const infoAccount={}
                do{
                    const respuesta= await createAccount(i);
                    infoAccount[infoUser[i].nameInfo]=respuesta;
                    i++;
                }while(i<infoUser.length);

                const {id,name,cvv}=infoAccount;
                account.createAccount(id,name,cvv);
                saveAccount(account.listadoArr);
                break;
            case 2:
                // console.log(account.getUser(13));
                // account.listAllAccounts();
                break;
            case 6:
                account.listAllAccounts();
                break;
            default:
                break;
        }
        saveAccount(account.listadoArr);
        await pause();
    }while(opt!='0');
}

main();
