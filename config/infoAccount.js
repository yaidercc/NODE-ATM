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

module.exports=options;