;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('image-zoom', [], function () {

		function ImageZoomInit( oTarget ) {

			var sImageWidth = 0,
				sImageHeight = 0,
				oImageOriginal = oTarget.getElementsByTagName('img')[0],
				sImageOriginalId= oImageOriginal.src.substring(oImageOriginal.src.lastIndexOf('/') + 1).replace('.','') + '_original';

			oImageOriginal.id = sImageOriginalId;

			var fTimerContainer = setInterval( function(){

				if ( sImageWidth === 0 || sImageHeight === 0 ) {
					sImageWidth = $(oImageOriginal).width();
					sImageHeight = $(oImageOriginal).height();

				} else {
					imageZoomBind(oImageOriginal, oTarget,sImageWidth, sImageHeight, sImageOriginalId );
					clearInterval(fTimerContainer);
				}
			}, 500);

			$('a', oTarget).bind('click', function(event) {
				event.preventDefault();
			});

		}

		function setTargetHeight( oTarget, sImageWidth, sImageHeight ) {

			$(oTarget).css('width', sImageWidth).css('height', sImageHeight).css('display','block').css('overflow', 'hidden');
		}

		function ImageMouseMove( oTarget, event, oImageOriginal, oImageZoom ) {

			var sImageZoomWidth = $(oImageOriginal).width(),
				sImageZoomHeight = $(oImageOriginal).height(),
				sImageWidth = $(oTarget).width(),
				sImageHeight = $(oTarget).height(),
				mouse_x = event.pageX - $(oTarget).offset().left,
				mouse_y = event.pageY - $(oTarget).offset().top,
				goto_x = (Math.round((mouse_x / sImageWidth) * 100) / 100) * (sImageZoomWidth - sImageWidth),
				goto_y = (Math.round((mouse_y / sImageHeight) * 100) / 100) * (sImageZoomHeight - sImageHeight);

			oTarget.setAttribute('data-fc-title', oTarget.title);
			oTarget.title = '';
			oTarget.getElementsByTagName('img')[0].setAttribute('data-fc-alt', oTarget.getElementsByTagName('img')[0].alt );
			oTarget.getElementsByTagName('img')[0].alt = "";

			$(oTarget).css('cursor', 'crosshair');


			if (goto_y > 0 ) {
				goto_y = '-' + goto_y;
			}

			if (goto_x > 0 ) {
				goto_x = '-' + goto_x;
			}

			oImageZoom.style.top = goto_y.toString() +'px';
			oImageZoom.style.left = goto_x.toString() +'px';


		}

		function ImageMouseOut( oTarget, oImageOriginal ) {

			oTarget.title = oTarget.getAttribute('data-fc-title');
			oTarget.getElementsByTagName('img')[0].alt = oTarget.getElementsByTagName('img')[0].getAttribute('data-fc-alt');

		}


		function imageZoomBind(oImageOriginal, oTarget, sImageWidth, sImageHeight, sImageOriginalId ) {

			var sHrefImageZoom = oTarget.href,
				sImageZoomWidth = 0,
				sImageZoomHeight = 0,
				oImageZoomImg = document.createElement('img'),
				oImageId = sHrefImageZoom.substring(sHrefImageZoom.lastIndexOf('/') + 1).replace('.','') + '_zoom';

			setTargetHeight( oTarget,sImageWidth, sImageHeight );

			oImageZoomImg.src = sHrefImageZoom;
			oImageZoomImg.id = oImageId;
			oImageZoomImg.style.display = 'none';
			oImageZoomImg.style.position = 'absolute';

			oTarget.appendChild(oImageZoomImg);

			var oImageZoom = document.getElementById(oImageId);

			/* Bind the oTarget element with these events. */
			$(oTarget).bind('mousemove mouseout mouseenter', function(event) {

				if(event.type == 'mousemove') {

					$('#' + sImageOriginalId + ':visible').hide();
					$('#' + oImageId + ':hidden').show();

					ImageMouseMove( this, event, oImageOriginal, oImageZoom );

				} else if( event.type == 'mouseout' ) {

					$('#' + oImageId + ':visible').hide();
					$('#' + sImageOriginalId + ':hidden').fadeIn(100);

					ImageMouseOut( this, oImageOriginal );

				}

			});


		}

		return {
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('image-zoom'),
					self = this;

				FrontendTools.trackModule('JS_Libraries', 'call', 'image-zoom');

				$(aTargets).each( function() {
					self.autobind(this);
				});

			},
			autobind: function(oTarget) {
				ImageZoomInit(oTarget);
			},
			onDestroy: function () {

			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);
