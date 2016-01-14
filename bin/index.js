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
    aProjects = [],
    aParams = [],
    spawn = require('child_process').spawn,
    sCurrentPath = process.cwd(),
    sFrontendCorePath = path.join( path.dirname(fs.realpathSync(__filename)) , '../') ,
    oData = require( sCurrentPath + '/frontendcore.json'),
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

function log( error, stdout, stderr) {
    if (error) {
        console.log(error);
    }
    console.log(stdout);
}

if ( !oData.hasOwnProperty('scss') &&  !oData.hasOwnProperty('js') && !oData.hasOwnProperty('icons') && !oData.hasOwnProperty('bower') ) {


    for (var key in oData) {
        aProjects.push(key);
    }

} else {

    aProjects.push('%default%');
}

for ( var key in aProjects ) {

    switch (param) {
        case "watch":
        case "css":
        case "css:compile":
        case "docs":
        case "js":
        case "build":
        case "icons":

            aParams = [ param ,'--appCwd=' + sCurrentPath, '--fcCwd=' + sFrontendCorePath ];

            if ( aProjects[key] !== '%default%' ) {

                aParams.push('--project=' + aProjects[key]);
            }

            exec('grunt', aParams );

            break;
        default:

            aParams = [ '--appCwd=' + sCurrentPath, '--fcCwd=' + sFrontendCorePath ]

            if ( aProjects[key] !== '%default%' ) {
                aParams.push('--project=' + aProjects[key]);
            }

            exec('grunt',aParams );
            break;
    }
}