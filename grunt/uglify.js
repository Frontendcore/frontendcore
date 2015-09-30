module.exports = {
	options: {
		beautify: false
	},
	tools: {
		files: {
			'./../site/build/static/js/tools.js': ['js/tools/*.js']
		}
	},
	core: {
		files: {
			'./../site/build/static/js/core.js': [
				'js/libs/modernizr/modernizr-custom.js',
				'bower_components/tinycorejs/build/TinyCore.js',
				'bower_components/tinycorejs/build/tools/mediator/TinyCore.Toolbox.Mediator.min.js',
				'bower_components/tinycorejs/build/extensions/AMD/require-2.1.4.min.js',
				'bower_components/tinycorejs/build/extensions/AMD/TinyCore.AMD+domBoot.min.js',
				'js/base/_namespace.js',
				'js/base/_device-detection.js',
				'bower_components/jquery/dist/jquery.js',
				'./../site/build/static/js/tools.js',
				'js/base/_modules-config.js',
				'js/base/_responsive-images.js',
				'js/base/_polyfills.js',
				'js/base/_init.js'
			],
			'./../site/build/static/js/ui/image-zoom.js': [
				'js/ui/image-zoom.js'
			],
			'./../site/build/static/js/ui/image-edit.js': [
				'bower_components/darkroomjs/vendor/fabric.js',
				'bower_components/darkroomjs/lib/js/darkroom.js',
				'bower_components/darkroomjs/lib/js/plugins/darkroom.history.js',
				'bower_components/darkroomjs/lib/js/plugins/darkroom.rotate.js',
				'bower_components/darkroomjs/lib/js/plugins/darkroom.crop.js',
				'js/ui/image-edit/darkroom.save.js',
				'js/ui/image-edit.js'
			],
			'./../site/build/static/js/ui/tabs.js': [
				'js/ui/tabs.js'
			],
			'./../site/build/static/js/ui/toggle.js': [
				'js/ui/toggle.js'
			],
			'./../site/build/static/js/ui/notification.js': [
				'js/ui/notification.js'
			],
			'./../site/build/static/js/ui/dropdown.js': [
				'js/ui/dropdown.js'
			],
			'./../site/build/static/js/ui/center-box.js': [
				'js/ui/center-box.js'
			],
			'./../site/build/static/js/ui/charts.js': [
				'js/ui/chart.js'
			],
			'./../site/build/static/js/ui/chartLibs.js': [
				'bower_components/chartjs/Chart.js'
			],
			'./../site/build/static/js/ui/responsive-images-libs.js': [
				'bower_components/jquery-unveil/jquery.unveil.js'
			],
			'./../site/build/static/js/ui/modal.js': [
				'bower_components/jquery-colorbox/jquery.colorbox.js',
				'js/ui/modals.js'
			],
			'./../site/build/static/js/ui/tags.js': [
				'bower_components/magicsuggest/magicsuggest.js',
				'js/ui/tags.js'
			],
			'./../site/build/static/js/ui/select-search.js': [
				'bower_components/bselect/js/bselect.js',
				'js/ui/select-search.js'
			],
			'./../site/build/static/js/ui/wysiwyg.js': [
				'bower_components/pen/src/pen.js',
				'bower_components/pen/src/markdown.js',
				'js/ui/wysiwyg.js'
			],
			'./../site/build/static/js/ui/parallax.js': [
				'js/libs/skrollr/skrollr.js',
				'js/ui/parallax.js'
			],
			'./../site/build/static/js/ui/autocomplete.js': [
				'bower_components/Autocompleter/jquery.autocompleter.js',
				'js/ui/autocomplete.js'
			],
			'./../site/build/static/js/ui/sortable.js': [
				'js/libs/jquery-sortable/jquery-sortable.js',
				'js/ui/sortable.js'
			],
			'./../site/build/static/js/ui/serialize.js': [
				'js/libs/jquery-serialize/jquery.serializetree.js',
				'js/ui/serialize.js'
			],
			'./../site/build/static/js/ui/code.js': [
				'js/libs/highlightjs/highlight.pack.js',
				'js/ui/code.js'
			],
			'./../site/build/static/js/ui/truncate.js': [
				'bower_components/jquery.truncator.js/jquery.truncator.js',
				'js/ui/truncate.js'
			],
			'./../site/build/static/js/ui/autosize.js': [
				'bower_components/jquery-autosize/jquery.autosize.js',
				'js/ui/autosize.js'
			],
			'./../site/build/static/js/ui/tip.js': [
				'bower_components/tooltipster/js/jquery.tooltipster.js',
				'js/ui/tip.js'
			],
			'./../site/build/static/js/ui/cart.js': [
				'bower_components/simplecart-js/simpleCart.js',
				'js/ui/cart.js'
			],
			'./../site/build/static/js/ui/carousel.js': [
				'bower_components/owl-carousel2/dist/owl.carousel.js',
				'js/ui/carousel.js'
			],
			'./../site/build/static/js/ui/table.js': [
				'bower_components/dynatable/jquery.dynatable.js',
				'js/ui/table.js'
			],
			'./../site/build/static/js/ui/table-responsive.js': [
				'bower_components/stacktable/stacktable.js',
				'js/ui/table-responsive.js'
			],
			'./../site/build/static/js/ui/side-panel.js': [
				'js/ui/side-panel.js'
			],
			'./../site/build/static/js/ui/form-validation.js': [
				'js/ui/form-validation.js'
			],
			'./../site/build/static/js/ui/form-validation-libs.js': [
				'bower_components/parsleyjs/dist/parsley.js'
			],
			'./../site/build/static/js/ie-old.js': [
				'js/libs/ie-polyfills/queryselector.js',
				'js/libs/ie-polyfills/html5shiv.js',
				'js/libs/ie-polyfills/ecmascript5.js'
			],
			'./../site/build/static/js/_oGlobalSettings.js': [
				'js/base/_namespace.js',
				'js/base/_oGlobalSettings.js'
			]
		}
	},
	tests: {
		files: [{
			expand: true,
			src: 'js/test/**/*.test.js',
			dest: './../site/build/static',
			cwd: './'
		}]
	}
};
