'use strict';
/**
 * This is a class that manages the device. 
 * The pairing of an new devices and lifecycle.
 */

const Homey = require('homey');

class io_maxem_driver extends Homey.Driver {

    onPair( socket ) {

    var devices = [
        {
            "name": "Maxem smart energy",
            "data": { "id": "io_maxem" }
        }
    ]

    socket.on('list_devices', function( data, callback ) {

        // emit when devices are still being searched
        socket.emit('list_devices', devices );

        // fire the callback when searching is done
        callback( null, devices );    

        // when no devices are found, return an empty array
        callback( null, [] );

        // or fire a callback with Error to show that instead
        callback( new Error('Something bad has occured!') );        

        });

    }
    // this is the easiest method to overwrite, when only the template 'Drivers-Pairing-System-Views' is being used.
    onPairListDevices( data, callback ) {

        let devices = [
            {
                // Required properties: 
                "name": "Maxem smart energy",
                "data": { "id": "io_maxem" },

                // Optional properties, these overwrite those specified in app.json:
                // "icon": "/path/to/another/icon.svg",
                // "capabilities": [ "onoff", "dim" ],
                // "capabilitiesOptions: { "onoff": {} },
                // "mobile": {},

                // Optional properties, device-specific:
                // "store": { "foo": "bar" },
                // "settings": {},

            }
        ]

        callback( null, devices );

    }

}

module.exports = io_maxem_driver;