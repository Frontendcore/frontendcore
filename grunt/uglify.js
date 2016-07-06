module.exports = function(grunt) {

	require(fcCwd + "/grunt/_data.js")(grunt);

	var oConfig = {};


	var oCore = {
		options: {
			preserveComments: false,
			beautify: false
		},
		files: {}
	};

	if (oData !== undefined) {

		// FRONTENDCORE.JS
		oCore.files[ jsDest + '/frontendcore.js'] = [
			fcCwd + '/components/essence/js/libs/modernizr-custom.js',
			fcCwd + '/bower/tinycorejs/build/TinyCore.js',
			fcCwd + '/bower/tinycorejs/src/tools/mediator/TinyCore.Toolbox.Mediator.js',
			fcCwd + '/bower/tinycorejs/build/extensions/AMD/require-2.1.4.min.js',
			fcCwd + '/bower/tinycorejs/src/extensions/AMD/TinyCore.AMD.js',
			fcCwd + '/bower/tinycorejs/src/extensions/AMD/TinyCore.AMD.domBoot.js',
			fcCwd + '/bower/jquery/dist/jquery.js',
			fcCwd + '/components/essence/js/_namespace.js',
			fcCwd + '/components/essence/js/tools/_getSelector.js',
			fcCwd + '/components/essence/js/tools/_bind.js',
			fcCwd + '/components/essence/js/tools/_attributeToArray.js',
			fcCwd + '/components/essence/js/tools/_getDataModules.js',
			fcCwd + '/components/essence/js/tools/_isMobile.js',
			fcCwd + '/components/essence/js/tools/_isVisible.js',
			fcCwd + '/components/essence/js/tools/_loadCSS.js',
			fcCwd + '/components/essence/js/tools/_mergeJSON.js',
			fcCwd + '/components/essence/js/tools/_mergeOptions.js',
			fcCwd + '/components/essence/js/tools/_mixOptions.js',
			fcCwd + '/components/essence/js/tools/_removeLoading.js',
			fcCwd + '/components/essence/js/tools/_track-analytics.js',
			fcCwd + '/components/essence/js/_modules-config.js',
			fcCwd + '/components/essence/js/_init.js'

		];

		// CODE.JS
		oCore.files[jsDest + '/ui/code.js'] = [
			fcCwd + '/bower/highlightjs/highlight.pack.js',
			fcCwd + '/components/code/js/_code.js'
		];

		// FORM VALIDATION.JS
		oCore.files[jsDest + '/ui/form-validation-libs.js'] = [
			fcCwd + '/bower/parsleyjs/dist/parsley.js'
		];

		// INPUT AUTOCOMPLETE
		oCore.files[jsDest + '/ui/autocomplete.js'] = [
			fcCwd + '/bower/Autocompleter/jquery.autocompleter.js',
			fcCwd + '/components/form-autocomplete/js/_autocomplete.js'
		];

		// TEXTAREA AUTOSIZE
		oCore.files[jsDest + '/ui/autosize.js'] = [
			fcCwd + '/bower/jquery-autosize/jquery.autosize.js',
			fcCwd + '/components/form-autosize/js/_autosize.js'
		];

		// TIP
		oCore.files[jsDest + '/ui/tip.js'] = [
			fcCwd + '/bower/tooltipster/js/jquery.tooltipster.js',
			fcCwd + '/components/tip/js/_tip.js'
		];

		// MODAL
		oCore.files[jsDest + '/ui/modal.js'] = [
			fcCwd + '/bower/jquery-colorbox/jquery.colorbox.js',
			fcCwd + '/components/modal/js/_modal.js'
		];

		// SELECT WITH SEARCH
		oCore.files[jsDest + '/ui/select-search.js'] = [
			fcCwd + '/bower/chosen/chosen.jquery.js',
			fcCwd + '/components/form-select-search/js/_select-search.js'
		];

		// TAG FIELD
		oCore.files[jsDest + '/ui/tag-field.js'] = [
			fcCwd + '/bower/magicsuggest/magicsuggest.js',
			fcCwd + '/components/form-tag-field/js/_tag-field.js'
		];

		// WYSIWYG
		oCore.files[jsDest + '/ui/wysiwyg.js'] = [
			fcCwd + '/bower/pen/src/pen.js',
			fcCwd + '/bower/pen/src/markdown.js',
			fcCwd + '/components/form-wysiwyg/js/_wysiwyg.js'
		];

		// CAROUSEL
		oCore.files[jsDest + '/ui/carousel.js'] = [
			fcCwd + '/bower/owl-carousel2/dist/owl.carousel.js',
			fcCwd + '/components/carousel/js/_carousel.js'
		];

		// TRUNCATE
		oCore.files[jsDest + '/ui/truncate.js'] = [
			fcCwd + '/bower/jquery.truncator.js/jquery.truncator.js',
			fcCwd + '/components/truncate/js/_truncate.js'
		];

		// SORTABLE
		oCore.files[jsDest + '/ui/sortable.js'] = [
			fcCwd + '/bower/jquery-sortable/source/js/jquery-sortable.js',
			fcCwd + '/components/sortable/js/_sortable.js'
		];

		// TABLE DYNAMIC
		oCore.files[jsDest + '/ui/table-dynamic.js'] = [
			fcCwd + '/bower/dynatable/jquery.dynatable.js',
			fcCwd + '/components/table-dynamic/js/_table-dynamic.js'
		];

		// TABLE RESPONSIVE
		oCore.files[jsDest + '/ui/table-responsive.js'] = [
			fcCwd + '/bower/stacktable/stacktable.js',
			fcCwd + '/components/table-responsive/js/_table-responsive.js'
		];

		// CHART LIB
		oCore.files[jsDest + '/ui/chartLibs.js'] = [
			fcCwd + '/bower/chartjs/Chart.js'
		];

		// IMAGE RESPONSIVE
		oCore.files[jsDest + '/ui/image-responsive.js'] = [
			fcCwd + '/components/image-responsive/js/_image-responsive.js'
		];

		// SWIPE
		oCore.files[jsDest + '/ui/swipe.js'] = [
			fcCwd + '/bower/jquery-touchswipe/jquery.touchSwipe.js',
			fcCwd + '/components/swipe/js/_swipe.js'
		];

		// ANCHOR SCROLL TO
		oCore.files[jsDest + '/ui/anchor-scroll.js'] = [
			fcCwd + '/components/anchor-scroll/js/anchor-scroll.js'
		];

		// INTERNATIONAL PHONE
		oCore.files[jsDest + '/ui/tel-field-libs.js'] = [
			fcCwd + '/bower/intl-tel-input/build/js/intlTelInput.js',
			fcCwd + '/bower/intl-tel-input/build/js/utils.js',
		];
		
		var oRoundTrip = {
			options: {
				preserveComments: false,
				beautify: false
			},
			files: {}
		};

		oRoundTrip.files[jsDest + '/roundtrip.js'] = [
			fcCwd + '/bower/twig.js/twig.js',
			fcCwd + '/components/roundtrip/js/_roundtrip.js'
		];

		oConfig = {
			core: oCore,
			rountrip: oRoundTrip
		}

		for (var nKey = 0; nKey < oComponents.length; nKey++) {

			oConfig[oComponents[nKey]] = {
				files: [{
					expand: true,
					cwd: fcCwd + '/components/' + oComponents[nKey] + '/js/',
					src: ['*.js', '!_*.js'],
					dest: jsDest + '/ui',
					preserveComments: false,
					beautify: true
				}]
			};
		}
	}

	return oConfig;

}