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
		Homey.ManagerSettings.set('maxem_session', result.response.headers["set-cookie"])
//	console.log (result.data)
		return result.data
 	 })
}

Maxem.prototype.validateAccount = function (){
//console.log ("email : " + this.email)
//console.log ("paswword : " + this.password)
	return authenticateHelper(this.email,this.password)
}

//retrieve the user info from Maxem. This includes the Maxem.boxes.
// be sure the maxem session is still open
Maxem.prototype.deviceInfo = function(){
	var promise = new Promise(function (resolve, reject) {
		var maxem_session = Homey.ManagerSettings.get("maxem_session")
		if (maxem_session !=''){
			var options = {
				uri: `${BASE_URL}user/me`,
				headers:{
					"cookie": maxem_session,
					accept: VERSION_HEADER,
					"content-type": `application/json`
					},
				}
				resolve(http.get(options).then(function(result){
					var maxem_boxes = []
					var res = JSON.parse(result.data)
					//An user can have more then one maxem_boxes. Iterate the result to show all boxes.
					res.maxems.forEach((maxems) => {
							maxem_boxes.push({
								data: {id: maxems.Sem_ID},
								name: maxems.Sem_ID 
						})
					}) 
					return maxem_boxes
				}))
		}
		else 
			reject(err)
	})
	return promise 
}

//This method changes the state of the charging pole 
Maxem.prototype.setChargingPoleStatus = function(args){
	//Start by re-authenticate the user so the maxem_session token will be valid
	var authenticated_user = authenticateHelper(this.email, this.password)
	var maxem_session = Homey.ManagerSettings.get("maxem_session")
	var active_maxem  = Homey.ManagerSettings.get("active_maxem")
	var enabled //the state that the charging pole should get;
	
	//validate whether the authentication has succeded.
	if (authenticated_user !=''){
		if (args.newChargingPoleState == 'ACTIVATE'){
			enabled = true;
			Homey.app.log('ChargingPole.Activated');
		}
		else{
			enabled = false;
			Homey.app.log('ChargingPole.DeActivated');
		}
		var options = {
			uri: `${BASE_URL}maxem/${active_maxem}/chargepoint/control/enabled`,
			headers:{
				"cookie": maxem_session,
				accept: VERSION_HEADER,
				"content-type": `application/json`
				},
			json: {
					enabled
			}
		}
		http.put(options).then(function(result){
			return result.data
		})
	}
}

Maxem.prototype.getChargePoleStatus = function(){
	var promise = new Promise(function (resolve, reject) {
console.log("getChargePoleStatus")		
		var maxem_session = Homey.ManagerSettings.get("maxem_session")
		if (maxem_session !=''){
			var options = {
				uri: `${BASE_URL}maxem/${active_maxem}/chargepoint/control`,
				headers:{
					"cookie": maxem_session,
					accept: VERSION_HEADER,
					"content-type": `application/json`
					},
				}
				resolve(http.get(options).then(function(result){
					var res = JSON.parse(result.data)
	console.log (res)
					return res
				}))
		}
		else 
			reject(err)
	})
	return promise 
}

//This method changes the state of the Solar Charge 
Maxem.prototype.setSolarChargeStatus = function(args){
	//Start by re-authenticate the user so the maxem_session token will be valid
	var authenticated_user = authenticateHelper(this.email, this.password)
	var maxem_session = Homey.ManagerSettings.get("maxem_session")
	var active_maxem  = Homey.ManagerSettings.get("active_maxem")
	var enabled //the state that the charging pole should get;
	
	//validate whether the authentication has succeded.
	if (authenticated_user !=''){
		if (args.newSolarChargeState == 'ACTIVATE'){
			enabled = true;
			Homey.app.log('SolarCharge.Activated');
		}
		else{
			enabled = false;
			Homey.app.log('SolarCharge.DeActivated');
		}
		var options = {
			uri: `${BASE_URL}maxem/${active_maxem}/chargepoint/solarcharging/control/enabled`,
			headers:{
				"cookie": maxem_session,
				accept: VERSION_HEADER,
				"content-type": `application/json`
				},
			json: {
					enabled
			}
		}
	console.log(options)
		http.put(options).then(function(result){
			return result.data
		})
	}
}

Maxem.prototype.getSolarChargeStatus = function(){
	var promise = new Promise(function (resolve, reject) {
		var maxem_session = Homey.ManagerSettings.get("maxem_session")
		if (maxem_session !=''){
			var options = {
				uri: `${BASE_URL}maxem/${active_maxem}/chargepoint/solarcharging/control`,
				headers:{
					"cookie": maxem_session,
					accept: VERSION_HEADER,
					"content-type": `application/json`
					},
				}
				resolve(http.get(options).then(function(result){
					var res = JSON.parse(result.data)
	console.log (res)
					return res
				}))
		}
		else 
			reject(err)
	})
	return promise 
}

module.exports = Maxem;