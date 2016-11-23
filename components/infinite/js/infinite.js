;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $, FrontendMediator) {
	'use strict';

	FrontendCore.define('infinite', ['infinite-libs'], function () {

		var oDefault = {
			loading: {
				finishedMsg: "",
				msgText: "<em class='loading'><em>",
				speed: 'fast',
			},
			debug: false,
			// behavior: undefined,
			// binder: $(window), // used to cache the selector for the element that will be scrolling
			// contentSelector: null, // rename to pageFragment
			// extraScrollPx: 150,
			animate: false,
			// pathParse: undefined,
			dataType: 'html',
			// appendCallback: true,
			bufferPx: 40,
			// errorCallback: function () { },
			// infid: 0, //Instance ID
			// pixelsFromNavToBottom: undefined,
			// path: undefined, // Can either be an array of URL parts (e.g. ["/page/", "/"]) or a function that accepts the page number and returns a URL
			// maxPage:undefined // to manually control maximum page (when maxPage is undefined, maximum page limitation is not work)
		};

		return {
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('infinite'),
					self = this;

				FrontendTools.loadCSS( oGlobalSettings.sPathCss + 'secondary.css?v=' + oGlobalSettings.sHash );

				FrontendTools.trackModule('JS_Libraries', 'call', 'infinite');

				$(aTargets).each(function () {
					self.autobind(this);
				});



			},
			autobind: function (oTarget) {

				if (oTarget.id === '' ) {
					oTarget.id = 'infinite-' + Date.now();
				}


				var self = this,
					oSettings,
					oOptions = {};

				FrontendTools.removeLoading(oTarget);

				if (oTarget.getAttribute("data-fc-next-selector") !== null) {
					oOptions.navSelector = oTarget.getAttribute("data-fc-next-selector");
					oOptions.nextSelector = oTarget.getAttribute("data-fc-next-selector");
				}

				if (oTarget.getAttribute("data-fc-item-selector") !== null) {
					oOptions.itemSelector = oTarget.getAttribute("data-fc-item-selector");
				}

				if (oTarget.getAttribute("data-fc-buffer-px") !== null) {
					oOptions.bufferPx = parseInt(oTarget.getAttribute("data-fc-buffer-px"));
				}

				oSettings = FrontendTools.mergeOptions( oDefault, oOptions);

				$(oTarget).infinitescroll(oSettings, function(arrayOfNewElems){
					FrontendMediator.publish('infinite:content', arrayOfNewElems);
				});

				FrontendMediator.subscribe('infinite:pause', function () {
					$(oTarget).infinitescroll('pause');
				});

				FrontendMediator.subscribe('infinite:resume', function () {
					$(oTarget).infinitescroll('resume');
				});

				FrontendMediator.subscribe('infinite:reset', function () {
					$(oTarget).infinitescroll('reset');
				});

				FrontendMediator.subscribe('infinite:update', function (oTopic) {
					$(oTarget).infinitescroll('update', oTopic.data);
				});

				FrontendMediator.subscribe('infinite:destroy', function () {
					$(oTarget).infinitescroll('destroy');
				});

			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $, FrontendMediator);