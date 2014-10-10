TinyCore.AMD.define('carousel', ['devicePackage'], function () {
	return {
		sPathCss: oGlobalSettings.sPathCss + 'ui/' + 'carousel.css',
		oDefault: {
            baseClass: 'carousel',
            themeClass: 'carousel-theme',
            items:1,
            nav: true,
            navText: ['',''],
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
                    items:1
                },
                600:{
                    items:1
                },
                1300:{
                    items:2
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
				oOptions = {},
                sProperty;

            $('.carousel-video', oTarget).each( function(){
                $(this).addClass('owl-video');
            });

            for ( sProperty in self.oDefault ){

                if (oTarget.getAttribute("data-tc-" + sProperty) !== null) {
                    oOptions[sProperty] = oTarget.getAttribute("data-tc-" + sProperty);
                }

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