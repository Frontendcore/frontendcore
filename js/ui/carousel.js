FrontendCore.define('carousel', [], function () {
	return {
        sPathCss: oGlobalSettings.sPathCssUI + '?v=' + oGlobalSettings.sHash,
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

			var aTargets = FrontendTools.getDataModules('carousel'),
				self = this;

			FrontendTools.loadCSS(this.sPathCss);

			FrontendTools.trackModule('JS_Libraries', 'call', 'carousel' );

            $(aTargets).each(function () {
                self.autobind(this);
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

                if (oTarget.getAttribute("data-fc-" + sProperty) !== null) {
                    oOptions[sProperty] = oTarget.getAttribute("data-fc-" + sProperty);
                }

            }

            if (oTarget.getAttribute("data-fc-video-height") !== null) {
                oOptions.videoHeight = oTarget.getAttribute("data-fc-video-height");
            }
            if (oTarget.getAttribute("data-fc-video-width") !== null) {
                oOptions.videoWidth = oTarget.getAttribute("data-fc-video-width");
            }

            if (oTarget.getAttribute("data-fc-device-items") !== null) {

                aDeviceItems = oTarget.getAttribute("data-fc-device-items").split(',');

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

			oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

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