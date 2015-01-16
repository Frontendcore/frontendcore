TinyCore.AMD.define('sortable', ['devicePackage'], function () {
	return {
		onStart: function () {

			var aTargets = document.querySelectorAll('[data-tc-modules="sortable"]'),
				self = this;

			FC.trackEvent('JS_Libraries', 'call', 'sortable' );

			require(['sortableLibs'], function() {
				$(aTargets).each(function () {
					self.autobind(this);
				});
			});
		},
		autobind: function (oTarget) {

			var oSettings = {};

			if (oTarget.getAttribute("data-tc-url") !== null) {
				oSettings.ajax_url = oTarget.getAttribute("data-tc-url");
			}

			if (oTarget.getAttribute("data-tc-input") !== null) {
				oSettings.ajax_url = undefined;
				oSettings.input =  oTarget.getAttribute("data-tc-input");
			}

			if (oTarget.getAttribute("data-tc-object") !== null) {
				oSettings.object = oTarget.getAttribute("data-tc-object");
			} else {
				oSettings.object = 'sortable';
			}

			if (oTarget.getAttribute("data-tc-handle") !== null) {
				oSettings.handle = oTarget.getAttribute("data-tc-handle");
			}

			$(oTarget).sortable(oSettings);

			if (oSettings.ajax_url !== undefined && oSettings.ajax_url !== null) {
				$(oTarget).bind('sortupdate', function () {
					$.ajax({
						url: oSettings.ajax_url,
						data: {
							order: $(oTarget).serializeTree("id", oSettings.object)
						},
						type: 'POST',
						dataType: 'json'
					});
				});
			} else {
				$(oTarget).bind('sortupdate', function (index) {

					var sValue = '',
						nTotal = $('li', oTarget).length;

					$('li', oTarget).each(function( nIndex ){

						if (this.id !== '' ) {
							sValue += this.id;
						}

						if ( nIndex !== nTotal - 1 && this.id !== '' ) {
							sValue += ',';
						}

					});

					document.getElementById(oSettings.input).value = sValue;
				});
			}
		}
	};
});