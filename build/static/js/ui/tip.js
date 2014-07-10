var Opentip, firstAdapter, i, mouseMoved, mousePosition, mousePositionObservers, position, vendors, _i, _len, _ref, __slice = [].slice, __indexOf = [].indexOf || function(a) {
    for (var b = 0, c = this.length; c > b; b++) if (b in this && this[b] === a) return b;
    return -1;
}, __hasProp = {}.hasOwnProperty;

for (Opentip = function() {
    function a(b, c, d, e) {
        var f, g, h, i, j, k, l, m, n, o, p, q, r, s, t = this;
        if (this.id = ++a.lastId, this.debug("Creating Opentip."), a.tips.push(this), this.adapter = a.adapter, 
        f = this.adapter.data(b, "opentips") || [], f.push(this), this.adapter.data(b, "opentips", f), 
        this.triggerElement = this.adapter.wrap(b), this.triggerElement.length > 1) throw new Error("You can't call Opentip on multiple elements.");
        if (this.triggerElement.length < 1) throw new Error("Invalid element.");
        for (this.loaded = !1, this.loading = !1, this.visible = !1, this.waitingToShow = !1, 
        this.waitingToHide = !1, this.currentPosition = {
            left: 0,
            top: 0
        }, this.dimensions = {
            width: 100,
            height: 50
        }, this.content = "", this.redraw = !0, this.currentObservers = {
            showing: !1,
            visible: !1,
            hiding: !1,
            hidden: !1
        }, e = this.adapter.clone(e), "object" == typeof c ? (e = c, c = d = void 0) : "object" == typeof d && (e = d, 
        d = void 0), null != d && (e.title = d), null != c && this.setContent(c), null == e["extends"] && (e["extends"] = null != e.style ? e.style : a.defaultStyle), 
        i = [ e ], s = e; s["extends"]; ) {
            if (k = s["extends"], s = a.styles[k], null == s) throw new Error("Invalid style: " + k);
            i.unshift(s), null == s["extends"] && "standard" !== k && (s["extends"] = "standard");
        }
        for (e = (p = this.adapter).extend.apply(p, [ {} ].concat(__slice.call(i))), e.hideTriggers = function() {
            var a, b, c, d;
            for (c = e.hideTriggers, d = [], a = 0, b = c.length; b > a; a++) g = c[a], d.push(g);
            return d;
        }(), e.hideTrigger && 0 === e.hideTriggers.length && e.hideTriggers.push(e.hideTrigger), 
        q = [ "tipJoint", "targetJoint", "stem" ], l = 0, n = q.length; n > l; l++) j = q[l], 
        e[j] && "string" == typeof e[j] && (e[j] = new a.Joint(e[j]));
        for (!e.ajax || e.ajax !== !0 && e.ajax || (e.ajax = "A" === this.adapter.tagName(this.triggerElement) ? this.adapter.attr(this.triggerElement, "href") : !1), 
        "click" === e.showOn && "A" === this.adapter.tagName(this.triggerElement) && this.adapter.observe(this.triggerElement, "click", function(a) {
            return a.preventDefault(), a.stopPropagation(), a.stopped = !0;
        }), e.target && (e.fixed = !0), e.stem === !0 && (e.stem = new a.Joint(e.tipJoint)), 
        e.target === !0 ? e.target = this.triggerElement : e.target && (e.target = this.adapter.wrap(e.target)), 
        this.currentStem = e.stem, null == e.delay && (e.delay = "mouseover" === e.showOn ? .2 : 0), 
        null == e.targetJoint && (e.targetJoint = new a.Joint(e.tipJoint).flip()), this.showTriggers = [], 
        this.showTriggersWhenVisible = [], this.hideTriggers = [], e.showOn && "creation" !== e.showOn && this.showTriggers.push({
            element: this.triggerElement,
            event: e.showOn
        }), null != e.ajaxCache && (e.cache = e.ajaxCache, delete e.ajaxCache), this.options = e, 
        this.bound = {}, r = [ "prepareToShow", "prepareToHide", "show", "hide", "reposition" ], 
        m = 0, o = r.length; o > m; m++) h = r[m], this.bound[h] = function(a) {
            return function() {
                return t[a].apply(t, arguments);
            };
        }(h);
        this.adapter.domReady(function() {
            return t.activate(), "creation" === t.options.showOn ? t.prepareToShow() : void 0;
        });
    }
    return a.prototype.STICKS_OUT_TOP = 1, a.prototype.STICKS_OUT_BOTTOM = 2, a.prototype.STICKS_OUT_LEFT = 1, 
    a.prototype.STICKS_OUT_RIGHT = 2, a.prototype["class"] = {
        container: "opentip-container",
        opentip: "opentip",
        header: "ot-header",
        content: "ot-content",
        loadingIndicator: "ot-loading-indicator",
        close: "ot-close",
        goingToHide: "ot-going-to-hide",
        hidden: "ot-hidden",
        hiding: "ot-hiding",
        goingToShow: "ot-going-to-show",
        showing: "ot-showing",
        visible: "ot-visible",
        loading: "ot-loading",
        ajaxError: "ot-ajax-error",
        fixed: "ot-fixed",
        showEffectPrefix: "ot-show-effect-",
        hideEffectPrefix: "ot-hide-effect-",
        stylePrefix: "style-"
    }, a.prototype._setup = function() {
        var a, b, c, d, e, f, g, h, i, j, k;
        for (this.debug("Setting up the tooltip."), this._buildContainer(), this.hideTriggers = [], 
        i = this.options.hideTriggers, d = e = 0, g = i.length; g > e; d = ++e) {
            if (b = i[d], c = null, a = this.options.hideOn instanceof Array ? this.options.hideOn[d] : this.options.hideOn, 
            "string" == typeof b) switch (b) {
              case "trigger":
                a = a || "mouseout", c = this.triggerElement;
                break;

              case "tip":
                a = a || "mouseover", c = this.container;
                break;

              case "target":
                a = a || "mouseover", c = this.options.target;
                break;

              case "closeButton":
                break;

              default:
                throw new Error("Unknown hide trigger: " + b + ".");
            } else a = a || "mouseover", c = this.adapter.wrap(b);
            c && this.hideTriggers.push({
                element: c,
                event: a,
                original: b
            });
        }
        for (j = this.hideTriggers, k = [], f = 0, h = j.length; h > f; f++) b = j[f], k.push(this.showTriggersWhenVisible.push({
            element: b.element,
            event: "mouseover"
        }));
        return k;
    }, a.prototype._buildContainer = function() {
        return this.container = this.adapter.create('<div id="opentip-' + this.id + '" class="' + this["class"].container + " " + this["class"].hidden + " " + this["class"].stylePrefix + this.options.className + '"></div>'), 
        this.adapter.css(this.container, {
            position: "absolute"
        }), this.options.ajax && this.adapter.addClass(this.container, this["class"].loading), 
        this.options.fixed && this.adapter.addClass(this.container, this["class"].fixed), 
        this.options.showEffect && this.adapter.addClass(this.container, "" + this["class"].showEffectPrefix + this.options.showEffect), 
        this.options.hideEffect ? this.adapter.addClass(this.container, "" + this["class"].hideEffectPrefix + this.options.hideEffect) : void 0;
    }, a.prototype._buildElements = function() {
        var a, b;
        return this.tooltipElement = this.adapter.create('<div class="' + this["class"].opentip + '"><div class="' + this["class"].header + '"></div><div class="' + this["class"].content + '"></div></div>'), 
        this.backgroundCanvas = this.adapter.wrap(document.createElement("canvas")), this.adapter.css(this.backgroundCanvas, {
            position: "absolute"
        }), "undefined" != typeof G_vmlCanvasManager && null !== G_vmlCanvasManager && G_vmlCanvasManager.initElement(this.adapter.unwrap(this.backgroundCanvas)), 
        a = this.adapter.find(this.tooltipElement, "." + this["class"].header), this.options.title && (b = this.adapter.create("<h1></h1>"), 
        this.adapter.update(b, this.options.title, this.options.escapeTitle), this.adapter.append(a, b)), 
        this.options.ajax && !this.loaded && this.adapter.append(this.tooltipElement, this.adapter.create('<div class="' + this["class"].loadingIndicator + '"><span>↻</span></div>')), 
        __indexOf.call(this.options.hideTriggers, "closeButton") >= 0 && (this.closeButtonElement = this.adapter.create('<a href="javascript:undefined;" class="' + this["class"].close + '"><span>Close</span></a>'), 
        this.adapter.append(a, this.closeButtonElement)), this.adapter.append(this.container, this.backgroundCanvas), 
        this.adapter.append(this.container, this.tooltipElement), this.adapter.append(document.body, this.container), 
        this._newContent = !0, this.redraw = !0;
    }, a.prototype.setContent = function(a) {
        return this.content = a, this._newContent = !0, "function" == typeof this.content ? (this._contentFunction = this.content, 
        this.content = "") : this._contentFunction = null, this.visible ? this._updateElementContent() : void 0;
    }, a.prototype._updateElementContent = function() {
        var a;
        return (this._newContent || !this.options.cache && this._contentFunction) && (a = this.adapter.find(this.container, "." + this["class"].content), 
        null != a && (this._contentFunction && (this.debug("Executing content function."), 
        this.content = this._contentFunction(this)), this.adapter.update(a, this.content, this.options.escapeContent)), 
        this._newContent = !1), this._storeAndLockDimensions(), this.reposition();
    }, a.prototype._storeAndLockDimensions = function() {
        var a;
        if (this.container) return a = this.dimensions, this.adapter.css(this.container, {
            width: "auto",
            left: "0px",
            top: "0px"
        }), this.dimensions = this.adapter.dimensions(this.container), this.dimensions.width += 1, 
        this.adapter.css(this.container, {
            width: "" + this.dimensions.width + "px",
            top: "" + this.currentPosition.top + "px",
            left: "" + this.currentPosition.left + "px"
        }), this._dimensionsEqual(this.dimensions, a) ? void 0 : (this.redraw = !0, this._draw());
    }, a.prototype.activate = function() {
        return this._setupObservers("hidden", "hiding");
    }, a.prototype.deactivate = function() {
        return this.debug("Deactivating tooltip."), this.hide(), this._setupObservers("-showing", "-visible", "-hidden", "-hiding");
    }, a.prototype._setupObservers = function() {
        var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q = this;
        for (d = 1 <= arguments.length ? __slice.call(arguments, 0) : [], f = 0, j = d.length; j > f; f++) if (c = d[f], 
        b = !1, "-" === c.charAt(0) && (b = !0, c = c.substr(1)), this.currentObservers[c] !== !b) switch (this.currentObservers[c] = !b, 
        a = function() {
            var a, c, d;
            return a = 1 <= arguments.length ? __slice.call(arguments, 0) : [], b ? (c = q.adapter).stopObserving.apply(c, a) : (d = q.adapter).observe.apply(d, a);
        }, c) {
          case "showing":
            for (n = this.hideTriggers, g = 0, k = n.length; k > g; g++) e = n[g], a(e.element, e.event, this.bound.prepareToHide);
            a(null != document.onresize ? document : window, "resize", this.bound.reposition), 
            a(window, "scroll", this.bound.reposition);
            break;

          case "visible":
            for (o = this.showTriggersWhenVisible, h = 0, l = o.length; l > h; h++) e = o[h], 
            a(e.element, e.event, this.bound.prepareToShow);
            break;

          case "hiding":
            for (p = this.showTriggers, i = 0, m = p.length; m > i; i++) e = p[i], a(e.element, e.event, this.bound.prepareToShow);
            break;

          case "hidden":
            break;

          default:
            throw new Error("Unknown state: " + c);
        }
        return null;
    }, a.prototype.prepareToShow = function() {
        return this._abortHiding(), this._abortShowing(), this.visible ? void 0 : (this.debug("Showing in " + this.options.delay + "s."), 
        null == this.container && this._setup(), this.options.group && a._abortShowingGroup(this.options.group, this), 
        this.preparingToShow = !0, this._setupObservers("-hidden", "-hiding", "showing"), 
        this._followMousePosition(), this.options.fixed && !this.options.target && (this.initialMousePosition = mousePosition), 
        this.reposition(), this._showTimeoutId = this.setTimeout(this.bound.show, this.options.delay || 0));
    }, a.prototype.show = function() {
        var b = this;
        return this._abortHiding(), this.visible ? void 0 : (this._clearTimeouts(), this._triggerElementExists() ? (this.debug("Showing now."), 
        null == this.container && this._setup(), this.options.group && a._hideGroup(this.options.group, this), 
        this.visible = !0, this.preparingToShow = !1, null == this.tooltipElement && this._buildElements(), 
        this._updateElementContent(), !this.options.ajax || this.loaded && this.options.cache || this._loadAjax(), 
        this._searchAndActivateCloseButtons(), this._startEnsureTriggerElement(), this.adapter.css(this.container, {
            zIndex: a.lastZIndex++
        }), this._setupObservers("-hidden", "-hiding", "-showing", "-visible", "showing", "visible"), 
        this.options.fixed && !this.options.target && (this.initialMousePosition = mousePosition), 
        this.reposition(), this.adapter.removeClass(this.container, this["class"].hiding), 
        this.adapter.removeClass(this.container, this["class"].hidden), this.adapter.addClass(this.container, this["class"].goingToShow), 
        this.setCss3Style(this.container, {
            transitionDuration: "0s"
        }), this.defer(function() {
            var a;
            if (b.visible && !b.preparingToHide) return b.adapter.removeClass(b.container, b["class"].goingToShow), 
            b.adapter.addClass(b.container, b["class"].showing), a = 0, b.options.showEffect && b.options.showEffectDuration && (a = b.options.showEffectDuration), 
            b.setCss3Style(b.container, {
                transitionDuration: "" + a + "s"
            }), b._visibilityStateTimeoutId = b.setTimeout(function() {
                return b.adapter.removeClass(b.container, b["class"].showing), b.adapter.addClass(b.container, b["class"].visible);
            }, a), b._activateFirstInput();
        }), this._draw()) : this.deactivate());
    }, a.prototype._abortShowing = function() {
        return this.preparingToShow ? (this.debug("Aborting showing."), this._clearTimeouts(), 
        this._stopFollowingMousePosition(), this.preparingToShow = !1, this._setupObservers("-showing", "-visible", "hiding", "hidden")) : void 0;
    }, a.prototype.prepareToHide = function() {
        return this._abortShowing(), this._abortHiding(), this.visible ? (this.debug("Hiding in " + this.options.hideDelay + "s"), 
        this.preparingToHide = !0, this._setupObservers("-showing", "visible", "-hidden", "hiding"), 
        this._hideTimeoutId = this.setTimeout(this.bound.hide, this.options.hideDelay)) : void 0;
    }, a.prototype.hide = function() {
        var a = this;
        return this._abortShowing(), this.visible && (this._clearTimeouts(), this.debug("Hiding!"), 
        this.visible = !1, this.preparingToHide = !1, this._stopEnsureTriggerElement(), 
        this._setupObservers("-showing", "-visible", "-hiding", "-hidden", "hiding", "hidden"), 
        this.options.fixed || this._stopFollowingMousePosition(), this.container) ? (this.adapter.removeClass(this.container, this["class"].visible), 
        this.adapter.removeClass(this.container, this["class"].showing), this.adapter.addClass(this.container, this["class"].goingToHide), 
        this.setCss3Style(this.container, {
            transitionDuration: "0s"
        }), this.defer(function() {
            var b;
            return a.adapter.removeClass(a.container, a["class"].goingToHide), a.adapter.addClass(a.container, a["class"].hiding), 
            b = 0, a.options.hideEffect && a.options.hideEffectDuration && (b = a.options.hideEffectDuration), 
            a.setCss3Style(a.container, {
                transitionDuration: "" + b + "s"
            }), a._visibilityStateTimeoutId = a.setTimeout(function() {
                return a.adapter.removeClass(a.container, a["class"].hiding), a.adapter.addClass(a.container, a["class"].hidden), 
                a.setCss3Style(a.container, {
                    transitionDuration: "0s"
                }), a.options.removeElementsOnHide ? (a.debug("Removing HTML elements."), a.adapter.remove(a.container), 
                delete a.container, delete a.tooltipElement) : void 0;
            }, b);
        })) : void 0;
    }, a.prototype._abortHiding = function() {
        return this.preparingToHide ? (this.debug("Aborting hiding."), this._clearTimeouts(), 
        this.preparingToHide = !1, this._setupObservers("-hiding", "showing", "visible")) : void 0;
    }, a.prototype.reposition = function() {
        var a, b, c, d = this;
        return a = this.getPosition(), null == a || (b = this.options.stem, this.options.containInViewport && (c = this._ensureViewportContainment(a), 
        a = c.position, b = c.stem), this._positionsEqual(a, this.currentPosition)) ? void 0 : (this.options.stem && !b.eql(this.currentStem) && (this.redraw = !0), 
        this.currentPosition = a, this.currentStem = b, this._draw(), this.adapter.css(this.container, {
            left: "" + a.left + "px",
            top: "" + a.top + "px"
        }), this.defer(function() {
            var a, b;
            return a = d.adapter.unwrap(d.container), a.style.visibility = "hidden", b = a.offsetHeight, 
            a.style.visibility = "visible";
        }));
    }, a.prototype.getPosition = function(a, b, c) {
        var d, e, f, g, h, i, j, k, l;
        if (this.container) return null == a && (a = this.options.tipJoint), null == b && (b = this.options.targetJoint), 
        g = {}, this.options.target ? (j = this.adapter.offset(this.options.target), i = this.adapter.dimensions(this.options.target), 
        g = j, b.right ? (k = this.adapter.unwrap(this.options.target), null != k.getBoundingClientRect ? g.left = k.getBoundingClientRect().right + (null != (l = window.pageXOffset) ? l : document.body.scrollLeft) : g.left += i.width) : b.center && (g.left += Math.round(i.width / 2)), 
        b.bottom ? g.top += i.height : b.middle && (g.top += Math.round(i.height / 2)), 
        this.options.borderWidth && (this.options.tipJoint.left && (g.left += this.options.borderWidth), 
        this.options.tipJoint.right && (g.left -= this.options.borderWidth), this.options.tipJoint.top ? g.top += this.options.borderWidth : this.options.tipJoint.bottom && (g.top -= this.options.borderWidth))) : g = this.initialMousePosition ? {
            top: this.initialMousePosition.y,
            left: this.initialMousePosition.x
        } : {
            top: mousePosition.y,
            left: mousePosition.x
        }, this.options.autoOffset && (h = this.options.stem ? this.options.stemLength : 0, 
        f = h && this.options.fixed ? 2 : 10, d = a.middle && !this.options.fixed ? 15 : 0, 
        e = a.center && !this.options.fixed ? 15 : 0, a.right ? g.left -= f + d : a.left && (g.left += f + d), 
        a.bottom ? g.top -= f + e : a.top && (g.top += f + e), h && (null == c && (c = this.options.stem), 
        c.right ? g.left -= h : c.left && (g.left += h), c.bottom ? g.top -= h : c.top && (g.top += h))), 
        g.left += this.options.offset[0], g.top += this.options.offset[1], a.right ? g.left -= this.dimensions.width : a.center && (g.left -= Math.round(this.dimensions.width / 2)), 
        a.bottom ? g.top -= this.dimensions.height : a.middle && (g.top -= Math.round(this.dimensions.height / 2)), 
        g;
    }, a.prototype._ensureViewportContainment = function(b) {
        var c, d, e, f, g, h, i, j, k, l, m, n;
        if (i = this.options.stem, e = {
            position: b,
            stem: i
        }, !this.visible || !b) return e;
        if (j = this._sticksOut(b), !j[0] && !j[1]) return e;
        if (l = new a.Joint(this.options.tipJoint), this.options.targetJoint && (k = new a.Joint(this.options.targetJoint)), 
        h = this.adapter.scrollOffset(), m = this.adapter.viewportDimensions(), n = [ b.left - h[0], b.top - h[1] ], 
        c = !1, m.width >= this.dimensions.width && j[0]) switch (c = !0, j[0]) {
          case this.STICKS_OUT_LEFT:
            l.setHorizontal("left"), this.options.targetJoint && k.setHorizontal("right");
            break;

          case this.STICKS_OUT_RIGHT:
            l.setHorizontal("right"), this.options.targetJoint && k.setHorizontal("left");
        }
        if (m.height >= this.dimensions.height && j[1]) switch (c = !0, j[1]) {
          case this.STICKS_OUT_TOP:
            l.setVertical("top"), this.options.targetJoint && k.setVertical("bottom");
            break;

          case this.STICKS_OUT_BOTTOM:
            l.setVertical("bottom"), this.options.targetJoint && k.setVertical("top");
        }
        return c ? (this.options.stem && (i = l), b = this.getPosition(l, k, i), d = this._sticksOut(b), 
        f = !1, g = !1, d[0] && d[0] !== j[0] && (f = !0, l.setHorizontal(this.options.tipJoint.horizontal), 
        this.options.targetJoint && k.setHorizontal(this.options.targetJoint.horizontal)), 
        d[1] && d[1] !== j[1] && (g = !0, l.setVertical(this.options.tipJoint.vertical), 
        this.options.targetJoint && k.setVertical(this.options.targetJoint.vertical)), f && g ? e : ((f || g) && (this.options.stem && (i = l), 
        b = this.getPosition(l, k, i)), {
            position: b,
            stem: i
        })) : e;
    }, a.prototype._sticksOut = function(a) {
        var b, c, d, e;
        return c = this.adapter.scrollOffset(), e = this.adapter.viewportDimensions(), b = [ a.left - c[0], a.top - c[1] ], 
        d = [ !1, !1 ], b[0] < 0 ? d[0] = this.STICKS_OUT_LEFT : b[0] + this.dimensions.width > e.width && (d[0] = this.STICKS_OUT_RIGHT), 
        b[1] < 0 ? d[1] = this.STICKS_OUT_TOP : b[1] + this.dimensions.height > e.height && (d[1] = this.STICKS_OUT_BOTTOM), 
        d;
    }, a.prototype._draw = function() {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = this;
        if (this.backgroundCanvas && this.redraw) {
            if (this.debug("Drawing background."), this.redraw = !1, this.currentStem) {
                for (r = [ "top", "right", "bottom", "left" ], p = 0, q = r.length; q > p; p++) m = r[p], 
                this.adapter.removeClass(this.container, "stem-" + m);
                this.adapter.addClass(this.container, "stem-" + this.currentStem.horizontal), this.adapter.addClass(this.container, "stem-" + this.currentStem.vertical);
            }
            return g = [ 0, 0 ], h = [ 0, 0 ], __indexOf.call(this.options.hideTriggers, "closeButton") >= 0 && (f = new a.Joint("top right" === (null != (s = this.currentStem) ? s.toString() : void 0) ? "top left" : "top right"), 
            g = [ this.options.closeButtonRadius + this.options.closeButtonOffset[0], this.options.closeButtonRadius + this.options.closeButtonOffset[1] ], 
            h = [ this.options.closeButtonRadius - this.options.closeButtonOffset[0], this.options.closeButtonRadius - this.options.closeButtonOffset[1] ]), 
            d = this.adapter.clone(this.dimensions), e = [ 0, 0 ], this.options.borderWidth && (d.width += 2 * this.options.borderWidth, 
            d.height += 2 * this.options.borderWidth, e[0] -= this.options.borderWidth, e[1] -= this.options.borderWidth), 
            this.options.shadow && (d.width += 2 * this.options.shadowBlur, d.width += Math.max(0, this.options.shadowOffset[0] - 2 * this.options.shadowBlur), 
            d.height += 2 * this.options.shadowBlur, d.height += Math.max(0, this.options.shadowOffset[1] - 2 * this.options.shadowBlur), 
            e[0] -= Math.max(0, this.options.shadowBlur - this.options.shadowOffset[0]), e[1] -= Math.max(0, this.options.shadowBlur - this.options.shadowOffset[1])), 
            c = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }, this.currentStem && (this.currentStem.left ? c.left = this.options.stemLength : this.currentStem.right && (c.right = this.options.stemLength), 
            this.currentStem.top ? c.top = this.options.stemLength : this.currentStem.bottom && (c.bottom = this.options.stemLength)), 
            f && (f.left ? c.left = Math.max(c.left, h[0]) : f.right && (c.right = Math.max(c.right, h[0])), 
            f.top ? c.top = Math.max(c.top, h[1]) : f.bottom && (c.bottom = Math.max(c.bottom, h[1]))), 
            d.width += c.left + c.right, d.height += c.top + c.bottom, e[0] -= c.left, e[1] -= c.top, 
            this.currentStem && this.options.borderWidth && (t = this._getPathStemMeasures(this.options.stemBase, this.options.stemLength, this.options.borderWidth), 
            o = t.stemLength, n = t.stemBase), b = this.adapter.unwrap(this.backgroundCanvas), 
            b.width = d.width, b.height = d.height, this.adapter.css(this.backgroundCanvas, {
                width: "" + b.width + "px",
                height: "" + b.height + "px",
                left: "" + e[0] + "px",
                top: "" + e[1] + "px"
            }), i = b.getContext("2d"), i.setTransform(1, 0, 0, 1, 0, 0), i.clearRect(0, 0, b.width, b.height), 
            i.beginPath(), i.fillStyle = this._getColor(i, this.dimensions, this.options.background, this.options.backgroundGradientHorizontal), 
            i.lineJoin = "miter", i.miterLimit = 500, l = this.options.borderWidth / 2, this.options.borderWidth ? (i.strokeStyle = this.options.borderColor, 
            i.lineWidth = this.options.borderWidth) : (o = this.options.stemLength, n = this.options.stemBase), 
            null == n && (n = 0), k = function(a, b, c) {
                return c && i.moveTo(Math.max(n, u.options.borderRadius, g[0]) + 1 - l, -l), b ? (i.lineTo(a / 2 - n / 2, -l), 
                i.lineTo(a / 2, -o - l), i.lineTo(a / 2 + n / 2, -l)) : void 0;
            }, j = function(a, b, c) {
                var d, e, f, h;
                return a ? (i.lineTo(-n + l, 0 - l), i.lineTo(o + l, -o - l), i.lineTo(l, n - l)) : b ? (h = u.options.closeButtonOffset, 
                f = g[0], c % 2 !== 0 && (h = [ h[1], h[0] ], f = g[1]), d = Math.acos(h[1] / u.options.closeButtonRadius), 
                e = Math.acos(h[0] / u.options.closeButtonRadius), i.lineTo(-f + l, -l), i.arc(l - h[0], -l + h[1], u.options.closeButtonRadius, -(Math.PI / 2 + d), e, !1)) : (i.lineTo(-u.options.borderRadius + l, -l), 
                i.quadraticCurveTo(l, -l, l, u.options.borderRadius - l));
            }, i.translate(-e[0], -e[1]), i.save(), function() {
                var b, c, d, e, g, h, l, m, n, o, p;
                for (p = [], c = n = 0, o = a.positions.length / 2; o >= 0 ? o > n : n > o; c = o >= 0 ? ++n : --n) g = 2 * c, 
                h = 0 === c || 3 === c ? 0 : u.dimensions.width, l = 2 > c ? 0 : u.dimensions.height, 
                m = Math.PI / 2 * c, d = c % 2 === 0 ? u.dimensions.width : u.dimensions.height, 
                e = new a.Joint(a.positions[g]), b = new a.Joint(a.positions[g + 1]), i.save(), 
                i.translate(h, l), i.rotate(m), k(d, e.eql(u.currentStem), 0 === c), i.translate(d, 0), 
                j(b.eql(u.currentStem), b.eql(f), c), p.push(i.restore());
                return p;
            }(), i.closePath(), i.save(), this.options.shadow && (i.shadowColor = this.options.shadowColor, 
            i.shadowBlur = this.options.shadowBlur, i.shadowOffsetX = this.options.shadowOffset[0], 
            i.shadowOffsetY = this.options.shadowOffset[1]), i.fill(), i.restore(), this.options.borderWidth && i.stroke(), 
            i.restore(), f ? function() {
                var a, b, c, d, e;
                return c = b = 2 * u.options.closeButtonRadius, "top right" === f.toString() ? (e = [ u.dimensions.width - u.options.closeButtonOffset[0], u.options.closeButtonOffset[1] ], 
                a = [ e[0] + l, e[1] - l ]) : (e = [ u.options.closeButtonOffset[0], u.options.closeButtonOffset[1] ], 
                a = [ e[0] - l, e[1] - l ]), i.translate(a[0], a[1]), d = u.options.closeButtonCrossSize / 2, 
                i.save(), i.beginPath(), i.strokeStyle = u.options.closeButtonCrossColor, i.lineWidth = u.options.closeButtonCrossLineWidth, 
                i.lineCap = "round", i.moveTo(-d, -d), i.lineTo(d, d), i.stroke(), i.beginPath(), 
                i.moveTo(d, -d), i.lineTo(-d, d), i.stroke(), i.restore(), u.adapter.css(u.closeButtonElement, {
                    left: "" + (e[0] - d - u.options.closeButtonLinkOverscan) + "px",
                    top: "" + (e[1] - d - u.options.closeButtonLinkOverscan) + "px",
                    width: "" + (u.options.closeButtonCrossSize + 2 * u.options.closeButtonLinkOverscan) + "px",
                    height: "" + (u.options.closeButtonCrossSize + 2 * u.options.closeButtonLinkOverscan) + "px"
                });
            }() : void 0;
        }
    }, a.prototype._getPathStemMeasures = function(a, b, c) {
        var d, e, f, g, h, i, j;
        if (g = c / 2, f = Math.atan(a / 2 / b), d = 2 * f, h = g / Math.sin(d), e = 2 * h * Math.cos(f), 
        j = g + b - e, 0 > j) throw new Error("Sorry but your stemLength / stemBase ratio is strange.");
        return i = Math.tan(f) * j * 2, {
            stemLength: j,
            stemBase: i
        };
    }, a.prototype._getColor = function(a, b, c, d) {
        var e, f, g, h, i;
        if (null == d && (d = !1), "string" == typeof c) return c;
        for (f = d ? a.createLinearGradient(0, 0, b.width, 0) : a.createLinearGradient(0, 0, 0, b.height), 
        g = h = 0, i = c.length; i > h; g = ++h) e = c[g], f.addColorStop(e[0], e[1]);
        return f;
    }, a.prototype._searchAndActivateCloseButtons = function() {
        var a, b, c, d;
        for (d = this.adapter.findAll(this.container, "." + this["class"].close), b = 0, 
        c = d.length; c > b; b++) a = d[b], this.hideTriggers.push({
            element: this.adapter.wrap(a),
            event: "click"
        });
        return this.currentObservers.showing && this._setupObservers("-showing", "showing"), 
        this.currentObservers.visible ? this._setupObservers("-visible", "visible") : void 0;
    }, a.prototype._activateFirstInput = function() {
        var a;
        return a = this.adapter.unwrap(this.adapter.find(this.container, "input, textarea")), 
        null != a ? "function" == typeof a.focus ? a.focus() : void 0 : void 0;
    }, a.prototype._followMousePosition = function() {
        return this.options.fixed ? void 0 : a._observeMousePosition(this.bound.reposition);
    }, a.prototype._stopFollowingMousePosition = function() {
        return this.options.fixed ? void 0 : a._stopObservingMousePosition(this.bound.reposition);
    }, a.prototype._clearShowTimeout = function() {
        return clearTimeout(this._showTimeoutId);
    }, a.prototype._clearHideTimeout = function() {
        return clearTimeout(this._hideTimeoutId);
    }, a.prototype._clearTimeouts = function() {
        return clearTimeout(this._visibilityStateTimeoutId), this._clearShowTimeout(), this._clearHideTimeout();
    }, a.prototype._triggerElementExists = function() {
        var a;
        for (a = this.adapter.unwrap(this.triggerElement); a.parentNode; ) {
            if ("BODY" === a.parentNode.tagName) return !0;
            a = a.parentNode;
        }
        return !1;
    }, a.prototype._loadAjax = function() {
        var a = this;
        if (!this.loading) return this.loaded = !1, this.loading = !0, this.adapter.addClass(this.container, this["class"].loading), 
        this.setContent(""), this.debug("Loading content from " + this.options.ajax), this.adapter.ajax({
            url: this.options.ajax,
            method: this.options.ajaxMethod,
            onSuccess: function(b) {
                return a.debug("Loading successful."), a.adapter.removeClass(a.container, a["class"].loading), 
                a.setContent(b);
            },
            onError: function(b) {
                var c;
                return c = a.options.ajaxErrorMessage, a.debug(c, b), a.setContent(c), a.adapter.addClass(a.container, a["class"].ajaxError);
            },
            onComplete: function() {
                return a.adapter.removeClass(a.container, a["class"].loading), a.loading = !1, a.loaded = !0, 
                a._searchAndActivateCloseButtons(), a._activateFirstInput(), a.reposition();
            }
        });
    }, a.prototype._ensureTriggerElement = function() {
        return this._triggerElementExists() ? void 0 : (this.deactivate(), this._stopEnsureTriggerElement());
    }, a.prototype._ensureTriggerElementInterval = 1e3, a.prototype._startEnsureTriggerElement = function() {
        var a = this;
        return this._ensureTriggerElementTimeoutId = setInterval(function() {
            return a._ensureTriggerElement();
        }, this._ensureTriggerElementInterval);
    }, a.prototype._stopEnsureTriggerElement = function() {
        return clearInterval(this._ensureTriggerElementTimeoutId);
    }, a;
}(), vendors = [ "khtml", "ms", "o", "moz", "webkit" ], Opentip.prototype.setCss3Style = function(a, b) {
    var c, d, e, f, g;
    a = this.adapter.unwrap(a), g = [];
    for (c in b) __hasProp.call(b, c) && (d = b[c], null != a.style[c] ? g.push(a.style[c] = d) : g.push(function() {
        var b, g, h;
        for (h = [], b = 0, g = vendors.length; g > b; b++) e = vendors[b], f = "" + this.ucfirst(e) + this.ucfirst(c), 
        null != a.style[f] ? h.push(a.style[f] = d) : h.push(void 0);
        return h;
    }.call(this)));
    return g;
}, Opentip.prototype.defer = function(a) {
    return setTimeout(a, 0);
}, Opentip.prototype.setTimeout = function(a, b) {
    return setTimeout(a, b ? 1e3 * b : 0);
}, Opentip.prototype.ucfirst = function(a) {
    return null == a ? "" : a.charAt(0).toUpperCase() + a.slice(1);
}, Opentip.prototype.dasherize = function(a) {
    return a.replace(/([A-Z])/g, function(a, b) {
        return "-" + b.toLowerCase();
    });
}, mousePositionObservers = [], mousePosition = {
    x: 0,
    y: 0
}, mouseMoved = function(a) {
    var b, c, d, e;
    for (mousePosition = Opentip.adapter.mousePosition(a), e = [], c = 0, d = mousePositionObservers.length; d > c; c++) b = mousePositionObservers[c], 
    e.push(b());
    return e;
}, Opentip.followMousePosition = function() {
    return Opentip.adapter.observe(document.body, "mousemove", mouseMoved);
}, Opentip._observeMousePosition = function(a) {
    return mousePositionObservers.push(a);
}, Opentip._stopObservingMousePosition = function(a) {
    var b;
    return mousePositionObservers = function() {
        var c, d, e;
        for (e = [], c = 0, d = mousePositionObservers.length; d > c; c++) b = mousePositionObservers[c], 
        b !== a && e.push(b);
        return e;
    }();
}, Opentip.Joint = function() {
    function a(a) {
        null != a && (a instanceof Opentip.Joint && (a = a.toString()), this.set(a));
    }
    return a.prototype.set = function(a) {
        return a = a.toLowerCase(), this.setHorizontal(a), this.setVertical(a), this;
    }, a.prototype.setHorizontal = function(a) {
        var b, c, d, e, f, g, h;
        for (c = [ "left", "center", "right" ], d = 0, f = c.length; f > d; d++) b = c[d], 
        ~a.indexOf(b) && (this.horizontal = b.toLowerCase());
        for (null == this.horizontal && (this.horizontal = "center"), h = [], e = 0, g = c.length; g > e; e++) b = c[e], 
        h.push(this[b] = this.horizontal === b ? b : void 0);
        return h;
    }, a.prototype.setVertical = function(a) {
        var b, c, d, e, f, g, h;
        for (c = [ "top", "middle", "bottom" ], d = 0, f = c.length; f > d; d++) b = c[d], 
        ~a.indexOf(b) && (this.vertical = b.toLowerCase());
        for (null == this.vertical && (this.vertical = "middle"), h = [], e = 0, g = c.length; g > e; e++) b = c[e], 
        h.push(this[b] = this.vertical === b ? b : void 0);
        return h;
    }, a.prototype.eql = function(a) {
        return null != a && this.horizontal === a.horizontal && this.vertical === a.vertical;
    }, a.prototype.flip = function() {
        var a, b;
        return b = Opentip.position[this.toString(!0)], a = (b + 4) % 8, this.set(Opentip.positions[a]), 
        this;
    }, a.prototype.toString = function(a) {
        var b, c;
        return null == a && (a = !1), c = "middle" === this.vertical ? "" : this.vertical, 
        b = "center" === this.horizontal ? "" : this.horizontal, c && b && (b = a ? Opentip.prototype.ucfirst(b) : " " + b), 
        "" + c + b;
    }, a;
}(), Opentip.prototype._positionsEqual = function(a, b) {
    return null != a && null != b && a.left === b.left && a.top === b.top;
}, Opentip.prototype._dimensionsEqual = function(a, b) {
    return null != a && null != b && a.width === b.width && a.height === b.height;
}, Opentip.prototype.debug = function() {
    var a;
    return a = 1 <= arguments.length ? __slice.call(arguments, 0) : [], Opentip.debug && null != ("undefined" != typeof console && null !== console ? console.debug : void 0) ? (a.unshift("#" + this.id + " |"), 
    console.debug.apply(console, a)) : void 0;
}, Opentip.findElements = function() {
    var a, b, c, d, e, f, g, h, i, j;
    for (a = Opentip.adapter, i = a.findAll(document.body, "[data-ot]"), j = [], g = 0, 
    h = i.length; h > g; g++) {
        c = i[g], f = {}, b = a.data(c, "ot"), ("" === b || "true" === b || "yes" === b) && (b = a.attr(c, "title"), 
        a.attr(c, "title", "")), b = b || "";
        for (d in Opentip.styles.standard) e = a.data(c, "ot" + Opentip.prototype.ucfirst(d)), 
        null != e && ("yes" === e || "true" === e || "on" === e ? e = !0 : ("no" === e || "false" === e || "off" === e) && (e = !1), 
        f[d] = e);
        j.push(new Opentip(c, b, f));
    }
    return j;
}, Opentip.version = "2.4.6", Opentip.debug = !1, Opentip.lastId = 0, Opentip.lastZIndex = 100, 
Opentip.tips = [], Opentip._abortShowingGroup = function(a, b) {
    var c, d, e, f, g;
    for (f = Opentip.tips, g = [], d = 0, e = f.length; e > d; d++) c = f[d], c !== b && c.options.group === a ? g.push(c._abortShowing()) : g.push(void 0);
    return g;
}, Opentip._hideGroup = function(a, b) {
    var c, d, e, f, g;
    for (f = Opentip.tips, g = [], d = 0, e = f.length; e > d; d++) c = f[d], c !== b && c.options.group === a ? g.push(c.hide()) : g.push(void 0);
    return g;
}, Opentip.adapters = {}, Opentip.adapter = null, firstAdapter = !0, Opentip.addAdapter = function(a) {
    return Opentip.adapters[a.name] = a, firstAdapter ? (Opentip.adapter = a, a.domReady(Opentip.findElements), 
    a.domReady(Opentip.followMousePosition), firstAdapter = !1) : void 0;
}, Opentip.positions = [ "top", "topRight", "right", "bottomRight", "bottom", "bottomLeft", "left", "topLeft" ], 
Opentip.position = {}, _ref = Opentip.positions, i = _i = 0, _len = _ref.length; _len > _i; i = ++_i) position = _ref[i], 
Opentip.position[position] = i;

