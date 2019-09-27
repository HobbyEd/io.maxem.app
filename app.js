'use strict';

const Homey = require('homey');
var FlowActions = require ('./lib/flow/actions.js');

class io_Maxem_App extends Homey.App {
	
	onInit() {
		FlowActions.init();
	}
}

module.exports = io_Maxem_App;