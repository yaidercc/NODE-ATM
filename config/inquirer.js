// modules
const inquirer = require("inquirer");

const {
    registerUser,
    consignInfo,
    transactionInfo,
    withdrawInfo
} = require("./infoAccount.js");
require("colors");

/**
 * Initial menu
 */
const options = [{
    type: "list",
    name: "option",
    message: "¿Que desea hacer?",
    choices: [{
            value: 1,
            name: `${'1.'.green} Registrar Cuenta.`
        },
        {
            value: 2,
            name: `${'2.'.green} Modificar Cuenta.`
        },
        {
            value: 3,
            name: `${'3.'.green} Suspender Cuenta.`
        },
        {
            value: 4,
            name: `${'4.'.green} Enviar Dinero.`
        },
        {
            value: 5,
            name: `${'5.'.green} Retirar Dinero.`
        },
        {
            value: 6,
            name: `${'6.'.green} Consignar Dinero.`
        },
        {
            value: 7,
            name: `${'7.'.green} Ver Informacion De La Cuenta.`
        },
        {
            value: 0,
            name: `${'0.'.green} Salir.`
        }
    ]
}];


/**
 * show menu option
 * @returns option
 */
const menuOptions = async () => {
    console.clear();
    console.log("========================".green);
    console.log("Seleccione una opción");
    console.log("========================".green);
    const {
        option
    } = await inquirer.prompt(options);
    return option;
}

/**
 * function to create account
 * @param {*} index asnwer position
 * @returns resp
 */
const createAccount = async (index) => {
    const {
        resp
    } = await inquirer.prompt(registerUser[index]);
    return resp;
}

/**
 * pause function
 */
const pause = async () => {

    const options = [{
        type: "input",
        name: "ans",
        message: `Presiones ${'ENTER'.green} para continuar.`
    }];
    console.log("\n");
    await inquirer.prompt(options);
}

/**
 * function to deposit money to an account
 * @param {*} index asnwer position
 * @returns resp
 */
const depositMoney = async (index) => {
    const {
        resp
    } = await inquirer.prompt(consignInfo[index]);
    return resp;
}


/**
 * function to send money to another account 
 * @param {*} index asnwer position
 * @returns resp
 */
const sendMoney = async (index) => {
    const {
        resp
    } = await inquirer.prompt(transactionInfo[index]);
    return resp;
}

/**
 * function to deposit money to an account
 * @param {*} index asnwer position
 * @returns resp
 */
const withdrawMoney = async (index) => {
    const {
        resp
    } = await inquirer.prompt(withdrawInfo[index]);
    return resp;
}

/**
 * invoice of the moves
 * @param {*} moveInfo 
 */
const invoice = (moveInfo) => {
    console.clear();
    console.log("========================".green);
    console.log("Factura");
    console.log("========================".green);
    switch (moveInfo.typeMove) {
        case "deposit":
            console.log(
                `${"Cuenta Destino: ".green} ${moveInfo.account}.\n${"Monto: ".green} $ ${moveInfo.amount}.\n${"Fecha de transaccion:".green} ${moveInfo.date}`
            )
            break;
        case "transaction":
            console.log(
                `${"Cuenta Origen: ".green} ${moveInfo.accountFrom}.\n${"Cuenta Destino: ".green} ${moveInfo.accountTo}.\n${"Monto: ".green} ${moveInfo.amount}.\n${"Fecha de transaccion:".green} ${moveInfo.date}`
            )
            break;
        case "withdraw":
            console.log(
                `${"Cuenta Origen: ".green} ${moveInfo.account}.\n${"Monto retirado: ".green} ${moveInfo.amount}.\n${"Fecha de transaccion:".green} ${moveInfo.date}`
            )
            break;
    }
}

/**
 * Suspend Account method
 * @param {*} index asnwer position
 * @returns resp
 */
const suspendAccount = async () => {
    const question = [{
        type: 'input',
        name: 'desc',
        message:"Account Number",
        validate(value) {
            if (value.length < 16) {
                return 'Por favor ingrese un numero de cuenta valido.';
            }
            return true;
        }
    }];

    const {
        desc
    } = await inquirer.prompt(question);

    return desc;
}

module.exports = {
    menuOptions,
    pause,
    createAccount,
    depositMoney,
    invoice,
    sendMoney,
    withdrawMoney,
    suspendAccount
}