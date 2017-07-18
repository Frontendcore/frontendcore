/* jshint ignore:start */
// HTML Truncator for jQuery
// by Henrik Nyh <http://henrik.nyh.se> 2008-02-28.
// Free to modify and redistribute with credit.

(function($) {

	var trailing_whitespace = true;

	$.fn.truncateCH = function(options) {

		var opts = $.extend({}, $.fn.truncateCH.defaults, options);

		$(this).each(function() {

			var content_length = $.trim(squeeze($(this).text())).length;
			if (content_length <= opts.max_length)
				return;  // bail early if not overlong

			// include more text, link prefix, and link suffix in max length
			var actual_max_length = opts.max_length - opts.more.length - opts.link_prefix.length - opts.link_suffix.length;

			var truncated_node = recursivelyTruncate(this, actual_max_length);
			var full_node = $(this).hide();

			truncated_node.insertAfter(full_node);

			findNodeForMore(truncated_node).append(opts.link_prefix+'<a href="#more" class="'+opts.css_more_class+'">'+opts.more+'</a>'+opts.link_suffix);
			findNodeForLess(full_node).append(opts.link_prefix+'<a href="#less" class="'+opts.css_less_class+'">'+opts.less+'</a>'+opts.link_suffix);

			truncated_node.find('a:last').click(function() {
				truncated_node.hide(); full_node.show(); return false;
			});
			full_node.find('a:last').click(function() {
				truncated_node.show(); full_node.hide(); return false;
			});

		});
	}

	// Note that the " (…more)" bit counts towards the max length – so a max
	// length of 10 would truncate "1234567890" to "12 (…more)".
	$.fn.truncateCH.defaults = {
		max_length: 100,
		more: '…more',
		less: 'less',
		css_more_class: 'truncator-link truncator-more',
		css_less_class: 'truncator-link truncator-less',
		link_prefix: '',
		link_suffix: ''
	};

	function recursivelyTruncate(node, max_length) {
		return (node.nodeType == 3) ? truncateText(node, max_length) : truncateNode(node, max_length);
	}

	function truncateNode(node, max_length) {
		var node = $(node);
		var new_node = node.clone().empty();
		var truncatedChild;
		node.contents().each(function() {
			var remaining_length = max_length - new_node.text().length;
			if (remaining_length == 0) return;  // breaks the loop
			truncatedChild = recursivelyTruncate(this, remaining_length);
			if (truncatedChild) new_node.append(truncatedChild);
		});
		return new_node;
	}
    var separator = ' ';

	function truncateText(node, max_length, separator ) {
		var text = squeeze(node.data);
		if (trailing_whitespace)  // remove initial whitespace if last text
			text = text.replace(/^ /, '');  // node had trailing whitespace.
		trailing_whitespace = !!text.match(/ $/);

        var cutat= text.lastIndexOf(' ',max_length);

		var text = text.slice(0, cutat);
		// Ensure HTML entities are encoded
		// http://debuggable.com/posts/encode-html-entities-with-jquery:480f4dd6-13cc-4ce9-8071-4710cbdd56cb
		text = $('<div/>').text(text).html();
		return text;
	}

	// Collapses a sequence of whitespace into a single space.
	function squeeze(string) {
		return string.replace(/\s+/g, ' ');
	}

	// Finds the last, innermost block-level element
	function findNodeForMore(node) {
		var $node = $(node);
		var last_child = $node.children(":last");
		if (!last_child) return node;
		var display = last_child.css('display');
		if (!display || display=='inline') return $node;
		return findNodeForMore(last_child);
	};

	// Finds the last child if it's a p; otherwise the parent
	function findNodeForLess(node) {
		var $node = $(node);
		var last_child = $node.children(":last");
		if (last_child && last_child.is('p')) return last_child;
		return node;
	};

})(jQuery);
/* jshint ignore:end */

