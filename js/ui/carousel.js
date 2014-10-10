TinyCore.AMD.define('carousel', ['devicePackage'], function () {
	return {
		sPathCss: oGlobalSettings.sPathCss + 'ui/' + 'carousel.css',
		oDefault: {
            items:1,
            loop: true,
            margin: 10,
            merge:true,
            video:true,
            autoHeight:true,
            videoWidth: '100%', // Default false; Type: Boolean/Number
            videoHeight: 300, // Default false; Type: Boolean/Number
            lazyLoad:true,
            center:true,
            autoplay:true,
            autoplayTimeout:5000,
            autoplayHoverPause:true,
            responsive:{
                480:{
                    items:2
                },
                600:{
                    items:4
                }
            }
		},
		onStart: function () {

			var aTargets = FC.getDataModules('carousel'),
				self = this;

			FC.loadCSS(this.sPathCss);

			FC.trackEvent('JS_Libraries', 'call', 'carousel' );

			require(['carouselLibs'], function() {
				$(aTargets).each(function () {
					self.autobind(this);
				});
			});


		},
		autobind: function (oTarget, sData) {



			var self = this,
				oSettings,
				oOptions = {};

			if (oTarget.getAttribute("data-tc-loop") !== null) {
				oOptions.loop = oTarget.getAttribute("data-tc-loop");
			}

			if (oTarget.getAttribute("data-tc-margin") !== null) {
				oOptions.margin = oTarget.getAttribute("data-tc-margin");
			}

			oSettings = FC.mixOptions(oOptions, self.oDefault);

			if ( oSettings !== undefined ){
                $(oTarget).owlCarousel(oSettings);
			}

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