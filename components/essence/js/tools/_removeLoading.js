FrontendTools.removeLoading = function ( oTarget, sClass, callback ) {

	var oLoading = oTarget;

	if (sClass === undefined) {
		sClass = '';
	}

	if ( oTarget.parentNode.className.indexOf('loading') !== -1  ) {
		oLoading = oTarget.parentNode;
	}

	if (oLoading.className.indexOf('_loading') === -1 ) {
        $(oLoading).removeClass('loading');
        $(oLoading).addClass('animated fade-in');
	} else {
        $(oLoading).removeClass('_loading');
    }

	if (sClass !== '' & oTarget.className.indexOf(sClass) === -1 ) {
		$(oTarget).addClass(sClass);
	}

	if (callback !== undefined) {
		callback();
	}

}