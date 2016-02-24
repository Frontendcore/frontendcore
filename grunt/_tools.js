module.exports = function( grunt ) {

    // returns the path relative to the app if needed
    this.getRelativePath = function ( sPath, sGruntOption ) {

        var newPath = sPath;

        if ( sPath.charAt(0) !== '/' ) {
            newPath = grunt.option(sGruntOption) + '/' + sPath;
        }

        return newPath;
    }
};