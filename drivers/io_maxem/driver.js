'use strict';
/**
 * This is a class that manages the device. 
 * The pairing of an new devices and lifecycle.
 */
const Homey = require('homey');
var Maxem = require('../../lib/maxem.js');

var maxemApi = null;
//var maxemboxes = {}; // reference to the active maxembox. This reference is only required if there can be more then one maxemboxes. 

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
				return callback(null)
			}
			else 
				callback({err: 'errorInvalidSettings'});
		});

		socket.on('list_devices', function( data, callback ) {			
			maxemApi.devInfo().then(function(maxem_boxes){
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