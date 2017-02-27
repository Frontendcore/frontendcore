;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';


	FrontendCore.define('draggable', [], function () {

        // Simple JQuery Draggable Plugin
        // https://plus.google.com/108949996304093815163/about
        // Usage: $(selector).drags();
        // Options:
        // handle            => your dragging handle.
        //                      If not defined, then the whole body of the
        //                      selected element will be draggable
        // cursor            => define your draggable element cursor type
        // draggableClass    => define the draggable class
        // activeHandleClass => define the active handle class
        //
        // Update: 26 February 2013
        // 1. Move the `z-index` manipulation from the plugin to CSS declaration
        // 2. Fix the laggy effect, because at the first time I made this plugin,
        //    I just use the `draggable` class that's added to the element
        //    when the element is clicked to select the current draggable element. (Sorry about my bad English!)
        // 3. Move the `draggable` and `active-handle` class as a part of the plugin option
        // Next update?? NEVER!!! Should create a similar plugin that is not called `simple`!

        (function($) {
            $.fn.drags = function(opt) {

                opt = $.extend({
                    handle: "",
                    cursor: "move",
                    draggableClass: "draggable",
                    activeHandleClass: "active-handle"
                }, opt);

                var $selected = null;
                var $elements = (opt.handle === "") ? this : this.find(opt.handle);

                $elements.css('cursor', opt.cursor).on("mousedown", function(e) {
                    if(opt.handle === "") {
                        $selected = $(this);
                        $selected.addClass(opt.draggableClass);
                    } else {
                        $selected = $(this).parent();
                        $selected.addClass(opt.draggableClass).find(opt.handle).addClass(opt.activeHandleClass);
                    }
                    var drg_h = $selected.outerHeight(),
                        drg_w = $selected.outerWidth(),
                        pos_y = $selected.offset().top + drg_h - e.pageY,
                        pos_x = $selected.offset().left + drg_w - e.pageX;
                    $(document).on("mousemove", function(e) {
                        $selected.offset({
                            top: e.pageY + pos_y - drg_h,
                            left: e.pageX + pos_x - drg_w
                        });
                    }).on("mouseup", function() {
                        $(this).off("mousemove"); // Unbind events from document
                        if ($selected !== null) {
                            $selected.removeClass(opt.draggableClass);
                            $selected = null;
                        }
                    });
                    e.preventDefault(); // disable selection
                }).on("mouseup", function() {
                    if(opt.handle === "") {
                        $selected.removeClass(opt.draggableClass);
                    } else {
                        $selected.removeClass(opt.draggableClass)
                            .find(opt.handle).removeClass(opt.activeHandleClass);
                    }
                    $selected = null;
                });

                return this;

            };
        })(jQuery);


        function dragMoveListener (event) {
            var target = event.target,
                // keep the dragged position in the data-x/data-y attributes
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            // translate the element
            target.style.webkitTransform =
                target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)';

            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }

		return {
			oDefault: {
			},
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('draggable'),
					self = this;

				FrontendTools.loadCSS( oGlobalSettings.sPathCss + 'secondary.css?v=' + oGlobalSettings.sHash );

				FrontendTools.trackModule('JS_Libraries', 'call', 'draggable');


                    $(aTargets).each(function () {
                        self.autobind(this);
                    });
			},
			autobind: function (oTarget) {

				var self = this,
					oSettings,
					oOptions = {},
					sProperty,
					aDeviceItems,
					sClass = 'carousel';

				FrontendTools.removeLoading(oTarget);


				if (oTarget.getAttribute("data-fc-handle") !== null) {
					oOptions.handle = oTarget.getAttribute("data-fc-handle");
				}

                $(oTarget).drags();
//				oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

                //$oTarget.owlCarousel(oSettings);


			},
			onStop: function () {
				this.sPathCss = null;
				this.oDefault = null;
			},
			onDestroy: function () {
				delete this.sPathCss;
				delete this.oDefault;
			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);
