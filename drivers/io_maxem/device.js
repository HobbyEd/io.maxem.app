'use strict';

const Homey = require('homey');
var userName;
var password;

class io_maxem_device extends Homey.Device {
    // this method is called when the Device is inited
    onInit() {
        this.log('device init');
        this.log('name:', this.getName());
        this.log('class:', this.getClass());

        // register a capability listener
        this.registerCapabilityListener('onoff', this.onCapabilityOnoff.bind(this));
        
        let settings = this.getSettings();
        this.log(settings);
        userName = Homey.ManagerSettings.get('username');
        password = Homey.ManagerSettings.get('password');
        
        // #Debug info
        this.log(userName);
        this.log(password);
    }

    // this method is called when the Device is added
    onAdded() {
        this.log('Maxem added');
    }

    // this method is called when the Device is deleted
    onDeleted() {
        this.log('Maxem deleted');
    }

    // this method is called when the Device has requested a state change (turned on or off)
    onCapabilityOnoff( value, opts, callback ) {

        // ... set value to real device

        // Then, emit a callback ( err, result )
        callback( null );

        // or, return a Promise
        return Promise.reject( new Error('Switching the device failed!') );
    }
}

module.exports = io_maxem_device;