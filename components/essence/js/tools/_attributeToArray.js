FrontendTools.attributeToArray = function( sValue ) {
	return sValue.replace('[','').replace(']','').split(',');
};