Opentip.styles = {
    standard: {
        "extends": null,
        title: void 0,
        escapeTitle: !0,
        escapeContent: !1,
        className: "standard",
        stem: !0,
        delay: null,
        hideDelay: .1,
        fixed: !1,
        showOn: "mouseover",
        hideTrigger: "trigger",
        hideTriggers: [],
        hideOn: null,
        removeElementsOnHide: !1,
        offset: [ 0, 0 ],
        containInViewport: !0,
        autoOffset: !0,
        showEffect: "appear",
        hideEffect: "fade",
        showEffectDuration: .3,
        hideEffectDuration: .2,
        stemLength: 5,
        stemBase: 8,
        tipJoint: "top left",
        target: null,
        targetJoint: null,
        cache: !0,
        ajax: !1,
        ajaxMethod: "GET",
        ajaxErrorMessage: "There was a problem downloading the content.",
        group: null,
        style: null,
        background: "#fff18f",
        backgroundGradientHorizontal: !1,
        closeButtonOffset: [ 5, 5 ],
        closeButtonRadius: 7,
        closeButtonCrossSize: 4,
        closeButtonCrossColor: "#d2c35b",
        closeButtonCrossLineWidth: 1.5,
        closeButtonLinkOverscan: 6,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#f2e37b",
        shadow: !0,
        shadowBlur: 10,
        shadowOffset: [ 3, 3 ],
        shadowColor: "rgba(0, 0, 0, 0.1)"
    },
    glass: {
        "extends": "standard",
        className: "glass",
        background: [ [ 0, "rgba(252, 252, 252, 0.8)" ], [ .5, "rgba(255, 255, 255, 0.8)" ], [ .5, "rgba(250, 250, 250, 0.9)" ], [ 1, "rgba(245, 245, 245, 0.9)" ] ],
        borderColor: "#eee",
        closeButtonCrossColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: 15,
        closeButtonRadius: 10,
        closeButtonOffset: [ 8, 8 ]
    },
    dark: {
        "extends": "standard",
        className: "dark",
        borderRadius: 13,
        borderColor: "#444",
        closeButtonCrossColor: "rgba(240, 240, 240, 1)",
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOffset: [ 2, 2 ],
        background: [ [ 0, "rgba(30, 30, 30, 0.7)" ], [ .5, "rgba(30, 30, 30, 0.8)" ], [ .5, "rgba(10, 10, 10, 0.8)" ], [ 1, "rgba(10, 10, 10, 0.9)" ] ]
    },
    alert: {
        "extends": "standard",
        className: "alert",
        borderRadius: 1,
        borderColor: "#AE0D11",
        closeButtonCrossColor: "rgba(255, 255, 255, 1)",
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOffset: [ 2, 2 ],
        background: [ [ 0, "rgba(203, 15, 19, 0.7)" ], [ .5, "rgba(203, 15, 19, 0.8)" ], [ .5, "rgba(189, 14, 18, 0.8)" ], [ 1, "rgba(179, 14, 17, 0.9)" ] ]
    }
}, Opentip.defaultStyle = "standard", "undefined" != typeof module && null !== module ? module.exports = Opentip : window.Opentip = Opentip;

