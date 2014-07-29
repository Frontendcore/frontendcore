var oGlobalSettings = {
    sPathJs : '../static/js/',
    sPathJsCore: '../',
    sPathJsModules : '../static/js/modules/',
    sPathJsLibs : '../static/js/libs/',
    sPathRoot: '../',
    sPathCss: '../static/css/',
    bCss : false,
    bResponsiveImages: true
}

window.define = function ( sModuleName, aDependencies, fpCreator )
{
    fpCreator.apply( null, aDependencies );
};

window.require = function ( aModulesNames, fpCallback )
{
    fpCallback.apply( null, aModulesNames );
};

window.require.config = function () {};