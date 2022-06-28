// modules
const inquirer = require("inquirer");

const {
    registerUser,
    consignInfo,
    transactionInfo,
    withdrawInfo,
    showInfoAccount
} = require("./infoAccount.js");
require("colors");

/**
 * menu inicial
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
            name: `${'2.'.green} Enviar Dinero.`
        },
        {
            value: 3,
            name: `${'3.'.green} Retirar Dinero.`
        },
        {
            value: 4,
            name: `${'4.'.green} Consignar Dinero.`
        },
        {
            value: 5,
            name: `${'5.'.green} Ver Informacion De La Cuenta.`
        },
        {
            value: 0,
            name: `${'0.'.green} Salir.`
        }
    ]
}];


/**
 * mostrar menu de opciones
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
 * funcion para crear cuenta
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
 * funcion para depositar dinero en una cuenta
 * @param {*} index posicion de la pregunta
 * @returns resp
 */
const depositMoney = async (index) => {
    const {
        resp
    } = await inquirer.prompt(consignInfo[index]);
    return resp;
}


/**
 * funcion para enviar dinero a otra cuenta
 * @param {*} index posicion de la pregunta
 * @returns resp
 */
const sendMoney = async (index) => {
    const {
        resp
    } = await inquirer.prompt(transactionInfo[index]);
    return resp;
}

/**
 * funcion para retirar dinero en una cuenta
 * @param {*} index posicion de la pregunta
 * @returns resp
 */
const withdrawMoney = async (index) => {
    const {
        resp
    } = await inquirer.prompt(withdrawInfo[index]);
    return resp;
}

/**
 * factura del movimiento realizado
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
 * Mostrar informacion de la cuenta
 * @param {*} index posicion de la pregunta
 * @returns resp
 */
const InfoAccount = async (index) => {
    const {
        resp
    } = await inquirer.prompt(showInfoAccount[index]);
    return resp;
}

module.exports = {
    menuOptions,
    pause,
    createAccount,
    depositMoney,
    invoice,
    sendMoney,
    withdrawMoney,
    InfoAccount
}