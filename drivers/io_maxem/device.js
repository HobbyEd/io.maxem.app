'use strict';

const Homey = require('homey');
//var userName;
//var password;

class io_maxem_device extends Homey.Device {
	// this method is called when the Device is inited
	onInit() {
		// register a capability listener
		this.registerCapabilityListener('onoff', this.onCapabilityOnoff.bind(this));
//		userName = Homey.ManagerSettings.get('username');
//		password = Homey.ManagerSettings.get('password');
	}

	// this method is called when the Device is added
	onAdded() {
	}

	// this method is called when the Device is deleted
	onDeleted() {
	}

	// this method is called when the Device has requested a state change (turned on or off)
	onCapabilityOnoff( value, opts, callback ) {
		// Then, emit a callback ( err, result )
		callback( null );

		// or, return a Promise
		return Promise.reject( new Error('Switching the device failed!') );
	}
}

module.exports = io_maxem_device;