var __slice = [].slice;

!function(a) {
    var b;
    return a.fn.opentip = function(a, b, c) {
        return new Opentip(this, a, b, c);
    }, b = function() {
        function b() {}
        return b.prototype.name = "jquery", b.prototype.domReady = function(b) {
            return a(b);
        }, b.prototype.create = function(b) {
            return a(b);
        }, b.prototype.wrap = function(b) {
            if (b = a(b), b.length > 1) throw new Error("Multiple elements provided.");
            return b;
        }, b.prototype.unwrap = function(b) {
            return a(b)[0];
        }, b.prototype.tagName = function(a) {
            return this.unwrap(a).tagName;
        }, b.prototype.attr = function() {
            var b, c, d;
            return c = arguments[0], b = 2 <= arguments.length ? __slice.call(arguments, 1) : [], 
            (d = a(c)).attr.apply(d, b);
        }, b.prototype.data = function() {
            var b, c, d;
            return c = arguments[0], b = 2 <= arguments.length ? __slice.call(arguments, 1) : [], 
            (d = a(c)).data.apply(d, b);
        }, b.prototype.find = function(b, c) {
            return a(b).find(c).get(0);
        }, b.prototype.findAll = function(b, c) {
            return a(b).find(c);
        }, b.prototype.update = function(b, c, d) {
            return b = a(b), d ? b.text(c) : b.html(c);
        }, b.prototype.append = function(b, c) {
            return a(b).append(c);
        }, b.prototype.remove = function(b) {
            return a(b).remove();
        }, b.prototype.addClass = function(b, c) {
            return a(b).addClass(c);
        }, b.prototype.removeClass = function(b, c) {
            return a(b).removeClass(c);
        }, b.prototype.css = function(b, c) {
            return a(b).css(c);
        }, b.prototype.dimensions = function(b) {
            return {
                width: a(b).outerWidth(),
                height: a(b).outerHeight()
            };
        }, b.prototype.scrollOffset = function() {
            return [ window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop ];
        }, b.prototype.viewportDimensions = function() {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            };
        }, b.prototype.mousePosition = function(a) {
            return null == a ? null : {
                x: a.pageX,
                y: a.pageY
            };
        }, b.prototype.offset = function(b) {
            var c;
            return c = a(b).offset(), {
                left: c.left,
                top: c.top
            };
        }, b.prototype.observe = function(b, c, d) {
            return a(b).bind(c, d);
        }, b.prototype.stopObserving = function(b, c, d) {
            return a(b).unbind(c, d);
        }, b.prototype.ajax = function(b) {
            var c, d;
            if (null == b.url) throw new Error("No url provided");
            return a.ajax({
                url: b.url,
                type: null != (c = null != (d = b.method) ? d.toUpperCase() : void 0) ? c : "GET"
            }).done(function(a) {
                return "function" == typeof b.onSuccess ? b.onSuccess(a) : void 0;
            }).fail(function(a) {
                return "function" == typeof b.onError ? b.onError("Server responded with status " + a.status) : void 0;
            }).always(function() {
                return "function" == typeof b.onComplete ? b.onComplete() : void 0;
            });
        }, b.prototype.clone = function(b) {
            return a.extend({}, b);
        }, b.prototype.extend = function() {
            var b, c;
            return c = arguments[0], b = 2 <= arguments.length ? __slice.call(arguments, 1) : [], 
            a.extend.apply(a, [ c ].concat(__slice.call(b)));
        }, b;
    }(), Opentip.addAdapter(new b());
}(jQuery);