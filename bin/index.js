#! /usr/bin/env node

var bBower = false,
    bCustomBower = false,
    param = process.argv[2],
    scssCwd = process.argv[3],
    scssDest = process.argv[4],
    sys = require('sys'),
    path = require('path'),
    fs   = require('fs'),
    sCurrentProject = '',
    bDebug = false,
    multiThreaded = true,
    colors = require('colors'),
    sCurrentPath = process.cwd(),
    bCustomFcJson = false,
    settingsPath = sCurrentPath + '/frontendcore.json',
    sFrontendCorePath = path.join( path.dirname(fs.realpathSync(__filename)) , '../');

// set currentProject
for ( var key in process.argv ) {

    if (process.argv[key].indexOf('--p=') !== -1 ) {
        sCurrentProject = process.argv[key].replace('--p=','');
    }

    if (process.argv[key].indexOf('--debug') !== -1 ) {
        bDebug = true;
    }

    if (process.argv[key].indexOf('--no-mt') !== -1 ) {
        multiThreaded = false;
    }

    if (process.argv[key].indexOf('--fcCwd') !== -1 ) {
        sFrontendCorePath = process.argv[key].replace('--fcCwd=','');
    }

    if (process.argv[key].indexOf('--appCwd') !== -1 ) {
        sCurrentPath = process.argv[key].replace('--appCwd=','');
    }

    if (process.argv[key].indexOf('--fcJson') !== -1 ) {
        settingsPath = process.argv[key].replace('--fcJson=','') + '/frontendcore.json';
        bCustomFcJson = true;
    }
}

require(path.join( path.dirname(fs.realpathSync(__filename)) , "../grunt/_tools.js") )();

var aProjects = [],
    aParams = [],
    spawn = multiThreaded ? require('child_process').spawn : require('child_process').spawnSync,
    sGruntPath = sFrontendCorePath + '/node_modules/grunt-cli/bin/grunt',
    oData = null,
    regexp = /(\r\n|\n|\r)/gm,
    exec = function( bin, params, sPath ) {

        var child = spawn( bin, params, {
            cwd: sPath === undefined ? sFrontendCorePath : sPath,
            env: process.env
        });

        if (multiThreaded) {
            // Listen for any response from the child:
            child.stdout.on('data', function (data) {
                console.log(data.toString().replace(regexp, ''));
            });

            // Listen for any errors:
            child.stderr.on('data', function (data) {
                console.log(data.toString().replace(regexp, ''));
            });
        } else {
            for (var i = 0; i < child.output.length; i++) {
                if (child.output[i]) {
                    console.log(child.output[i].toString().replace(regexp, ''));
                }
            }
        }
    },
    pkg  = require( path.join( sFrontendCorePath , 'package.json') );


if ( fileExists( settingsPath) ) {
    oData = require(settingsPath);
}

function log( error, stdout, stderr) {
    if (error) {
        console.log(error);
    }
    console.log(stdout);
}

if ( oData !== null && !oData.hasOwnProperty('scss') &&  !oData.hasOwnProperty('js') && !oData.hasOwnProperty('icons') && !oData.hasOwnProperty('bower') ) {

    if ( sCurrentProject !== '') {
        aProjects.push(sCurrentProject);
    } else {
        for (var key in oData) {
            aProjects.push(key);
        }
    }

} else {

    aProjects.push('%default%');
}


