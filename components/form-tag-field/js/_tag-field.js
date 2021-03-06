;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('tag-field', [], function () {
		return {
			oDefault: {
				useCommaKey: true,
				noSuggestionText: 'No result matching the term {{query}}',
				placeholder: 'Add a Tag',
				maxSelection: null
			},
			onStart: function () {

				var aTarget = FrontendTools.getDataModules('tag-field'),
					self = this;

				FrontendTools.loadCSS( oGlobalSettings.sPathCss + 'secondary.css?v=' + oGlobalSettings.sHash );

				FrontendTools.trackModule('JS_Libraries', 'call', 'tag-field');

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
							"margin": "-1px 0 0 0",
							"color" : "transparent",
							"position" : "absolute",
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

					if (oTarget.getAttribute("data-fc-container") !== null) {
						oOptions.selectionContainer = $(oTarget.getAttribute("data-fc-container"));
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

					if (oTarget.getAttribute("data-fc-method") !== null ) {
						oOptions.method = oTarget.getAttribute("data-fc-method");
					}

					if ( oTarget.getAttribute("data-fc-values") !== null) {

						var aTempValues = oTarget.getAttribute("data-fc-values").split(',');

						if (aTempValues.length > 1){
							oOptions.data = [];
							aValues = aTempValues;

							for (var nKey in aValues) {
								oOptions.data.push(aValues[nKey]);
							}
						} else {
							oOptions.data = oTarget.getAttribute("data-fc-values");
						}

					}

					oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

					FrontendTools.removeLoading(oRealTarget);

					$(oTarget).on('clear', function () {
						fSuggest[nTarget].clear();
					});

					$(oTarget).on('setValue', function (event, data) {
						fSuggest[nTarget].clear();
						fSuggest[nTarget].setValue(data.values);
					});

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

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);
