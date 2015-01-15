TinyCore.AMD.define('wysiwyg', ['devicePackage','wysiwygLibs'], function () {
	return {
		sPathCss: oGlobalSettings.sPathCss + 'ui/' + 'tags.css',
		oDefault: {
			selector: '.js-wysiwyg',
			//inline: true,
			menubar: false,
			plugins: [
				"advlist autolink lists link image charmap print preview anchor pagebreak",
				"searchreplace visualblocks code fullscreen spellchecker searchreplace",
				"insertdatetime media table paste autoresize"
			],
			setup: function ( editor) {
				editor.on('change', function() { tinyMCE.triggerSave(); });
			},
			language: "en",
			spellchecker_language: "en",
			spellchecker_rpc_url: 'http://' + document.domain + '/spellchecker',
			extended_valid_elements: "-strong,-h2,-h3,-span,-i,-em,-p abbr[title|lang],acronym[title|lang],code[class],object[*],embed[*],param[*],uvinum:product[*]",
			invalid_elements: "font,h1,h4,h5,h6,span",
			toolbar: "styleselect |  bold italic underline | alignleft aligncenter alignright alignjustify |  bullist numlist | image media | link | pagebreak | searchreplace | undo redo | spellchecker | code ",
			relative_urls: false,
			button_tile_map: true,
			cleanup_on_startup: true,
			paste_as_text: true,
			paste_auto_cleanup_on_paste: true,
			paste_convert_middot_lists: true,
			remove_script_host: true,
			theme_advanced_blockformats: 'h2,h3,p,address,pre,code',
			autoresize_min_height: 200,
			autoresize_max_height: 600,
			entity_encoding : "raw",
			content_css: oGlobalSettings.sPathJs + "libs/tinyMCE/skins/lightgray/content.min.css"
		},
		onStart: function () {

			var aTarget = document.querySelectorAll('[data-tc-modules="wysiwyg"]');

			FC.loadCSS(this.sPathCss);

			FC.trackEvent('JS_Libraries', 'call', 'wysiwyg' );

			this.autobind(aTarget);

		},
		autobind: function (aTargets) {

			var self = this;

			$(aTargets).each(function () {

				var oSettings,
					oOptions = {},
					oTarget = this,
					aTemp = [],
					nKey = 0;

				oTarget.className += ' js-wysiwyg';

				if (oTarget.getAttribute("data-tc-plugins") !== null) {
					aTemp = oTarget.getAttribute("data-tc-plugins").split(',');

					oOptions.plugins = [];

					for (; nKey < aTemp.length; nKey++) {
						oOptions.plugins.push(aTemp[nKey]);
					}
				}

				if (this.getAttribute("data-tc-language") !== null) {
					oOptions.language = this.getAttribute("data-tc-language");
					oOptions.spellchecker_language = this.getAttribute("data-tc-language");
				}

				if (this.getAttribute("data-tc-invalid") !== null) {
					oOptions.invalid_elements = this.getAttribute("data-tc-invalid");
				}

				if (this.getAttribute("data-tc-toolbar") !== null) {
					oOptions.toolbar1 = this.getAttribute("data-tc-toolbar");
				}

				if (this.getAttribute("data-tc-toolbar-2") !== null) {
					oOptions.toolbar2 = this.getAttribute("data-tc-toolbar-2");
				}

				if (this.getAttribute("data-tc-spellchecker") !== null) {
					oOptions.spellchecker_rpc_url = this.getAttribute("data-tc-spellchecker");
				}

				if (this.getAttribute("data-tc-extended-valid-elements") !== null) {
					oOptions.extended_valid_elements = this.getAttribute("data-tc-extended-valid-elements");
				}

				if (this.getAttribute("data-tc-css") !== null) {
					oOptions.content_css = this.getAttribute("data-tc-css");
				}

				if (this.getAttribute("data-tc-maxHeight") !== null) {
					oOptions.autoresize_max_height = this.getAttribute("data-tc-maxHeight");
				}

				if (this.getAttribute("data-tc-encoding") !== null) {
					oOptions.entity_encoding = this.getAttribute("data-tc-encoding");
				}

				oSettings = FC.mixOptions(oOptions, self.oDefault);

				tinymce.init(oSettings);

				setTimeout(function () {
					oTarget.style.display = 'block';
					oTarget.style.height = '30px';
					oTarget.style.marginTop = '-30px';
				}, 500);


			});
		},
		onStop: function () {
			this.sPathCss = null;
		},
		onDestroy: function () {
			delete this.sPathCss;
		}
	};
});

/*

 var aPlugins,
 sToolbar,
 sInvalid;


 if (sMode == 'simple') {

 aPlugins = ['spellchecker'];

 sToolbar = "spellchecker | undo redo";


 sInvalid = "b,i,strong,em,font,h1,h4,h5,h6,span";

 nSetup = function(ed) {

 for(var s in ed.shortcuts){
 var shortcut = ed.shortcuts[s];
 // Remove all shortcuts except Redo (89), Undo (90)
 if(!(s == "ctrl,,,89" || s == "ctrl,,,90")){
 // This completely removes the shortcuts
 delete ed.shortcuts[s];
 }
 }
 }

 } else {

 aPlugins = ;

 sToolbar = ;


 sInvalid = ;
 }

 */