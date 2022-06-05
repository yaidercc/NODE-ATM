const {v4: uudiv4}=require("uuid");
class Account{
    constructor(identification,full_name,cvv){
        this.accountNumber= uudiv4();
        this.identification=identification;
        this.full_name=full_name;
        this.balance=0;
        this.cvv=cvv
    }
}

module.exports=Account;