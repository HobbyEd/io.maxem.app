'use strict';
/**
 * This is a class that manages the device. 
 * The pairing of an new devices and lifecycle.
 */
const Homey = require('homey');
var Maxem = require('../../lib/maxem.js');

var maxemApi = null;

class io_maxem_driver extends Homey.Driver {

	onPair( socket ) {
		socket.on('start', (data, callback)=>{
			var maxemApi = getMaxemInstance()
			
			//Check whether the user settings are correct
			if (maxemApi.validateAccount()){
				return callback(null)
			}
			else 
				callback({err: 'errorInvalidSettings'});
		});

		socket.on('list_devices', function( data, callback ) {			
			maxemApi.deviceInfo().then(function(maxem_boxes){
				if (maxem_boxes == "")
					return callback(new Error("Something went wrong in the communication. Please retry to connect in a few seconds."))
				else 
					return callback(null, maxem_boxes)
			})
		});
        
		socket.on('add_devices', function(device, callback) {
			maxembox[device.id] = {
				maxemboxId: device.id, 
				name: device.name
			};
			callback(null);
		});
	}

}

//This function will ask the Maxem driver to change the status  
io_maxem_driver.prototype.setChargingPoleStatus = function(args){
	var maxemApi = getMaxemInstance()
	return maxemApi.setChargingPoleStatus(args);
};

//This function will ask the Maxem driver to change the status 
io_maxem_driver.prototype.setSolarChargeStatus = function(args){
	var maxemApi = getMaxemInstance()
	return maxemApi.setSolarChargeStatus(args);
};

function getMaxemInstance()
{
	var username = Homey.ManagerSettings.get('username');
	var password = Homey.ManagerSettings.get('password');

	if (!username) return callback('errorNoUsername');
	if (!password) return callback('errorNoPassword');
	
	return new Maxem({
		email: username,
		password: password 
	});
}
module.exports = io_maxem_driver;