"use strict";

const Homey = require('homey');
var chargingAnimation = require('./lib/chargingAnimation.js');
var FlowActions = require ('./lib/flow/actions.js');

class io_Maxem_App extends Homey.App {
	
	onInit() {
		//chargingAnimation.init("green");
		FlowActions.init()
	}
	
}

module.exports = io_Maxem_App;