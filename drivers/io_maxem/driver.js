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
            "name": "Maxem Smart Energy",
            "data": { "id": "maxem" }
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
    onPairListDevices( data, callback ) {

        let devices = [
            {
                "name": "Maxem smart energy",
                "data": { "id": "io_maxem" },
            }
        ]

        callback( null, devices );

    }

}

module.exports = io_maxem_driver;