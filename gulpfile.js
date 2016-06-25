var config = require('./config');
var esp = require('./esp');
var gulp = require('gulp');
var argv = require('yargs').argv;

gulp.task('sendFile', function (cb) {
    esp.sendFile(config.file, cb);
});

gulp.task('led', function(cb) {
    var led = argv.led ? argv.led : '1';
    //noinspection JSUnresolvedVariable
    var off = argv.off ? argv.off : false;
    esp.led(led, off, cb);
});

gulp.task('default', gulp.series('sendFile', 'led'));
