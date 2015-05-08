FrontendCore.define('side-panel', [], function () {
	return {
		sPathCss: oGlobalSettings.sPathCssUI + '?v=' + oGlobalSettings.sHash,
		oDefault: {
			side: "left",
			menuWidth: "200px",
			duration: 500,
			clickClose: false,
			onOpen : function() {
				$('.black-panel').on('click', function(){
					$.panelslider.close();
					$(this).remove();
				});
			}
		},
		onStart: function () {

			var aTargets = FrontendTools.getDataModules('side-panel'),
				self = this;


			FrontendTools.loadCSS(this.sPathCss);

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
				oParent,
				oClose = document.createElement('a'),
				nInitialMenuWidth,
				nWindowWidth = $(window).width(),
				nMenuWidth;

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

			nMenuWidth = nInitialMenuWidth;

			if ( nWindowWidth < 599 && nMenuWidth > 599) {

				oOptions.menuWidth = nWindowWidth + 'px';
			}


			if (oTarget.getAttribute("data-fc-position") !== null) {
				oOptions.side = oTarget.getAttribute("data-fc-position");
			}



			if (sHref.indexOf('#') !== -1) {
				oOptions.menu = '#' + sHref.split('#')[1];
			}


			$(oOptions.menu).css({
				width: oOptions.menuWidth
			});

			oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

			if ( oTarget.getAttribute("data-fc-tab") !== null) {
				$(oTarget).addClass('side-panel-tab').addClass('side-panel-tab-' + oSettings.side);

				if (oTarget.getAttribute("data-fc-tab-top") !== null) {
					$(oTarget).css('top', oTarget.getAttribute("data-fc-tab-top"));
				}
			}

			// Clone if it's necessary

			if (oTarget.getAttribute("data-fc-clone") === 'true') {

				var sIdSufix = '-' + nIndex,
					sCloneId = $(oSettings.menu).attr("id") + '-' + nIndex,
					$Clone = $(oSettings.menu).clone().attr("id", $(oSettings.menu).attr("id") + sIdSufix);

				oTarget.href = '#' + sCloneId;
				oSettings.menu = '#' + sCloneId;

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
			}

			oParent = $(oTarget).parent(oSettings.menu)[0];

			$(oSettings.menu).removeClass('desktop').removeClass('tablet').removeClass('mobile').hide();

			function resizer () {

				$('body').css({
					'width': $(window).width()
				});

				$(window).off("resize", resizer);
			}

			$(oTarget).click( function(){

				var sStatus = $(oSettings.menu)[0].className.indexOf('ps-active-panel') === -1 ? 'opening' : 'closing';

				if (sStatus === 'opening') {
					$('body').css({
						'width': $(window).width()
					});

					$(window).off("resize", resizer);
					$(window).resize(resizer);
				}

				if ($('.black-panel')[0] === undefined) {
					$('body').append('<div class="black-panel animated fade-in"></div>');
				}

			}).panelslider(oSettings);

			$(oSettings.menu).addClass('side-panel-default').addClass('side-panel-' + oSettings.side);

		},
		onStop: function () {
			this.sPathCss = null;
		},
		onDestroy: function () {
			delete this.sPathCss;
		}
	};
});