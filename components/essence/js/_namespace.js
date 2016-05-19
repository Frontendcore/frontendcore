var FrontendTools = {},
	FrontendCore = {
		define : function(sName, aDependencies, fFunction) {
			TinyCore.AMD.define(sName, aDependencies, fFunction);
		},
		config: function( oConfig) {
			TinyCore.AMD.config(oConfig);
		},
		domBoot: function( fFunction ){
			TinyCore.AMD.domBoot( fFunction );
		},
		require: function( sName ){
			TinyCore.AMD.require(sName);
		},
		requireAndStart: function( sName, fpCallback ){
			TinyCore.AMD.requireAndStart(sName, fpCallback);
		},
		instantiate: TinyCore.Module.instantiate,
		debug : function( bDebug ) {
			TinyCore.debugMode = bDebug;
		}
	},
	FrontendMediator = TinyCore.Toolbox.request( 'mediator' );

if (!oGlobalSettings) var oGlobalSettings = {};