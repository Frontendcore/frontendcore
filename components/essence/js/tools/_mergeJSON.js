FrontendTools.mergeJSON = function ( oJson1, oJson2 ){

	// Properties from the Source1 object will be copied to Source2 Object.
	// Note: This method will return a new merged object, Source1 and Source2 original values will not be replaced.

	var oMergedJson = {};

	for (var attrname in oJson1) { oMergedJson[attrname] = oJson1[attrname]; }

	for (var attrname in oJson2) { oMergedJson[attrname] = oJson2[attrname]; }

	// Returns the merged JSON
	return oMergedJson;
}
