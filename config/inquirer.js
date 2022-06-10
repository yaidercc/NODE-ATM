// modules
const inquirer=require("inquirer");
const infoAccount=require("./infoAccount.js");
require("colors");

/**
 * Initial menu
 */
const options=[
    {
        type:"list",
        name:"option",
        message:"¿Que desea hacer?",
        choices:[
            {
                value:1,
                name:`${'1.'.green} Registrar Usuario.`
            },
            {
                value:2,
                name:`${'2.'.green} Modificar Usuario.`
            },
            {
                value:3,
                name:`${'3.'.green} Eliminar Usuario.`
            },
            {
                value:4,
                name:`${'4.'.green} Enviar Dinero.`
            },
            {
                value:5,
                name:`${'5.'.green} Retirar Dinero.`
            },
            {
                value:6,
                name:`${'6.'.green} Ver Cuentas.`
            },
            {
                value:7,
                name:`${'7.'.green} Ver Informacion De La Cuenta.`
            },
            {
                value:0,
                name:`${'0.'.green} Salir.`
            }
        ]
    }
];


/**
 * show menu option
 * @returns option
 */
const menuOptions=async()=>{
    console.clear();
    console.log("========================".green);
    console.log("Seleccione una opción");
    console.log("========================".green);
    const {option}= await inquirer.prompt(options);
    return option;
}

/**
 * function to create account
 * @param {*} index asnwer position
 * @returns resp
 */
const createAccount=async(index)=>{
    const {resp} = await inquirer.prompt(infoAccount[index]);
    return resp;
}

/**
 * pause function
 */
const pause=async()=>{
    
    const options=[
        {
            type:"input",
            name:"ans",
            message:`Presiones ${'ENTER'.green} para continuar.`
        }
    ];
    console.log("\n");
    await inquirer.prompt(options);
}

module.exports={
    menuOptions,
    pause,
    createAccount
}