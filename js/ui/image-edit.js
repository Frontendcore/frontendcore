;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('image-edit', [], function () {
		return {
			sPathCss: oGlobalSettings.sPathCssUI + '?v=' + oGlobalSettings.sHash,
			oDefault: {
				zoom: 3,
				zoomable: true,
				plugins: {
					crop: {
						minHeight: 50,
						minWidth: 50,
						ratio: 1
					}
				}
			},
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('image-edit'),
					self = this;

				FrontendTools.loadCSS(this.sPathCss);

				FrontendTools.trackModule('JS_Libraries', 'call', 'image-edit');

				$(aTargets).each(function (nIndex) {
					self.autobind(this, nIndex);
				});

			},
			autobind: function (oTarget, nIndex) {

				if (oTarget.id === '') {
					oTarget.id = 'edit-image-' + nIndex;
				}

				$(oTarget).addClass('magnifier-thumb-wrapper');

				var self = this,
					oSettings,
					oOptions,
					nWidth = '350px',
					nHeight = '350px';

				if (oTarget.getAttribute("data-fc-width") !== null) {
					nWidth = oTarget.getAttribute("data-fc-width").replace('px','') + 'px';
				}

				if (oTarget.getAttribute("data-fc-height") !== null) {
					nHeight= oTarget.getAttribute("data-fc-height").replace('px','') + 'px';
				}

				oOptions = {
					minWidth: nWidth,
					minHeight: nHeight
				};

				oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

				new Darkroom('#' + oTarget.id, oSettings );

				$(oTarget).on('click', function(){
					$('.darkroom-toolbar').slideToggle();
				});

			},
			onStop: function () {
				this.sPathCss = null;
			},
			onDestroy: function () {
				delete this.sPathCss;
			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);
