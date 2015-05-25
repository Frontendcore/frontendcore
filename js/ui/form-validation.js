; (function (window, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('form-validation', ['form-validation-libs'], function () {
		return {
			sPathCss: oGlobalSettings.sPathCssUI + '?v=' + oGlobalSettings.sHash,
			oDefault: {
				namespace: 'data-fc-',
				// Supported inputs by default
				inputs: 'input, textarea, select',
				// Excluded inputs by default
				excluded: 'input[type=button], input[type=submit], input[type=reset], input[type=hidden]',
				// Stop validating field on highest priority failing constraint
				priorityEnabled: true,
				// ### UI
				// Enable\Disable error messages
				uiEnabled: true,
				// Key events threshold before validation
				validationThreshold: 3,
				// Focused field on form validation error. 'first'|'last'|'none'
				focus: 'first',
				// `$.Event()` that will trigger validation. eg: `keyup`, `change`...
				trigger: 'blur',
				// Class that would be added on every failing validation Parsley field
				errorClass: 'error',
				// Same for success validation
				successClass: 'success',
				// Return the `$element` that will receive these above success or error classes
				// Could also be (and given directly from DOM) a valid selector like `'#div'`
				classHandler: function (ParsleyField) {},
				// Return the `$element` where errors will be appended
				// Could also be (and given directly from DOM) a valid selector like `'#div'`
				errorsContainer: function (ParsleyField) {},
				// ul elem that would receive errors' list
				errorsWrapper: '<ul class="c-ko fz-default"></ul>',
				// li elem that would receive error message
				errorTemplate: '<li></li>'

			},
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('form-validation'),
					self = this;

				FrontendTools.loadCSS(this.sPathCss);

				FrontendTools.trackModule('JS_Libraries', 'call', 'form-validation');

				if ( navigator.language ) {
					$.getScript(oGlobalSettings.sPathJsCore + 'ui/forms-locale/' + navigator.language + '.js');
				}

				$(aTargets).each(function (nIndex) {
					self.autobind(this, nIndex);
				});

			},
			autobind: function (oTarget, nIndex) {

				if (oTarget.id === '') {
					oTarget.id = 'form-validation-' + nIndex;
				}


				var self = this,
					oSettings,
					oOptions = {};


				if (oTarget.getAttribute("data-fc-width") !== null) {

				}

				oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

				$(oTarget).parsley(oSettings);

				$.listen('parsley:form:error', function( ){
					$('input.error:hidden', oTarget).each( function(){
						var sId = $(this).closest('[style="display: none;"]').attr('id');

						if (sId !== undefined) {
							$('a[href="#'+ sId +'"]').click();
							return false;
						} else {
							alert( this.name + ': This field is hidden and required.' );
						}
					});
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

})(window, oGlobalSettings, FrontendTools, FrontendCore, $ );