; (function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('truncate', [], function () {

	    var nHeight,
            nCurrentHeight;

    function heightByLines(target, nLines) {
        var style = window.getComputedStyle(target, null);
        var height = parseFloat(style.getPropertyValue("height")).toFixed(2);
        var font_size = parseFloat(style.getPropertyValue("font-size")).toFixed(2);
        var line_height = parseFloat(style.getPropertyValue("line-height")).toFixed(2);
        var box_sizing = style.getPropertyValue("box-sizing");

        if(isNaN(line_height)) line_height = font_size * 1.25;

        if(box_sizing=='border-box')
        {
            var padding_top = parseFloat(style.getPropertyValue("padding-top")).toFixed(2);
            var padding_bottom = parseFloat(style.getPropertyValue("padding-bottom")).toFixed(2);
            var border_top = parseFloat(style.getPropertyValue("border-top-width")).toFixed(2);
            var border_bottom = parseFloat(style.getPropertyValue("border-bottom-width")).toFixed(2);
            height = height - padding_top - padding_bottom - border_top - border_bottom;
        }

        var lines = Math.ceil(height / line_height);
//        return lines;

        return nLines * line_height;

    }

	function bindElements(truncated) {

        $('.js-truncate-more', truncated.$element).on('click', function (e) {
            e.preventDefault();
            truncated.expand();
            bindElements(truncated);
        });

        $('.js-truncate-less', truncated.$element).on('click', function (e) {
            e.preventDefault();
            truncated.collapse();
            bindElements(truncated);
        });
    }

    function checkTag( nIndex, target ) {


        var nTargetOffsetTop = $(target).offset().top,
            nContainerOffsetTop = $(target).closest('.fc-truncate').offset().top,
            nOffsetTop = nTargetOffsetTop - nContainerOffsetTop;

        if (
            ( $(target).text().replace(/\n\s+/g,'') === '' )
        ) {
            $(target).addClass('fc-hide-on-closed');
        } else {

            nCurrentHeight += $(target).height();

            if ( nCurrentHeight > nHeight && $(target).height() > (nHeight - nOffsetTop)) {
                $(target).addClass('fc-truncate-apply').height( nHeight - nOffsetTop );
            }

        }
    }

    function truncateByLines(oTarget, nIndex) {

        var sId = "fc-truncate-"+ nIndex,
            aTags = ['p','h1','h2','h3','h4','h5','h6','div','li'];

        if ( $(oTarget).height() > nHeight ) {

            FrontendTools.loadCSS( oGlobalSettings.sPathCss + 'secondary.css?v=' + oGlobalSettings.sHash );
            $(oTarget).wrap('<div id="'+ sId + '" class="fc-truncate _closed" data-fc-height="'+ $(oTarget).height() +'"></div>');

            $('#' + sId).append('<a href="#" class="fc-truncate-link">' + oTarget.getAttribute("data-fc-more") + '</a>');

            for (var tag in aTags) {
                nCurrentHeight = 0;
                $( aTags[tag] , '#' + sId).each( checkTag );
            }

            $('.fc-truncate').on('click', function (e) {
                if ( e.target.className.indexOf('fc-truncate-link') !== -1 &&  $(this).hasClass('_closed') ) {
                    e.preventDefault();
                    $(this).removeClass('_closed').addClass('_opened');
                }
            });
		}

    }

	return {
		oTruncates: [],
		oDefault: {
			max_length: 100,
			more: '(+)',
			less: '(-)'
		},
		onStart: function () {

			var aTargets = FrontendTools.getDataModules('truncate'),
				self = this;

			FrontendTools.trackModule('JS_Libraries', 'call', 'truncate');

			$(aTargets).each(function (nIndex) {
			    var oTarget = this;
				self.autobind(oTarget,nIndex);
			});
		},
		autobind: function (oTarget,nIndex) {

			var self = this,
				oSettings,
				oOptions = {};

			if (oTarget.getAttribute("data-fc-lines") !== null) {

				nHeight = heightByLines(oTarget, oTarget.getAttribute("data-fc-lines"));

				if ( $(oTarget).height() > nHeight) {
					truncateByLines(oTarget, nIndex);
				} else {
					setTimeout( function () {
						truncateByLines(oTarget, nIndex);
					}, 2000);
				}

			} else {
				if (oTarget.getAttribute("data-fc-max") !== null) {
					oOptions.max_length = oTarget.getAttribute("data-fc-max");
				}

				if (oTarget.getAttribute("data-fc-more") !== null) {
					oOptions.more = oTarget.getAttribute("data-fc-more");
				}

				if (oTarget.getAttribute("data-fc-less") === 'false') {
					var css = document.createElement("style");
					css.type = "text/css";
					css.innerHTML = ".truncator-less { display: none; }";
					document.body.appendChild(css);
				} else if (oTarget.getAttribute("data-fc-less") !== null) {
					oOptions.less = oTarget.getAttribute("data-fc-less");
				}

				$(oTarget).truncateCH(oSettings);
			}

			FrontendTools.removeLoading(oTarget);
		}
	};
});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $ );
