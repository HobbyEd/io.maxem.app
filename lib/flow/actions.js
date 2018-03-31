'use strict';

var Homey = require('homey');

exports.init = function (){
	let setChargingPoleStateAction =  new Homey.FlowCardAction('setChargingPoleState');
	setChargingPoleStateAction
		.register()
		.registerRunListener((args, state)=>{
		/*'__driver*/
			var driver = Homey.ManagerDrivers.getDriver("io_maxem");
			if (driver.setChargingPoleStatus(args) == true)
				Homey.app.log('ChargingPole.Activated');
			else
				Homey.app.log('ChargingPole.DeActivated');
			return Promise.resolve(); 
		});
};