(function (module, $, undefined) {

    var BLOCK_TAGS = ['table', 'thead', 'tbody', 'tfoot', 'tr', 'col', 'colgroup', 'object', 'embed', 'param', 'ol', 'ul', 'dl', 'blockquote', 'select', 'optgroup', 'option', 'textarea', 'script', 'style'];

	/* Trim function.
	 * Trim only end of string whitespaces
	 *
	 * text - String to trim
	 *
	 * Returns text without end whitespaces
	 */
    function trimRight(text) {
        return text.replace(/\s*$/,"");
    }

    function setText(element, text) {
        if (element.innerText) {
            element.innerText = text;
        } else if (element.nodeValue) {
            element.nodeValue = text;
        } else if (element.textContent) {
            element.textContent = text;
        } else {
            return false;
        }
    }

	/* Truncate the nearest sibling node.
	 * If no valid immediate sibling is found, traverse one level up to a cousin node.
	 *
	 * $element  - The jQuery node to truncate.
	 * $rootNode - The jQuery root node to measure the truncated height.
	 * $clipNode - The jQuery node to insert right after the truncation point.
	 * options   - An object containing:
	 *             ellipsis  - The ellipsis string to append at the end of the truncation.
	 *             maxHeight - The maximum height for the root node (in px).
	 *             position  - The position of the truncation ("start", "middle", "end").
	 *
	 * Returns true if truncation happened, false otherwise.
	 */
    function truncateNearestSibling($element, $rootNode, $clipNode, options) {
        var $parent = $element.parent();
        var $prevSibling;

        $element.remove();

        // Take into account length of $clipNode element previous inserted.
        var clipLength = $clipNode ? $clipNode.length : 0;

        if ($parent.contents().length > clipLength) {

            // Valid previous sibling element (sharing same parent node) exists,
            // so attempt to truncate it.
            $prevSibling = $parent.contents().eq(-1 - clipLength);
            return truncateTextContent($prevSibling, $rootNode, $clipNode, options);

        } else {

            // No previous sibling element (sharing same parent node) exists.
            // Therefore, search parent's sibling.

            var $parentSibling = $parent.prev();
            $prevSibling = $parentSibling.contents().eq(-1);

            if ($prevSibling.length) {

                // Because traversal is in-order so the algorithm already checked that
                // this point meets the height requirement. As such, it's safe to truncate here.
                setText($prevSibling[0], $prevSibling.text() + options.ellipsis);
                $parent.remove();

                if ($clipNode.length) {
                    $parentSibling.append($clipNode);
                }
                return true;
            }
        }

        return false;
    }

	/* Truncates, at the beginning, the text content of a node using binary search */
    function truncateTextStart($element, $rootNode, $clipNode, options) {
        var element = $element[0];
        var original = $element.text();

        var maxChunk = '';
        var mid, chunk;
        var low = 0;
        var high = original.length;

        while (low <= high) {
            mid = low + ((high - low) >> 1); // Integer division

            chunk = options.ellipsis + trimRight(original.substr(mid - 1, original.length));
            setText(element, chunk);

            if ($rootNode.height() > options.maxHeight) {
                // too big, reduce the chunk
                low = mid + 1;
            }
            else {
                // chunk valid, try to get a bigger chunk
                high = mid - 1;
                maxChunk = maxChunk.length > chunk.length ? maxChunk : chunk;
            }
        }

        if (maxChunk.length > 0) {
            setText(element, maxChunk);
            return true;
        } else {
            return truncateNearestSibling($element, $rootNode, $clipNode, options);
        }
    }

	/* Truncates, at the end, the text content of a node using binary search */
    function truncateTextEnd($element, $rootNode, $clipNode, options) {
        var element = $element[0];
        var original = $element.text();

        var maxChunk = '';
        var mid, chunk;
        var low = 0;
        var high = original.length;

        // Binary Search
        while (low <= high) {
            mid = low + ((high - low) >> 1); // Integer division

            chunk = trimRight(original.substr(0, mid + 1)) + options.ellipsis;
            setText(element, chunk);

            if ($rootNode.height() > options.maxHeight) {
                // too big, reduce the chunk
                high = mid - 1;
            } else {
                // chunk valid, try to get a bigger chunk
                low = mid + 1;
                maxChunk = maxChunk.length > chunk.length ? maxChunk : chunk;
            }
        }

        if (maxChunk.length > 0) {
            setText(element, maxChunk);
            return true;
        } else {
            return truncateNearestSibling($element, $rootNode, $clipNode, options);
        }
    }

	/* Truncates, at the middle, the text content of a node using binary search */
    function truncateTextMiddle($element, $rootNode, $clipNode, options) {
        var element = $element[0];
        var original = $element.text();

        var maxChunk = '';
        var low = 0;
        var len = original.length;
        var high = len >> 1;
        var mid, chunk;

        while (low <= high) {
            mid = low + ((high - low) >> 1); // Integer division

            chunk = trimRight(original.substr(0, mid)) + options.ellipsis + original.substr(len - mid, len - mid);
            setText(element, chunk);

            if ($rootNode.height() > options.maxHeight) {
                // too big, reduce the chunk
                high = mid - 1;
            }
            else {
                // chunk valid, try to get a bigger chunk
                low = mid + 1;

                maxChunk = maxChunk.length > chunk.length ? maxChunk : chunk;
            }
        }

        if (maxChunk.length > 0) {
            setText(element, maxChunk);
            return true;
        } else {
            return truncateNearestSibling($element, $rootNode, $clipNode, options);
        }
    }

	/* Truncates the text content of a node using binary search.
	 * If no valid truncation point is found, attempt to truncate its nearest sibling.
	 *
	 * $textNode - The jQuery node to truncate.
	 * $rootNode - The jQuery root node to measure the truncated height.
	 * $clipNode - The jQuery node to insert right after the truncation point.
	 * options   - An object containing:
	 *             ellipsis  - The ellipsis string to append at the end of the truncation.
	 *             maxHeight - The maximum height for the root node (in px).
	 *             position  - The position of the truncation ("start", "middle", "end").
	 *
	 * Returns true if truncation happened, false otherwise.
	 */
    function truncateTextContent($element, $rootNode, $clipNode, options) { // jshint ignore:line
        if (options.position === "end") {
            return truncateTextEnd($element, $rootNode, $clipNode, options);
        }
        else if (options.position === "start") {
            return truncateTextStart($element, $rootNode, $clipNode, options);
        }
        else {
            return truncateTextMiddle($element, $rootNode, $clipNode, options);
        }
    }

	/* Recursively truncates a nested node. Traverses the children node tree in reverse order. */
    function truncateNestedNodeStart($element, $rootNode, $clipNode, options) {
        var element = $element[0];

        var $children = $element.contents();
        var $child, child;

        var length = $children.length;
        var index = length -1;
        var truncated = false;

        $element.empty();

        for (; index >= 0 && !truncated; index--) {

            $child = $children.eq(index);
            child = $child[0];

            if (child.nodeType === 8) { // comment node
                continue;
            }

            element.insertBefore(child, element.firstChild);

            if ($clipNode.length) {
                if ($.inArray(element.tagName.toLowerCase(), BLOCK_TAGS) >= 0) {
                    // Certain elements like <li> should not be appended to.
                    $element.after($clipNode);
                } else {
                    $element.append($clipNode);
                }
            }

            if ($rootNode.height() > options.maxHeight) {
                if (child.nodeType === 3) { // text node
                    truncated = truncateTextContent($child, $rootNode, $clipNode, options);
                } else {
                    truncated = truncateNestedNode($child, $rootNode, $clipNode, options);
                }
            }

            if (!truncated && $clipNode.length) {
                $clipNode.remove();
            }

        }

        return truncated;
    }

	/* Recursively truncates a nested node. Traverses the children node tree in-order. */
    function truncateNestedNodeEnd($element, $rootNode, $clipNode, options) {
        var element = $element[0];

        var $children = $element.contents();
        var $child, child;

        var index = 0;
        var length = $children.length;
        var truncated = false;

        $element.empty();

        for (; index < length && !truncated; index++) {

            $child = $children.eq(index);
            child = $child[0];

            if (child.nodeType === 8) { // comment node
                continue;
            }

            element.appendChild(child);

            if ($clipNode.length) {
                if ($.inArray(element.tagName.toLowerCase(), BLOCK_TAGS) >= 0) {
                    // Certain elements like <li> should not be appended to.
                    $element.after($clipNode);
                } else {
                    $element.append($clipNode);
                }
            }

            if ($rootNode.height() > options.maxHeight) {
                if (child.nodeType === 3) { // text node
                    truncated = truncateTextContent($child, $rootNode, $clipNode, options);
                } else {
                    truncated = truncateNestedNode($child, $rootNode, $clipNode, options);
                }
            }

            if ($child[0].tagName === 'BR') {
                truncated = true;
            }

            if (!truncated && $clipNode.length) {
                $clipNode.remove();
            }

        }

        return truncated;
    }

	/* Recursively truncates a nested node.
	 *
	 * $element  - The jQuery nested node to truncate.
	 * $rootNode - The jQuery root node to measure the truncated height.
	 * $clipNode - The jQuery node to insert right after the truncation point.
	 * options   - An object containing:
	 *             ellipsis  - The ellipsis string to append at the end of the truncation.
	 *             maxHeight - The maximum height for the root node (in px).
	 *             position  - The position of the truncation ("start", "middle", "end").
	 *
	 * Returns true if truncation happened, false otherwise.
	 */
    function truncateNestedNode($element, $rootNode, $clipNode, options) { // jshint ignore:line
        if (options.position === "end") {
            return truncateNestedNodeEnd($element, $rootNode, $clipNode, options);
        }
        else if (options.position === "start") {
            return truncateNestedNodeStart($element, $rootNode, $clipNode, options);
        }
        else {
            // TODO: Truncate middle for nested = HARDCORE
            return truncateNestedNodeEnd($element, $rootNode, $clipNode, options);
        }
    }

	/* Public: Creates an instance of Truncate.
	 *
	 * element - A DOM element to be truncated.
	 * options - An Object literal containing setup options.
	 *
	 * Examples:
	 *
	 *   var element = document.createElement('span');
	 *   element.innerHTML = 'This is<br>odd.';
	 *   var truncated = new Truncate(element, {
	 *     lines: 1,
	 *     lineHeight: 16,
	 *     ellipsis: '… ',
	 *     showMore: '<a class="show-more">Show More</a>',
	 *     showLess: '<a class="show-less">Show Less</a>',
	 *     position: "start"
	 *   });
	 *
	 *   // Update HTML
	 *   truncated.update('This is not very odd.');
	 *
	 *   // Undo truncation
	 *   truncated.expand();
	 *
	 *   // Redo truncation
	 *   truncated.collapse();
	 */
    function Truncate(element, options) {
        this.element = element;
        this.$element = $(element);

        this._name = 'truncate';
        this._defaults = {
            lines: 1,
            ellipsis: '…',
            showMore: '',
            showLess: '',
            position: 'end',
            lineHeight: 'auto'
        };

        this.options = $.extend({}, this._defaults, options);

        if (this.options.lineHeight === 'auto') {
            var lineHeightCss = this.$element.css('line-height'),
                lineHeight = 18; // for Normal we return the default value: 18px

            if (lineHeightCss !== "normal") {
                lineHeight = parseInt(lineHeightCss, 10);
            }

            this.options.lineHeight = lineHeight;
        }

        if (this.options.maxHeight === undefined) {
            this.options.maxHeight = parseInt(this.options.lines, 10) * parseInt(this.options.lineHeight, 10);
        }

        if (this.options.position !== 'start' && this.options.position !== 'middle' && this.options.position !== 'end') {
            this.options.position = 'end';
        }

        this.$clipNode = $($.parseHTML(this.options.showMore), this.$element);

        this.original = this.cached = element.innerHTML;

        this.isTruncated = false; // True if the original content overflows the container.
        this.isCollapsed = true;  // True if the container is currently collapsed.

        this.update();
    }

    Truncate.prototype = {

		/* Public: Updates the inner HTML of the element and re-truncates. Will not
		 * perform an updade if the container is currently expanded, instead it
		 * will wait until the next time .collapse() is called.
		 *
		 * html - The new HTML.
		 *
		 * Returns nothing.
		 */
        update: function (html) {
            var wasExpanded = !this.isCollapsed;

            // Update HTML if provided, otherwise use the current html and restore
            // the truncated content to the original if it's currently present.
            if (typeof html !== 'undefined') {
                this.original = this.element.innerHTML = html;
            } else if (this.isCollapsed && this.element.innerHTML === this.cached) {
                this.element.innerHTML = this.original;
            }

            // Wrap the contents in order to ignore container's margin/padding.
            var $wrap = this.$element.wrapInner('<div/>').children();
            $wrap.css({
                border: 'none',
                margin: 0,
                padding: 0,
                width: 'auto',
                height: 'auto',
                'word-wrap': 'break-word'
            });

            this.isTruncated = false;
            // Check if already meets height requirement
            if ($wrap.height() > this.options.maxHeight) {
                this.isTruncated = truncateNestedNode($wrap, $wrap, this.$clipNode, this.options);

                if(this.isExplicitlyCollapsed) {
                    this.isCollapsed = true;
                    wasExpanded = false;
                }
            } else {
                this.isCollapsed = false;
            }

            // Restore the wrapped contents
            $wrap.replaceWith($wrap.contents());

            // Cache the truncated content
            this.cached = this.element.innerHTML;

            // If the container was expanded when .update() was called then restore
            // it to it's previous state.
            if (wasExpanded) {
                this.element.innerHTML = this.original;
            }
        },

		/* Public: Expands the element to show content in full.
		 *
		 * Returns nothing.
		 */
        expand: function () {
            var includeShowLess = true;

            if(this.isExplicitlyCollapsed) {
                this.isExplicitlyCollapsed = false;
                includeShowLess = false;
            }

            if (!this.isCollapsed) {
                return;
            }

            this.isCollapsed = false;

            this.element.innerHTML = this.isTruncated ? this.original + (includeShowLess ? this.options.showLess : "") : this.original;
        },

		/* Public: Collapses the element to the truncated state.
		 * Uses the cached HTML from .update() by default.
		 *
		 * retruncate - True to retruncate original HTML, otherwise use cached HTML.
		 *
		 * Returns nothing.
		 */
        collapse: function (retruncate) {
            this.isExplicitlyCollapsed = true;

            if (this.isCollapsed) {
                return;
            }

            this.isCollapsed = true;

            retruncate = retruncate || false;
            if (retruncate) {
                this.update();
            } else {
                this.element.innerHTML = this.cached;
            }
        }
    };

    // Lightweight plugin wrapper preventing multiple instantiations
    $.fn.truncate = function (options) {
        var args = $.makeArray(arguments).slice(1);
        return this.each(function () {
            var truncate = $.data(this, 'jquery-truncate');
            if (!truncate) {
                $.data(this, 'jquery-truncate', new Truncate(this, options));
            } else if (typeof truncate[options] === 'function') {
                truncate[options].apply(truncate, args);
            }
        });
    };

    module.Truncate = Truncate;

})(this, jQuery);

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

	return {
		oTruncates: [],
		oDefault: {
			max_length: 100,
			more: '(+)',
			less: '(-)'
		},
		onStart: function () {

			var aTarget = FrontendTools.getDataModules('truncate'),
                self = this;

			FrontendTools.trackModule('JS_Libraries', 'call', 'truncate' );

			self.autobind(aTarget);

		},
		autobind: function (aTargets) {

			var self = this;

			$( aTargets ).each(function (nIndex) {

				var oTarget = this,
					oSettings,
					oOptions = {};


				if (oTarget.getAttribute("data-fc-lines") !== null) {


					var oCustomSettings = {
                        showMore: '<a href="#" class="js-truncate-more">(+)</a>',
                        showLess: '<a href="#" class="js-truncate-less">(-)</a>'
                    };

					oOptions.lines = Number(oTarget.getAttribute("data-fc-lines")) + 1;

                    if (oTarget.getAttribute("data-fc-more") !== null) {
                        oOptions.showMore = '<a href="#" class="js-truncate-more">' + oTarget.getAttribute("data-fc-more") + '</a>';
                    }

                    if (oTarget.getAttribute("data-fc-less") === 'false' ) {
                        oOptions.showLess = "";
                    } else if (oTarget.getAttribute("data-fc-less") !== null ) {
                        oOptions.showLess = '<a href="#" class="js-truncate-less">' + oTarget.getAttribute("data-fc-less") + '</a>';
                    }

                    oSettings = FrontendTools.mergeOptions(oCustomSettings, oOptions);

                    self.oTruncates[nIndex] = new Truncate(oTarget , oSettings);

                    bindElements(self.oTruncates[nIndex]);

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
                    } else if (this.getAttribute("data-fc-less") !== null) {
                        oOptions.less = oTarget.getAttribute("data-fc-less");
                    }



                    $(oTarget).truncateCH(oSettings);
				}

                FrontendTools.removeLoading(this);




            });
		}
	};
});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $ );
