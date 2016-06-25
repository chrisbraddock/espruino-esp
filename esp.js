/**
 * esp.js - hacking on the Espruino
 * Chris Braddock (braddock.chris@gmail.com)
 *
 * NOTE: the API will be hung off the global as `espruino`
 *
 * Espruino Pico reference: http://www.espruino.com/Pico
 * Espruino tutorials: http://www.espruino.com/Tutorials
 * Espruino modules: http://www.espruino.com/Modules
 * Espruino forum: http://forum.espruino.com/microcosms/116/
 */

// EspruinoTools (https://github.com/espruino/EspruinoTools)
var espruino = require('espruino');

var config = require('./config');
var log = require('./log');

//noinspection JSUnresolvedVariable
var api = global.espruino = {};

// say hi
api.hello = function (str) {
    //noinspection JSUnresolvedVariable
    log('hello' + (str ? ' ' + str : '') + ' from ' + __filename);
};

// send a file to Espruino ROM
api.sendFile = function(file, cb) {
    file = file || config.file;
    espruino.sendFile(config.port, file, _cb(cb));
};

// light the onboard LEDs
api.led = function(led, off, cb) {
    led = led || '1';
    off = off ? '0' : '1';
    expr('digitalWrite(LED' + led + ',' + off + ')', _cb(cb));
};

// EspruinoTools.expr wrapper
function expr(_expr, cb) {
    espruino.expr(config.port, _expr, function (res) {
        log('ExpruinoTools.expr result: ' + res);
        _cb(cb)();
    });
}

// normalize callback parameters to a function
function _cb(f) {
    return typeof(f) === 'function' ? f : function() {};
}

module.exports = api;
