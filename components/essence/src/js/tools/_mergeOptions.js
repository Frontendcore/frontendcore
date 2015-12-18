/**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @param oOptions1
 * @param oOptions2
 * @returns oOptionsReturn a new object based on obj1 and obj2
 */

FrontendTools.mergeOptions = function ( oOptions1 , oOptions2 ){
	var oOptionsReturn = {};
	for (var attrname in oOptions1) { oOptionsReturn[attrname] = oOptions1[attrname]; }
	for (var attrname in oOptions2) { oOptionsReturn[attrname] = oOptions2[attrname]; }
	return oOptionsReturn;
}