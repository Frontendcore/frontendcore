module.exports = function( grunt ) {

    require(grunt.option('fcCwd') + "/grunt/_tools.js")(grunt);

    var settingsPath = grunt.option('fcJson') === undefined ? grunt.option('appCwd') + '/frontendcore.json' : grunt.option('fcJson') ,
        oPkg = require( grunt.option('fcCwd') + '/package.json'),
        sScssCwdData = '',
        sScssDestData = '',
        sJsCwdData = '',
        sJsDestData = '',
        sIconsCwdData = '',
        sIconsDestData = '',
        oData,
        oComponentsMain = [],
        oComponentsSecondary = [];


    if ( fileExists(settingsPath) ) {

        oData = require(settingsPath);

        if ( grunt.option('project') !== undefined ) {
            oData = oData[grunt.option('project')];
        }

        oComponentsMain = oData !== null && oData.components !== undefined && oData.components.main !== undefined  ? oData.components.main : oPkg.components.main;
        oComponentsSecondary = oData !== null && oData.components !== undefined && oData.components.secondary !== undefined  ? oData.components.secondary : oPkg.components.secondary;

        if ( oData !== null ) {

            if ( oData.scss !== undefined) {
                if ( oData.scss.cwd !== undefined ) {
                    if ( Object.prototype.toString.call(oData.scss.cwd) === '[object Array]') {
                        sScssCwdData = getRelativePath(oData.scss.cwd[0], 'appCwd');
                    } else {
                        sScssCwdData = getRelativePath(oData.scss.cwd, 'appCwd');
                    }
                }

                if ( oData.scss.dest !== undefined ) {
                    sScssDestData = getRelativePath(oData.scss.dest, 'appCwd');
                }
            }

            if ( oData.js !== undefined) {
                if (oData.js.cwd !== undefined) {
                    sJsCwdData = getRelativePath(oData.js.cwd, 'appCwd');
                }

                if (oData.js.dest !== undefined) {
                    sJsDestData = getRelativePath(oData.js.dest, 'appCwd');
                }
            }

            if ( oData.icons !== undefined) {
                if (oData.icons.cwd !== undefined) {
                    sIconsCwdData = getRelativePath(oData.icons.cwd, 'appCwd');
                }

                if (oData.icons.dest !== undefined) {
                    sIconsDestData = getRelativePath(oData.icons.dest, 'appCwd');
                }
            }

        }

    } else {
        oData = null;
    }

    this.oData = oData;
    this.currentTasks = grunt.cli.tasks[0] !== undefined ? grunt.cli.tasks : [];

    this.fcCwd = grunt.option('fcCwd');
    this.appCwd = grunt.option('appCwd');
    this.project = grunt.option('project');

    this.scssCwd = grunt.option('scssCwd') ? getFilePath(grunt.option('scssCwd'))  : sScssCwdData;
    this.scssCwdFile = grunt.option('scssCwd') !== undefined && grunt.option('scssCwd').indexOf('.scss') ? getFileName(grunt.option('scssCwd') ) : '*.scss' ;
    this.scssDest = grunt.option('scssDest') !== undefined ? getFilePath(grunt.option('scssDest')) : sScssDestData;
    this.scssDestFile = grunt.option('scssDest') !== undefined && grunt.option('scssDest').indexOf('.css') ? getFileName(grunt.option('scssDest')) : getFileName(scssCwdFile.replace('.scss','.css'));

    this.jsDest = grunt.option('jsDest') !== undefined ? getFilePath(grunt.option('jsDest')) : sJsDestData;
    this.jsCwd = grunt.option('jsCwd') !== undefined ? getFilePath(grunt.option('jsCwd')) : sJsCwdData;

    this.iconsDest = grunt.option('iconsDest') !== undefined ? getFilePath(grunt.option('iconsDest')) : sIconsDestData;
    this.iconsCwd = grunt.option('iconsCwd') !== undefined ? getFilePath(grunt.option('iconsCwd')) : sIconsCwdData;

    this.mergeJSON = function(source1,source2){
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

    this.oComponentsMain = oComponentsMain;
    this.oComponentsSecondary = oComponentsSecondary;
    this.oComponents = oComponentsMain.concat(oComponentsSecondary);


};