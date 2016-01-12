;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('code', [], function () {
		return {
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('code'),
					self = this;

				FrontendTools.trackModule('JS_Libraries', 'call', 'code');

				hljs.configure({
					tabReplace: '    '
				});

				$(aTargets).each(function () {
					self.autobind(this);
				});
			},
			autobind: function (aTarget) {
				hljs.highlightBlock(aTarget);
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
