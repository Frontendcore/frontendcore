;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('dropdown', [], function () {
		return {
			oOpened: false,
			nMaxDepth: 0,
			oConstants: {
				DATA_DEPTH : 'data-fc-depth',
				DROPDOWN_CLASS: 'js-navigation--dropdown',
				DROPDOWN_MENU_CLASS: 'js-dropdown-menu-',
				DROPDOWN_OPENED_CLASS: 'js-navigation--dropdown-opened'
			},
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('dropdown'),
					self = this,
					oUl,
					oNav,
					nDepth,
					nWidth;

				$(aTargets).each(function (nIndex) {

					// To close on click outside
					self.bindClickOutside(this);

					// Removes titles on hover
					self.hideTitle(this);

					oNav = this;

					$('li', this ).each( function( nKey ){

						// Get depth of the element
						nDepth =  $(this, oNav).parents('ul').length;

						// Sets the max depth
						if (nDepth > self.nMaxDepth) {
							self.nMaxDepth = nDepth;
						}

						// Add the data attribute Depth to LI
						this.setAttribute(self.oConstants.DATA_DEPTH, nDepth);

						// Search for more menus inside the LI
						oUl = $('ul', this)[0];

						if (oUl) {

							// Sets an Id if not has one
							if ( oUl.id === '' ) {
								oUl.id = self.oConstants.DROPDOWN_MENU_CLASS + nIndex + '-' + nKey;
							}

							// Add the the dropdown class for styling
							$(this).addClass(self.oConstants.DROPDOWN_CLASS);

							// Get the width of the current item
							nWidth =  $('> a', this).outerWidth() + 2 + 'px';

							// Set the min width for the menu inside the current LI as the LI width
							oUl.style.minWidth = nWidth;

						}

					});

					$('.'+ self.oConstants.DROPDOWN_CLASS +' > a', this ).each( function(){
						self.autoBind(this);
					});

					$('li:not(.'+ self.oConstants.DROPDOWN_CLASS  +') > a', this ).on('mouseover', function(){
						self.hideDropdowns($(this).parents('ul'),  $(this).parent().attr(self.oConstants.DATA_DEPTH) );
					});

				});

				FrontendTools.trackModule('JS_Libraries', 'call', 'dropdown');

			},
			hideTitle: function( oTarget ) {
				$("a", oTarget ).on('mouseover', function(){

					// Get the current title
					var title = $(this).attr("title");

					// Store it in a temporary attribute
					$(this).attr("tmp_title", title);

					// Set the title to nothing so we don't see the tooltips
					$(this).attr("title","");

				}).on('mouseout', function(){
					// Fired when we leave the element

					// Retrieve the title from the temporary attribute
					var title = $(this).attr("tmp_title");

					// Return the title to what it was
					$(this).attr("title", title);

				});

			},
			autoBind: function( oTarget ) {

				var self = this,
					sHref = oTarget.href,
					sBind = 'click';

				if (sHref.indexOf('#') === -1 ) {
					sBind = 'mouseover';
				}

				$(oTarget).bind(sBind, function (event) {

					event.preventDefault();

					self.slideToggle( self.hideDropdowns(this, $(this).parent().attr(self.oConstants.DATA_DEPTH) ) );

					$(this).parent().addClass(self.oConstants.DROPDOWN_OPENED_CLASS);

				});
			},
			bindClickOutside: function ( oTarget ) {
				var self = this;

				$(document).bind('click', function (event) {

					if (event.target != self.oOpened && event.target.nodeName !== 'A') {
						self.hideDropdowns( oTarget);
					}
				});
			},
			hideDropdowns: function (oTarget, nDepth) {

				var sTarget,
					self = this,
					oContainer = oTarget.nodeName === 'NAV' ?  $(oTarget).find('> ul') : $(oTarget).parents('nav').find('> ul'),
					$Opened = !nDepth ? $('.' + self.oConstants.DROPDOWN_CLASS) : $('['+ self.oConstants.DATA_DEPTH +'="'+ nDepth+'"]', oContainer );

				$('ul', oContainer).each(function () {

					sTarget = oTarget !== undefined && oTarget.href !== undefined ? oTarget.href.split('#')[1] : '';

					if (sTarget === undefined ) {
						sTarget = oTarget.nextSibling.nextSibling.id;
					}

					if ( sTarget != this.id && $(this).parent().attr(self.oConstants.DATA_DEPTH) === nDepth || !nDepth || $(this).parents('.' + self.oConstants.DROPDOWN_CLASS).is(':not(.'+ self.oConstants.DROPDOWN_OPENED_CLASS + ')') ){

						this.style.display = 'none';
					}

					$Opened.removeClass(self.oConstants.DROPDOWN_OPENED_CLASS);

				});

				this.oOpened = false;

				return {
					sTarget : sTarget,
					nDepth : nDepth
				};

			},
			slideToggle: function ( oSettings ) {

				var oTarget = document.getElementById(oSettings.sTarget),
					self = this,
					nExtraPixels = oSettings.nDepth > 1 ? 0 : 4;

				// If is not the first level indent the menu based on this width
				if (oSettings.nDepth > 1 || $(oTarget).parents('nav').hasClass('_vertical') ) {
					oTarget.style.left =  $(oTarget).parents('.' + self.oConstants.DROPDOWN_CLASS ).width() + nExtraPixels + 'px';
				}

				$(oTarget).slideDown('fast');

				this.oOpened = oTarget;

			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);
