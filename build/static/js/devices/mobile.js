!function(a) {
    String.prototype.trim === a && (String.prototype.trim = function() {
        return this.replace(/^\s+/, "").replace(/\s+$/, "");
    }), Array.prototype.reduce === a && (Array.prototype.reduce = function(b) {
        if (void 0 === this || null === this) throw new TypeError();
        var c, d = Object(this), e = d.length >>> 0, f = 0;
        if ("function" != typeof b) throw new TypeError();
        if (0 == e && 1 == arguments.length) throw new TypeError();
        if (arguments.length >= 2) c = arguments[1]; else for (;;) {
            if (f in d) {
                c = d[f++];
                break;
            }
            if (++f >= e) throw new TypeError();
        }
        for (;e > f; ) f in d && (c = b.call(a, c, d[f], f, d)), f++;
        return c;
    });
}();

var Zepto = function() {
    function a(a) {
        return "[object Function]" == M.call(a);
    }
    function b(a) {
        return a instanceof Object;
    }
    function c(b) {
        var c, d;
        if ("[object Object]" !== M.call(b)) return !1;
        if (d = a(b.constructor) && b.constructor.prototype, !d || !hasOwnProperty.call(d, "isPrototypeOf")) return !1;
        for (c in b) ;
        return c === p || hasOwnProperty.call(b, c);
    }
    function d(a) {
        return a instanceof Array;
    }
    function e(a) {
        return "number" == typeof a.length;
    }
    function f(a) {
        return a.filter(function(a) {
            return a !== p && null !== a;
        });
    }
    function g(a) {
        return a.length > 0 ? [].concat.apply([], a) : a;
    }
    function h(a) {
        return a.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase();
    }
    function i(a) {
        return a in z ? z[a] : z[a] = new RegExp("(^|\\s)" + a + "(\\s|$)");
    }
    function j(a, b) {
        return "number" != typeof b || B[h(a)] ? b : b + "px";
    }
    function k(a) {
        var b, c;
        return y[a] || (b = x.createElement(a), x.body.appendChild(b), c = A(b, "").getPropertyValue("display"), 
        b.parentNode.removeChild(b), "none" == c && (c = "block"), y[a] = c), y[a];
    }
    function l(a, b) {
        return b === p ? r(a) : r(a).filter(b);
    }
    function m(b, c, d, e) {
        return a(c) ? c.call(b, d, e) : c;
    }
    function n(a, b, c) {
        var d = a % 2 ? b : b.parentNode;
        d ? d.insertBefore(c, a ? 1 == a ? d.firstChild : 2 == a ? b : null : b.nextSibling) : r(c).remove();
    }
    function o(a, b) {
        b(a);
        for (var c in a.childNodes) o(a.childNodes[c], b);
    }
    var p, q, r, s, t, u, v = [], w = v.slice, x = window.document, y = {}, z = {}, A = x.defaultView.getComputedStyle, B = {
        "column-count": 1,
        columns: 1,
        "font-weight": 1,
        "line-height": 1,
        opacity: 1,
        "z-index": 1,
        zoom: 1
    }, C = /^\s*<(\w+|!)[^>]*>/, D = [ 1, 3, 8, 9, 11 ], E = [ "after", "prepend", "before", "append" ], F = x.createElement("table"), G = x.createElement("tr"), H = {
        tr: x.createElement("tbody"),
        tbody: F,
        thead: F,
        tfoot: F,
        td: G,
        th: G,
        "*": x.createElement("div")
    }, I = /complete|loaded|interactive/, J = /^\.([\w-]+)$/, K = /^#([\w-]+)$/, L = /^[\w-]+$/, M = {}.toString, N = {}, O = x.createElement("div");
    return N.matches = function(a, b) {
        if (!a || 1 !== a.nodeType) return !1;
        var c = a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.matchesSelector;
        if (c) return c.call(a, b);
        var d, e = a.parentNode, f = !e;
        return f && (e = O).appendChild(a), d = ~N.qsa(e, b).indexOf(a), f && O.removeChild(a), 
        d;
    }, t = function(a) {
        return a.replace(/-+(.)?/g, function(a, b) {
            return b ? b.toUpperCase() : "";
        });
    }, u = function(a) {
        return a.filter(function(b, c) {
            return a.indexOf(b) == c;
        });
    }, N.fragment = function(a, b) {
        b === p && (b = C.test(a) && RegExp.$1), b in H || (b = "*");
        var c = H[b];
        return c.innerHTML = "" + a, r.each(w.call(c.childNodes), function() {
            c.removeChild(this);
        });
    }, N.Z = function(a, b) {
        return a = a || [], a.__proto__ = arguments.callee.prototype, a.selector = b || "", 
        a;
    }, N.isZ = function(a) {
        return a instanceof N.Z;
    }, N.init = function(b, e) {
        if (!b) return N.Z();
        if (a(b)) return r(x).ready(b);
        if (N.isZ(b)) return b;
        var g;
        if (d(b)) g = f(b); else if (c(b)) g = [ r.extend({}, b) ], b = null; else if (D.indexOf(b.nodeType) >= 0 || b === window) g = [ b ], 
        b = null; else if (C.test(b)) g = N.fragment(b.trim(), RegExp.$1), b = null; else {
            if (e !== p) return r(e).find(b);
            g = N.qsa(x, b);
        }
        return N.Z(g, b);
    }, r = function(a, b) {
        return N.init(a, b);
    }, r.extend = function(a) {
        return w.call(arguments, 1).forEach(function(b) {
            for (q in b) b[q] !== p && (a[q] = b[q]);
        }), a;
    }, N.qsa = function(a, b) {
        var c;
        return a === x && K.test(b) ? (c = a.getElementById(RegExp.$1)) ? [ c ] : v : 1 !== a.nodeType && 9 !== a.nodeType ? v : w.call(J.test(b) ? a.getElementsByClassName(RegExp.$1) : L.test(b) ? a.getElementsByTagName(b) : a.querySelectorAll(b));
    }, r.isFunction = a, r.isObject = b, r.isArray = d, r.isPlainObject = c, r.inArray = function(a, b, c) {
        return v.indexOf.call(b, a, c);
    }, r.trim = function(a) {
        return a.trim();
    }, r.uuid = 0, r.map = function(a, b) {
        var c, d, f, h = [];
        if (e(a)) for (d = 0; d < a.length; d++) c = b(a[d], d), null != c && h.push(c); else for (f in a) c = b(a[f], f), 
        null != c && h.push(c);
        return g(h);
    }, r.each = function(a, b) {
        var c, d;
        if (e(a)) {
            for (c = 0; c < a.length; c++) if (b.call(a[c], c, a[c]) === !1) return a;
        } else for (d in a) if (b.call(a[d], d, a[d]) === !1) return a;
        return a;
    }, r.fn = {
        forEach: v.forEach,
        reduce: v.reduce,
        push: v.push,
        indexOf: v.indexOf,
        concat: v.concat,
        map: function(a) {
            return r.map(this, function(b, c) {
                return a.call(b, c, b);
            });
        },
        slice: function() {
            return r(w.apply(this, arguments));
        },
        ready: function(a) {
            return I.test(x.readyState) ? a(r) : x.addEventListener("DOMContentLoaded", function() {
                a(r);
            }, !1), this;
        },
        get: function(a) {
            return a === p ? w.call(this) : this[a];
        },
        toArray: function() {
            return this.get();
        },
        size: function() {
            return this.length;
        },
        remove: function() {
            return this.each(function() {
                null != this.parentNode && this.parentNode.removeChild(this);
            });
        },
        each: function(a) {
            return this.forEach(function(b, c) {
                a.call(b, c, b);
            }), this;
        },
        filter: function(a) {
            return r([].filter.call(this, function(b) {
                return N.matches(b, a);
            }));
        },
        add: function(a, b) {
            return r(u(this.concat(r(a, b))));
        },
        is: function(a) {
            return this.length > 0 && N.matches(this[0], a);
        },
        not: function(b) {
            var c = [];
            if (a(b) && b.call !== p) this.each(function(a) {
                b.call(this, a) || c.push(this);
            }); else {
                var d = "string" == typeof b ? this.filter(b) : e(b) && a(b.item) ? w.call(b) : r(b);
                this.forEach(function(a) {
                    d.indexOf(a) < 0 && c.push(a);
                });
            }
            return r(c);
        },
        eq: function(a) {
            return -1 === a ? this.slice(a) : this.slice(a, +a + 1);
        },
        first: function() {
            var a = this[0];
            return a && !b(a) ? a : r(a);
        },
        last: function() {
            var a = this[this.length - 1];
            return a && !b(a) ? a : r(a);
        },
        find: function(a) {
            var b;
            return b = 1 == this.length ? N.qsa(this[0], a) : this.map(function() {
                return N.qsa(this, a);
            }), r(b);
        },
        closest: function(a, b) {
            for (var c = this[0]; c && !N.matches(c, a); ) c = c !== b && c !== x && c.parentNode;
            return r(c);
        },
        parents: function(a) {
            for (var b = [], c = this; c.length > 0; ) c = r.map(c, function(a) {
                return (a = a.parentNode) && a !== x && b.indexOf(a) < 0 ? (b.push(a), a) : void 0;
            });
            return l(b, a);
        },
        parent: function(a) {
            return l(u(this.pluck("parentNode")), a);
        },
        children: function(a) {
            return l(this.map(function() {
                return w.call(this.children);
            }), a);
        },
        siblings: function(a) {
            return l(this.map(function(a, b) {
                return w.call(b.parentNode.children).filter(function(a) {
                    return a !== b;
                });
            }), a);
        },
        empty: function() {
            return this.each(function() {
                this.innerHTML = "";
            });
        },
        pluck: function(a) {
            return this.map(function() {
                return this[a];
            });
        },
        show: function() {
            return this.each(function() {
                "none" == this.style.display && (this.style.display = null), "none" == A(this, "").getPropertyValue("display") && (this.style.display = k(this.nodeName));
            });
        },
        replaceWith: function(a) {
            return this.before(a).remove();
        },
        wrap: function(a) {
            return this.each(function() {
                r(this).wrapAll(r(a)[0].cloneNode(!1));
            });
        },
        wrapAll: function(a) {
            return this[0] && (r(this[0]).before(a = r(a)), a.append(this)), this;
        },
        unwrap: function() {
            return this.parent().each(function() {
                r(this).replaceWith(r(this).children());
            }), this;
        },
        clone: function() {
            return r(this.map(function() {
                return this.cloneNode(!0);
            }));
        },
        hide: function() {
            return this.css("display", "none");
        },
        toggle: function(a) {
            return (a === p ? "none" == this.css("display") : a) ? this.show() : this.hide();
        },
        prev: function() {
            return r(this.pluck("previousElementSibling"));
        },
        next: function() {
            return r(this.pluck("nextElementSibling"));
        },
        html: function(a) {
            return a === p ? this.length > 0 ? this[0].innerHTML : null : this.each(function(b) {
                var c = this.innerHTML;
                r(this).empty().append(m(this, a, b, c));
            });
        },
        text: function(a) {
            return a === p ? this.length > 0 ? this[0].textContent : null : this.each(function() {
                this.textContent = a;
            });
        },
        attr: function(a, c) {
            var d;
            return "string" == typeof a && c === p ? 0 == this.length || 1 !== this[0].nodeType ? p : "value" == a && "INPUT" == this[0].nodeName ? this.val() : !(d = this[0].getAttribute(a)) && a in this[0] ? this[0][a] : d : this.each(function(d) {
                if (1 === this.nodeType) if (b(a)) for (q in a) this.setAttribute(q, a[q]); else this.setAttribute(a, m(this, c, d, this.getAttribute(a)));
            });
        },
        removeAttr: function(a) {
            return this.each(function() {
                1 === this.nodeType && this.removeAttribute(a);
            });
        },
        prop: function(a, b) {
            return b === p ? this[0] ? this[0][a] : p : this.each(function(c) {
                this[a] = m(this, b, c, this[a]);
            });
        },
        data: function(a, b) {
            var c = this.attr("data-" + h(a), b);
            return null !== c ? c : p;
        },
        val: function(a) {
            return a === p ? this.length > 0 ? this[0].value : p : this.each(function(b) {
                this.value = m(this, a, b, this.value);
            });
        },
        offset: function() {
            if (0 == this.length) return null;
            var a = this[0].getBoundingClientRect();
            return {
                left: a.left + window.pageXOffset,
                top: a.top + window.pageYOffset,
                width: a.width,
                height: a.height
            };
        },
        css: function(a, b) {
            if (b === p && "string" == typeof a) return 0 == this.length ? p : this[0].style[t(a)] || A(this[0], "").getPropertyValue(a);
            var c = "";
            for (q in a) "string" == typeof a[q] && "" == a[q] ? this.each(function() {
                this.style.removeProperty(h(q));
            }) : c += h(q) + ":" + j(q, a[q]) + ";";
            return "string" == typeof a && ("" == b ? this.each(function() {
                this.style.removeProperty(h(a));
            }) : c = h(a) + ":" + j(a, b)), this.each(function() {
                this.style.cssText += ";" + c;
            });
        },
        index: function(a) {
            return a ? this.indexOf(r(a)[0]) : this.parent().children().indexOf(this[0]);
        },
        hasClass: function(a) {
            return this.length < 1 ? !1 : i(a).test(this[0].className);
        },
        addClass: function(a) {
            return this.each(function(b) {
                s = [];
                var c = this.className, d = m(this, a, b, c);
                d.split(/\s+/g).forEach(function(a) {
                    r(this).hasClass(a) || s.push(a);
                }, this), s.length && (this.className += (c ? " " : "") + s.join(" "));
            });
        },
        removeClass: function(a) {
            return this.each(function(b) {
                return a === p ? this.className = "" : (s = this.className, m(this, a, b, s).split(/\s+/g).forEach(function(a) {
                    s = s.replace(i(a), " ");
                }), this.className = s.trim(), void 0);
            });
        },
        toggleClass: function(a, b) {
            return this.each(function(c) {
                var d = m(this, a, c, this.className);
                (b === p ? !r(this).hasClass(d) : b) ? r(this).addClass(d) : r(this).removeClass(d);
            });
        }
    }, [ "width", "height" ].forEach(function(a) {
        r.fn[a] = function(b) {
            var c, d = a.replace(/./, function(a) {
                return a[0].toUpperCase();
            });
            return b === p ? this[0] == window ? window["inner" + d] : this[0] == x ? x.documentElement["offset" + d] : (c = this.offset()) && c[a] : this.each(function(c) {
                var d = r(this);
                d.css(a, m(this, b, c, d[a]()));
            });
        };
    }), E.forEach(function(a, c) {
        r.fn[a] = function() {
            var a = r.map(arguments, function(a) {
                return b(a) ? a : N.fragment(a);
            });
            if (a.length < 1) return this;
            var d = this.length, e = d > 1, f = 2 > c;
            return this.each(function(b, g) {
                for (var h = 0; h < a.length; h++) {
                    var i = a[f ? a.length - h - 1 : h];
                    o(i, function(a) {
                        null != a.nodeName && "SCRIPT" === a.nodeName.toUpperCase() && (!a.type || "text/javascript" === a.type) && window.eval.call(window, a.innerHTML);
                    }), e && d - 1 > b && (i = i.cloneNode(!0)), n(c, g, i);
                }
            });
        }, r.fn[c % 2 ? a + "To" : "insert" + (c ? "Before" : "After")] = function(b) {
            return r(b)[a](this), this;
        };
    }), N.Z.prototype = r.fn, N.camelize = t, N.uniq = u, r.zepto = N, r;
}();

