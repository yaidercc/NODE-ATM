require("colors");
const {
    menuOptions,
    pause,
    createAccount,
    depositMoney,
    invoice,
    sendMoney,
    withdrawMoney,
    InfoAccount
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
    withdrawInfo,
    showInfoAccount

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
                /* ** Registrar usuario ** */

                // Obtener datos
                do {
                    const respuesta = await createAccount(i);
                    inputInfo[registerUser[i].nameInfo] = respuesta;
                    i++;
                } while (i < registerUser.length);

                // Guardar datos
                const {
                    id, name, cvv
                } = inputInfo;

                // validaciones antes de guardar una cuenta
                if (!account.getAccount(id)) {
                    // guardar cuenta
                    account.createAccount(inputInfo);
                    // mostrar el numero de cuenta
                    console.clear();
                    console.log("Cuenta guardada con exito. ".green);
                    console.log("Guarde el siguiente numero de cuenta: " + account.getAccount(id).accountNumber.toString().green);
                } else {
                    console.error("Ya hay una cuenta con este id".red);
                }
                break;
            case 2:
                /* ** Enviar dinero ** */


                inputInfo = {
                    date: new Date().toLocaleDateString(),
                    typeMove: "transaction"
                };

                do {
                    const respTransaction = await sendMoney(i);
                    inputInfo[transactionInfo[i].nameInfo] = respTransaction;
                    // validar si las cuentas existen y que el monto sea valido
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

                            // valida si la cuenta de destino es diferente a la de origen
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
                account.addHistory(inputInfo)
                break;
            case 3:
                /* ** Retirar Dinero ** */
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
                invoice(inputInfo);
                account.addHistory(inputInfo);
                break;
            case 4:
                /* ** Depositar dinero ** */

                inputInfo = {
                    date: new Date().toLocaleDateString(),
                    typeMove: "deposit"
                };
                do {
                    const respDeposit = await depositMoney(i);
                    inputInfo[consignInfo[i].nameInfo] = respDeposit;
                    // validar si las cuentas existen y que el monto sea valido
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
                account.addHistory(inputInfo);
                break;
            case 5:
                 /* ** Mostrar informacion de la cuenta ** */
                inputInfo = {};
                do {
                    const respInfoAccount = await InfoAccount(i);
                    inputInfo[showInfoAccount[i].nameInfo] = respInfoAccount;
                    switch (showInfoAccount[i].nameInfo) {
                        case "account":
                            if (account.getAccount("accountNumber", respInfoAccount)) {
                                accountInfo = account.getAccount("accountNumber", inputInfo.account);
                                i++
                            } else console.log("Numero de cuenta no encontrado".red);
                            break;
                        case "cvv":

                            if (accountInfo.cvv != respInfoAccount) {
                                console.log("cvv invalido");
                            } else {
                                i++;
                            }
                            break;
                    }
                } while (i < showInfoAccount.length);
                const infoAccount = account.getAccount("accountNumber", inputInfo.account);
                console.clear();
                console.log("Identificacion Titular: " + infoAccount.identification);
                console.log("Nombre Titular: " + infoAccount.full_name);
                console.log("Balance: $ " + infoAccount.balance);

                console.log("\nMovimientos: ".bgGreen);
                infoAccount.transaction_history?.forEach((item) => {
                    console.log("\n=================");
                    console.log(`Fecha: ${item.date}`);
                    console.log(`Monto: ${item.substraction? item.amount.toString().red:item.amount.toString().green}`);
                    console.log(item.from ? `Origen: ${item.from}` : `Destino: ${item.to}`);
                });
                break;
        }
        saveAccount(account.listadoArr);
        await pause();
    } while (opt != '0');
}

main();