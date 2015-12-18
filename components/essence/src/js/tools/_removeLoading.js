FrontendTools.removeLoading = function ( oTarget, sClass, callback ) {

	var oLoading = oTarget;

	if (sClass === undefined) {
		sClass = '';
	}

	if ( oTarget.parentNode.className.indexOf('loading') !== -1  ) {
		oLoading = oTarget.parentNode;
	}

	$(oLoading).removeClass('loading');
	$(oLoading).addClass('animated fade-in');

	if (sClass !== '' & oTarget.className.indexOf(sClass) === -1 ) {
		$(oTarget).addClass(sClass);
	}

	if (callback !== undefined) {
		callback();
	}

}