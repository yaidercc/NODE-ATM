const registerUser = [{
        type: "input",
        name: "resp",
        nameInfo: "id",
        message: "Ingrese su identificacion",
        validate(value) {
            if (value.length < 5) {

                return 'Por favor ingrese una identificacion valida';
            }
            return true;
        }
    },
    {
        type: "input",
        name: "resp",
        nameInfo: "name",
        message: "Ingrese su nombre completo",
        validate(value) {
            if (value.split(" ").length < 2) {
                return 'Por favor ingrese un nombre valido';
            }
            return true;
        }
    },
    {
        type: "input",
        name: "resp",
        nameInfo: "cvv",
        message: "Ingrese su cvv",
        validate(value) {
            if (value.length < 3) {
                return 'Por favor ingrese un cvv valido.';
            }
            return true;
        }
    },
];

const consignInfo = [{
        type: "input",
        name: "resp",
        nameInfo: "account",
        message: "Numero cuenta: ",
        validate(value) {
            if (value.length < 16) {
                return 'Por favor ingrese un numero de cuenta valido.';
            }
            return true;
        }
    },
    {
        type: "input",
        name: "resp",
        nameInfo: "amount",
        message: "Monto: ",
        validate(value) {
            if (value.length <= 0) {
                return 'Por favor ingrese un Monto valido.';
            }
            return true;
        }
    },
];

const transactionInfo = [{
        type: "input",
        name: "resp",
        nameInfo: "accountFrom",
        message: "Cuenta origen: ",
        validate(value) {
            if (value.length < 16) {
                return 'Por favor ingrese un numero de cuenta valido.';
            }
            return true;
        }
    },
    {
        type: "input",
        name: "resp",
        nameInfo: "cvv",
        message: "cvv: ",
        validate(value) {
            if (value.length <3) {
                return 'cvv invalido.';
            }
            return true;
        }
    },
    {
        type: "input",
        name: "resp",
        nameInfo: "accountTo",
        message: "Cuenta destino: ",
        validate(value) {
            if (value.length < 16) {
                return 'Por favor ingrese un numero de cuenta valido.';
            }
            return true;
        }
    },
    {
        type: "input",
        name: "resp",
        nameInfo: "amount",
        message: "Monto: ",
        validate(value) {
            if (value.length <= 0) {
                return 'Por favor ingrese un Monto valido.';
            }
            return true;
        }
    },
];

const withdrawInfo = [{
    type: "input",
    name: "resp",
    nameInfo: "account",
    message: "Cuenta: ",
    validate(value) {
        if (value.length < 16) {
            return 'Por favor ingrese un numero de cuenta valido.';
        }
        return true;
    }
},
{
    type: "input",
    name: "resp",
    nameInfo: "cvv",
    message: "cvv: ",
    validate(value) {
        if (value.length <3) {
            return 'cvv invalido.';
        }
        return true;
    }
},
{
    type: "input",
    name: "resp",
    nameInfo: "amount",
    message: "Monto: ",
    validate(value) {
        if (value.length <= 0) {
            return 'Por favor ingrese un Monto valido.';
        }
        return true;
    }
},
];
module.exports = {
    registerUser,
    consignInfo,
    transactionInfo,
    withdrawInfo
};