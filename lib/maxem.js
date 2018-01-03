'use strict';
var http = require('http.min')
var setCookie = require('set-cookie-parser')
var Homey = require('homey')

const BASE_URL = 'https://api.maxem.io/'
const VERSION_HEADER = 'application/api.maxem.user-v1';

function Maxem(options){
	var self = this;
	if (options == null) {options = {}; }
	self.email = options.email;
	self.password = options.password;
}

//This method validates the user account
//This is done by login in on the Maxem box
Maxem.prototype.validateAccount = function(){
	var self = this;
	return validateAccount(self.email, self.password)
};

//This method changes the state of the charging pole 
//This is done by calling the Rest service of the Maxem box

Maxem.prototype.setChargingPoleStatus = function(args){
	var self = this; 
	return setChargingPoleStatus(self.email, self.password, args);
};

function authenticate(email, password)
{
	var options = {
		uri: `${BASE_URL}authenticate`,
		headers:{
			accept: VERSION_HEADER,
			"content-type": `application/json`,
			},
		query: {
			isMobile: true
		},
		json: {
			email, 
			password
		}
	}
	return http.post(options).then(function (result) {
	//Retrieve de set-cookie array from the result. This results in a string
	//via the Cookie parse it is converted to objects. 
	var cookies = setCookie.parse(result.response.headers["set-cookie"][0])
	
	//store the maxem_session token in the homey session manager
	Homey.ManagerSettings.set('maxem_session',cookies[0].value)

	return result.data
  })
}

function validateAccount(email, password){
	return authenticate(email,password)
}

function setChargingPoleStatus(email, password, args){
	if (args.newChargingPoleState == 'ACTIVATE')
		return true;
	else 
		return false;
}
module.exports = Maxem;