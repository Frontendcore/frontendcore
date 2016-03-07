;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, FrontendMediator, $) {
	'use strict';


	var bMessageCreated = false,
		oTimer = null,
		nSeconds = 5000,
		bAutoClose = true,
		sPosition = 'top';

	function getAttributesAndExecute( oTarget) {
		var sType = oTarget.getAttribute('data-fc-type') ? oTarget.getAttribute('data-fc-type') : '',
			sText = oTarget.getAttribute('data-fc-text') ? oTarget.getAttribute('data-fc-text') : null;

		switch (sType) {
			case "ko" :
			case "error" :
				sType = 'error';
				break;
			case "info" :
				sType = 'info';
				break;
			case "warning" :
				sType = 'warning';
				break;
			case "ok" :
			case "success" :
				sType = 'success';
			break;
			default:
				sType = 'success';
			break;

		}

		if ( parseInt(oTarget.getAttribute('data-fc-autoclose')) > 0 ) {

			nSeconds = oTarget.getAttribute('data-fc-autoclose') * 1000;
		} else {
			nSeconds = 5000;
		}

		if ( oTarget.getAttribute('data-fc-autoclose') === 'false') {
			bAutoClose = false;
		} else {
			bAutoClose = true;
		}

		sPosition = oTarget.getAttribute('data-fc-position') ? oTarget.getAttribute('data-fc-position') : 'top';

		if (sText !== null) {
			showMessage(sType, sText);
		}
	}

	function showMessage( sType, sText ) {

		if (oTimer !== null) {
			clearTimeout(oTimer);
		}

		if ( bMessageCreated ) {

			var oMessage = document.getElementById('notification-message'),
				oContainer = document.getElementById('notification');

			if (oContainer.style.top.toString() === '0px') {
				oContainer.style.top = '-1000px';

				oTimer = setTimeout( function() {
					setMessageVisibile(oMessage, oContainer, sType, sText);
				}, 300);

			} else {
				setMessageVisibile(oMessage, oContainer, sType, sText);
			}

		} else {
			createMessage(sType, sText);
		}
	}

	function setMessageVisibile( oMessage, oContainer, sType, sText ) {

		oContainer.className = '_' + sType;
		oMessage.className = 'mb-n callout _' + sType;
		oMessage.innerHTML = sText;
		oContainer.style.top = '0px';

		if ( bAutoClose === true) {
			oTimer = setTimeout( function() {
				document.getElementById('notification').style.top = '-1000px';
			}, nSeconds );
		}

	}

	function processResponse(oResponse) {

		var sType = oResponse.data.type ? oResponse.data.type : 'success',
			sText = oResponse.data.message ? oResponse.data.message : 'Success';

		showMessage( sType, sText );
	}

	function createMessage( sType, sText ) {

		bMessageCreated = true;

		var oMessage = document.createElement('p'),
			oContainer = document.createElement('div'),
			oBackground = document.createElement('div'),
			oClose = document.createElement('a');


		oContainer.id = 'notification';
		oContainer.style.display = 'none';
		oContainer.className = '_' + sType;

		oBackground.className = 'box _background pa-n ma-n';

		oClose.href = '#';
		oClose.id = 'notification-close';

		oMessage.id = 'notification-message';
		oMessage.className = 'mb-n callout _' + sType;
		oMessage.innerHTML = sText;
		oBackground.appendChild(oMessage);
		oBackground.appendChild(oClose);
		oContainer.appendChild(oBackground);

		$('body').prepend(oContainer);

		$('#notification-message').on('click', function() {
			document.getElementById('notification').style.top = '-1000px';
		});

		$('#notification').fadeIn('fast', function() {

			document.getElementById('notification').style.top = '0px';

			if ( bAutoClose === true) {
				oTimer = setTimeout( function() {
					document.getElementById('notification').style.top = '-1000px';
				}, nSeconds );
			}


		});

	}

	FrontendCore.define('notification', [], function () {
		return {
			onStart: function ( ) {

				var aTargets = FrontendTools.getDataModules('notification'),
					oTarget,
					sEvent;

				FrontendTools.loadCSS( oGlobalSettings.sPathCss + 'secondary.css?v=' + oGlobalSettings.sHash );

				FrontendTools.trackModule('JS_Libraries', 'call', 'notification' );

				$(aTargets).each(function () {

					oTarget = this;

					sEvent = oTarget.getAttribute('data-fc-event');

					if ( sEvent == 'load') {

						getAttributesAndExecute(oTarget);

					} else {

						$(this).on('click' , function(event) {

							event.preventDefault();

							getAttributesAndExecute(this);

						});
					}
				});

				FrontendMediator.subscribe( ['notification'], this.processResponse, this );

			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, FrontendMediator, $);
