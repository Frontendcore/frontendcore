TinyCore.AMD.define('stats', [], function () {
	return {
		sPathCss: oGlobalSettings.sPathCssUI + '?v=' + oGlobalSettings.sHash,
		oDefault: {
			type: 'bar',
			table: 'modal',
			height: '300',
			width: '420',
			pieMargin: '10'
		},
		onStart: function () {

			var aTargets = document.querySelectorAll('[data-tc-modules="stats"]'),
				self = this;

			oTools.loadCSS(this.sPathCss);

			oTools.trackModule('JS_Libraries', 'call', 'graph' );

			self.autobind(aTargets);
		},
		autobind: function (aTargets) {

			var self = this;

			$(aTargets).each(function () {

				var oSettings,
					oOptions = {},
					sTable = this.getAttribute("data-tc-table"),
					oLink,
					oModal,
					oBox,
					sLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26)),
					sId = sLetter + Date.now(),
					$Parent,
					nLeftPadding,
					nRightPadding;


				if (this.getAttribute("data-tc-type") !== null) {
					oOptions.type = this.getAttribute("data-tc-type");
				}

				if (this.getAttribute("data-tc-height") !== null) {
					oOptions.type = this.getAttribute("data-tc-height");
				}

				if (this.getAttribute("data-tc-width") !== null) {
					oOptions.width = this.getAttribute("data-tc-width");
				} else {
					$Parent = $(this).parent();
					nLeftPadding = parseInt( $Parent.css('padding-left') , 10 );
					nRightPadding = parseInt( $Parent.css('padding-right') , 10 );
					oOptions.width = $Parent.width() - ( nLeftPadding + nRightPadding + 44 );
				}

				if ( sTable === 'hide' ) {
					this.style.display = 'none';
				}

				oSettings = oTools.mergeOptions(self.oDefault, oOptions);

				if (sTable === 'down') {
					$(this).visualize(oSettings).insertBefore(this);
				} else {
					$(this).visualize(oSettings);
				}

				if ( sTable === null || sTable === 'modal') {

					oLink = document.createElement('a');
					oLink.id = sId + 1;
					oLink.href = '#' + sId;
					oLink.className = 'icon-table visualize-icon-table';
					oLink.setAttribute('data-tc-modules','modal');
					$(this).before(oLink);

					oBox = document.createElement('div');
					oBox.id = sId;
					oBox.className = 'box-text';
					oBox.innerHTML = this.outerHTML;

					oModal = document.createElement('div');
					oModal.className = 'hidden';
					oModal.innerHTML = oBox.outerHTML;

					$(this).before(oModal);
					$(this).remove();

					TinyCore.AMD.domBoot( document.getElementById(sId + 1) );
				}


			});
		},
		onStop: function () {
			this.oDefault = null;
		},
		onDestroy: function () {
			delete this.oDefault;
		}
	};
});
