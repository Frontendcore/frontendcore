TinyCore.AMD.define('tabs', ['devicePackage'] , function () {
	return {
		onStart: function () {

			var aTarget = document.querySelectorAll('[data-tc-modules="tabs"]');

			FC.loadCSS(this.sPathCss);

			FC.trackEvent('JS_Libraries', 'call', 'tabs' );

			this.autobind(aTarget);


		},
		autobind: function (aTargets) {

			var self = this;

			$( aTargets ).each(function () {
				var oThis = this,
					oTabActive = null,
					oTabsInfo = self.getTabsInfo( oThis),
					oTabs;

				$(oThis).addClass('tab-container');

				oTabs = self.createDesktopTabs(oTabsInfo);

				for ( var nKey = 0; nKey < oTabsInfo.length; nKey++){
					$(document.getElementById(oTabsInfo[nKey].id)).before( self.createMobileTabs(oTabsInfo[nKey].id, oTabsInfo[nKey].name ));
				}

				$(this).prepend(oTabs);

				$('a.update-tabs', oThis).bind('click', function (event) {

					event.preventDefault();

					var sHref = (event.srcElement || event.target).href;

					if (sHref.indexOf('#') !== -1) {
						self.updateTabs(oThis, sHref.split('#')[1]);
					}
				});

				if (oTabActive === null) {
					oTabActive = $('nav li:first a', oThis)[0];
				}

				self.updateTabs(oThis, oTabActive.href.split('#')[1]);


			});
		},
		toggleTabs: function (aTarget) {

			var self = this;

			$( aTarget ).each(function () {

				var oThis = this;

				$(this).bind('click', function (event) {

					event.preventDefault();

					var sHref = this.href;

					if (sHref.indexOf('#') !== -1) {
						$(document.getElementById(sHref.split('#')[1])).slideToggle();
					}

				});
			});
		},
		getTabsInfo: function(oTarget) {
			var oTabsInfo = {};

			$('> section', oTarget).each(function( nKey ) {

				var self = this;

				oTabsInfo[nKey] = {};

				oTabsInfo[nKey].id = this.id;

				if ( self.getAttribute("data-tc-name") !== null) {
					oTabsInfo[nKey].name = self.getAttribute("data-tc-name");
				} else {
					oTabsInfo[nKey].name = self.id.replace('-', ' ');
				}
				oTabsInfo.length = nKey + 1;

			});


			return oTabsInfo;
		},
		createDesktopTabs: function (oTabsInfo) {

			var oNav = document.createElement('nav'),
				oUl = document.createElement('ul'),
				sElements = '';

			oNav.className = 'tabs';

			for (var nKey = 0; nKey < oTabsInfo.length; nKey++){
				sElements += '<li id="'+ oTabsInfo[nKey].id + '-li"><a href="#'+ oTabsInfo[nKey].id + '" class="update-tabs">'+ oTabsInfo[nKey].name +'</a></li>';
			}

			oUl.innerHTML = sElements;
			oNav.innerHTML = oUl.outerHTML;

			return oNav;

		},
		createMobileTabs: function (sId, sName) {

			var oHeader = document.createElement('header'),
				oLink = document.createElement('a'),
				sTabName = sName;

			oHeader.className = 'tab';
			oHeader.id = sId + '-header';

			oLink.innerHTML = sTabName;
			oLink.href = '#' + sId;
			oLink.className = 'update-tabs';
			oHeader.innerHTML = oLink.outerHTML;

			return oHeader;

		},
		updateTabs: function ( oTarget, sId ) {

			var self = this;
			$('> nav a.update-tabs, > header.tab a.update-tabs', oTarget).each(function () {

				var $Content = $('#' + this.href.split('#')[1]),
					sIdLi = this.href.split('#')[1],
					$Li = $(document.getElementById(sIdLi + '-li')),
					$Header = $(document.getElementById(sIdLi + '-header'));

				if (this.href.indexOf(sId) !== -1) {
					$Li.addClass('active');
					$Header.addClass('active');
					$Content.fadeIn();
				} else {
					$Li.removeClass('active');
					$Header.removeClass('active');
					$Content.hide();
				}
			});
		}
	};
});