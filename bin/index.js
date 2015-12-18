#! /usr/bin/env node

var param = process.argv[2];

/*
process.argv.forEach(function (val, index, array) {
    console.log(array);
    console.log(index + ': ' + val);
});
 */


// or more concisely
var sys = require('sys'),
    path = require('path'),
    fs   = require('fs'),
    spawn = require('child_process').spawn,
    exec = function( bin, params ) {
        var child = spawn(bin, params);

        // Send data to the child process via its stdin stream
        child.stdin.write("Executing " + bin);

        // Listen for any response from the child:
        child.stdout.on('data', function (data) {
            console.log('' + data);
        });

        // Listen for any errors:
        child.stderr.on('data', function (data) {
            console.log('' + data);
        });

    },
    sCurrentPath = process.cwd(),
    sFrontendCorePath = path.dirname(fs.realpathSync(__filename)),
    pkg  = path.join( sFrontendCorePath , '../package.json');

function log( error, stdout, stderr) {
    if (error) {
        console.log(error);
    }
    console.log(stdout);
}

switch (param) {
    case "css":
        exec('grunt', ['rebuild','--pathJSON=' + sCurrentPath, '--pathPKG=' + pkg, '--base=' + sFrontendCorePath + '/../' ] );
        exec('grunt', ['css','--pathJSON=' + sCurrentPath, '--pathPKG=' + pkg, '--base=' + sFrontendCorePath + '/../' ] );
    break;
    case "css:compile":
        exec('grunt', ['css','--pathJSON=' + sCurrentPath, '--pathPKG=' + pkg, '--base=' + sFrontendCorePath + '/../' ] );
    break;
    case "css:import":
        exec('grunt', ['rebuild','--pathJSON=' + sCurrentPath, '--pathPKG=' + pkg, '--base=' + sFrontendCorePath + '/../' ] );
    break;
    default:
        exec('grunt', ['--pathJSON=' + sCurrentPath, '--pathPKG=' + pkg ], '--base=' + sFrontendCorePath + '/../' );
    break;
}

