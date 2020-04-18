'use strict';

const Homey = require('homey');

class io_maxem_device extends Homey.Device {
	// this method is called when the Device is inited
	onInit() {
		// register a capability listener
		this.registerCapabilityListener('charge_pole', this.onChargePoleOnoff.bind(this));
		this.registerCapabilityListener('solar_charge', this.onSolarChargeOnoff.bind(this));
		//store the device name in the session so the Maxem Driver can pick it up. 
		Homey.ManagerSettings.set('active_maxem', this.getName())
	}

	
	// this method is called when the Device is deleted
	onDeleted() {
	}

	// this method is called when the Device has requested a state change (turned on or off)
	onChargePoleOnoff( value, opts, callback ) {
		// Then, emit a callback ( err, result )
		var driver = Homey.ManagerDrivers.getDriver("io_maxem");
		var status 
		if (value == true){
			status = { newChargingPoleState: 'ACTIVATE'};
		}
		else {
			status = { newChargingPoleState: 'DEACTIVATE'};
		}
		driver.setChargingPoleStatus(status);
		return Promise.resolve();
	}

	onSolarChargeOnoff(value, opts, callback){
		var driver = Homey.ManagerDrivers.getDriver("io_maxem");
		var status 
		if (value == true){
			status = { newSolarChargeState: 'ACTIVATE'};
		}
		else {
			status = { newSolarChargeState: 'DEACTIVATE'};
		}
		driver.setSolarChargeStatus(status);
		return Promise.resolve();
	}
}

module.exports = io_maxem_device;