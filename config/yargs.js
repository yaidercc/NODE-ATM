const argv=require("yargs")
                    .option('i',{
                        alias:'insert',
                        type:'boolean',
                        default:false,
                        describe:"Argumento para insertar una cuenta"
                    })
                    .option('d',{
                        alias:'delete',
                        type:'number',
                        demandOption:true,
                        describe:'Opcion para eliminar un usuario'
                    })
                    .check((argv,option)=>{
                        if(typeof argv.d != "number"){
                            console.log("El argumento debe ser un numero.");
                        }
                        return true;
                    })
                    .argv
module.exports=argv;