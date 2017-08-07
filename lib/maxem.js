'use strict'

function Maxem(options){
    var self = this;
    if (options == null) {options = {} }
    self.user = options.user;
    self.password = options.password;
}

//This method validates the user account
//This is done by login in on the maxem box
Maxem.prototype.validateAccount = function(){
    var self = this;
    return validateAccount(self.user, self.password)
}

function validateAccount(user, password){
    if (user == "evdillen" && password == "test")
        return true
    else 
        return false
}
module.exports = Maxem