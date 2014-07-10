document.querySelectorAll || (document.querySelectorAll = function(a) {
    var b = document, c = b.documentElement.firstChild, d = b.createElement("STYLE");
    return c.appendChild(d), b.__qsaels = [], d.styleSheet.cssText = a + "{x:expression(document.__qsaels.push(this))}", 
    window.scrollBy(0, 0), b.__qsaels;
}), function(a, b) {
    function c(a, b) {
        var c = a.createElement("p"), d = a.getElementsByTagName("head")[0] || a.documentElement;
        return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild);
    }
    function d() {
        var a = s.elements;
        return "string" == typeof a ? a.split(" ") : a;
    }
    function e(a) {
        var b = r[a[p]];
        return b || (b = {}, q++, a[p] = q, r[q] = b), b;
    }
    function f(a, c, d) {
        if (c || (c = b), k) return c.createElement(a);
        d || (d = e(c));
        var f;
        return f = d.cache[a] ? d.cache[a].cloneNode() : o.test(a) ? (d.cache[a] = d.createElem(a)).cloneNode() : d.createElem(a), 
        !f.canHaveChildren || n.test(a) || f.tagUrn ? f : d.frag.appendChild(f);
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
            return s.shivMethods ? f(c, a, b) : b.createElem(c);
        }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + d().join().replace(/[\w\-:]+/g, function(a) {
            return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")';
        }) + ");return n}")(s, b.frag);
    }
    function i(a) {
        a || (a = b);
        var d = e(a);
        return !s.shivCSS || j || d.hasCSS || (d.hasCSS = !!c(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), 
        k || h(a, d), a;
    }
    var j, k, l = "3.7.0", m = a.html5 || {}, n = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, o = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, p = "_html5shiv", q = 0, r = {};
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
    var s = {
        elements: m.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
        version: l,
        shivCSS: m.shivCSS !== !1,
        supportsUnknownElements: k,
        shivMethods: m.shivMethods !== !1,
        type: "default",
        shivDocument: i,
        createElement: f,
        createDocumentFragment: g
    };
    a.html5 = s, i(b);
}(this, document), Object.getPrototypeOf || (Object.getPrototypeOf = function(a) {
    if (a !== Object(a)) throw TypeError("Object.getPrototypeOf called on non-object");
    return a.__proto__ || a.constructor.prototype || Object.prototype;
}), "function" != typeof Object.getOwnPropertyNames && (Object.getOwnPropertyNames = function(a) {
    if (a !== Object(a)) throw TypeError("Object.getOwnPropertyNames called on non-object");
    var b, c = [];
    for (b in a) Object.prototype.hasOwnProperty.call(a, b) && c.push(b);
    return c;
}), "function" != typeof Object.create && (Object.create = function(a, b) {
    function c() {}
    if ("object" != typeof a) throw TypeError();
    c.prototype = a;
    var d = new c();
    if (a && (d.constructor = c), void 0 !== b) {
        if (b !== Object(b)) throw TypeError();
        Object.defineProperties(d, b);
    }
    return d;
}), function() {
    if (!Object.defineProperty || !function() {
        try {
            return Object.defineProperty({}, "x", {}), !0;
        } catch (a) {
            return !1;
        }
    }()) {
        var a = Object.defineProperty;
        Object.defineProperty = function(b, c, d) {
            if (a) try {
                return a(b, c, d);
            } catch (e) {}
            if (b !== Object(b)) throw TypeError("Object.defineProperty called on non-object");
            return Object.prototype.__defineGetter__ && "get" in d && Object.prototype.__defineGetter__.call(b, c, d.get), 
            Object.prototype.__defineSetter__ && "set" in d && Object.prototype.__defineSetter__.call(b, c, d.set), 
            "value" in d && (b[c] = d.value), b;
        };
    }
}(), "function" != typeof Object.defineProperties && (Object.defineProperties = function(a, b) {
    if (a !== Object(a)) throw TypeError("Object.defineProperties called on non-object");
    var c;
    for (c in b) Object.prototype.hasOwnProperty.call(b, c) && Object.defineProperty(a, c, b[c]);
    return a;
}), Object.keys || (Object.keys = function(a) {
    if (a !== Object(a)) throw TypeError("Object.keys called on non-object");
    var b, c = [];
    for (b in a) Object.prototype.hasOwnProperty.call(a, b) && c.push(b);
    return c;
}), Function.prototype.bind || (Function.prototype.bind = function(a) {
    function b() {}
    if ("function" != typeof this) throw TypeError("Bind must be called on a function");
    var c = [].slice, d = c.call(arguments, 1), e = this, f = function() {
        return e.apply(this instanceof b ? this : a || {}, d.concat(c.call(arguments)));
    };
    return b.prototype = e.prototype, f.prototype = new b(), f;
}), Array.isArray = Array.isArray || function(a) {
    return Boolean(a && "[object Array]" === Object.prototype.toString.call(Object(a)));
}, Array.prototype.indexOf || (Array.prototype.indexOf = function(a) {
    if (void 0 === this || null === this) throw TypeError();
    var b = Object(this), c = b.length >>> 0;
    if (0 === c) return -1;
    var d = 0;
    if (arguments.length > 0 && (d = Number(arguments[1]), isNaN(d) ? d = 0 : 0 !== d && d !== 1 / 0 && d !== -(1 / 0) && (d = (d > 0 || -1) * Math.floor(Math.abs(d)))), 
    d >= c) return -1;
    for (var e = d >= 0 ? d : Math.max(c - Math.abs(d), 0); c > e; e++) if (e in b && b[e] === a) return e;
    return -1;
}), Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function(a) {
    if (void 0 === this || null === this) throw TypeError();
    var b = Object(this), c = b.length >>> 0;
    if (0 === c) return -1;
    var d = c;
    arguments.length > 1 && (d = Number(arguments[1]), d !== d ? d = 0 : 0 !== d && d !== 1 / 0 && d !== -(1 / 0) && (d = (d > 0 || -1) * Math.floor(Math.abs(d))));
    for (var e = d >= 0 ? Math.min(d, c - 1) : c - Math.abs(d); e >= 0; e--) if (e in b && b[e] === a) return e;
    return -1;
}), Array.prototype.every || (Array.prototype.every = function(a) {
    if (void 0 === this || null === this) throw TypeError();
    var b = Object(this), c = b.length >>> 0;
    if ("function" != typeof a) throw TypeError();
    var d, e = arguments[1];
    for (d = 0; c > d; d++) if (d in b && !a.call(e, b[d], d, b)) return !1;
    return !0;
}), Array.prototype.some || (Array.prototype.some = function(a) {
    if (void 0 === this || null === this) throw TypeError();
    var b = Object(this), c = b.length >>> 0;
    if ("function" != typeof a) throw TypeError();
    var d, e = arguments[1];
    for (d = 0; c > d; d++) if (d in b && a.call(e, b[d], d, b)) return !0;
    return !1;
}), Array.prototype.forEach || (Array.prototype.forEach = function(a) {
    if (void 0 === this || null === this) throw TypeError();
    var b = Object(this), c = b.length >>> 0;
    if ("function" != typeof a) throw TypeError();
    var d, e = arguments[1];
    for (d = 0; c > d; d++) d in b && a.call(e, b[d], d, b);
}), Array.prototype.map || (Array.prototype.map = function(a) {
    if (void 0 === this || null === this) throw TypeError();
    var b = Object(this), c = b.length >>> 0;
    if ("function" != typeof a) throw TypeError();
    var d = [];
    d.length = c;
    var e, f = arguments[1];
    for (e = 0; c > e; e++) e in b && (d[e] = a.call(f, b[e], e, b));
    return d;
}), Array.prototype.filter || (Array.prototype.filter = function(a) {
    if (void 0 === this || null === this) throw TypeError();
    var b = Object(this), c = b.length >>> 0;
    if ("function" != typeof a) throw TypeError();
    var d, e = [], f = arguments[1];
    for (d = 0; c > d; d++) if (d in b) {
        var g = b[d];
        a.call(f, g, d, b) && e.push(g);
    }
    return e;
}), Array.prototype.reduce || (Array.prototype.reduce = function(a) {
    if (void 0 === this || null === this) throw TypeError();
    var b = Object(this), c = b.length >>> 0;
    if ("function" != typeof a) throw TypeError();
    if (0 === c && 1 === arguments.length) throw TypeError();
    var d, e = 0;
    if (arguments.length >= 2) d = arguments[1]; else for (;;) {
        if (e in b) {
            d = b[e++];
            break;
        }
        if (++e >= c) throw TypeError();
    }
    for (;c > e; ) e in b && (d = a.call(void 0, d, b[e], e, b)), e++;
    return d;
}), Array.prototype.reduceRight || (Array.prototype.reduceRight = function(a) {
    if (void 0 === this || null === this) throw TypeError();
    var b = Object(this), c = b.length >>> 0;
    if ("function" != typeof a) throw TypeError();
    if (0 === c && 1 === arguments.length) throw TypeError();
    var d, e = c - 1;
    if (arguments.length >= 2) d = arguments[1]; else for (;;) {
        if (e in this) {
            d = this[e--];
            break;
        }
        if (--e < 0) throw TypeError();
    }
    for (;e >= 0; ) e in b && (d = a.call(void 0, d, b[e], e, b)), e--;
    return d;
}), String.prototype.trim || (String.prototype.trim = function() {
    return String(this).replace(/^\s+/, "").replace(/\s+$/, "");
}), Date.now || (Date.now = function() {
    return Number(new Date());
}), Date.prototype.toISOString || (Date.prototype.toISOString = function() {
    function a(a) {
        return ("00" + a).slice(-2);
    }
    function b(a) {
        return ("000" + a).slice(-3);
    }
    return this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "." + b(this.getUTCMilliseconds()) + "Z";
});