'use strict';
var http = require('http.min')

const apiEndpoint = 'https://api.maxem.io/'

function Maxem(options){
	var self = this;
	if (options == null) {options = {}; }
	self.user = options.user;
	self.password = options.password;
}

//This method validates the user account
//This is done by login in on the Maxem box
Maxem.prototype.validateAccount = function(){
	var self = this;
	return validateAccount(self.user, self.password);
};

//This method changes the state of the charging pole 
//This is done by calling the Rest service of the Maxem box

Maxem.prototype.setChargingPoleStatus = function(args){
	var self = this; 
	return setChargingPoleStatus(self.user, self.password, args);
};

function authenticate(user, password)
{
	var options = {
		//uri: `${apiEndpoint}authenticate`,
		uri: "https://api.maxem.io/authenticate",
		headers:{
			Accept: "application/api.maxem.user-v1",
			version: "1.0.0"
			},
		query: {
			isMobile: true
		},
		json: true,
		json: {
				Credentials:{
					email: user,
  					password: password
				}
		}
	}
	console.log(options)

	return http.post(options).then(function (result) {
    if (result.data.response) return Promise.reject(result.data.response)
	console.log(result)
	return true
  })
}

function validateAccount(user, password){
	return authenticate(user,password)
	/*if (user == 'evdillen' && password == 'test')
		return true;
	else 
		return false;
	*/
}

function setChargingPoleStatus(user, password, args){
	if (args.newChargingPoleState == 'ACTIVATE')
		return true;
	else 
		return false;
}
module.exports = Maxem;