window.Zepto = Zepto, "$" in window || (window.$ = Zepto), function(a) {
    function b(a) {
        return a._zid || (a._zid = l++);
    }
    function c(a, c, f, g) {
        if (c = d(c), c.ns) var h = e(c.ns);
        return (k[b(a)] || []).filter(function(a) {
            return !(!a || c.e && a.e != c.e || c.ns && !h.test(a.ns) || f && b(a.fn) !== b(f) || g && a.sel != g);
        });
    }
    function d(a) {
        var b = ("" + a).split(".");
        return {
            e: b[0],
            ns: b.slice(1).sort().join(" ")
        };
    }
    function e(a) {
        return new RegExp("(?:^| )" + a.replace(" ", " .* ?") + "(?: |$)");
    }
    function f(b, c, d) {
        a.isObject(b) ? a.each(b, d) : b.split(/\s/).forEach(function(a) {
            d(a, c);
        });
    }
    function g(c, e, g, h, i, j) {
        j = !!j;
        var l = b(c), m = k[l] || (k[l] = []);
        f(e, g, function(b, e) {
            var f = i && i(e, b), g = f || e, k = function(a) {
                var b = g.apply(c, [ a ].concat(a.data));
                return b === !1 && a.preventDefault(), b;
            }, l = a.extend(d(b), {
                fn: e,
                proxy: k,
                sel: h,
                del: f,
                i: m.length
            });
            m.push(l), c.addEventListener(l.e, k, j);
        });
    }
    function h(a, d, e, g) {
        var h = b(a);
        f(d || "", e, function(b, d) {
            c(a, b, d, g).forEach(function(b) {
                delete k[h][b.i], a.removeEventListener(b.e, b.proxy, !1);
            });
        });
    }
    function i(b) {
        var c = a.extend({
            originalEvent: b
        }, b);
        return a.each(p, function(a, d) {
            c[a] = function() {
                return this[d] = n, b[a].apply(b, arguments);
            }, c[d] = o;
        }), c;
    }
    function j(a) {
        if (!("defaultPrevented" in a)) {
            a.defaultPrevented = !1;
            var b = a.preventDefault;
            a.preventDefault = function() {
                this.defaultPrevented = !0, b.call(this);
            };
        }
    }
    var k = (a.zepto.qsa, {}), l = 1, m = {};
    m.click = m.mousedown = m.mouseup = m.mousemove = "MouseEvents", a.event = {
        add: g,
        remove: h
    }, a.proxy = function(c, d) {
        if (a.isFunction(c)) {
            var e = function() {
                return c.apply(d, arguments);
            };
            return e._zid = b(c), e;
        }
        if ("string" == typeof d) return a.proxy(c[d], c);
        throw new TypeError("expected function");
    }, a.fn.bind = function(a, b) {
        return this.each(function() {
            g(this, a, b);
        });
    }, a.fn.unbind = function(a, b) {
        return this.each(function() {
            h(this, a, b);
        });
    }, a.fn.one = function(a, b) {
        return this.each(function(c, d) {
            g(this, a, b, null, function(a, b) {
                return function() {
                    var c = a.apply(d, arguments);
                    return h(d, b, a), c;
                };
            });
        });
    };
    var n = function() {
        return !0;
    }, o = function() {
        return !1;
    }, p = {
        preventDefault: "isDefaultPrevented",
        stopImmediatePropagation: "isImmediatePropagationStopped",
        stopPropagation: "isPropagationStopped"
    };
    a.fn.delegate = function(b, c, d) {
        var e = !1;
        return ("blur" == c || "focus" == c) && (a.iswebkit ? c = "blur" == c ? "focusout" : "focus" == c ? "focusin" : c : e = !0), 
        this.each(function(f, h) {
            g(h, c, d, b, function(c) {
                return function(d) {
                    var e, f = a(d.target).closest(b, h).get(0);
                    return f ? (e = a.extend(i(d), {
                        currentTarget: f,
                        liveFired: h
                    }), c.apply(f, [ e ].concat([].slice.call(arguments, 1)))) : void 0;
                };
            }, e);
        });
    }, a.fn.undelegate = function(a, b, c) {
        return this.each(function() {
            h(this, b, c, a);
        });
    }, a.fn.live = function(b, c) {
        return a(document.body).delegate(this.selector, b, c), this;
    }, a.fn.die = function(b, c) {
        return a(document.body).undelegate(this.selector, b, c), this;
    }, a.fn.on = function(b, c, d) {
        return void 0 == c || a.isFunction(c) ? this.bind(b, c) : this.delegate(c, b, d);
    }, a.fn.off = function(b, c, d) {
        return void 0 == c || a.isFunction(c) ? this.unbind(b, c) : this.undelegate(c, b, d);
    }, a.fn.trigger = function(b, c) {
        return "string" == typeof b && (b = a.Event(b)), j(b), b.data = c, this.each(function() {
            "dispatchEvent" in this && this.dispatchEvent(b);
        });
    }, a.fn.triggerHandler = function(b, d) {
        var e, f;
        return this.each(function(g, h) {
            e = i("string" == typeof b ? a.Event(b) : b), e.data = d, e.target = h, a.each(c(h, b.type || b), function(a, b) {
                return f = b.proxy(e), e.isImmediatePropagationStopped() ? !1 : void 0;
            });
        }), f;
    }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout change select keydown keypress keyup error".split(" ").forEach(function(b) {
        a.fn[b] = function(a) {
            return this.bind(b, a);
        };
    }), [ "focus", "blur" ].forEach(function(b) {
        a.fn[b] = function(a) {
            if (a) this.bind(b, a); else if (this.length) try {
                this.get(0)[b]();
            } catch (c) {}
            return this;
        };
    }), a.Event = function(a, b) {
        var c = document.createEvent(m[a] || "Events"), d = !0;
        if (b) for (var e in b) "bubbles" == e ? d = !!b[e] : c[e] = b[e];
        return c.initEvent(a, d, !0, null, null, null, null, null, null, null, null, null, null, null, null), 
        c;
    };
}(Zepto), function(a) {
    function b(a) {
        var b = this.os = {}, c = this.browser = {}, d = a.match(/WebKit\/([\d.]+)/), e = a.match(/(Android)\s+([\d.]+)/), f = a.match(/(iPad).*OS\s([\d_]+)/), g = !f && a.match(/(iPhone\sOS)\s([\d_]+)/), h = a.match(/(webOS|hpwOS)[\s\/]([\d.]+)/), i = h && a.match(/TouchPad/), j = a.match(/Kindle\/([\d.]+)/), k = a.match(/Silk\/([\d._]+)/), l = a.match(/(BlackBerry).*Version\/([\d.]+)/);
        (c.webkit = !!d) && (c.version = d[1]), e && (b.android = !0, b.version = e[2]), 
        g && (b.ios = b.iphone = !0, b.version = g[2].replace(/_/g, ".")), f && (b.ios = b.ipad = !0, 
        b.version = f[2].replace(/_/g, ".")), h && (b.webos = !0, b.version = h[2]), i && (b.touchpad = !0), 
        l && (b.blackberry = !0, b.version = l[2]), j && (b.kindle = !0, b.version = j[1]), 
        k && (c.silk = !0, c.version = k[1]), !k && b.android && a.match(/Kindle Fire/) && (c.silk = !0);
    }
    b.call(a, navigator.userAgent), a.__detect = b;
}(Zepto), function(a, b) {
    function c(a) {
        return a.toLowerCase();
    }
    function d(a) {
        return e ? e + a : c(a);
    }
    var e, f = "", g = {
        Webkit: "webkit",
        Moz: "",
        O: "o",
        ms: "MS"
    }, h = window.document, i = h.createElement("div"), j = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i, k = {};
    a.each(g, function(a, d) {
        return i.style[a + "TransitionProperty"] !== b ? (f = "-" + c(a) + "-", e = d, !1) : void 0;
    }), k[f + "transition-property"] = k[f + "transition-duration"] = k[f + "transition-timing-function"] = k[f + "animation-name"] = k[f + "animation-duration"] = "", 
    a.fx = {
        off: e === b && i.style.transitionProperty === b,
        cssPrefix: f,
        transitionEnd: d("TransitionEnd"),
        animationEnd: d("AnimationEnd")
    }, a.fn.animate = function(b, c, d, e) {
        return a.isObject(c) && (d = c.easing, e = c.complete, c = c.duration), c && (c /= 1e3), 
        this.anim(b, c, d, e);
    }, a.fn.anim = function(c, d, e, g) {
        var h, i, l, m = {}, n = this, o = a.fx.transitionEnd;
        if (d === b && (d = .4), a.fx.off && (d = 0), "string" == typeof c) m[f + "animation-name"] = c, 
        m[f + "animation-duration"] = d + "s", o = a.fx.animationEnd; else {
            for (i in c) j.test(i) ? (h || (h = []), h.push(i + "(" + c[i] + ")")) : m[i] = c[i];
            h && (m[f + "transform"] = h.join(" ")), !a.fx.off && "object" == typeof c && (m[f + "transition-property"] = Object.keys(c).join(", "), 
            m[f + "transition-duration"] = d + "s", m[f + "transition-timing-function"] = e || "linear");
        }
        return l = function(b) {
            if ("undefined" != typeof b) {
                if (b.target !== b.currentTarget) return;
                a(b.target).unbind(o, arguments.callee);
            }
            a(this).css(k), g && g.call(this);
        }, d > 0 && this.bind(o, l), setTimeout(function() {
            n.css(m), 0 >= d && setTimeout(function() {
                n.each(function() {
                    l.call(this);
                });
            }, 0);
        }, 0), this;
    }, i = null;
}(Zepto), function(a) {
    function b(b, c, d) {
        var e = a.Event(c);
        return a(b).trigger(e, d), !e.defaultPrevented;
    }
    function c(a, c, d, e) {
        return a.global ? b(c || s, d, e) : void 0;
    }
    function d(b) {
        b.global && 0 === a.active++ && c(b, null, "ajaxStart");
    }
    function e(b) {
        b.global && !--a.active && c(b, null, "ajaxStop");
    }
    function f(a, b) {
        var d = b.context;
        return b.beforeSend.call(d, a, b) === !1 || c(b, d, "ajaxBeforeSend", [ a, b ]) === !1 ? !1 : (c(b, d, "ajaxSend", [ a, b ]), 
        void 0);
    }
    function g(a, b, d) {
        var e = d.context, f = "success";
        d.success.call(e, a, f, b), c(d, e, "ajaxSuccess", [ b, d, a ]), i(f, b, d);
    }
    function h(a, b, d, e) {
        var f = e.context;
        e.error.call(f, d, b, a), c(e, f, "ajaxError", [ d, e, a ]), i(b, d, e);
    }
    function i(a, b, d) {
        var f = d.context;
        d.complete.call(f, b, a), c(d, f, "ajaxComplete", [ b, d ]), e(d);
    }
    function j() {}
    function k(a) {
        return a && (a == x ? "html" : a == w ? "json" : u.test(a) ? "script" : v.test(a) && "xml") || "text";
    }
    function l(a, b) {
        return (a + "&" + b).replace(/[&?]{1,2}/, "?");
    }
    function m(b) {
        r(b.data) && (b.data = a.param(b.data)), b.data && (!b.type || "GET" == b.type.toUpperCase()) && (b.url = l(b.url, b.data));
    }
    function n(b, c, d, e) {
        var f = a.isArray(c);
        a.each(c, function(c, g) {
            e && (c = d ? e : e + "[" + (f ? "" : c) + "]"), !e && f ? b.add(g.name, g.value) : (d ? a.isArray(g) : r(g)) ? n(b, g, d, c) : b.add(c, g);
        });
    }
    var o, p, q = 0, r = a.isObject, s = window.document, t = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, u = /^(?:text|application)\/javascript/i, v = /^(?:text|application)\/xml/i, w = "application/json", x = "text/html", y = /^\s*$/;
    a.active = 0, a.ajaxJSONP = function(b) {
        var c, d = "jsonp" + ++q, e = s.createElement("script"), f = function() {
            a(e).remove(), d in window && (window[d] = j), i("abort", h, b);
        }, h = {
            abort: f
        };
        return b.error && (e.onerror = function() {
            h.abort(), b.error();
        }), window[d] = function(f) {
            clearTimeout(c), a(e).remove(), delete window[d], g(f, h, b);
        }, m(b), e.src = b.url.replace(/=\?/, "=" + d), a("head").append(e), b.timeout > 0 && (c = setTimeout(function() {
            h.abort(), i("timeout", h, b);
        }, b.timeout)), h;
    }, a.ajaxSettings = {
        type: "GET",
        beforeSend: j,
        success: j,
        error: j,
        complete: j,
        context: null,
        global: !0,
        xhr: function() {
            return new window.XMLHttpRequest();
        },
        accepts: {
            script: "text/javascript, application/javascript",
            json: w,
            xml: "application/xml, text/xml",
            html: x,
            text: "text/plain"
        },
        crossDomain: !1,
        timeout: 0
    }, a.ajax = function(b) {
        var c = a.extend({}, b || {});
        for (o in a.ajaxSettings) void 0 === c[o] && (c[o] = a.ajaxSettings[o]);
        d(c), c.crossDomain || (c.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(c.url) && RegExp.$2 != window.location.host);
        var e = c.dataType, i = /=\?/.test(c.url);
        if ("jsonp" == e || i) return i || (c.url = l(c.url, "callback=?")), a.ajaxJSONP(c);
        c.url || (c.url = window.location.toString()), m(c);
        var n, q = c.accepts[e], r = {}, s = /^([\w-]+:)\/\//.test(c.url) ? RegExp.$1 : window.location.protocol, t = a.ajaxSettings.xhr();
        c.crossDomain || (r["X-Requested-With"] = "XMLHttpRequest"), q && (r.Accept = q, 
        q.indexOf(",") > -1 && (q = q.split(",", 2)[0]), t.overrideMimeType && t.overrideMimeType(q)), 
        (c.contentType || c.data && "GET" != c.type.toUpperCase()) && (r["Content-Type"] = c.contentType || "application/x-www-form-urlencoded"), 
        c.headers = a.extend(r, c.headers || {}), t.onreadystatechange = function() {
            if (4 == t.readyState) {
                clearTimeout(n);
                var a, b = !1;
                if (t.status >= 200 && t.status < 300 || 304 == t.status || 0 == t.status && "file:" == s) {
                    e = e || k(t.getResponseHeader("content-type")), a = t.responseText;
                    try {
                        "script" == e ? (1, eval)(a) : "xml" == e ? a = t.responseXML : "json" == e && (a = y.test(a) ? null : JSON.parse(a));
                    } catch (d) {
                        b = d;
                    }
                    b ? h(b, "parsererror", t, c) : g(a, t, c);
                } else h(null, "error", t, c);
            }
        };
        var u = "async" in c ? c.async : !0;
        t.open(c.type, c.url, u);
        for (p in c.headers) t.setRequestHeader(p, c.headers[p]);
        return f(t, c) === !1 ? (t.abort(), !1) : (c.timeout > 0 && (n = setTimeout(function() {
            t.onreadystatechange = j, t.abort(), h(null, "timeout", t, c);
        }, c.timeout)), t.send(c.data ? c.data : null), t);
    }, a.get = function(b, c) {
        return a.ajax({
            url: b,
            success: c
        });
    }, a.post = function(b, c, d, e) {
        return a.isFunction(c) && (e = e || d, d = c, c = null), a.ajax({
            type: "POST",
            url: b,
            data: c,
            success: d,
            dataType: e
        });
    }, a.getJSON = function(b, c) {
        return a.ajax({
            url: b,
            success: c,
            dataType: "json"
        });
    }, a.fn.load = function(b, c) {
        if (!this.length) return this;
        var d, e = this, f = b.split(/\s/);
        return f.length > 1 && (b = f[0], d = f[1]), a.get(b, function(b) {
            e.html(d ? a(s.createElement("div")).html(b.replace(t, "")).find(d).html() : b), 
            c && c.call(e);
        }), this;
    };
    var z = encodeURIComponent;
    a.param = function(a, b) {
        var c = [];
        return c.add = function(a, b) {
            this.push(z(a) + "=" + z(b));
        }, n(c, a, b), c.join("&").replace("%20", "+");
    };
}(Zepto), function(a) {
    a.fn.serializeArray = function() {
        var b, c = [];
        return a(Array.prototype.slice.call(this.get(0).elements)).each(function() {
            b = a(this);
            var d = b.attr("type");
            "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != d && "reset" != d && "button" != d && ("radio" != d && "checkbox" != d || this.checked) && c.push({
                name: b.attr("name"),
                value: b.val()
            });
        }), c;
    }, a.fn.serialize = function() {
        var a = [];
        return this.serializeArray().forEach(function(b) {
            a.push(encodeURIComponent(b.name) + "=" + encodeURIComponent(b.value));
        }), a.join("&");
    }, a.fn.submit = function(b) {
        if (b) this.bind("submit", b); else if (this.length) {
            var c = a.Event("submit");
            this.eq(0).trigger(c), c.defaultPrevented || this.get(0).submit();
        }
        return this;
    };
}(Zepto), function(a) {
    function b(a) {
        return "tagName" in a ? a : a.parentNode;
    }
    function c(a, b, c, d) {
        var e = Math.abs(a - b), f = Math.abs(c - d);
        return e >= f ? a - b > 0 ? "Left" : "Right" : c - d > 0 ? "Up" : "Down";
    }
    function d() {
        g = null, h.last && (h.el.trigger("longTap"), h = {});
    }
    function e() {
        g && clearTimeout(g), g = null;
    }
    var f, g, h = {}, i = 750;
    a(document).ready(function() {
        var j, k;
        a(document.body).bind("touchstart", function(c) {
            j = Date.now(), k = j - (h.last || j), h.el = a(b(c.touches[0].target)), f && clearTimeout(f), 
            h.x1 = c.touches[0].pageX, h.y1 = c.touches[0].pageY, k > 0 && 250 >= k && (h.isDoubleTap = !0), 
            h.last = j, g = setTimeout(d, i);
        }).bind("touchmove", function(a) {
            e(), h.x2 = a.touches[0].pageX, h.y2 = a.touches[0].pageY;
        }).bind("touchend", function() {
            e(), h.isDoubleTap ? (h.el.trigger("doubleTap"), h = {}) : h.x2 && Math.abs(h.x1 - h.x2) > 30 || h.y2 && Math.abs(h.y1 - h.y2) > 30 ? (h.el.trigger("swipe") && h.el.trigger("swipe" + c(h.x1, h.x2, h.y1, h.y2)), 
            h = {}) : "last" in h && (h.el.trigger("tap"), f = setTimeout(function() {
                f = null, h.el.trigger("singleTap"), h = {};
            }, 250));
        }).bind("touchcancel", function() {
            f && clearTimeout(f), g && clearTimeout(g), g = f = null, h = {};
        });
    }), [ "swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap" ].forEach(function(b) {
        a.fn[b] = function(a) {
            return this.bind(b, a);
        };
    });
}(Zepto), window.Modernizr = function(a, b, c) {
    function d(a) {
        s.cssText = a;
    }
    function e(a, b) {
        return typeof a === b;
    }
    function f(a, b) {
        return !!~("" + a).indexOf(b);
    }
    function g(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!f(e, "-") && s[e] !== c) return "pfx" == b ? e : !0;
        }
        return !1;
    }
    function h(a, b, d) {
        for (var f in a) {
            var g = b[a[f]];
            if (g !== c) return d === !1 ? a[f] : e(g, "function") ? g.bind(d || b) : g;
        }
        return !1;
    }
    function i(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.slice(1), f = (a + " " + x.join(d + " ") + d).split(" ");
        return e(b, "string") || e(b, "undefined") ? g(f, b) : (f = (a + " " + y.join(d + " ") + d).split(" "), 
        h(f, b, c));
    }
    function j() {
        n.input = function(c) {
            for (var d = 0, e = c.length; e > d; d++) B[c[d]] = !!(c[d] in t);
            return B.list && (B.list = !(!b.createElement("datalist") || !a.HTMLDataListElement)), 
            B;
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), 
        n.inputtypes = function(a) {
            for (var d, e, f, g = 0, h = a.length; h > g; g++) t.setAttribute("type", e = a[g]), 
            d = "text" !== t.type, d && (t.value = u, t.style.cssText = "position:absolute;visibility:hidden;", 
            /^range$/.test(e) && t.style.WebkitAppearance !== c ? (p.appendChild(t), f = b.defaultView, 
            d = f.getComputedStyle && "textfield" !== f.getComputedStyle(t, null).WebkitAppearance && 0 !== t.offsetHeight, 
            p.removeChild(t)) : /^(search|tel)$/.test(e) || (d = /^(url|email)$/.test(e) ? t.checkValidity && t.checkValidity() === !1 : t.value != u)), 
            A[a[g]] = !!d;
            return A;
        }("search tel url email datetime date month week time datetime-local number range color".split(" "));
    }
    var k, l, m = "2.6.2", n = {}, o = !0, p = b.documentElement, q = "modernizr", r = b.createElement(q), s = r.style, t = b.createElement("input"), u = ":)", v = ({}.toString, 
    " -webkit- -moz- -o- -ms- ".split(" ")), w = "Webkit Moz O ms", x = w.split(" "), y = w.toLowerCase().split(" "), z = {}, A = {}, B = {}, C = [], D = C.slice, E = {}.hasOwnProperty;
    l = e(E, "undefined") || e(E.call, "undefined") ? function(a, b) {
        return b in a && e(a.constructor.prototype[b], "undefined");
    } : function(a, b) {
        return E.call(a, b);
    }, Function.prototype.bind || (Function.prototype.bind = function(a) {
        var b = this;
        if ("function" != typeof b) throw new TypeError();
        var c = D.call(arguments, 1), d = function() {
            if (this instanceof d) {
                var e = function() {};
                e.prototype = b.prototype;
                var f = new e(), g = b.apply(f, c.concat(D.call(arguments)));
                return Object(g) === g ? g : f;
            }
            return b.apply(a, c.concat(D.call(arguments)));
        };
        return d;
    }), z.canvas = function() {
        var a = b.createElement("canvas");
        return !(!a.getContext || !a.getContext("2d"));
    }, z.geolocation = function() {
        return "geolocation" in navigator;
    }, z.video = function() {
        var a = b.createElement("video"), c = !1;
        try {
            (c = !!a.canPlayType) && (c = new Boolean(c), c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), 
            c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""));
        } catch (d) {}
        return c;
    }, z.audio = function() {
        var a = b.createElement("audio"), c = !1;
        try {
            (c = !!a.canPlayType) && (c = new Boolean(c), c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), 
            c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""), c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), 
            c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, ""));
        } catch (d) {}
        return c;
    }, z.localstorage = function() {
        try {
            return localStorage.setItem(q, q), localStorage.removeItem(q), !0;
        } catch (a) {
            return !1;
        }
    }, z.sessionstorage = function() {
        try {
            return sessionStorage.setItem(q, q), sessionStorage.removeItem(q), !0;
        } catch (a) {
            return !1;
        }
    };
    for (var F in z) l(z, F) && (k = F.toLowerCase(), n[k] = z[F](), C.push((n[k] ? "" : "no-") + k));
    return n.input || j(), n.addTest = function(a, b) {
        if ("object" == typeof a) for (var d in a) l(a, d) && n.addTest(d, a[d]); else {
            if (a = a.toLowerCase(), n[a] !== c) return n;
            b = "function" == typeof b ? b() : b, "undefined" != typeof o && o && (p.className += " " + (b ? "" : "no-") + a), 
            n[a] = b;
        }
        return n;
    }, d(""), r = t = null, function(a, b) {
        function c(a, b) {
            var c = a.createElement("p"), d = a.getElementsByTagName("head")[0] || a.documentElement;
            return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild);
        }
        function d() {
            var a = r.elements;
            return "string" == typeof a ? a.split(" ") : a;
        }
        function e(a) {
            var b = q[a[o]];
            return b || (b = {}, p++, a[o] = p, q[p] = b), b;
        }
        function f(a, c, d) {
            if (c || (c = b), k) return c.createElement(a);
            d || (d = e(c));
            var f;
            return f = d.cache[a] ? d.cache[a].cloneNode() : n.test(a) ? (d.cache[a] = d.createElem(a)).cloneNode() : d.createElem(a), 
            f.canHaveChildren && !m.test(a) ? d.frag.appendChild(f) : f;
        }
        function g(a, c) {
            if (a || (a = b), k) return a.createDocumentFragment();
            c = c || e(a);
            for (var f = c.frag.cloneNode(), g = 0, h = d(), i = h.length; i > g; g++) f.createElement(h[g]);
            return f;
        }
        function h(a, b) {
            b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, 
            b.frag = b.createFrag()), a.createElement = function(c) {
                return r.shivMethods ? f(c, a, b) : b.createElem(c);
            }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + d().join().replace(/\w+/g, function(a) {
                return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")';
            }) + ");return n}")(r, b.frag);
        }
        function i(a) {
            a || (a = b);
            var d = e(a);
            return !r.shivCSS || j || d.hasCSS || (d.hasCSS = !!c(a, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), 
            k || h(a, d), a;
        }
        var j, k, l = a.html5 || {}, m = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, n = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, o = "_html5shiv", p = 0, q = {};
        !function() {
            try {
                var a = b.createElement("a");
                a.innerHTML = "<xyz></xyz>", j = "hidden" in a, k = 1 == a.childNodes.length || function() {
                    b.createElement("a");
                    var a = b.createDocumentFragment();
                    return "undefined" == typeof a.cloneNode || "undefined" == typeof a.createDocumentFragment || "undefined" == typeof a.createElement;
                }();
            } catch (c) {
                j = !0, k = !0;
            }
        }();
        var r = {
            elements: l.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
            shivCSS: l.shivCSS !== !1,
            supportsUnknownElements: k,
            shivMethods: l.shivMethods !== !1,
            type: "default",
            shivDocument: i,
            createElement: f,
            createDocumentFragment: g
        };
        a.html5 = r, i(b);
    }(this, b), n._version = m, n._prefixes = v, n._domPrefixes = y, n._cssomPrefixes = x, 
    n.testProp = function(a) {
        return g([ a ]);
    }, n.testAllProps = i, n.prefixed = function(a, b, c) {
        return b ? i(a, b, c) : i(a, "pfx");
    }, p.className = p.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (o ? " js " + C.join(" ") : ""), 
    n;
}(this, this.document), function(a, b, c) {
    function d(a) {
        return "[object Function]" == q.call(a);
    }
    function e(a) {
        return "string" == typeof a;
    }
    function f() {}
    function g(a) {
        return !a || "loaded" == a || "complete" == a || "uninitialized" == a;
    }
    function h() {
        var a = r.shift();
        s = 1, a ? a.t ? o(function() {
            ("c" == a.t ? m.injectCss : m.injectJs)(a.s, 0, a.a, a.x, a.e, 1);
        }, 0) : (a(), h()) : s = 0;
    }
    function i(a, c, d, e, f, i, j) {
        function k(b) {
            if (!n && g(l.readyState) && (t.r = n = 1, !s && h(), l.onload = l.onreadystatechange = null, 
            b)) {
                "img" != a && o(function() {
                    v.removeChild(l);
                }, 50);
                for (var d in A[c]) A[c].hasOwnProperty(d) && A[c][d].onload();
            }
        }
        var j = j || m.errorTimeout, l = b.createElement(a), n = 0, q = 0, t = {
            t: d,
            s: c,
            e: f,
            a: i,
            x: j
        };
        1 === A[c] && (q = 1, A[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), 
        l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
            k.call(this, q);
        }, r.splice(e, 0, t), "img" != a && (q || 2 === A[c] ? (v.insertBefore(l, u ? null : p), 
        o(k, j)) : A[c].push(l));
    }
    function j(a, b, c, d, f) {
        return s = 0, b = b || "j", e(a) ? i("c" == b ? x : w, a, b, this.i++, c, d, f) : (r.splice(this.i++, 0, a), 
        1 == r.length && h()), this;
    }
    function k() {
        var a = m;
        return a.loader = {
            load: j,
            i: 0
        }, a;
    }
    var l, m, n = b.documentElement, o = a.setTimeout, p = b.getElementsByTagName("script")[0], q = {}.toString, r = [], s = 0, t = "MozAppearance" in n.style, u = t && !!b.createRange().compareNode, v = u ? n : p.parentNode, n = a.opera && "[object Opera]" == q.call(a.opera), n = !!b.attachEvent && !n, w = t ? "object" : n ? "script" : "img", x = n ? "script" : w, y = Array.isArray || function(a) {
        return "[object Array]" == q.call(a);
    }, z = [], A = {}, B = {
        timeout: function(a, b) {
            return b.length && (a.timeout = b[0]), a;
        }
    };
    m = function(a) {
        function b(a) {
            var b, c, d, a = a.split("!"), e = z.length, f = a.pop(), g = a.length, f = {
                url: f,
                origUrl: f,
                prefixes: a
            };
            for (c = 0; g > c; c++) d = a[c].split("="), (b = B[d.shift()]) && (f = b(f, d));
            for (c = 0; e > c; c++) f = z[c](f);
            return f;
        }
        function g(a, e, f, g, h) {
            var i = b(a), j = i.autoCallback;
            i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), 
            i.instead ? i.instead(a, e, f, g, h) : (A[i.url] ? i.noexec = !0 : A[i.url] = 1, 
            f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), 
            (d(e) || d(j)) && f.load(function() {
                k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), A[i.url] = 2;
            })));
        }
        function h(a, b) {
            function c(a, c) {
                if (a) {
                    if (e(a)) c || (l = function() {
                        var a = [].slice.call(arguments);
                        m.apply(this, a), n();
                    }), g(a, l, b, 0, j); else if (Object(a) === a) for (i in h = function() {
                        var b, c = 0;
                        for (b in a) a.hasOwnProperty(b) && c++;
                        return c;
                    }(), a) a.hasOwnProperty(i) && (!c && !--h && (d(l) ? l = function() {
                        var a = [].slice.call(arguments);
                        m.apply(this, a), n();
                    } : l[i] = function(a) {
                        return function() {
                            var b = [].slice.call(arguments);
                            a && a.apply(this, b), n();
                        };
                    }(m[i])), g(a[i], l, b, i, j));
                } else !c && n();
            }
            var h, i, j = !!a.test, k = a.load || a.both, l = a.callback || f, m = l, n = a.complete || f;
            c(j ? a.yep : a.nope, !!k), k && c(k);
        }
        var i, j, l = this.yepnope.loader;
        if (e(a)) g(a, 0, l, 0); else if (y(a)) for (i = 0; i < a.length; i++) j = a[i], 
        e(j) ? g(j, 0, l, 0) : y(j) ? m(j) : Object(j) === j && h(j, l); else Object(a) === a && h(a, l);
    }, m.addPrefix = function(a, b) {
        B[a] = b;
    }, m.addFilter = function(a) {
        z.push(a);
    }, m.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", 
    b.addEventListener("DOMContentLoaded", l = function() {
        b.removeEventListener("DOMContentLoaded", l, 0), b.readyState = "complete";
    }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
        var k, l, n = b.createElement("script"), e = e || m.errorTimeout;
        n.src = a;
        for (l in d) n.setAttribute(l, d[l]);
        c = j ? h : c || f, n.onreadystatechange = n.onload = function() {
            !k && g(n.readyState) && (k = 1, c(), n.onload = n.onreadystatechange = null);
        }, o(function() {
            k || (k = 1, c(1));
        }, e), i ? n.onload() : p.parentNode.insertBefore(n, p);
    }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
        var j, e = b.createElement("link"), c = i ? h : c || f;
        e.href = a, e.rel = "stylesheet", e.type = "text/css";
        for (j in d) e.setAttribute(j, d[j]);
        g || (p.parentNode.insertBefore(e, p), o(c, 0));
    };
}(this, document), Modernizr.load = function() {
    yepnope.apply(window, [].slice.call(arguments, 0));
}, Modernizr.addTest({
    texttrackapi: "function" == typeof document.createElement("video").addTextTrack,
    track: "kind" in document.createElement("track")
}), function(a) {
    a.fn.unveil = function(b, c) {
        function d() {
            var b = k.filter(function() {
                var b = a(this);
                if (!b.is(":hidden")) {
                    var c = f.scrollTop(), d = c + f.height(), e = b.offset().top, h = e + b.height();
                    return h >= c - g && d + g >= e;
                }
            });
            e = b.trigger("unveil"), k = k.not(e);
        }
        var e, f = a(window), g = b || 0, h = window.devicePixelRatio > 1, i = a(window).width(), j = h ? "data-src-retina" : "data-src", k = this, l = 600;
        return this.one("unveil", function() {
            var a = this.getAttribute(j);
            a = a || this.getAttribute("data-src"), a && i > l ? (this.setAttribute("src", a), 
            "function" == typeof c && c.call(this)) : this.getAttribute("data-src-mobile") && l > i && (this.setAttribute("src", this.getAttribute("data-src-mobile")), 
            "function" == typeof c && c.call(this));
        }), f.scroll(d), f.resize(d), d(), this;
    };
}(window.jQuery || window.Zepto);