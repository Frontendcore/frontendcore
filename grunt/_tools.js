module.exports = function( grunt ) {

    // returns the path relative to the app if needed
    this.getRelativePath = function ( sPath, option ) {

        var newPath = sPath,
            sGruntOption = option !== undefined ? option : 'appCwd';

        if ( sPath.charAt(0) !== '/' ) {
            newPath = grunt.option(sGruntOption) + '/' + sPath;
        }

        return newPath;
    }

    this.getFilePath = function( path, option ) {

        var aTemp = path.split('/'),
            sPath = '';

        for ( var nKey = 0; nKey < (aTemp.length); nKey++ ) {

            if (nKey !== aTemp.length -1) {
                sPath += aTemp[nKey] + '/';
            }

        }

        return this.getRelativePath(sPath, option );
    }

    this.getFileName = function( path ) {

        var aTemp = path.split('/'),
            sName = '';

        for ( var nKey = 0; nKey < (aTemp.length); nKey++ ) {

            if (nKey === aTemp.length -1) {
                sName += aTemp[nKey];
            }

        }
        return sName;
    }

    this.fileExists = function(filePath)
    {
        var fs = require('fs');

        try
        {
            return fs.statSync(filePath).isFile();
        }
        catch (err)
        {
            return false;
        }
    }



};