"use strict";

const Homey = require('homey');
var chargingAnimation = require('./lib/chargingAnimation.js');

class MyApp extends Homey.App {
	
	onInit() {
		
		this.log('MyApp is running...');
		chargingAnimation.init("red");
	}
	
}

module.exports = MyApp;