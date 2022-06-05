const fs=require("fs");
const prompt = require('prompt');
/**
 * Funcion para insertar.
 * @returns 
 */
const insertUser=async()=>{
    return new Promise((resolve,reject)=>{
        prompt.start();
        prompt.get(['Documento','Nombre', 'Apellido','Cuenta','Dinero'])
        .then(data=>{
            let dataUser=`Documento: ${data.Documento} \nNombre: ${data.Nombre} ${data.Apellido}\nCuenta: ${data.Cuenta}\nBalance: $ ${data.Dinero}
            `
            fs.writeFileSync(`cuentas/${data.Documento}.txt`,dataUser);
            resolve("Cuenta registrada con exito.");
            reject("Algunos datos estan errados.");
        });
    })
}
/**
 * Funcion para elminiar la cuenta de un usuario.
 * @param {*} Documento 
 */
const deleteAccount=(Documento)=>{
    try {
        fs.unlinkSync(`./cuentas/${Documento}.txt`)
        console.log('File removed')
    } catch(err) {
        console.error('Something wrong happened removing the file', err)
    }
}
module.exports={
    deleteAccount,
    insertUser
}
