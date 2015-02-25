TinyCore.AMD.define('tags', [], function () {
	return {
		sPathCss: oGlobalSettings.sPathCssUI + '?v=' + oGlobalSettings.sHash,
		oDefault: {
			useCommaKey: true
		},
		onStart: function () {

			var aTarget = document.querySelectorAll('[data-tc-modules="tags"]'),
				self = this;

			oTools.loadCSS(this.sPathCss);

			oTools.trackModule('JS_Libraries', 'call', 'tags' );

			self.autobind(aTarget);

		},
		autobind: function (aTargets) {

			var self = this;

			$(aTargets).each(function ( nTarget ) {

				var oSettings,
					oOptions = {},
					oTarget = this,
					aValues,
					fSuggest = [],
					oRealTarget = this,
					oRealId;

				if (oTarget.nodeName === 'INPUT') {
					oRealTarget = document.createElement('div');
					oRealId =  oTarget.getAttribute("name") !== '' ? oTarget.getAttribute("name") : 'tags_array_real';
					oRealTarget.id = oRealId;
					$(oTarget).before(oRealTarget).css({
						"height": "1px",
						"width" : "100%",
						"border" : "0px none",
						"padding" : "0",
						"margin": "0",
						"position" : "absolute"
					}).parent().css("position","relative");
				}

				oOptions.name = oTarget.getAttribute("name") !== '' ? oTarget.getAttribute("name") + '_array' : "tags_array";

				if (oTarget.getAttribute("data-tc-max") !== null) {
					oOptions.maxSelection = oTarget.getAttribute("data-tc-max");
				}

				if (oTarget.getAttribute("data-tc-mode") === 'restrict') {
					oOptions.hideTrigger = false;
					oOptions.allowFreeEntries = false;
				} else {
					oOptions.hideTrigger = true;
				}

				if (oTarget.getAttribute("data-tc-select") === 'true') {
					oOptions.hideTrigger = false;
				}

				if (oTarget.value !== '' && oTarget.value !== undefined) {

					oOptions.value = oTarget.value.split(',');
				}

				if (oTarget.placeholder !== '') {
					oOptions.startText = oTarget.placeholder;
				}

				if ( oTarget.getAttribute("data-tc-values") !== null) {

					oOptions.data = [];
					aValues = oTarget.getAttribute("data-tc-values").split(',');

					for (var nKey in aValues) {
						oOptions.data.push(aValues[nKey]);
					}
				}

				oSettings = oTools.mergeOptions(self.oDefault, oOptions);

				fSuggest[nTarget] = $(oRealTarget).magicSuggest(oSettings);

				$(fSuggest[nTarget]).on('selectionchange', function(){
					var sValue ='',
						aValue = fSuggest[nTarget].getValue();

					for (var nCounter = 0; nCounter < aValue.length; nCounter++) {
						sValue+= aValue[nCounter] + ',';
					}

					oTarget.value = sValue;

				});


				oOptions = null;

			});
		},
		onStop: function () {
			this.sPathCss = null;
		},
		onDestroy: function () {
			delete this.sPathCss;
		}
	};
});