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
    sCurrentPath = process.cwd(),
    sFrontendCorePath = path.join( path.dirname(fs.realpathSync(__filename)) , '../') ,
    exec = function( bin, params ) {
        var child = spawn( bin, params, {
            cwd: sFrontendCorePath,
            env: process.env
        });


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
    pkg  = path.join( sFrontendCorePath , 'package.json');

console.log(sFrontendCorePath)

function log( error, stdout, stderr) {
    if (error) {
        console.log(error);
    }
    console.log(stdout);
}

switch (param) {
    case "css":
        exec('grunt', ['rebuild','--pathJSON=' + sCurrentPath, '--path=' + sFrontendCorePath ] );
        exec('grunt', ['css','--pathJSON=' + sCurrentPath, '--path=' + sFrontendCorePath ] );
        break;
    case "css:compile":
        exec('grunt', ['css','--pathJSON=' + sCurrentPath, '--path=' + sFrontendCorePath , '--gruntfile=' + sFrontendCorePath + '/gruntfile.js'] );
        break;
    case "update":
        exec('grunt', ['update','--pathJSON=' + sCurrentPath, '--path=' + sFrontendCorePath ] );
        break;
    case "clone":
        exec('grunt', ['gitclone','--pathJSON=' + sCurrentPath, '--path=' + sFrontendCorePath ] );
        break;
    case "css:import":
        exec('grunt', ['rebuild','--pathJSON=' + sCurrentPath, '--path=' + sFrontendCorePath ] );
        break;
    default:
        exec('grunt', ['--pathJSON=' + sCurrentPath, '--path=' + sFrontendCorePath ] );
        break;
}

