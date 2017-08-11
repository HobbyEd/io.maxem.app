'use strict';
/**
 * This is a class that manages the device. 
 * The pairing of an new devices and lifecycle.
 */

const Homey = require('homey');
var Maxem = require('../../lib/maxem.js')

var maxemApi = null
var maxemboxes = {} // reference to the active maxembox. This reference is only required if there can be more then one maxemboxes. 

class io_maxem_driver extends Homey.Driver {

    onPair( socket ) {
        this.log("onPair is aangeroepen");
        this.log(maxemboxes);

        socket.on('start', (data, callback)=>{
            var username = Homey.ManagerSettings.get('username');
            var password = Homey.ManagerSettings.get('password');

            if (!username) return callback('errorNoUsername');
            if (!password) return callback('errorNoPassword');
            maxemApi = new Maxem({
                user: username,
                password: password 
            });
            if (maxemApi.validateAccount())
                return callback(null)
            else 
                callback('errorInvalidSettings')
        })

        socket.on('list_devices', function( data, callback ) {
            var devices = [ {
                    "name" : "Maxembox",
                    "data" : {"id": "maxem"}
            }]
            callback(null, devices);
        });
        
        socket.on('add_devices', function(device, callback) {
            maxembox[device.id] = {
                maxemboxId: device.id, 
                name: device.name
            }
            callback(null);
        })
    }

}

    //This function will change the state of the charging pole 
io_maxem_driver.prototype.setChargingPoleStatus = function(args){
    var username = Homey.ManagerSettings.get('username');
    var password = Homey.ManagerSettings.get('password');

    if (!username) return callback('errorNoUsername');
    if (!password) return callback('errorNoPassword');
    maxemApi = new Maxem({
        user: username,
        password: password 
    });
    return maxemApi.setChargingPoleStatus(args);
}

module.exports = io_maxem_driver;