/**
 * This Script enables you to set the color of the Homey to Green or Red.
 * Thereby showing whether the Maxem module has set locked or unlocked the charging mode
 */

"use strict"; 
const Homey = require('homey');
var frames = [];

let myAnimation = new Homey.LedringAnimation({
    options: {
        fps     : 1,     // real frames per second
        tfps    : 60,     // target frames per second. this means that every frame will be interpolated 60 times
        rpm     : 0,    // rotations per minute
    },
        frames    : frames,
    });


exports.setColor = function(color){
    var frame = [];
    if (color == "red"){
        // set every 2nd led to green
        for( var pixel = 0; pixel < 24; pixel++ ) {
                if (pixel %2 ==0){
                    frame.push({
                        r: 50,
                        g: 0,
                        b: 0
                    })
                }
                else {
                    frame.push({
                        r: 0,
                        g: 0,
                        b: 0
                    })
                }
            
        }       
    }
    else if(color == "green"){
    for( var pixel = 0; pixel < 24; pixel++ ) {
                if (pixel %2 ==0){
                    frame.push({
                        r: 0,
                        g: 50,
                        b: 0
                    })
                }
                else {
                    frame.push({
                        r: 0,
                        g: 0,
                        b: 0
                    })
                }
        }
    }
    frames.push(frame);
}    

exports.init = function(color){    
    this.setColor(color);
    // register the animation with Homey
    myAnimation
        .on('start', () => {
            // The animation has started playing
        })
        .on('stop', () => {
            // The animation has stopped playing
        })
        .register()
            .then( () => {
               // Homey.log('Animation registered!');

                myAnimation.start();
            })
            .catch( this.error )
} 

