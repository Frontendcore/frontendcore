;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('image-zoom', [], function () {
		return {
			sPathCss: oGlobalSettings.sPathCssUI + '?v=' + oGlobalSettings.sHash,
			oDefault: {
				zoom: 3,
				zoomable: true
			},
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('image-zoom'),
					self = this;

				FrontendTools.loadCSS(this.sPathCss);

				FrontendTools.trackModule('JS_Libraries', 'call', 'image-zoom');


				$(aTargets).each(function (nIndex) {
					self.autobind(this, nIndex);
				});

			},
			autobind: function (oTarget, nIndex) {

				var oImg = $('img', oTarget)[0];

				if (oImg.id === '') {
					oImg.id = 'zoom-image-' + nIndex;
				}

				$(oTarget).addClass('magnifier-thumb-wrapper');

				var self = this,
					oSettings,
					oOptions = {},
					oPreview = document.createElement('div'),
					sIdPreview = oImg.id + '-preview',
					nWidth = '350px',
					nHeight = '350px',
					oOffset = $(oImg).offset();

				if (oTarget.getAttribute("data-fc-width") !== null) {
					nWidth = oTarget.getAttribute("data-fc-width").replace('px','') + 'px';
				}

				if (oTarget.getAttribute("data-fc-height") !== null) {
					nHeight= oTarget.getAttribute("data-fc-height").replace('px','') + 'px';
				}

				oPreview.id = sIdPreview;
				oPreview.style.width = nWidth;
				oPreview.style.height = nHeight;
				oPreview.style.top = oOffset.top + 'px';

				if (oTarget.getAttribute("data-fc-position") !== 'left') {
					oPreview.style.left = ( oOffset.left + ( $(oImg).width() + 1 ) )  + 'px';
				} else {
					oPreview.style.right = oOffset.right + 'px';
				}

				oPreview.style.opacity = 0;
				oPreview.className = "magnifier-preview";

				document.body.appendChild(oPreview);

				$('#' + sIdPreview).hide('fast', function() { $(this).css('opacity','1'); });

				oOptions.thumb = '#' + oImg.id;
				oOptions.largeWrapper = sIdPreview;

				if (oTarget.getAttribute("data-fc-url") !== null) {
					oOptions.large = oTarget.getAttribute("data-fc-url");
				} else {
					oOptions.large = oTarget.href;
				}

				oOptions.onthumbenter = function() {
					oOffset = $(oImg).offset();

					$('#' + sIdPreview).fadeIn('fast').css({
						"left" : ( oOffset.left + ( $(oImg).width() + 1 ) )  + 'px',
						"top" :  oOffset.top + 'px'
					});
				};

				oOptions.onthumbleave= function() {
					$('#' + sIdPreview).hide();
				};

				if (oOptions.large !== null ) {
					oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

					var evt = new Event(),
						m = new Magnifier(evt);

					m.attach(oSettings);
				}

				FrontendTools.removeLoading(oTarget);

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
