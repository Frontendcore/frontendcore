;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('side-panel', [], function () {
		return {
			oDefault: {
				side: "left",
				menuWidth: "200px"
			},
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('side-panel'),
					self = this;

				FrontendTools.loadCSS( oGlobalSettings.sPathCss + 'secondary.css?v=' + oGlobalSettings.sHash );

				FrontendTools.trackModule('JS_Libraries', 'call', 'side-panel');

				$(aTargets).each(function (nIndex) {
					self.autobind(this, nIndex);
				});

			},
			autobind: function (oTarget, nIndex) {

				var self = this,
					oSettings,
					sHref = oTarget.href,
					oOptions = {},
					nInitialMenuWidth,
					nWindowWidth = $(window).width(),
					nMenuWidth,
					oPanel;

				// if oTarget hast no ID creates a new one
				if (oTarget.id === '') {
					oTarget.id = 'slide-panel-open' + nIndex;
				}

				// Get the Initial Width

				if (oTarget.getAttribute("data-fc-width") !== null) {

					nInitialMenuWidth = oTarget.getAttribute("data-fc-width");

					oOptions.menuWidth = nInitialMenuWidth;

					if (nInitialMenuWidth.indexOf('%') === -1 && nInitialMenuWidth.indexOf('px') === -1) {

						// If the unit is not defined, will be px by default
						oOptions.menuWidth += 'px';
						nInitialMenuWidth = parseInt(nInitialMenuWidth, 10);

					} else if (nInitialMenuWidth.indexOf('%') === -1) {
						nInitialMenuWidth = $('window').width() / parseInt(nInitialMenuWidth, 10);
					} else {
						nInitialMenuWidth = parseInt(nInitialMenuWidth, 10);
					}

				}

				if (oTarget.getAttribute("data-fc-max-width") !== null) {
					oOptions.menuMaxWidth = oTarget.getAttribute("data-fc-max-width");
				}

				nMenuWidth = nInitialMenuWidth;

				if ( nWindowWidth < 599 && nMenuWidth > 599) {

					oOptions.menuWidth = nWindowWidth + 'px';
				}


				if (oTarget.getAttribute("data-fc-position") !== null) {
					oOptions.side = oTarget.getAttribute("data-fc-position");
				}

				if (sHref.indexOf('#') !== -1) {
					oPanel = document.getElementById(sHref.split('#')[1] );
				}

				oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

				if ( oTarget.getAttribute("data-fc-tab") !== null) {
					$(oTarget).addClass('side-panel-tab').addClass('side-panel-tab-' + oSettings.side);

					if (oTarget.getAttribute("data-fc-tab-top") !== null) {
						$(oTarget).css('top', oTarget.getAttribute("data-fc-tab-top"));
					}

					var sTabHTML = oTarget.outerHTML;

					$(oTarget).remove();
					$('body').append(sTabHTML);

					oTarget = document.getElementById(oTarget.id);
				}

				// Clone if it's not necessary

				if ( oTarget.getAttribute("data-fc-clone") !== 'false' ) {

					var sIdSufix = '-' + nIndex,
						sCloneId = $(oPanel).attr("id") + '-' + nIndex,
						$Clone = $(oPanel).clone().attr("id", $(oPanel).attr("id") + sIdSufix);

					oTarget.href = '#' + sCloneId;

					// Find all elements in $Clone that have an ID, and iterate using each()
					$Clone.find('[id]').each(function () {
						//Perform the same replace as above
						var $th = $(this);
						var newID = $th.attr('id') + sIdSufix;
						$th.attr('id', newID);
					});

					$Clone.find('[href]').each(function () {
						//Perform the same replace as above
						var $th = $(this),
							sTarget = $th.attr('href'),
							newID;

						if (sTarget.indexOf('#') !== -1) {
							newID = sTarget + sIdSufix;
							$th.attr('href', newID);
						}

					});

					$('body').append($Clone[0]);

					if ( oTarget.getAttribute("data-fc-remove") !== 'false' ) {

						$(oPanel).remove();
					}

					oPanel = document.getElementById(sCloneId);

					$(oPanel).hide();
				}

				$(oPanel).width(oOptions.menuWidth);

				if ( oOptions.menuMaxWidth !== undefined ) {
					$(oPanel).css('max-width', oOptions.menuMaxWidth);
				}

				$(oTarget).click( function(e){

					e.preventDefault();

					$(oPanel).removeClass('slide-out-' + oSettings.side).addClass('animated slide-in-' + oSettings.side +' side-panel-default side-panel-' + oSettings.side);
					$(oPanel).show();

					if ($('.side-black-panel')[0] === undefined) {

						$('body').append('<div class="side-black-panel animated fade-in"></div>').css({
							'overflow' : 'hidden',
							'height' : '100%'
						});

						$('.side-black-panel').on('click', function(){

							var oBlackPanel = this;
							$(oPanel).addClass('slide-out-' + oSettings.side);
							$(oBlackPanel).addClass('fade-out');

							$('body').css({
								'overflow' : 'auto',
								'height' : 'initial'
							});

							setTimeout( function(){
								$(oBlackPanel).remove();
							}, 700);
						});
					}

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

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);
