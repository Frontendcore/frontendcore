;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('image-zoom', [], function () {
		return {
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('image-zoom');

				FrontendTools.trackModule('JS_Libraries', 'call', 'image-zoom');

				$.fn.imageZoom = function(){

					return this.each(function() {

						var subject = $(this); /* Get the subject element (AS canvas). */

						var image_obj = $('img', subject);
						var image = image_obj.attr('src');
						var image_w = image_obj.outerWidth();
						var image_h = image_obj.outerHeight();

						/* Fit subject with the width and height of the default image. */
						subject.css('width', image_w).css('height', image_h).css('display','block').css('overflow', 'hidden');

						/* Position the default image. */
						image_obj.css('position', 'relative').css({ top: 0, left: 0 });

						$('a', subject).bind('click onclick', function(event) {
							event.preventDefault(); /* Disable clicking of a. */
						});

						var image_zoom = subject.attr('href'); // Get the large image.
						var image_zoom_w = 0;
						var image_zoom_h = 0;
						var image_zoom_obj = new Image() ;

						$(image_zoom_obj).on('load', function() {

							image_zoom_w = this.width;
							image_zoom_h = this.height;

							/* Bind the subject element with these events. */
							subject.bind('mousemove mouseout', function(event) {

								if(event.type == 'mousemove') {

									/* @start: Will position the mouse inside the canvas only. */
									var mouse_x = event.pageX - subject.offset().left;
									var mouse_y = event.pageY - subject.offset().top;
									/* @end: Will position the mouse inside the canvas only. */

									var goto_x = (Math.round((mouse_x / image_w) * 100) / 100) * (image_zoom_w - image_w);
									var goto_y = (Math.round((mouse_y / image_h) * 100) / 100) * (image_zoom_h - image_h);

									image_obj.css('cursor', 'crosshair').attr('src', image_zoom).css({ left: '-' + goto_x +'px', top: '-' + goto_y +'px', "max-width": 'none'});

								} else if(event.type == 'mouseout') {

									image_obj.css('cursor', 'default').attr('src', image).css({ top: 0, left: 0, "max-width": 'none' });
								}
							});
						});

						$(image_zoom_obj).attr('src', image_zoom);
					});
				};

				$(aTargets).each(function (nIndex) {
					$(this).imageZoom();
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
