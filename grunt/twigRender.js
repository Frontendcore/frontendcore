/*global module:false*/

var pkg, bbdd, data;

module.exports = function(grunt) {

    require(grunt.option('fcCwd') + "/grunt/_data.js")(grunt);

    pkg = require(  fcCwd+ '/package.json' );
    bbdd = require( fcCwd  + '/_resources/bbdd/sections.json');
    data = mergeJSON( pkg, bbdd );

    return {
        dist: {
            files: [
                {
                    data: data,
                    expand: true,
                    cwd: fcCwd +'/twig/',
                    src: [ '**/*.html.twig', '!**/_*.html.twig'],
                    dest: appCwd +'/build/',
                    ext: '.html'
                }
            ]
        }
    };
};
