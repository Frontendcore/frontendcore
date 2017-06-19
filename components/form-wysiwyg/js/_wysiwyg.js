; (function (window, document,oGlobalSettings, FrontendTools, FrontendCore, FrontendMediator, $) {
	'use strict';

	FrontendCore.define('wysiwyg', [], function () {
		return {
            _oConstants : {
                TEXTAREA_SUFIX : '-origin',
                TextHelp : 'Select some text to get some formatting options.',
                TextVisual : '<i class="icon-eye"></i> VISUAL',
                TextHtml : '<i class="icon-code"></i> HTML',
            },
            oDefault: {
                toolbar: {
                    buttons: ['bold', 'italic', 'underline','orderedlist','unorderedlist','anchor']
                }
            },
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('wysiwyg'),
					self = this;

				FrontendTools.loadCSS( oGlobalSettings.sPathCss + 'secondary.css?v=' + oGlobalSettings.sHash );

				FrontendTools.trackModule('JS_Libraries', 'call', 'wysiwyg' );

				require(['wysiwyg-libs'], function (MediumEditor) {

                    $(aTargets).each(function (nIndex) {
                        if ( this !== null) {
                            self.autobind(this, nIndex, MediumEditor);
                        }
                    });
                });

			},
			autobind: function (oTarget, nIndex, MediumEditor) {

				// To help CSS to position the buttons
				$(oTarget).parent().css('position','relative');

                // If the textarea has no id we assigned a new one
                if (oTarget.id === '') {
                    oTarget.id = 'wysiwyg-' + nIndex  + this._oConstants.TEXTAREA_SUFIX;
                }


				var self = this,
                    oOptions = {},
	                oSettings = {},
                    sId = oTarget.id,
                    sValues = oTarget.getAttribute('data-fc-format-options'),
                    textVisual = self._oConstants.TextVisual,
                    textHtml = self._oConstants.TextHtml,
                    aValues,
                    editor,
                    bMode;


                // Get the format options to show the buttons on the toolbox
                if (sValues !== null) {

                    aValues = sValues.split(',');

                    oOptions.toolbar = {};
                    oOptions.toolbar.buttons = [];

                    for( var nKey = 0; aValues.length > nKey; nKey++){

                        if ( aValues[nKey] === 'insertorderedlist') {
                            aValues[nKey] = 'orderedlist';
                        }

                        if ( aValues[nKey] === 'insertunorderedlist' ) {
                            aValues[nKey] = 'unorderedlist';
                        }

                        if ( aValues[nKey] === 'anchor' ) {
                            aValues[nKey] = 'unorderedlist';
                        }

                        if (['inserthorizontalrule'].indexOf(aValues[nKey]) === -1) {
                            oOptions.toolbar.buttons.push(aValues[nKey]);
                        }

                    }

                }

                if ( oTarget.getAttribute('data-fc-text-help') !== null) {
                    oTarget.setAttribute('data-help', oTarget.getAttribute('data-fc-text-help' ));
                } else {
                    oTarget.setAttribute('data-help', self._oConstants.TextHelp );
                }

                if ( oTarget.getAttribute('data-fc-text-visual') !== null) {
                    textVisual = oTarget.getAttribute('data-fc-text-visual');
                }

                if ( oTarget.getAttribute('data-fc-text-html') !== null) {
                    textHtml = oTarget.getAttribute('data-fc-text-html');
                }

                if ( oTarget.getAttribute('data-fc-html') !== 'false') {
                    $(oTarget).after('<a href="#" id="'+ sId + '-switcher" class="button _small _hollow medium-editor-element-switcher">'+ self._oConstants.TextHtml + '</a>');
                }

				// Call the editor with the options
				oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

                editor = new MediumEditor('#' + sId, oSettings);


                $('#' + sId + '-switcher').on('click', function () {

                    if (bMode === 'visual') {
                        bMode = 'code';
                        this.innerHTML = textVisual;
                        $(oTarget).trigger('showCode');
                    }else {
                        bMode = 'visual';
                        this.innerHTML = textHtml;
                        $(oTarget).trigger('hideCode');
                    }

                });

                $(oTarget).on('showCode', function () {
                    editor.destroy();
                });

                $(oTarget).on('hideCode', function () {
                    editor.setup();
                });

                FrontendMediator.subscribe( 'close:wysiwyg', editor.destroy );

				FrontendTools.removeLoading(oTarget);

			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, FrontendMediator, $ );
