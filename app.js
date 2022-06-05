const { menuOptions,pause,createAccount } = require("./config/inquirer");
const {saveAccount}= require("./config/DML");
const accounts= require("./models/accounts");

const main=async()=>{
    console.clear();
    const account=new accounts();
    let opt='',i=0;
    do{
        opt=await menuOptions();
        switch (opt) {
            case 1:
                const infoAccount={}
                do{
                    const {respuesta,OptionsArr}= await createAccount(i);
                    infoAccount[OptionsArr[i].nameInfo]=respuesta
                    i++;
                }while(i<3);
                const {id,name,cvv}=infoAccount;
                account.createAccount(id,name,cvv);
                saveAccount(account.listadoArr);
                break;
            default:
                break;
        }
        await pause();
    }while(opt!='0');
}

main();
