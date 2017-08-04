'use strict';
/**
 * This is a class that manages the device. 
 * The pairing of an new devices and lifecycle.
 */

const Homey = require('homey');

class ioMaxemDriver extends Homey.Driver {

    onPairListDevices( data, callback ){

        callback( null, [
            {
                name: 'Foo Device',
                data: {
                    id: 'foo'
                }
            }
        ]);

    }

}

module.exports = ioMaxemDriver;