;(function (window, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('modal', [], function () {
		return {
			oDefault: {
				scrolling: true,
				maxWidth: '100%',
				maxHeight: '100%',
				onComplete: function() {
					FrontendCore.domBoot( document.getElementById('cboxLoadedContent') );
				}
			},
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('modal'),
					self = this;

				FrontendTools.loadCSS( oGlobalSettings.sPathCss + 'secondary.css?v=' + oGlobalSettings.sHash );

				FrontendTools.trackModule('JS_Libraries', 'call', 'modal' );

				$(document).bind('cbox_open', function() {
					$('html').css({ overflow: 'hidden' });
				}).bind('cbox_closed', function() {
					$('html').css({ overflow: '' });
				});

				$( aTargets ).each(function () {
					self.autobind(this);
				});

			},
			stripTag : function( sHtml, sTag ) {
				var div = document.createElement('div');
				div.innerHTML = sHtml;
				div.id = 'striptag-html';
				var tags = div.getElementsByTagName(sTag),
					nTags = tags.length;

				while (nTags--) {
					tags[nTags].parentNode.removeChild(tags[nTags]);
				}

				var sResult = div.innerHTML;

				$('#striptag-html').remove();

				return sResult;
			},
			isImage: function( sHref ) {

				sHref = sHref.toLowerCase();

				if (
					sHref.indexOf('.jpg') !== -1 ||
					sHref.indexOf('.png') !== -1 ||
					sHref.indexOf('.gif') !== -1 ||
					sHref.indexOf('.bmp') !== -1 ||
					sHref.indexOf('.jpeg') !== -1 ||
					sHref.indexOf('.svg') !== -1
				) {
					return true;
				} else {
					return false;
				}
			},
			autobind: function (oTarget) {

				var sRel,
					aClasses,
					self = this,
					sHref = oTarget.href,
					aHrefHash = sHref.split('#'),
					oSettings,
					nModalMeasure = FrontendTools.isMobile.any() ? '100%' : '90%',
					oOptions = {};

					if (aHrefHash[0].toString() !== window.location.toString() && aHrefHash.length > 1 ) {

						if ($('#modal-inline').length === 0) {
							$('body').append('<div id="modal-inline" class="d-n"></div>');
						}
						if ($('#modal-preload').length === 0) {
							$('body').append('<div id="modal-preload" class="d-n"></div>');
						}

						$.get(aHrefHash[0], function(data) {

							var sHtml = self.stripTag(data, 'meta');
							sHtml = self.stripTag(sHtml, 'script');

							$('#modal-preload').append(sHtml);

							var sHtmlTarget = document.getElementById(aHrefHash[1]).outerHTML;

							$('#modal-inline').append( sHtmlTarget );
							$('#modal-preload').html('');

						});

						oTarget.href = '#' + aHrefHash[1];

					}


					if (oTarget.className.indexOf('group') != -1) {

						aClasses = oTarget.className.split(' ');

						sRel = '';

						for (var nCounter = 0; nCounter < aClasses.length; nCounter++) {
							if (aClasses[nCounter].indexOf('group') != -1) {
								sRel = aClasses[nCounter];
							}
						}
					}

					if (sRel) {
						oOptions.rel = sRel;
					}

					if (oTarget.getAttribute("data-fc-width") !== null ) {
						oOptions.width = oTarget.getAttribute("data-fc-width");
					} else if (oOptions.width === undefined) {
						oOptions.width = false;
					}

					if (oTarget.getAttribute("data-fc-height") !== null ) {
						oOptions.height = oTarget.getAttribute("data-fc-height");
					} else if (oOptions.height === undefined) {
						oOptions.height = false;
					}

					if ( aHrefHash.length > 1 ) {
						oOptions.inline = true;
						oOptions.href = '#' + aHrefHash[1];
					} else {
						if (!self.isImage(sHref)) {

							oOptions.iframe = true;

							if (oTarget.getAttribute("data-fc-width") === null) {
								oOptions.width = nModalMeasure;
							}
							if (oTarget.getAttribute("data-fc-height") === null) {
								oOptions.height = nModalMeasure;
							}
						} else {
							oOptions.iframe = false;
							oOptions.photo = true;
						}

						oOptions.inline = false;
						oOptions.href = sHref;
					}

					oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

					$(oTarget).colorbox(oSettings);

			},
			open: function (oOptions) {
				var self = this,
					oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

				if (oSettings.sUrl !== undefined || oSettings.sUrl !== '#') {
					$.colorbox(oSettings);
				}
			},
			close: function () {
				$.colorbox.close();
			},
			onStop: function () {
				this.sPathCss = null;
				this.oDefault = null;
			},
			onDestroy: function () {
				delete this.sPathCss;
				delete this.oDefault;
			}
		};
	});

})(window, oGlobalSettings, FrontendTools, FrontendCore, $);
