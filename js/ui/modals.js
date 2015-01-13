TinyCore.AMD.define('modal', ['devicePackage'], function () {
	return {
		sPathCss: oGlobalSettings.sPathCss + 'ui/' + 'modal.css',
		oDefault: {
			maxWidth: '100%',
			maxHeight: '100%',
			onComplete: function() {
				TinyCore.AMD.domBoot( document.getElementById('cboxLoadedContent') );
			}
		},
		onStart: function () {

			var aTargets = document.querySelectorAll('[data-tc-modules="modal"]'),
				self = this;

			FC.loadCSS(this.sPathCss);

			FC.trackEvent('JS_Libraries', 'call', 'modal' );

			require(['modalLibs'], function() {
				self.autobind(aTargets);
			});
		},
		autobind: function (aTargets) {

			var sRel,
				aClasses,
				self = this,
				sHref;

			$( aTargets ).each(function () {

				var oSettings,
					oOptions = {};

				sHref = this.href;

				if (this.className.indexOf('group') != -1) {

					aClasses = this.className.split(' ');

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

				if (sHref.indexOf('#') !== -1) {
					oOptions.inline = true;
					oOptions.href = '#' + sHref.split('#')[1];
				} else {

					if (sHref.indexOf('.jpg') === -1 && sHref.indexOf('.png') === -1 && sHref.indexOf('.gif') === -1 && sHref.indexOf('.bmp') === -1) {
						oOptions.iframe = true;
					} else {
						oOptions.iframe = false;
					}

					oOptions.inline = false;
					oOptions.href = sHref;
				}

				if (this.getAttribute("data-tc-width") !== null) {
					oOptions.width = this.getAttribute("data-tc-width");
				} else {
					oOptions.width = false;
				}


				if (this.getAttribute("data-tc-height") !== null) {
					oOptions.height = this.getAttribute("data-tc-height");
				} else {
					oOptions.height = false;
				}

				oSettings = FC.mixOptions(oOptions, self.oDefault);

				$(this).colorbox(oSettings);

			});
		},
		open: function (oOptions) {
			var self = this,
				oSettings = FC.mixOptions(oOptions, self.oDefault);

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

