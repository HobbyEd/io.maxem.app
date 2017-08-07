"use strict";

const Homey = require('homey');
var chargingAnimation = require('./lib/chargingAnimation.js');

class io_Maxem_App extends Homey.App {
	
	onInit() {
		
		this.log('MyApp is running...');
		chargingAnimation.init("green");
	}
	
}

module.exports = io_Maxem_App;