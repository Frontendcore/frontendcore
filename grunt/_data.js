module.exports = function( grunt ) {

    require(grunt.option('fcCwd') + "/grunt/_tools.js")(grunt);

    var settingsPath = grunt.option('appCwd') + '/frontendcore.json',
        sScssCwdData = '',
        sScssDestData = '',
        sJsCwdData = '',
        sJsDestData = '',
        sIconsCwdData = '',
        sIconsDestData = '',
        oData;

    if ( fileExists(settingsPath) ) {
        oData = require(settingsPath);

        if ( grunt.option('project') !== undefined ) {
            oData = oData[grunt.option('project')];
        }


        if ( oData.scss !== null ) {

            if ( oData.scss.cwd !== null ) {
                if ( Object.prototype.toString.call(oData.scss.cwd) === '[object Array]') {
                    sScssCwdData = getRelativePath(oData.scss.cwd[0], 'appCwd');
                } else {
                    sScssCwdData = getRelativePath(oData.scss.cwd, 'appCwd');
                }
            }

            if ( oData.scss.dest !== null ) {
                sScssDestData = getRelativePath(oData.scss.dest, 'appCwd');
            }

            if ( oData.js.cwd !== null ) {
                sJsCwdData = getRelativePath(oData.js.cwd, 'appCwd');
            }

            if ( oData.js.dest !== null ) {
                sJsDestData = getRelativePath(oData.js.dest, 'appCwd');
            }

            if ( oData.icons.cwd !== null ) {
                sIconsCwdData = getRelativePath(oData.icons.cwd, 'appCwd');
            }

            if ( oData.icons.dest !== null ) {
                sIconsDestData = getRelativePath(oData.icons.dest, 'appCwd');
            }

        }

    } else {
        oData = null;
    }

    this.oData = oData;

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

};