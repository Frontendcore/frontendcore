TinyCore.AMD.define('wysiwyg', ['devicePackage'], function () {
	return {
		sPathCss: oGlobalSettings.sPathCss + 'ui/' + 'wysiwyg.css',
		oDefault: {
			class: 'fc-wysiwyg', // {String} class of the editor,
			debug: false, // {Boolean} false by default
			stay: false, // {Boolean} false by default
			list: ['bold', 'italic', 'underline','insertunorderedlist','createlink'] // editor menu lis
		},
		onStart: function () {

			var aTargets = document.querySelectorAll('[data-tc-modules="wysiwyg"]'),
				self = this;

			FC.loadCSS(this.sPathCss);

			FC.trackEvent('JS_Libraries', 'call', 'wysiwyg' );

			require(['wysiwygLibs'], function() {
				$(aTargets).each(function () {
					self.autobind(this);
				});
			});

		},
		updateTextarea : function(sId, oTarget) {

			oTarget.innerHTML = document.getElementById(sId).innerHTML;
		},
		autobind: function (oTarget) {
			var oSettings,
				oOptions = {},
				self = this,
				editor,
				aTemp = [];
				sId = oTarget.name + '-editor',
				sValues = oTarget.getAttribute('data-tc-format-options'),
				oEditArea = document.createElement('div');

			oEditArea.id = sId;
			oEditArea.className = 'wysiwyg';
			oEditArea.dataset.help = oTarget.dataset.help ? oTarget.dataset.help : 'Select some text to get some formatting options.';

			oTarget.className = 'wysiwyg-textarea';

			$(oTarget).before(oEditArea);

			oOptions.editor = document.getElementById(sId);
			oOptions.textarea = oTarget;


			if (sValues !== null) {

				aValues = sValues.split(',');

				oOptions.list = [];

				for( var nKey = 0; aValues.length > nKey; nKey++){
					oOptions.list.push(aValues[nKey]);
				}

			}

			oSettings = FC.mixOptions(oOptions, self.oDefault);

			editor = new Pen(oSettings);

			$('#' + sId).parents('form').on('submit', function() {
				self.updateTextarea(sId, oTarget);

				return false;
			});

			$('#' + sId).on('blur', function() {
				self.updateTextarea(sId, oTarget);
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
