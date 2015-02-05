oTools.mergeJSON = function ( oJson1, oJson2 ){

	// Properties from the Souce1 object will be copied to Source2 Object.
	// Note: This method will return a new merged object, Source1 and Source2 original values will not be replaced.

	var oMergedJson = Object.create(oJson2); // Copying Source2 to a new Object

	for ( var attrname in oJson1) {
		if(oMergedJson.hasOwnProperty(attrname)) {
			if ( oJson1[attrname]!=null && oJson1[attrname].constructor==Object ) {
				 // Recursive call if the property is an object,
				 // Iterate the object and set all properties of the inner object.
				oMergedJson[attrname] = mergeJSON(oJson1[attrname], oMergedJson[attrname]);
			}
		} else { //else copy the property from oJson1
			oMergedJson[attrname] = oJson1[attrname];
		}
	}

	// Returns the merged JSON
	return oMergedJson;
}