FrontendCore.define('side-panel', [], function () {
	return {
		sPathCss: oGlobalSettings.sPathCssUI + '?v=' + oGlobalSettings.sHash,
		oDefault: {
			menu: ('#side-panel'),
			push: ('.push'),
			side: "left",
			menuWidth: "200px",
			speed: 300,
			class: 'side-panel-default'
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
				nInitialMenuWidth;


			if (oTarget.id === '') {
				oTarget.id = 'slide-panel-open' + nIndex;
			}

			if (oTarget.getAttribute("data-fc-width") !== null) {

				nInitialMenuWidth = oTarget.getAttribute("data-fc-width");

				oOptions.menuWidth = nInitialMenuWidth;

				if (nInitialMenuWidth.indexOf('%') === -1 && nInitialMenuWidth.indexOf('px') === -1) {
					oOptions.menuWidth += 'px';
					nInitialMenuWidth = parseInt(nInitialMenuWidth, 10);
				} else if (nInitialMenuWidth.indexOf('%') === -1) {
					nInitialMenuWidth = $('window').width() / parseInt(nInitialMenuWidth, 10);
				} else {
					nInitialMenuWidth = parseInt(nInitialMenuWidth, 10);
				}

			}

			if ($(window).width() < 599 && parseInt(oOptions.menuWidth, 10) > 599) {

				oOptions.menuWidth = $(window).width() + 'px';
			}

			if (oTarget.getAttribute("data-fc-position") !== null) {
				oOptions.side = oTarget.getAttribute("data-fc-position");
			}

			if (oTarget.getAttribute("data-fc-class") !== null) {
				oOptions.class = oTarget.getAttribute("data-fc-class");
			}

			if (sHref.indexOf('#') !== -1) {
				oOptions.menu = '#' + sHref.split('#')[1];
			}

			oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

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

			$(oTarget).bigSlide(oSettings);

			$(oSettings.menu).addClass('side-panel-default');



			if ($(oSettings.menu)[0].className.indexOf('navigation') !== -1) {

				// If is a navigation object

				$(oTarget).on('click', function () {

					var nMenuWidth = $('#' + this.href.split('#')[1]).width();

					if (oSettings.side === 'right') {

						// If it's on the right side

						if ($(oSettings.menu).css('right') !== '0px') {

							// Opening
							$(oSettings.menu).css('z-index', '1000');
							$('html').css({
								'position': 'absolute',
								'width': $(window).width() + parseInt(oSettings.menuWidth, 10)
							}).animate({
								'left': '-' + nMenuWidth,
								'padding-right': nMenuWidth
							});
						} else {

							// Closing

							$('html').css({
								'position': 'relative',
								'width': 'inherit'
							}).animate({
								'left': 0,
								'padding-right': 0
							});
						}
					} else {

						// If it's on the left side

						if ($(oSettings.menu).css('left') !== '0px') {

							// Opening

							$(oSettings.menu).css('z-index', '1000');
							$('html').css({
								'position': 'absolute',
								'overflow': 'hidden',
								'width': $(window).width() + parseInt(oSettings.menuWidth, 10)
							}).animate({
								'padding-left': nMenuWidth
							});
						} else {

							// Closing

							$('html').css({
								'position': 'relative',
								'width': 'auto',
								'overflow': 'auto'
							}).animate({
								'padding-left': 0
							});

						}
					}

				});

			} else {

				$(oTarget).on('click', function () {

					var nMenuRight = $(this.href.split('#')[1]).css('right');

					if (oSettings.side === 'right' && nMenuRight === '0px') {
						$(oSettings.menu).css('z-index', '1000');
					} else {
						$(oSettings.menu).css('z-index', '1001');
					}
				});
			}

			oParent = $(oTarget).parent(oSettings.menu)[0];

			if (oParent !== undefined) {
				// Hack to solve position problem with tabs
				setTimeout(function () {
					// if the link to open the panel is inside the panel

					var nWidth = $(oTarget).outerWidth();

					if (oSettings.side === 'right') {
						$(oTarget).animate({'left': '-' + (nWidth - 1) + 'px'});
					} else {
						$(oTarget).animate({'right': '-' + (nWidth - 1 ) + 'px'});
					}

					if (oTarget.getAttribute("data-fc-tab-top") !== null) {
						$(oTarget).css('top', oTarget.getAttribute("data-fc-tab-top"));
					}

					if (oParent.className.indexOf('box') !== -1) {

						$(oParent).css('overflow', 'visible');
					}
				}, 500);
			}

			if (( oTarget.getAttribute("data-fc-close") !== 'false' && oParent === undefined) || $(window).width() <= nInitialMenuWidth) {

				// The link is not inside the panel and close is not false

				$(oSettings.menu).addClass('has-slide-panel-close');

				oClose.id = 'slide-panel-close' + nIndex;
				oClose.className = 'icon-times slide-panel-close';
				oClose.href = '#' + oTarget.id;

				if (oSettings.side === 'right') {
					oClose.style.textAlign = 'left';
				} else {
					oClose.style.textAlign = 'right';
				}

				$(oSettings.menu).append(oClose);

				$('#slide-panel-close' + nIndex).on('click', function (e) {

					e.preventDefault();

					$('#' + oTarget.id).click();

				});

			}

			if (oSettings.side === 'right') {
				$(oSettings.menu).css({
					"right": "-" + oSettings.menuWidth
				}).addClass('side-panel-right');
			} else {
				$(oSettings.menu).css({
					"left": "-" + oSettings.menuWidth
				}).addClass('side-panel-left');
			}

		},
		onStop: function () {
			this.sPathCss = null;
		},
		onDestroy: function () {
			delete this.sPathCss;
		}
	};
});