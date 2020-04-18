'use strict';

var Homey = require('homey');

exports.init = function (){
	let setChargingPoleStateAction =  new Homey.FlowCardAction('setChargingPoleState');
	setChargingPoleStateAction
		.register()
		.registerRunListener((args, state)=>{
			var driver = Homey.ManagerDrivers.getDriver("io_maxem");
			driver.setChargingPoleStatus(args) 
			return Promise.resolve(); 
		});
		let setSolarChargeStateAction =  new Homey.FlowCardAction('setSolareChargeState');
		setSolarChargeStateAction
			.register()
			.registerRunListener((args, state)=>{
				var driver = Homey.ManagerDrivers.getDriver("io_maxem");
				driver.setSolarChargeStatus(args) 
				return Promise.resolve(); 
			});
};