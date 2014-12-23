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
            merge:false,
            video:true,
            lazyLoad:true,
            videoWidth: '100%', // Default false; Type: Boolean/Number
            videoHeight: 300, // Default false; Type: Boolean/Number
            center:true,
            autoplay:true,
            autoplayTimeout:5000,
            autoplayHoverPause:true
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
                sProperty,
                aDeviceItems;

            $('.carousel-video', oTarget).each( function(){
                $(this).addClass('owl-video');
            });

            for ( sProperty in self.oDefault ){

                if (oTarget.getAttribute("data-tc-" + sProperty) !== null) {
                    oOptions[sProperty] = oTarget.getAttribute("data-tc-" + sProperty);
                }

            }

            if (oTarget.getAttribute("data-tc-video-height") !== null) {
                oOptions.videoHeight = oTarget.getAttribute("data-tc-video-height");
            }
            if (oTarget.getAttribute("data-tc-video-width") !== null) {
                oOptions.videoWidth = oTarget.getAttribute("data-tc-video-width");
            }

            if (oTarget.getAttribute("data-tc-device-items") !== null) {

                aDeviceItems = oTarget.getAttribute("data-tc-device-items").split(',');

                oOptions.responsive = {
                    '0':{
                        items: parseInt(aDeviceItems[0],10),
                        nav: false
                    },
                    '480':{
                        items:parseInt(aDeviceItems[1],10),
                        nav: true
                    },
                   '980':{
                        items:parseInt(aDeviceItems[2],10),
                        nav: true
                    }
                };
            }

			oSettings = FC.mixOptions(oOptions, self.oDefault );

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