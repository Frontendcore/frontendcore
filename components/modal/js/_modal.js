;(function (window, oGlobalSettings, FrontendTools, FrontendCore, $, lightcase) {
	'use strict';

	FrontendCore.define('modal', [], function () {

		var aTargets = FrontendTools.getDataModules('modal'),
            sIdModal = '#lightcase-case';

        var currentScroll=0;
        function lockscroll(){
            $(window).scrollTop(currentScroll);
        }


        function disable_scroll() {
            //currentScroll=$(window).scrollTop();
            //$(window).bind('scroll',lockscroll);
        }

        function enable_scroll() {
            //currentScroll=$(window).scrollTop();
           //$(window).unbind('scroll');
        }


        function addSizeOption(oOptions,sAttribute, sSize) {

			var aTypes = ['inline','ajax','iframe','flash','video'];


			if (sAttribute === 'width' && sSize < $(window).width()) {
			    oOptions.forceWidth = true;
            }

			if (sAttribute === 'height' && sSize < $(window).height()) {
			    oOptions.forceHeight = true;
            }


			for (var key in aTypes) {


                if (oOptions[aTypes[key]] === undefined) {
                    oOptions[aTypes[key]] = {};
                }

                oOptions[aTypes[key]][sAttribute] = sSize;
			}

			return oOptions;
        }

        function addCallbackOption(sAttribute, sKey, fpCallback, oOptions) {

            if (oOptions[sAttribute] === undefined) {
                oOptions[sAttribute] = {};
            }

            oOptions[sAttribute][sKey] = fpCallback;

			return oOptions;
        }


        function addOption(oOptions, sAttribute, sValue ) {


            var disableCloseButton = function() {
                $('.lightcase-icon-close').addClass( 'd-n' );
            };

			switch (sAttribute) {
				case 'width':
                    oOptions = addSizeOption(oOptions, 'width', sValue  );
                    //oOptions.forceWidth = true;
                    oOptions.maxWidth = sValue;
				break;
				case 'height':
                    oOptions = addSizeOption(oOptions, 'height', sValue );
                    //oOptions.forceHeight = true;
                    oOptions.maxHeight = sValue;
				break;
                case 'closeButton':
                    oOptions = addCallbackOption('onStart', 'addClass', disableCloseButton , oOptions);
                break;
				case 'close':
                    oOptions.closeOnOverlayClick = false;
                    oOptions = addCallbackOption('onStart', 'addClass', disableCloseButton, oOptions);
                break;
				case 'href-suffix':
                    oOptions.href = sValue;
				break;
				case 'class':
                    oOptions = addCallbackOption('onFinish', 'addClass', function() {
                        $(sIdModal).addClass( sValue );
                    }, oOptions);
				break;
			}

			return oOptions;
        }

        function popHistory(oOptions, sHref) {

			var aHrefHash = sHref.split('#');

            if ( aHrefHash.length > 1 ) {

                oOptions = addCallbackOption('onStart', 'openHash', function() {
                    window.history.replaceState({}, window.document.title, '#' + aHrefHash[1]);
                }, oOptions);

                oOptions = addCallbackOption('onClose', 'closeHash', function() {
                    window.history.replaceState("", window.document.title, window.location.pathname + window.location.search);
                }, oOptions);

            }

            return oOptions;
        }

        function DefaultCallbacks(oOptions, sIdModal) {

            if (oOptions.onlyScrollOn !== undefined && oOptions.bBodyBinded !== true) {

                oOptions.bBodylocked = true;

                oOptions = addCallbackOption('onFinish', 'onlyScrollOn', function() {

                    $('body').bind('mousewheel', function(e) {

                        if(oOptions.bBodylocked && $(sIdModal).css('opacity') !== '0' ) {
                            var $div = $(oOptions.onlyScrollOn);

                            $div.scrollTop($div.scrollTop() - e.originalEvent.wheelDelta);

                            return false;
                        }
                    });
                    oOptions.bBodyBinded = true;

                }, oOptions);

                oOptions = addCallbackOption('onClose', 'disableOnlyScrollOn', function() {
                    oOptions.bBodylocked = false;
                }, oOptions);
            }

            oOptions = addCallbackOption('onFinish', 'checkOverlay', function() {

                var $overlay = $('#lightcase-overlay');

                if (  $overlay.css('opacity') === 0) {
                   setTimeout( function () {
                       $overlay.css({
                           opacity: 0.9,
                           display: 'block'
                       });
                   }, 500);

                }
            }, oOptions);


            oOptions = addCallbackOption('onFinish', 'domBoot', function() {
                FrontendCore.domBoot( $(sIdModal)[0] );
            }, oOptions);

            oOptions = addCallbackOption('onFinish', 'autoBindClose', function() {

                $('*[data-fc-close-modal="true"]', $(sIdModal)[0]).on('click', function (e) {
                    e.preventDefault();
                    lightcase.close();
                });

            }, oOptions);

            return oOptions;
        }

		return {
			oDefault: {
                liveResize: true,
                fullScreenModeForMobile: true,
                maxWidth:  $(window).width() < 700 ? '100%': '90%',
                maxHeight: $(window).width() < 700 ? '100%': '90%',
                overlayOpacity: 0.8,
                slideshow: false,
                slideshowAutoStart: true,
				timeout: 5000,
				swipe: true,
                useKeys: true,
                navigateEndless: true,
                closeOnOverlayClick: true,
                showTitle: true,
				showCaption: true,
                showSequenceInfo: true,
                attrPrefix: 'fc-',
                attr: 'data-fc-rel'
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
			autobind: function( oTarget) {

				var self = this,
                    aClasses,
					oSettings,
                    sHref = oTarget.href,
                    aHrefHash = sHref.split('#'),
                    oOptions = {},
                    nMobileHeight = document.documentElement.clientHeight - 100;

				// RELATED IMAGES
                if (oTarget.className.indexOf('group') != -1) {

                    aClasses = oTarget.className.split(' ');

                    for (var nCounter = 0; nCounter < aClasses.length; nCounter++) {
                        if (aClasses[nCounter].indexOf('group') != -1) {
                            oTarget.setAttribute('data-fc-rel','modal:' + aClasses[nCounter] );
                        }
                    }
                }

				// FORCE WIDTH
                if (oTarget.getAttribute("data-fc-width") !== null && !FrontendTools.isMobile.any() ) {
                    oOptions = addOption(oOptions, 'width', oTarget.getAttribute("data-fc-width"));
                }

                // FORCE HEIGHT
                if (oTarget.getAttribute("data-fc-height") !== null || FrontendTools.isMobile.any()  ) {
                    oOptions = addOption(oOptions, 'height', FrontendTools.isMobile.any()  ? nMobileHeight : oTarget.getAttribute("data-fc-height") );

                }

                // EXTERNAL CONTENT TO INLINE

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

                // #HISTORY URI
                oOptions = popHistory(oOptions, sHref);

                // DISABLE ALL CLOSE CONTROLS
                if (oTarget.getAttribute("data-fc-close") === 'false' ) {
                    oOptions = addOption(oOptions, 'close');
                }

                // HIDE CLOSE BUTTON
                if (oTarget.getAttribute("data-fc-close-button") === 'false' ) {
                    oOptions = addOption(oOptions, 'closeButton');
                }

                // HREF SUFFIX
                if (oTarget.getAttribute("data-fc-href-suffix") !== null ) {
                    oOptions = addOption(oOptions, 'href-suffix', oTarget.href + oTarget.getAttribute("data-fc-href-suffix"));
                }

                // ADD CLASS
                if ( oTarget.getAttribute("data-fc-class") !== null ) {
                    oOptions = addOption(oOptions, 'class', oTarget.getAttribute("data-fc-class"));
                }

                if ( oTarget.getAttribute("data-only-scroll-on") !== null ) {
                    oOptions = addOption(oOptions, 'onlyScrollOn', oTarget.getAttribute("data-only-scroll-on"));


                }

                oOptions = DefaultCallbacks(oOptions, sIdModal);

				oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

                // OPEN IF NOT MOBILE AND MOBILE DISABLED

                if ( oTarget.getAttribute("data-fc-mobile") === 'false' && FrontendTools.isMobile.any() ) {
                } else {
                    $(oTarget).lightcase(oSettings);
                }


                // OPEN MODAL ON POP STATE
                window.onpopstate = function(event)
                {
                    $( aTargets ).each(function () {

                        var oTargetLink = this;

                        if ( window.location.hash === ('#' + oTargetLink.href.split('#')[1]) ) {
                            self.close();
                            setTimeout( function(){
                                $(oTargetLink).click();
                            }, 400);

                            return false;

                        }
                    });

                };

                if ( aHrefHash.length > 1 ) {
                    // OPEN MODAL ON PAGE
                    if ( window.location.hash === '#' + aHrefHash[1] ) {
                        self.close();
                        $(oTarget).click();
                    }
                }

			},
			open: function (oOptions) {

				if (oOptions.href !== undefined || oOptions.href !== '#') {

					var self = this,
					oSettings,
					sHref = oOptions.href;


					if (oOptions.onOpen !== undefined) {
                        oOptions = addCallbackOption('onInit', 'onOpenManual', oOptions.onOpen, oOptions);
                    }
					if (oOptions.onLoad !== undefined) {
                        oOptions = addCallbackOption('onStart', 'onLoadManual', oOptions.onLoad, oOptions);
                    }
					if (oOptions.onComplete !== undefined) {
                        oOptions = addCallbackOption('onFinish', 'onCompleteManual', oOptions.onComplete, oOptions);
                    }
					if (oOptions.onCleanup !== undefined) {
                        oOptions = addCallbackOption('onCleanup', 'onCleanupManual', oOptions.onCleanup, oOptions);
                    }
					if (oOptions.onClosed !== undefined) {
                        oOptions = addCallbackOption('onClose', 'onClosedManual', oOptions.onClosed, oOptions);
                    }

                    // FORCE WIDTH
                    if ( oOptions.width !== undefined ) {
                        oOptions = addOption(oOptions, 'width', oOptions.width );
                    }

                    // FORCE HEIGHT
                    if ( oOptions.height !== undefined ) {
                        oOptions = addOption(oOptions, 'height', oOptions.height );
                    }

                    // #HISTORY URI
                    oOptions = popHistory(oOptions, sHref);

                    // DISABLE ALL CLOSE CONTROLS
                    if (oOptions.close === false ) {
                        oOptions = addOption(oOptions, 'close');
                    }
                    // HIDE CLOSE CONTROLS
                    if (oOptions.closeButton === false ) {
                        oOptions = addOption(oOptions, 'closeButton');
                    }

                    // HREF SUFFIX
                    if ( oOptions.hrefSuffix !== undefined ) {
                        oOptions = addOption(oOptions, 'href-suffix', oOptions.href + oOptions.hrefSuffix );
                    }

                    // ADD CLASS
                    if ( oOptions.class !== undefined ) {
                        oOptions = addOption(oOptions, 'class', oOptions.class );
                    }

                    oOptions = DefaultCallbacks(oOptions, sIdModal);


					oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

                    lightcase.start(oSettings);

				}
			},
			close: function () {
                lightcase.close();
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

})(window, oGlobalSettings, FrontendTools, FrontendCore, $, lightcase);
