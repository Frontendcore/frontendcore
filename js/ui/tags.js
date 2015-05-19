FrontendCore.define('tags', [], function () {
	return {
		sPathCss: oGlobalSettings.sPathCssUI + '?v=' + oGlobalSettings.sHash,
		oDefault: {
			useCommaKey: true,
			noSuggestionText: 'No result matching the term {{query}}',
			placeholder: 'Add a Tag'
		},
		onStart: function () {

			var aTarget = document.querySelectorAll('[data-fc-modules="tags"]'),
				self = this;

			FrontendTools.loadCSS(this.sPathCss);

			FrontendTools.trackModule('JS_Libraries', 'call', 'tags' );

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

				if (oTarget.getAttribute("data-fc-max") !== null) {
					oOptions.maxSelection = oTarget.getAttribute("data-fc-max");
				}

				if (oTarget.getAttribute("data-fc-mode") === 'restrict') {
					oOptions.hideTrigger = false;
					oOptions.allowFreeEntries = false;
				} else {
					oOptions.hideTrigger = true;
				}

				if (oTarget.getAttribute("data-fc-select") === 'true') {
					oOptions.hideTrigger = false;
				}

				if (oTarget.value !== '' && oTarget.value !== undefined) {

					oOptions.value = oTarget.value.split(',');
				}

				if (oTarget.placeholder !== '') {
					oOptions.placeholder = oTarget.placeholder;
				}

				if (oTarget.getAttribute("data-fc-text-no-suggestion") !== null ) {
					oOptions.noSuggestionText = oTarget.getAttribute("data-fc-text-no-suggestion");
				}

				if ( oTarget.getAttribute("data-fc-values") !== null) {

					oOptions.data = [];
					aValues = oTarget.getAttribute("data-fc-values").split(',');

					for (var nKey in aValues) {
						oOptions.data.push(aValues[nKey]);
					}
				}

				oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

				FrontendTools.removeLoading(oRealTarget);

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