if ( param === 'css:one') {

    aParams = [ param ,'--appCwd=' + sCurrentPath, '--fcCwd=' + sFrontendCorePath, '--scssCwd=' + scssCwd, '--scssDest=' + scssDest ];

    if (bDebug) {
        aParams.push('--verbose');
    }

    if ( sCurrentProject !== '') {
        aParams.push('--project=' + sCurrentProject);
    }

    if (bCustomFcJson) {
        aParams.push('--fcJson=' + settingsPath);
    }

    exec(sGruntPath, aParams );

} else {

    for ( var key in aProjects ) {

        switch (param) {
            case "help":

                var sVersion = " FRONTENDCORE v" + pkg.version;

                console.log();
                console.log("************************************************************".blue);
                console.log( sVersion.blue );
                console.log( " The All in one Frontend Framework".blue );
                console.log("************************************************************".blue);
                console.log();
                console.log("You can execute the tasks typing '" + "frontendcore".blue + "' or '" + "_fc".blue + "' on the root path of your project (Where the frontendcore.json is).");
                console.log("If you do so the default task will be executed, also you can specify the tasks and some other options: ");
                console.log();

                console.log(" help".green);
                console.log("   Shows this help".white);

                console.log(" init".green);
                console.log("   Install all the bower dependencies for FrontendCore. It's just necessary the first time you install frontendcore or if you update it.".white);

                console.log(" css".green);
                console.log("   Execute for all the scss files the css imports, preprocessors and processors. Run this for a full css task execution.".white);

                console.log(" css:compile".green);
                console.log("   Avoid the SASS import globbing task, just execute preprocessors and postprocessors.".white);

                console.log(" css:one".green);
                console.log("   Execute for just one file the css imports, preprocessors and processors. If you use this option you need to provide the CWD Path and dest path manually.".white);
                console.log("   Example: frontendcore css:one /scss/main.scss /css/main.css".white);

                console.log(" js".green);
                console.log("   Execute the jshint on the js files of your project and also copy the js files to the path defined. All the definitions are in your frontendcore.json file.".white);

                console.log(" icons".green);
                console.log("   Generate an icons.css file based on the svg icons on the folder you defined plus the icons integrated in frontendcore.".white);

                console.log(" docs".green);
                console.log("   Generate the documenation for frontendcore on your frontendcore build path.".white);

                console.log(" server".green);
                console.log("  Runs a local http server on /build, useful to serve built documentation.".white);

                console.log(" build".green);
                console.log("   Executes all the tasks except init and watch.".white);

                console.log(" watch".green);
                console.log("  Watch all the folders defined in the frontendcore.json and execute the tasks that affect them if there are changes.".white);

                console.log(" --p=MyProject".blue);
                console.log("  In case you have several projects defined in the frontendcore.json you can specify wich one just take care for the task specified.".white);
                console.log("  Myproject should be the name of your project in the frontendcore.json".white);
                console.log("  This option should be allways the last parameter and can be combined with others.".white);
                console.log("  Examples:".white);
                console.log("       frontendcore --p=Myproject".white);
                console.log("       frontendcore css --p=Myproject".white);
                console.log("       frontendcore watch --p=Myproject".white);

                console.log(" --debug".blue);
                console.log("  Activates verbose mode and show all the log".white);

                break;
            case "init":

                if ( bBower === false) {
                    console.log("INSTALL FC BOWER DEPENDENCIES");
                    exec("node_modules/bower/bin/bower", ["install"]);
                    bBower = true;
                }


            break;
            case "bower":

                if ( bCustomBower === false) {

                    console.log("INSTALL CUSTOM BOWER DEPENDENCIES ");
                    exec( sFrontendCorePath + "node_modules/bower/bin/bower", ["install"], sCurrentPath );
                    bCustomBower = true;
                }

            break;

            case "jshint":
            case "watch":
            case "css":
            case "css:compile":
            case "docs":
            case "js":
            case "build":
            case "updateLibs":
            case "icons":

                aParams = [ param ,'--appCwd=' + sCurrentPath, '--fcCwd=' + sFrontendCorePath ];

                if (bDebug) {
                    aParams.push('--verbose');
                }

                if ( aProjects[key] !== '%default%' ) {

                    aParams.push('--project=' + aProjects[key]);
                }

                exec(sGruntPath, aParams );

                break;
            case "server":

                ServeMe = require("serve-me");

                var server = ServeMe({
                    debug: true,
                    directory: "./build",
                });

                const PORT = 8080;

                server.start(PORT, function(){
                    console.log("Server listening on http://localhost:%s", PORT);
                });
                break;

            default:

                aParams = [ '--appCwd=' + sCurrentPath, '--fcCwd=' + sFrontendCorePath ];

                if (bDebug) {
                    aParams.push('--verbose');
                }

                if ( aProjects[key] !== '%default%' ) {
                    aParams.push('--project=' + aProjects[key]);
                }

                exec(sGruntPath,aParams );
                break;
        }
    }
}
