'use strict'

function Maxem(options){
    var self = this;
    if (options == null) {options = {} }
    self.user = options.user;
    self.password = options.password;
}

//This method validates the user account
//This is done by login in on the Maxem box
Maxem.prototype.validateAccount = function(){
    var self = this;
    return validateAccount(self.user, self.password)
}

//This method changes the state of the charging pole 
//This is done by calling the Rest service of the Maxem box

Maxem.prototype.setChargingPoleStatus = function(args){
    var self = this; 
    return setChargingPoleStatus(self.user, self.password, args)
}

function validateAccount(user, password){
    if (user == "evdillen" && password == "test")
        return true
    else 
        return false
}

function setChargingPoleStatus(user, password, args){
    if (args.newChargingPoleState == "ACTIVATE")
        return true;
    else 
        return false;
}
module.exports = Maxem