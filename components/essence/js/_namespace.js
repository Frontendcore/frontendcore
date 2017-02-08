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
		require: function( sName, fpCallback ){
			TinyCore.AMD.require(sName, fpCallback );
		},
		requireAndStart: function( sName, fpCallback ){
			TinyCore.AMD.requireAndStart(sName, fpCallback);
		},
		instantiate: TinyCore.Module.instantiate,
		debug : function( bDebug ) {
			TinyCore.debugMode = bDebug;
		},
		//Frontend core angular module definition
		ngModule:null
	},
	FrontendMediator = TinyCore.Toolbox.request( 'mediator' );

if (!oGlobalSettings) var oGlobalSettings = {};