'use strict';
/**
 * This is a class that manages the device. 
 * The pairing of an new devices and lifecycle.
 */
const Homey = require('homey');
var Maxem = require('../../lib/maxem.js');

var maxemApi = null;
var maxemboxes = {}; // reference to the active maxembox. This reference is only required if there can be more then one maxemboxes. 

class io_maxem_driver extends Homey.Driver {

	onPair( socket ) {
		socket.on('start', (data, callback)=>{
			var username = Homey.ManagerSettings.get('username');
			var password = Homey.ManagerSettings.get('password');

			if (!username) return callback('errorNoUsername');
			if (!password) return callback('errorNoPassword');
			
			maxemApi = new Maxem({
				email: username,
				password: password 
			});
			
			//Check whether the user settings are correct
			if (maxemApi.validateAccount()){
				//The devices are placed in an array show that they can be shown in the next step of the wizard
				//This has been done hire to give the API the time to process. A more rebust implemantation is needed
				maxemApi.devInfo()
				return callback(null)
			}
			else 
				callback('errorInvalidSettings');
		});

		socket.on('list_devices', function( data, callback ) {
			var devices = Homey.ManagerSettings.get("maxem_boxes")
			callback(null,devices)
		});
        
		socket.on('add_devices', function(device, callback) {
			maxembox[device.id] = {
				maxemboxId: device.id, 
				name: device.name
			};
			console.log(maxembox)
			callback(null);
		});
	}

}

//This function will change the state of the charging pole 
io_maxem_driver.prototype.setChargingPoleStatus = function(args){
	var username = Homey.ManagerSettings.get('username');
	var password = Homey.ManagerSettings.get('password');

	if (!username) return callback('errorNoUsername');
	if (!password) return callback('errorNoPassword');
	
	maxemApi = new Maxem({
		email: username,
		password: password 
	});
	return maxemApi.setChargingPoleStatus(args);
};

module.exports = io_maxem_driver;