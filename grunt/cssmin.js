module.exports = {
	combine: {
		files: {
			'build/static/css/ui/modal.css': [
				'bower_components/jquery-colorbox/example5/colorbox.css'
			],
				'build/static/css/ui/code.css': [
				'js/libs/highlightjs/styles/github.css'
			],
				'build/static/css/ui/autocomplete.css': [
				'bower_components/Autocompleter/jquery.autocompleter.css'
			],
				'build/static/css/ui/tags.css': [
				'js/libs/jquery-autosuggest/autoSuggest.css'
			],
				'build/static/css/ui/stats.css': [
				'js/libs/jquery-visualize/css/visualize.css',
				'js/libs/jquery-visualize/css/visualize-light.css'
			],
				'build/static/css/ui/sidemenu.css': [
				'bower_components/sidr/dist/stylesheets/jquery.sidr.dark.css'
			],
				'build/static/css/ui/wysiwyg.css': [
				'bower_components/tinymce/skins/lightgray/skin.min.css'
			],
				'build/static/css/ui/tip.css': [
				'bower_components/opentip/css/opentip.css'
			]
		}
	}
};