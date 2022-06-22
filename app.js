require("colors");
const {
    menuOptions,
    pause,
    createAccount,
    depositMoney,
    invoice,
    sendMoney,
    withdrawMoney,
    suspendAccount
} = require("./config/inquirer");
const {
    saveAccount,
    readFile
} = require("./config/DML");
const accounts = require("./models/accounts");
const {
    registerUser,
    consignInfo,
    transactionInfo,
    withdrawInfo
    
} = require("./config/infoAccount");

const main = async () => {
    console.clear();
    const account = new accounts();
    const accountsFile = readFile();
    if (accountsFile) {
        account.fillAccountsObj(accountsFile);
    }

    let opt = '',
        i, inputInfo = {},
        accountInfo = {};;
    do {
        i = 0;
        accountInfo = {}
        opt = await menuOptions();
        switch (opt) {
            case 1:
                /* ** Register user ** */

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
            case 3:
                const respDelete = await suspendAccount();
                const accountDel=account.getAccount("accountNumber",respDelete);
                if (accountDel) {
                    if(accountDel.status!=0){
                        account.DeleteAccount(respDelete);
                        console.log("Cuenta suspendida existosamente.".green);
                    }else{
                        console.log("Esta cuenta ya se encuentra suspendida.".yellow);
                    }
                } else {
                    console.log("Numero de cuenta no encontrado.".red);
                }
                break;
            case 4:
                /* ** Send Money ** */


                inputInfo = {
                    date: new Date().toLocaleDateString(),
                    typeMove: "transaction"
                };

                do {
                    const respTransaction = await sendMoney(i);
                    inputInfo[transactionInfo[i].nameInfo] = respTransaction;
                    // validate if account number exists and if amount>0
                    switch (transactionInfo[i].nameInfo) {

                        case "accountFrom":
                            accountInfo = account.getAccount("accountNumber", inputInfo.accountFrom);
                            if (account.getAccount("accountNumber", respTransaction)) {
                                i++;
                            } else {
                                console.log("Numero de cuenta no encontrado".red);
                            }
                            break;
                        case "accountTo":

                            // validate if the destination account is different from the source account
                            if (inputInfo.accountFrom != inputInfo.accountTo) {
                                if (account.getAccount("accountNumber", respTransaction)) {
                                    i++;
                                } else {
                                    console.log("Numero de cuenta no encontrado".red);
                                }
                            } else {
                                console.log("El numero de cuenta de destino debe ser diferente a la cuenta de origen".red);
                            }

                            break;
                        case "amount":
                            if (respTransaction >= 0) {
                                if (accountInfo.balance >= respTransaction) {
                                    i++;
                                } else {
                                    console.log("Saldo insuficiente.".red);
                                    console.log(`${"Tu saldo es de:".green} $ ${accountInfo.balance}`);
                                }
                            } else console.log("Monto Invalido".red);
                            break;
                        case "cvv":

                            if (accountInfo.cvv != respTransaction) {
                                console.log("cvv invalido");
                            } else {
                                i++;
                            }
                            break;
                    }
                } while (i < transactionInfo.length);
                account.TrasnactMoney(inputInfo);
                invoice(inputInfo);
                break;
            case 5:
                /* ** withdraw money ** */
                inputInfo = {
                    date: new Date().toLocaleDateString(),
                    typeMove: "withdraw"
                };
                do {
                    const respWithdraw = await withdrawMoney(i);
                    inputInfo[withdrawInfo[i].nameInfo] = respWithdraw;
                    switch (withdrawInfo[i].nameInfo) {
                        case "account":
                            if (account.getAccount("accountNumber", respWithdraw)) {
                                accountInfo = account.getAccount("accountNumber", inputInfo.account);
                                i++
                            } else console.log("Numero de cuenta no encontrado".red);

                            break;
                        case "amount":
                            if (respWithdraw >= 0) {
                                if (accountInfo.balance >= respWithdraw) {
                                    i++;
                                } else {
                                    console.log("Saldo insuficiente.".red);
                                    console.log(`${"Tu saldo es de:".green} $ ${accountInfo.balance}`);
                                }
                            } else console.log("Monto Invalido".red);
                            break;
                        case "cvv":

                            if (accountInfo.cvv != respWithdraw) {
                                console.log("cvv invalido");
                            } else {
                                i++;
                            }
                            break;
                    }
                } while (i < withdrawInfo.length);
                account.withdrawMoney(inputInfo);
                invoice(inputInfo)
                break;
            case 6:
                /* ** Deposit Money ** */

                inputInfo = {
                    date: new Date().toLocaleDateString(),
                    typeMove: "deposit"
                };
                do {
                    const respDeposit = await depositMoney(i);
                    inputInfo[consignInfo[i].nameInfo] = respDeposit;
                    // validate if account number exists and if amount>0
                    switch (consignInfo[i].nameInfo) {
                        case "account":
                            if (account.getAccount("accountNumber", respDeposit)) i++
                            else console.log("Numero de cuenta no encontrado".red);
                            break;
                        case "amount":
                            if (respDeposit >= 0) i++
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