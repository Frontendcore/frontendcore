;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('tel-field', [], function () {
		
		function syncCountryFieldSelect(oTarget, $countryField, initialCountry, countryData) {

			// populate the country dropdown
			$.each(countryData, function(i, country) {
				$countryField.append($("<option></option>").attr("value", country.iso2).text(country.name));
			});

			// set it's initial value
			$countryField.val(initialCountry.iso2);

			if ( oTarget.getAttribute("data-fc-sync-tel") !== "false" ) {
				// listen to the telephone input for changes
				$(oTarget).on("countrychange", function(e, countryData) {
					$countryField.val(countryData.iso2);
				});
			}

			if ( oTarget.getAttribute("data-fc-sync-country") !== "false" ) {
				// listen to the address dropdown for changes
				$countryField.change(function () {
					$(oTarget).intlTelInput("setCountry", $(this).val());
				});
			}
		}

		function syncCountryFieldInput(oTarget, $countryField, initialCountry ) {
			
			// set it's initial value
			$countryField.val(initialCountry.iso2);

			if ( oTarget.getAttribute("data-fc-sync-tel") !== "false" ) {
				// listen to the telephone input for changes
				$(oTarget).on("countrychange", function(e, countryData) {
					$countryField.val(countryData.iso2);
				});
			}

			if ( oTarget.getAttribute("data-fc-sync-country") !== "false" ) {
				// listen to the address dropdown for changes
				$countryField.on('change keyup', function () {
					$(oTarget).intlTelInput("setCountry", $(this).val());
				});
			}
		}
		
		function syncCodeFieldSelect(oTarget, $codeField, initialCountry, countryData) {
			
			// populate the country dropdown
			$.each(countryData, function(i, country) {
				$codeField.append($("<option></option>").attr("data-fc-iso", country.iso2).attr("value", country.dialCode).text('+' + country.dialCode ));
			});

			$codeField.find('option').each( function(){
				if ($(this).attr('data-fc-iso') == initialCountry.iso2) {
					$(this).attr('selected','selected');
				} else {
					$(this).removeAttr('selected');
				}
			});

			if ( oTarget.getAttribute("data-fc-sync-tel") !== "false" ) {
				// listen to the telephone input for changes
				$(oTarget).on("countrychange", function (e, countryData) {
					$codeField.find('option').each( function(){
						if ($(this).attr('data-fc-iso') == countryData.iso2) {
							$(this).attr('selected','selected');
						} else {
							$(this).removeAttr('selected');
						}
					});
				});
			}

			if ( oTarget.getAttribute("data-fc-sync-code") !== "false" ) {
				// listen to the address dropdown for changes
				$codeField.change(function () {
					$(oTarget).intlTelInput("setCountry", $(':selected', this).attr("data-fc-iso") );
				});
			}
		}

		function syncCodeFieldInput(oTarget, $codeField, initialCountry) {


			$codeField.val(initialCountry.dialCode);


			if ( oTarget.getAttribute("data-fc-sync-tel") !== "false" ) {
				// listen to the telephone input for changes
				$(oTarget).on("countrychange", function (e, countryData) {

					$codeField.val(countryData.dialCode);

				});
			}
		}

		return {
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('tel-field'),
					self = this;


				FrontendCore.require(['tel-field-libs'], function(){
					$(aTargets).each( function(nIndex){
						self.autobind(this, nIndex);
					});
				});

				FrontendTools.loadCSS( oGlobalSettings.sPathCss + 'secondary.css?v=' + oGlobalSettings.sHash );

				FrontendTools.trackModule('JS_Libraries', 'call', 'tel-field' );

			},
			autobind: function (oTarget, nIndex) {

				var oSettings = {},
					countryData = $.fn.intlTelInput.getCountryData(),
					sCountryFilter = "",
					initialCountry,
					sPreferredCountries = 'us,gb',
					oInput = oTarget.cloneNode(true),
					sInputId = 'input-tel-' + nIndex,
					oRealInput = oTarget,
					sTextError = 'Invalid phone';

				// Add code to the phone on value
				if (oTarget.getAttribute("data-fc-prefix") === 'true') {

					// Remove name and data-fc-modules attributes to avoid errors
					oInput.removeAttribute("data-fc-modules");
					oInput.removeAttribute("name");
					oInput.id = sInputId;

					// remove oTarget required to avoid errors on form
					oTarget.removeAttribute("required");

					// Sets national mode
					oSettings.nationalMode = true;

					// Hide original input and sets as oTarget the new input
					$(oTarget).addClass('d-n').after(oInput);
					oTarget = document.getElementById(sInputId);

				}

				// Set list of countries
				if (oTarget.getAttribute("data-fc-countries") !== null ) {
					sCountryFilter = oTarget.getAttribute("data-fc-countries");
					oSettings.onlyCountries = sCountryFilter.split(',');
				}

				// List of preferred countries
				if (oTarget.getAttribute("data-fc-preferred-countries") !== null) {
					sPreferredCountries = oTarget.getAttribute("data-fc-preferred-countries");
					oSettings.preferredCountries = sPreferredCountries.split(',');
				}

				// Show local languages
				if (oTarget.getAttribute("data-fc-local-language") === 'true') {
					$.each(countryData, function(i, country) {
						country.name = country.name.replace(/.+\((.+)\)/,"$1");
					});
				}

				// Init the plugin
				$(oTarget).intlTelInput(oSettings);

				// Get initial country
				initialCountry = $(oTarget).intlTelInput("getSelectedCountryData");

				if (oTarget.getAttribute("data-fc-prefix") === 'true') {

					$(oTarget).on("keyup change focus blur", function() {
						$(oRealInput).val($(oTarget).intlTelInput("getNumber"));
					});
				}

				// Get Error text
				if (oTarget.getAttribute("data-fc-text-error") !== null) {
					sTextError = oTarget.getAttribute("data-fc-text-error");
				}

				// Validate if required
				if ($(oTarget).prop('required')) {

					var sErrorId = 'tel-' + nIndex + '-error';

					$(oTarget).parent('div').after('<ul id="'+ sErrorId +'" class="form-error-message hidden"><li class="parsley-required">'+ sTextError +'</li></ul>');

					var reset = function() {
						$(oTarget).removeClass("error");
						$('#' + sErrorId).addClass("hidden");
					};

					// on blur: validate
					$(oTarget).blur(function() {
						reset();
						if ($.trim($(oTarget).val())) {
							if ($(oTarget).intlTelInput("isValidNumber")) {
							} else {
								$(oTarget).addClass("error");
								$('#' + sErrorId).removeClass("hidden");
							}
						}
					});

					$(oTarget).parents('form').on('submit',function () {
						if (!$(oTarget).intlTelInput("isValidNumber")) {
							$(oTarget).addClass("error").focus();
							$('#' + sErrorId).removeClass("hidden");
							return false;
						}
					});

					// on keyup / change flag: reset
					$(oTarget).on("keyup change", reset);
				}
				
				// Sync country field
				if (oTarget.getAttribute("data-fc-country-field") !== null ) {
					
					var $countryField = $(oTarget.getAttribute("data-fc-country-field"));

					if ( $countryField.prop("nodeName") === 'SELECT') {
						syncCountryFieldSelect(oTarget, $countryField, initialCountry, countryData);
					} else if ( $countryField.prop("nodeName") === 'INPUT' ) {
						syncCountryFieldInput(oTarget, $countryField, initialCountry);
					}
				}

				// Sync code field
				if (oTarget.getAttribute("data-fc-code-field") !== null ) {

					var $codeField = $(oTarget.getAttribute("data-fc-code-field"));

					if ( $codeField.prop("nodeName") === 'SELECT') {
						syncCodeFieldSelect(oTarget, $codeField, initialCountry, countryData);
					} else if ( $codeField.prop("nodeName") === 'INPUT' ) {
						syncCodeFieldInput(oTarget, $codeField, initialCountry);
					}



				}
			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);
