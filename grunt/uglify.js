module.exports = {
	options: {
		beautify: false
	},
	tools: {
		files: {
			'build/static/js/tools.js': ['js/tools/*.js']
		}
	},
	core: {
		files: {
			'build/static/js/core.js': [
				'bower_components/tinycorejs/build/TinyCore.js',
				'bower_components/tinycorejs/build/tools/mediator/TinyCore.Toolbox.Mediator.min.js',
				'bower_components/tinycorejs/build/extensions/AMD/require-2.1.4.min.js',
				'bower_components/tinycorejs/build/extensions/AMD/TinyCore.AMD+domBoot.min.js',
				'js/base/_namespace.js',
				'build/static/js/tools.js',
				'js/base/_device-detection.js',
				'js/base/_modules-config.js',
				'js/base/_dom-ready.js',
				'js/base/_query-selector.js',
				'js/base/_responsive-images.js',
				'js/base/_init.js'
			],
			'build/static/js/devices/desktop.js': [
				'bower_components/jquery/dist/jquery.js',
				'js/libs/modernizr/modernizr-custom.js',
				'bower_components/jquery-unveil/jquery.unveil.js'
			],
			'build/static/js/devices/mobile.js': [
				'bower_components/zepto/zepto.js',
				'js/libs/modernizr/modernizr-custom.js',
				'bower_components/jquery-unveil/jquery.unveil.js'
			],
			'build/static/js/ui/tabs.js': [
				'js/ui/tabs.js'
			],
			'build/static/js/ui/toggle.js': [
				'js/ui/toggle.js'
			],
			'build/static/js/ui/notification.js': [
				'js/ui/notification.js'
			],
			'build/static/js/ui/dropdown.js': [
				'js/ui/dropdown.js'
			],
			'build/static/js/ui/center-box.js': [
				'js/ui/center-box.js'
			],
			'build/static/js/ui/stats.js': [
				'js/libs/jquery-visualize/js/excanvas.js',
				'js/libs/jquery-visualize/js/visualize.jQuery.js',
				'js/ui/stats.js'
			],
			'build/static/js/ui/modal.js': [
				'bower_components/jquery-colorbox/jquery.colorbox.js',
				'js/ui/modals.js'
			],
			'build/static/js/ui/tags.js': [
				'js/libs/jquery-autosuggest/jquery.autoSuggest.js',
				'js/ui/tags.js'
			],
			'build/static/js/ui/wysiwyg.js': [
				'bower_components/pen/src/pen.js',
				'bower_components/pen/src/markdown.js',
				'js/ui/wysiwyg.js'
			],
			'build/static/js/ui/parallax.js': [
				'js/libs/skrollr/skrollr.js',
				'js/ui/parallax.js'
			],
			'build/static/js/ui/autocomplete.js': [
				'bower_components/Autocompleter/jquery.autocompleter.js',
				'js/ui/autocomplete.js'
			],
			'build/static/js/ui/sortable.js': [
				'js/libs/jquery-sortable/jquery-sortable.js',
				'js/ui/sortable.js'
			],
			'build/static/js/ui/serialize.js': [
				'js/libs/jquery-serialize/jquery.serializetree.js',
				'js/ui/serialize.js'
			],
			'build/static/js/ui/code.js': [
				'js/libs/highlightjs/highlight.pack.js',
				'js/ui/code.js'
			],
			'build/static/js/ui/truncate.js': [
				'bower_components/jquery.truncator.js/jquery.truncator.js',
				'js/ui/truncate.js'
			],
			'build/static/js/ui/polyfills.js': [
				'js/libs/modernizr/modernizr-custom.js',
				'js/libs/webshims/polyfiller.js',
				'js/ui/polyfills.js'
			],
			'build/static/js/ui/sidemenu.js': [
				'bower_components/sidr/dist/jquery.sidr.js',
				'js/ui/sidemenu.js'
			],
			'build/static/js/ui/autosize.js': [
				'bower_components/jquery-autosize/jquery.autosize.js',
				'js/ui/autosize.js'
			],
			'build/static/js/ui/tip.js': [
				'bower_components/opentip/downloads/opentip-jquery.js',
				'js/ui/tip.js'
			],
			'build/static/js/ui/cart.js': [
				'bower_components/simplecart-js/simpleCart.js',
				'js/ui/cart.js'
			],
			'build/static/js/ui/carousel.js': [
				'js/libs/owl-carousel/owl.carousel.js',
				'js/ui/carousel.js'
			],
			'build/static/js/ui/table.js': [
				'bower_components/dynatable/jquery.dynatable.js',
				'js/ui/table.js'
			],
			'build/static/js/ie-old.js': [
				'js/libs/ie-polyfills/queryselector.js',
				'js/libs/ie-polyfills/html5shiv.js',
				'js/libs/ie-polyfills/ecmascript5.js'
			],
			'build/static/js/_oGlobalSettings.js': [
				'js/base/_namespace.js',
				'js/base/_oGlobalSettings.js'
			]
		}
	},
	tests: {
		files: [{
			expand: true,
			src: 'js/test/**/*.test.js',
			dest: 'build/static',
			cwd: './'
		}]
	}
};