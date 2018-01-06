'use strict';
var http = require('http.min')
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

//retrieve the user info from Maxem. This includes the Maxem.boxes.
// be sure the maxem session is still open
Maxem.prototype.devInfo = function(){
	var self = this;
	return deviceInfo()	
}

//This method changes the state of the charging pole 
//This is done by calling the Rest service of the Maxem box
Maxem.prototype.setChargingPoleStatus = function(args){
	var self = this; 
	return setChargingPoleStatus(self.email, self.password, args);
};

function authenticateHelper(email, password)
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
		//store the maxem_session token in the homey session manager
		Homey.ManagerSettings.set('maxem_session', result.response.headers["set-cookie"][0])
		return result.data
 	 })
}

function validateAccount(email, password){
	return authenticateHelper(email,password)
}

function getUserInfoHelper(maxem_session)
{
	var options = {
		uri: `${BASE_URL}user/me`,
		headers:{
			"cookie": maxem_session,
			accept: VERSION_HEADER,
			"content-type": `application/json`
			},
	}
	return http.get(options).then(function(result){
		return result.data
	})
}

 function deviceInfo(){
	var maxem_session = Homey.ManagerSettings.get("maxem_session")
	if (maxem_session !=''){
		getUserInfoHelper(maxem_session).then(function(result){ 
			var res = JSON.parse(result)
			var maxem_boxes = []
			var index = 0
			//An user can have more then one maxem_boxes. Iterate the result to show all boxes. 
			res.maxems.forEach((maxems) => {
					maxem_boxes[index] = { 
							'name': maxems.Sem_ID , 
							'data': maxems.Sem_ID
						} 
				})
			Homey.ManagerSettings.set('maxem_boxes', maxem_boxes)
		})
	}
}

function setChargingPoleStatus(email, password, args){
	//Start by re-authenticate the user so the maxem_session token will be valid
	var authenticated_user = authenticateHelper(email, password)
	var maxem_session = Homey.ManagerSettings.get("maxem_session")
	var enabled //the state that the charging pole should get;

	//validate whether the authentication has succeded.
	if (authenticated_user !=''){
		if (args.newChargingPoleState == 'ACTIVATE')
			enabled = true
		else
			enabled = false

		var options = {
			uri: `${BASE_URL}maxem/${args.device.__name}/chargepoint/control/enabled`,
			headers:{
				"cookie": maxem_session,
				accept: VERSION_HEADER,
				"content-type": `application/json`
				},
			json: {
					enabled
			}
		}
		return http.put(options).then(function(result){
			return result.data
		})
	}
}
module.exports = Maxem;