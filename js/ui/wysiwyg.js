TinyCore.AMD.define('wysiwyg', ['devicePackage'], function () {
	return {
		sPathCss: oGlobalSettings.sPathCss + 'ui/' + 'wysiwyg.css',
		mediator :  TinyCore.Toolbox.request( 'mediator' ),
		bResize : false,
		bParentRelative: false,
		_oConstants : {
			EDITOR_SUFIX : '-editor',
			TEXTAREA_SUFIX : '-textarea',
			TEXTAREA_CLASS : 'fc-wysiwyg-textarea',
			FULLSCREEN_EDITABLE_CLASS: 'fc-wysiwyg-full-screen',
			VISUAL_TEXT : '<i class="icon-eye"></i> VISUAL',
			HTML_TEXT : '<i class="icon-code"></i> HTML',
			FULLSCREEN_TEXT : '<i class="icon-arrows-alt"></i> FULLSCREEN',
			MINSCREEN_TEXT : '<i class="icon-minus"></i> MINIMIZE'
		},
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

			self.mediator.subscribe( 'close:wysiwyg', this.closeFormatOptions );

		},
		closeFormatOptions : function() {
			$('.fc-wysiwyg-menu').hide();
		},
		updateTextarea : function(sId, oTarget) {

			oTarget.value = document.getElementById(sId).innerHTML == '<br>' ? '' : document.getElementById(sId).innerHTML;
		},
		updateEditArea : function(sId, oTarget) {

			document.getElementById(sId).innerHTML = $('#' + oTarget.id).val();
		},
		autobind: function (oTarget) {

			if (!Date.now) {
				Date.now = function() { return new Date().getTime(); };
			}

			var oSettings,
				oOptions = {},
				self = this,
				editor,
				sDate = Math.floor(Date.now() / 1000),
				sId = oTarget.id ? oTarget.id + self._oConstants.EDITOR_SUFIX : sDate + self._oConstants.EDITOR_SUFIX,
				sValues = oTarget.getAttribute('data-tc-format-options'),
				oEditArea = document.createElement('div'),
				oLinkGroup = document.createElement('div'),
				oLinkHTML = document.createElement('a'),
				oLinkScreen = document.createElement('a');

			if (oTarget.id === '') {
				oTarget.id = sDate + self._oConstants.TEXTAREA_SUFIX;
			}

			oEditArea.id = sId;
			oEditArea.className = 'fc-wysiwyg';
			oEditArea.innerHTML = $(oTarget).text();
			oEditArea.dataset.help = oTarget.dataset.help ? oTarget.dataset.help : 'Select some text to get some formatting options.';

			oLinkHTML.innerHTML = self._oConstants.HTML_TEXT;
			oLinkHTML.href = '#';
			oLinkHTML.id = 'html-' + sId;
			oLinkHTML.className = 'button button-slim';

			oLinkScreen.innerHTML = self._oConstants.FULLSCREEN_TEXT;
			oLinkScreen.href = '#';
			oLinkScreen.id = 'screen-' + sId;
			oLinkScreen.className = 'button button-slim';

			oLinkGroup.className= 'fc-wysiwyg-switch button-group ph-n';
			oLinkGroup.appendChild(oLinkHTML);
			oLinkGroup.appendChild(oLinkScreen);

			oTarget.className = self._oConstants.TEXTAREA_CLASS + ' fc-wysiwyg-html';

			$(oTarget).before(oEditArea);

			$(oTarget).after(oLinkGroup);

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

				if ( $('#' + sId).is(':visible') ) {
					self.updateEditArea(sId, oTarget );
				} else {
					self.updateTextarea(sId, oTarget);
				}

			});

			$('#html-' + sId).on('click', function (event) {

				event.preventDefault();

				$('#' + sId).toggle();

				$('#'+ oTarget.id).toggleClass(self._oConstants.TEXTAREA_CLASS);

				if ( $('#' + sId).is(':visible') ) {
					this.innerHTML = self._oConstants.HTML_TEXT;
					self.updateEditArea(sId, oTarget );
				} else {

					if (self.bResize === false ) {

						// @todo not to call directly to autosize
						require(['autosizeLibs'], function() {
							$(oTarget).autosize();
						});
						self.bResize = true;
					}

					self.closeFormatOptions();
					this.innerHTML = self._oConstants.VISUAL_TEXT;
					self.updateTextarea(sId, oTarget);
				}

			});

			$('#screen-' + sId).on('click', function (event) {

				event.preventDefault();

				$('#' + sId).toggleClass(self._oConstants.FULLSCREEN_EDITABLE_CLASS);

				$('#'+ oTarget.id).toggleClass(self._oConstants.FULLSCREEN_EDITABLE_CLASS);

				$(this).parent().toggleClass('fc-wysiwyg-switch-full-screen');

				if (this.innerHTML.indexOf(self._oConstants.MINSCREEN_TEXT) == -1) {

					$('body').css({'overflow':'hidden', 'height':'100%'});

					if (self.bParentRelative === false ) {
						$(oTarget).parent().css('position','relative');
						self.bParentRelative = true;
					}

					this.innerHTML = self._oConstants.MINSCREEN_TEXT;
				} else {
					$('body').css({'overflow':'auto', 'height':'auto'});
					this.innerHTML = self._oConstants.FULLSCREEN_TEXT;
				}

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
