; (function (window, document, oGlobalSettings, FrontendTools, FrontendCore,FrontendMediator, $) {
	'use strict';

	FrontendCore.define('form-validation', ['form-validation-libs'], function () {

		var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && navigator.userAgent && !navigator.userAgent.match('CriOS');

		function disableSubmitButton( oTarget) {
			FrontendMediator.publish('form:success');
			$('button[type="submit"]', oTarget).addClass('_disabled').prop('disabled','true');
		}

		function validateForm(oContext, oTarget, nIndex) {
			if (oTarget.id === '') {
				oTarget.id = 'form-validation-' + nIndex;
			}


			var self = oContext,
				oSettings,
				oOptions = {},
				sLang = 'en';

			if (oTarget.getAttribute("data-fc-language") !== null) {
				sLang = oTarget.getAttribute("data-fc-language");
			} else if (navigator.language) {
				sLang = navigator.language;
				if (navigator.language.indexOf('en-')!==-1) { sLang = 'en'; }
				else if (navigator.language.indexOf('ar-')!==-1) { sLang = 'ar'; }
				else if (navigator.language.indexOf('es-')!==-1) { sLang = 'es'; }
				else if (navigator.language.indexOf('fr-')!==-1) { sLang = 'fr'; }
				else if (navigator.language.indexOf('zh-tw')!==-1) { sLang = 'zh_tw'; }
				else if (navigator.language.indexOf('zh-')!==-1) { sLang = 'zh_cn'; }
			}

			$.getScript(oGlobalSettings.sPathJsCore + 'ui/forms-locale/' + sLang + '.js');

			oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

			$(oTarget).parsley(oSettings);


			if (isSafari) {
				// By default, we won't submit the form.
				var submitForm = false;

				$(oTarget).on('submit', function(e) {
					// If our variable is false, stop the default action.
					// The first time 'submit' is triggered, we should prevent the default action
					if (!submitForm) {
						e.preventDefault();
					}
					var form = $(this);

					form.parsley().validate();

					// If the form is valid
					if (form.parsley().isValid()) {
						// Set the variable to true, so that when the 'submit' is triggered again, it doesn't
						// prevent the default action
						submitForm = true;
						// do something here...
						disableSubmitButton(oTarget);

						setTimeout(function() {
							// Trigger form submit
							form.submit();
						}, 100);

					} else {
						// There could be times when the form is valid and then becames invalid. In these cases,
						// set the variable to false again.
						submitForm = false;
					}
				});
			} else {
				$.listen('parsley:form:success', function(e){
					disableSubmitButton(oTarget);
				});
			}


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
		}

		return {
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
				classHandler: function (el) {
					if ( el.$element[0].type === 'checkbox' ||  el.$element[0].type === 'radio') {
						return el.$element.closest("ul");
					} else {
						return el.$element.closest("li");
					}
				},
				// Return the `$element` where errors will be appended
				// Could also be (and given directly from DOM) a valid selector like `'#div'`
				errorsContainer: function (el) {
					if ( el.$element[0].type === 'checkbox' ||  el.$element[0].type === 'radio') {
						return el.$element.closest("ul").prev();
					} else {
						return el.$element.closest("li");
					}
				},
				// ul elem that would receive errors' list
				errorsWrapper: '<ul class="form-error-message"></ul>',
				// li elem that would receive error message
				errorTemplate: '<li></li>'

			},
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('form-validation'),
					self = this;

				FrontendTools.loadCSS( oGlobalSettings.sPathCss + 'secondary.css?v=' + oGlobalSettings.sHash );

				FrontendTools.trackModule('JS_Libraries', 'call', 'form-validation');

				$(aTargets).each(function (nIndex) {
					self.autobind(this, nIndex);
				});

			},
			autobind: function (oTarget, nIndex) {

				validateForm(this, oTarget, nIndex);

			},
			onStop: function () {
				this.sPathCss = null;
			},
			onDestroy: function () {
				delete this.sPathCss;
			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, FrontendMediator, $ );
