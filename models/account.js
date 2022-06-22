const {v4: uudiv4}=require("uuid");
class Account{
    constructor(identification,full_name,cvv){
        this.accountID= uudiv4().split("-")[0];
        this.accountNumber= Math.trunc(Math.random()*(10000000000000000,4000000000000000)+4000000000000000);
        this.identification=identification;
        this.full_name=full_name;
        this.balance=0;
        this.cvv=cvv;
        this.status=1;
    }
}

module.exports=Account;