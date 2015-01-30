TinyCore.AMD.define('tags', [], function () {
	return {
		sPathCss: oGlobalSettings.sPathCssUI + '?v=' + oGlobalSettings.sHash,
		oDefault: {
			asHtmlID: false,
			startText: "Add a tag...",
			emptyText: "No Results Found",
			preFill: {},
			limitText: "No More Selections Are Allowed",
			selectedItemProp: "value", //name of object property
			selectedValuesProp: "value", //name of object property
			searchObjProps: "value", //comma separated list of object property names
			queryParam: "q",
			retrieveLimit: false, //number for 'limit' param on ajax request
			extraParams: "",
			matchCase: false,
			minChars: 1,
			keyDelay: 400,
			resultsHighlight: true,
			neverSubmit: true,
			selectionLimit: false,
			showResultList: true
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

			$(aTargets).each(function () {

				var oSettings,
					oOptions = {},
					oTarget = this,
					aValues,
					aData = [],
					sName = this.getAttribute("name"),
					$realInput,
					bRequired = false;

				if (oTarget.getAttribute("required") !== null) {
					bRequired = true;
				}


				if (oTarget.getAttribute("data-tc-max") !== null) {
					oOptions.selectionLimit = oTarget.getAttribute("data-tc-max");
				}

				if (oTarget.getAttribute("data-tc-text-noresult") !== null) {
					oOptions.emptyText = oTarget.getAttribute("data-tc-text-noresult");
				}

				if (oTarget.getAttribute("data-tc-text-max") !== null) {
					oOptions.limitText = oTarget.getAttribute("data-tc-text-max");
				}

				if (oTarget.value !== '') {
					oOptions.preFill = oTarget.value;
				} else {
					oOptions.preFill = false;
				}

				if (oTarget.placeholder !== '') {
					oOptions.startText = oTarget.placeholder;
				}

				if ( oTarget.getAttribute("data-tc-values") !== null) {
					aValues = oTarget.getAttribute("data-tc-values").split(',');

					for (var nKey in aValues) {
						aData.push({ 'value': aValues[nKey] });
					}
				} else {
					aData.push({ 'value': '' });
				}

				if (bRequired) {

					oOptions.selectionRemoved = function(elem) {
						var $input = $('input[name='+ sName + ']');

						if ($input.attr('value') == ',') {
							$input.attr('value','');
						}

						elem.fadeTo("fast", 0, function(){ elem.remove(); });

					};
				}

				oSettings = oTools.mergeJSON(oOptions, self.oDefault);

				$(oTarget).autoSuggest(aData, oSettings).removeAttr('name');

				$realInput = $(oTarget).next();

				$realInput.attr('name', sName);

				if (bRequired) {

					$realInput
						.attr('style', 'position:absolute; height:1px; padding:0;')
						.attr('type', 'text')
						.attr('required','required');

					$(oTarget).removeAttr('required');
				}

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