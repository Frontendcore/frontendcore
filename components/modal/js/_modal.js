;(function (window, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('modal', [], function () {

		var aTargets = FrontendTools.getDataModules('modal'),
			nModalWidth = FrontendTools.isMobile.any() ? $(window).width() : '100%',
			nModalHeight = FrontendTools.isMobile.any() ? $(window).height() : '100%';

		return {
			oDefault: {
			    fixed: true,
				scrolling: true,
				maxWidth: '100%',
				maxHeight: '100%',
				onComplete: function() {
					FrontendCore.domBoot( document.getElementById('cboxLoadedContent') );
				},
                onOpen: function() {
                    var ycoord = $(window).scrollTop();
                    $('#colorbox').data('ycoord',ycoord);
                    ycoord = ycoord * -1;
                    $('body').css('position','fixed').css('left','0px').css('right','0px').css('top',ycoord + 'px');
                },
                onClosed: function() {
                    $('body').css('position','').css('left','auto').css('right','auto').css('top','auto');
                    $(window).scrollTop($('#colorbox').data('ycoord'));
                }
			},
			onStart: function () {

				var self = this;

				FrontendTools.loadCSS( oGlobalSettings.sPathCss + 'secondary.css?v=' + oGlobalSettings.sHash );

				FrontendTools.trackModule('JS_Libraries', 'call', 'modal' );

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

						if ( document.getElementById(aHrefHash[1]) !== null ) {
							var sHtmlTarget = document.getElementById(aHrefHash[1]).outerHTML;

							$('#modal-inline').append( sHtmlTarget );
							$('#modal-preload').html('');
						}



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
					oOptions.width = FrontendTools.isMobile.any() ? nModalWidth : oTarget.getAttribute("data-fc-width");
				} else if (oOptions.width === undefined) {
					oOptions.width = FrontendTools.isMobile.any() ? nModalWidth : false;
				}

				if (oTarget.getAttribute("data-fc-height") !== null ) {
					oOptions.height =  FrontendTools.isMobile.any() ? nModalHeight : oTarget.getAttribute("data-fc-height");
				} else if (oOptions.height === undefined) {
					oOptions.height = FrontendTools.isMobile.any() ? nModalHeight : false;
				}

				if ( aHrefHash.length > 1 ) {
					oOptions.inline = true;
					oOptions.href = '#' + aHrefHash[1];

					oOptions.onOpen = function() {
						window.history.pushState({}, window.document.title, oOptions.href );
					};

					oOptions.onClosed = function() {
						window.history.pushState("", window.document.title, window.location.pathname + window.location.search);
					};

				} else {
					if (!self.isImage(sHref)) {

						oOptions.iframe = true;

						if (oTarget.getAttribute("data-fc-width") === null) {
							oOptions.width = nModalWidth;
						}
						if (oTarget.getAttribute("data-fc-height") === null) {
							oOptions.height = nModalHeight;
						}
					} else {
						oOptions.iframe = false;
						oOptions.photo = true;
					}

					oOptions.inline = false;
					oOptions.href = sHref;
				}

				if (oTarget.getAttribute("data-fc-href-suffix") !== null ) {
					oOptions.href += oTarget.getAttribute("data-fc-href-suffix");
				}

				if (oTarget.getAttribute("data-fc-close") === 'false' ) {
					oOptions.closeButton = false;
					oOptions.overlayClose = false;
				}

				if ( oTarget.getAttribute("data-fc-class") !== null ) {
					oOptions.className = oTarget.getAttribute("data-fc-class");
				}

				oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);


				if ( oTarget.getAttribute("data-fc-mobile") !== 'false' || !FrontendTools.isMobile.any() ) {
					$(oTarget).colorbox(oSettings);
				}

				window.onpopstate = function(event)
				{
					$( aTargets ).each(function () {

						var oTargetLink = this;

						if ( window.location.hash === ('#' + oTargetLink.href.split('#')[1]) ) {
							$.colorbox.close();
							setTimeout( function(){

								$(oTargetLink).click();
							}, 400);

							return false;

						}
					});

				};

				if ( window.location.hash === oSettings.href ) {
					$.colorbox.close();
					$(oTarget).click();
				}

			},
			open: function (oOptions) {

				if (oOptions.href !== undefined || oOptions.href !== '#') {

					var self = this,
					oSettings,
					sHref = oOptions.href,
					aHrefHash = sHref.split('#');


					if ( aHrefHash.length > 1 ) {
						oOptions.inline = true;
						oOptions.href = '#' + aHrefHash[1];

						oOptions.onOpen = function() {
							window.history.pushState({}, window.document.title, oOptions.href );
						};

						var defaultOnClosed = function() {
							window.history.pushState("", window.document.title, window.location.pathname + window.location.search);
						};

						if (oOptions.onClosed) {
							oOptions.onClosed = (function(onCloseCb) { return function() {defaultOnClosed(); onCloseCb();}; })(oOptions.onClosed);
						}
						else {
							oOptions.onClosed = defaultOnClosed;
						}

					} else {
						if (!self.isImage(sHref)) {

							oOptions.iframe = true;

							if (oOptions.width === null) {
								oOptions.width = nModalWidth;
							}
							if ( oOptions.height === null) {
								oOptions.height = nModalHeight;
							}
						} else {
							oOptions.iframe = false;
							oOptions.photo = true;
						}

						oOptions.inline = false;
						oOptions.href = sHref;
					}

					if ( oOptions.close === false) {
						oOptions.closeButton = false;
						oOptions.overlayClose = false;
					}

					oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

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
