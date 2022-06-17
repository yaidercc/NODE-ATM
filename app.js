require("colors");
const {
    menuOptions,
    pause,
    createAccount,
    depositMoney,
    invoice
} = require("./config/inquirer");
const {
    saveAccount,
    readFile
} = require("./config/DML");
const accounts = require("./models/accounts");
const {registerUser,consignInfo} = require("./config/infoAccount");

const main = async () => {
    console.clear();
    const account = new accounts();
    const accountsFile = readFile();
    if (accountsFile) {
        account.fillAccountsObj(accountsFile);
    }

    let opt = '',i,inputInfo={};
    do {
        i = 0;
        opt = await menuOptions();
        switch (opt) {
            case 1:
                // Get data
                
                do {
                    const respuesta = await createAccount(i);
                    inputInfo[registerUser[i].nameInfo] = respuesta;
                    i++;
                } while (i < registerUser.length);

                // save data
                const {
                    id, name, cvv
                } = inputInfo;

                // validations before save ccount
                if (!account.getAccount(id)) {
                    // save account
                    account.createAccount(inputInfo);
                    // show account number
                    console.clear();
                    console.log("Cuenta guardada con exito. ".green);
                    console.log("Guarde el siguiente numero de cuenta: " + account.getAccount(id).accountNumber.toString().green);
                } else {
                    console.error("Ya hay una cuenta con este id".red);
                }
                break;
            case 6:
                inputInfo={
                    date:new Date().toLocaleDateString(),
                    typeMove:"deposit"
                };
                do {
                    const respDeposit = await depositMoney(i);
                    inputInfo[consignInfo[i].nameInfo] = respDeposit;
                    // validate if account number exists and if amount>0
                    switch (consignInfo[i].nameInfo) {
                        case "account":
                            if(account.getAccount("accountNumber",respDeposit)) i++
                            else console.log("Numero de cuenta invalido".red);
                            break;
                        case "amount":
                            if(respDeposit>=0) i++
                            else console.log("Monto Invalido".red);
                            break;
                    }
                } while (i < consignInfo.length);
                account.depositMoney(inputInfo);
                invoice(inputInfo);
                break;
        }
        saveAccount(account.listadoArr);
        await pause();
    } while (opt != '0');
}

main();