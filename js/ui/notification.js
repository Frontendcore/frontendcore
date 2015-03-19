FrontendCore.define('notification', [], function () {
	return {
		mediator :  FrontendMediator,
		sPathCss: oGlobalSettings.sPathCssUI + '?v=' + oGlobalSettings.sHash,
		bMessageCreated : false,
		oTimer: null,
		onStart: function ( ) {

			var aTargets = FrontendTools.getDataModules('notification'),
                self = this,
				oTarget,
				sEvent;

			FrontendTools.trackModule('JS_Libraries', 'call', 'notification' );

			FrontendTools.loadCSS(this.sPathCss);

			$(aTargets).each(function () {

				oTarget = this;

				sEvent = oTarget.getAttribute('data-fc-event');

				if ( sEvent == 'load') {

					self.getAttributesAndExecute(oTarget);

				} else {

					$(this).on('click' , function(event) {

						event.preventDefault();

						self.getAttributesAndExecute(this);

					});
				}
			});

			self.mediator.subscribe( ['notification'], this.processResponse, this );

		},
		getAttributesAndExecute: function ( oTarget) {
			var self = this,
				sType = oTarget.getAttribute('data-fc-type') ? oTarget.getAttribute('data-fc-type') : 'ok',
				sText = oTarget.getAttribute('data-fc-text') ? oTarget.getAttribute('data-fc-text') : null;

			if (sText !== null) {
				self.showMessage(sType, sText);
			}
		},
		processResponse : function(oResponse) {

			var sType = oResponse.data.type ? oResponse.data.type : 'ok',
				sText = oResponse.data.message ? oResponse.data.message : 'Success';

			this.showMessage( sType, sText );
		},
		setMessageVisibile : function( oMessage, oContainer, sType, sText ) {
			oMessage.className = 'mb-n msg-' + sType;
			oMessage.innerHTML = sText;
			oContainer.style.top = '0px';
		},
		showMessage: function ( sType, sText ) {

			var self = this;


			if (self.oTimer !== null) {
				clearTimeout(self.oTimer);
			}

			if ( this.bMessageCreated ) {

				var oMessage = document.getElementById('notification-message'),
					oContainer = document.getElementById('notification');

				if (oContainer.style.top.toString() === '0px') {
					oContainer.style.top = '-1000px';

					self.oTimer = setTimeout( function() {
						self.setMessageVisibile(oMessage, oContainer, sType, sText);
					}, 300);

				} else {
					self.setMessageVisibile(oMessage, oContainer, sType, sText);
				}

			} else {
				this.createMessage(sType, sText);
			}

		},
		createMessage: function ( sType, sText ) {

			this.bMessageCreated = true;

			var oMessage = document.createElement('p'),
				oContainer = document.createElement('div'),
				oBackground = document.createElement('div'),
				oClose = document.createElement('a'),
				self = this;


			oContainer.id = 'notification';
			oContainer.style.display = 'none';

			oBackground.className = 'box-background pa-n ma-n';

			oClose.href = '#';
			oClose.className = 'icon-times';
			oClose.id = 'notification-close';

			oMessage.id = 'notification-message';
			oMessage.className = 'mb-n msg-' + sType;
			oMessage.innerHTML = sText;
			oBackground.appendChild(oMessage);
			oBackground.appendChild(oClose);
			oContainer.appendChild(oBackground);

			$('body').prepend(oContainer);

			$('#notification-close').on('click', function() {
				document.getElementById('notification').style.top = '-1000px';
			});

			$('#notification').fadeIn('fast', function() {

				document.getElementById('notification').style.top = '0px';

				self.oTimer = setTimeout( function() {
					document.getElementById('notification').style.top = '-1000px';
				}, 5000);
			});

		},
		onStop: function () {
			this.mediator = null;
			this.bMessageCreated = null;
			this.oTimer = null;
		},
		onDestroy: function () {
			delete this.mediator;
			delete this.bMessageCreated;
			delete this.oTimer;
		}
	};
});
