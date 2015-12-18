/*global module:false*/

function mergeJSON(source1,source2){
    /*
     * Properties from the Souce1 object will be copied to Source2 Object.
     * Note: This method will return a new merged object, Source1 and Source2 original values will not be replaced.
     * */
    var mergedJSON = Object.create(source2);// Copying Source2 to a new Object

    for (var attrname in source1) {
        if(mergedJSON.hasOwnProperty(attrname)) {
            if ( source1[attrname]!==null && source1[attrname].constructor===Object ) {
                /*
                 * Recursive call if the property is an object,
                 * Iterate the object and set all properties of the inner object.
                 */
                mergedJSON[attrname] = mergeJSON(source1[attrname], mergedJSON[attrname]);
            }

        } else {//else copy the property from source1
            mergedJSON[attrname] = source1[attrname];

        }
    }

    return mergedJSON;
}


var pkg, bbdd, data;

module.exports = function(grunt) {

    pkg = require(  grunt.option('pathPKG') );
    bbdd = require('../_resources/bbdd/sections.json');
    data = mergeJSON(pkg, bbdd);

    return {
        dist: {
            files: [
                {
                    data: data,
                    expand: true,
                    cwd: 'twig/',
                    src: ['**/*.html.twig', '!**/_*.html.twig'],
                    dest: 'build/',
                    ext: '.html'
                }
            ]
        }
    };
};
