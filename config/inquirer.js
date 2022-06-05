// modules
const inquirer=require("inquirer");
const { choices } = require("yargs");
require("colors");

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
                name:`${'6.'.green} Ver Informacion De La Cuenta.`
            },
            {
                value:0,
                name:`${'0.'.green} Salir.`
            }
        ]
    }
]

const menuOptions=async()=>{
    console.clear();
    console.log("========================".green);
    console.log("Seleccione una opción");
    console.log("========================".green);
    const {option}= await inquirer.prompt(options);
    return option;
}

const createAccount=async(index)=>{
    const options=[
        {
            type:"input",
            name:"resp",
            nameInfo:"id",
            message:"Ingrese su identificacion",
            validate(value){
                if(value.length===0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        },
        {
            type:"input",
            name:"resp",
            nameInfo:"name",
            message:"Ingrese su nombre completo",
            validate(value){
                if(value.length===0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        },
        {
            type:"input",
            name:"resp",
            nameInfo:"cvv",
            message:"Ingrese su cvv",
            validate(value){
                if(value.length===0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        },
    ];
    const {resp} = await inquirer.prompt(options[index]);
    return {respuesta: resp,OptionsArr:options};
}
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