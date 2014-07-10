TinyCore.AMD.define('sortable', ['devicePackage'], function () {
	return {
		onStart: function () {

			var aTarget = document.querySelectorAll('[data-tc-modules="sortable"]'),
				self = this;

			FC.trackEvent('JS_Libraries', 'call', 'sortable' );

			require(['sortableLibs'], function() {
				self.autobind(aTarget);
			});



		},
		autobind: function (aTargets) {

			var self = this;

			$(aTargets).each(function () {

				var oSettings = {},
					oTarget = this;

				if (oTarget.getAttribute("data-tc-url") !== null) {
					oSettings.ajax_url = this.getAttribute("data-tc-url");
				}

				if (oTarget.getAttribute("data-tc-object") !== null) {
					oSettings.object = this.getAttribute("data-tc-object");
				} else {
					oSettings.object = 'sortable';
				}

				if (oTarget.getAttribute("data-tc-handle") !== null) {
					oSettings.handle = this.getAttribute("data-tc-handle");
				}

				$(this).sortable(oSettings);

				if (oSettings.ajax_url !== undefined && oSettings.ajax_url !== null) {
					$(this).bind('sortupdate', function () {
						$.ajax({
							url: oSettings.ajax_url,
							data: {
								order: $(oTarget).serializeTree("id", oSettings.object)
							},
							type: 'POST',
							dataType: 'json'
						});
					});
				}
			});
		}
	};
});