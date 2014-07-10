window.Modernizr = function(a, b, c) {
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
}), !function(a) {
    var b = function() {
        window.asyncWebshims || (window.asyncWebshims = {
            cfg: [],
            ready: []
        });
    }, c = function() {
        window.jQuery && (a(jQuery), a = function() {
            return window.webshims;
        });
    };
    window.webshims = {
        setOptions: function() {
            b(), window.asyncWebshims.cfg.push(arguments);
        },
        ready: function() {
            b(), window.asyncWebshims.ready.push(arguments);
        },
        activeLang: function(a) {
            b(), window.asyncWebshims.lang = a;
        },
        polyfill: function(a) {
            b(), window.asyncWebshims.polyfill = a;
        },
        _curScript: function() {
            var a, b, c, d = document.currentScript;
            if (!d) {
                try {
                    throw new Error("");
                } catch (e) {
                    c = (e.sourceURL || e.stack || "").split("\n"), c = ((c[c.length - 1] || c[c.length - 2] || "").match(/(?:fil|htt|wid|abo|app|res)(.)+/i) || [ "" ])[0].replace(/[\:\s\(]+[\d\:\)\(\s]+$/, "");
                }
                for (a = document.scripts || document.getElementsByTagName("script"), b = 0; b < a.length && (!a[b].getAttribute("src") || (d = a[b], 
                "interactive" != a[b].readyState && c != a[b].src)); b++) ;
            }
            return d;
        }()
    }, window.webshim = window.webshims, window.webshims.timer = setInterval(c, 0), 
    c(), "function" == typeof define && define.amd && define.amd.jQuery && define("polyfiller", [ "jquery" ], a);
}(function(a) {
    "use strict";
    var b, c, d = window.webshims, e = "dom-support", f = a.event.special, g = a([]), h = window.Modernizr, i = window.asyncWebshims, j = h.addTest, k = window.Object, l = (window.html5 || {}, 
    function(a) {
        return a + "\n//# sourceURL=" + this.url;
    });
    h.advancedObjectProperties = h.objectAccessor = h.ES5 = !!("create" in k && "seal" in k), 
    !h.ES5 || "toJSON" in Date.prototype || (h.ES5 = !1), clearInterval(d.timer), c = a.support.hrefNormalized === !1 ? d._curScript.getAttribute("src", 4) : d._curScript.src, 
    c = c.split("?")[0].slice(0, c.lastIndexOf("/") + 1) + "shims/", a.extend(d, {
        version: "1.12.2",
        cfg: {
            waitReady: !0,
            loadStyles: !0,
            disableShivMethods: !0,
            wsdoc: document,
            wspopover: {
                appendTo: "auto",
                hideOnBlur: !0
            },
            ajax: {},
            loadScript: function(b, c) {
                a.ajax(a.extend({}, m.ajax, {
                    url: b,
                    success: c,
                    dataType: "script",
                    cache: !0,
                    global: !1,
                    dataFilter: l
                }));
            },
            basePath: c
        },
        bugs: {},
        modules: {},
        features: {},
        featureList: [],
        setOptions: function(b, c) {
            "string" == typeof b && arguments.length > 1 ? m[b] = a.isPlainObject(c) ? a.extend(!0, m[b] || {}, c) : c : "object" == typeof b && a.extend(!0, m, b);
        },
        addPolyfill: function(b, c) {
            c = c || {};
            var e = c.f || b;
            n[e] || (n[e] = [], d.featureList.push(e), m[e] = {}), !n[e].failedM && c.nM && a.each(c.nM.split(" "), function(a, b) {
                return b in h ? void 0 : (n[e].failedM = b, !1);
            }), n[e].failedM && (c.test = !0), n[e].push(b), c.options = a.extend(m[e], c.options), 
            u(b, c), c.methodNames && a.each(c.methodNames, function(a, b) {
                d.addMethodName(b);
            });
        },
        polyfill: function() {
            return function(a) {
                return a || (a = d.featureList), "string" == typeof a && (a = a.split(" ")), d._polyfill(a);
            };
        }(),
        _polyfill: function(c) {
            var d = [];
            b(), -1 == a.inArray("forms", c) && -1 !== a.inArray("forms-ext", c) && c.push("forms"), 
            m.waitReady && (a.readyWait++, p(c, function() {
                a.ready(!0);
            })), a.each(c, function(a, b) {
                return n[b] ? (b !== n[b][0] && p(n[b], function() {
                    o(b, !0);
                }), d = d.concat(n[b]), void 0) : (o(b, !0), void 0);
            }), m.loadStyles && s.loadCSS("styles/shim.css"), t(d);
        },
        reTest: function() {
            var b, c = function(c, d) {
                var e, g = r[d], h = d + "Ready";
                !g || g.loaded || (g.test && a.isFunction(g.test) ? g.test([]) : g.test) || (f[h] && delete f[h], 
                e = n[g.f], b.push(d));
            };
            return function(d) {
                "string" == typeof d && (d = d.split(" ")), b = [], a.each(d, c), t(b);
            };
        }(),
        isReady: function(b, c) {
            if (b += "Ready", c) {
                if (f[b] && f[b].add) return !0;
                f[b] = a.extend(f[b] || {}, {
                    add: function(a) {
                        a.handler.call(this, b);
                    }
                }), a(document).triggerHandler(b);
            }
            return !(!f[b] || !f[b].add) || !1;
        },
        ready: function(b, c) {
            var e = arguments[2];
            if ("string" == typeof b && (b = b.split(" ")), e || (b = a.map(a.grep(b, function(a) {
                return !o(a);
            }), function(a) {
                return a + "Ready";
            })), !b.length) return c(a, d, window, document), void 0;
            var f = b.shift(), g = function() {
                p(b, c, !0);
            };
            a(document).one(f, g);
        },
        capturingEvents: function(b, c) {
            document.addEventListener && ("string" == typeof b && (b = [ b ]), a.each(b, function(b, e) {
                var g = function(b) {
                    return b = a.event.fix(b), c && d.capturingEventPrevented && d.capturingEventPrevented(b), 
                    a.event.dispatch.call(this, b);
                };
                f[e] = f[e] || {}, f[e].setup || f[e].teardown || a.extend(f[e], {
                    setup: function() {
                        this.addEventListener(e, g, !0);
                    },
                    teardown: function() {
                        this.removeEventListener(e, g, !0);
                    }
                });
            }));
        },
        register: function(b, c) {
            var e = r[b];
            if (!e) return d.error("can't find module: " + b), void 0;
            e.loaded = !0;
            var f = function() {
                c(a, d, window, document, void 0, e.options), o(b, !0);
            };
            e.d && e.d.length ? p(e.d, f) : f();
        },
        c: {},
        loader: {
            addModule: function(b, c) {
                r[b] = c, c.name = c.name || b, c.c || (c.c = []), a.each(c.c, function(a, c) {
                    d.c[c] || (d.c[c] = []), d.c[c].push(b);
                });
            },
            loadList: function() {
                var b = [], c = function(c, d) {
                    "string" == typeof d && (d = [ d ]), a.merge(b, d), s.loadScript(c, !1, d);
                }, e = function(c, d) {
                    if (o(c) || -1 != a.inArray(c, b)) return !0;
                    var e, f = r[c];
                    return m[f.f || c] || {}, f ? (e = f.test && a.isFunction(f.test) ? f.test(d) : f.test, 
                    e ? (o(c, !0), !0) : !1) : !0;
                }, f = function(b, c) {
                    if (b.d && b.d.length) {
                        var d = function(b, d) {
                            e(d, c) || -1 != a.inArray(d, c) || c.push(d);
                        };
                        a.each(b.d, function(b, c) {
                            r[c] ? r[c].loaded || d(b, c) : n[c] && (a.each(n[c], d), p(n[c], function() {
                                o(c, !0);
                            }));
                        }), b.noAutoCallback || (b.noAutoCallback = !0);
                    }
                };
                return function(g) {
                    var h, i, j, k, l = [], n = function(e, f) {
                        return k = f, a.each(d.c[f], function(c, d) {
                            return -1 == a.inArray(d, l) || -1 != a.inArray(d, b) ? (k = !1, !1) : void 0;
                        }), k ? (c("combos/" + k, d.c[k]), !1) : void 0;
                    };
                    for (i = 0; i < g.length; i++) h = r[g[i]], h && !e(h.name, g) && (h.css && m.loadStyles && s.loadCSS(h.css), 
                    h.loadInit && h.loadInit(), f(h, g), h.loaded || l.push(h.name), h.loaded = !0);
                    for (i = 0, j = l.length; j > i; i++) k = !1, h = l[i], -1 == a.inArray(h, b) && ("noCombo" != m.debug && a.each(r[h].c, n), 
                    k || c(r[h].src || h, h));
                };
            }(),
            makePath: function(a) {
                return -1 != a.indexOf("//") || 0 === a.indexOf("/") ? a : (-1 == a.indexOf(".") && (a += ".js"), 
                m.addCacheBuster && (a += m.addCacheBuster), m.basePath + a);
            },
            loadCSS: function() {
                var b, c = {};
                return function(d) {
                    d = this.makePath(d), c[d] || (b = b || a("link, style")[0] || a("script")[0], c[d] = 1, 
                    a('<link rel="stylesheet" />').insertBefore(b).attr({
                        href: d
                    }));
                };
            }(),
            loadScript: function() {
                var b = {};
                return function(c, d, e, f) {
                    if (f || (c = s.makePath(c)), !b[c]) {
                        var g = function() {
                            d && d(), e && ("string" == typeof e && (e = e.split(" ")), a.each(e, function(a, b) {
                                r[b] && (r[b].afterLoad && r[b].afterLoad(), o(r[b].noAutoCallback ? b + "FileLoaded" : b, !0));
                            }));
                        };
                        b[c] = 1, m.loadScript(c, g, a.noop);
                    }
                };
            }()
        }
    }), a.webshims = d;
    var m = d.cfg, n = d.features, o = d.isReady, p = d.ready, q = d.addPolyfill, r = d.modules, s = d.loader, t = s.loadList, u = s.addModule, v = d.bugs, w = [], x = {
        warn: 1,
        error: 1
    };
    return d.addMethodName = function(b) {
        b = b.split(":");
        var c = b[1];
        1 == b.length ? (c = b[0], b = b[0]) : b = b[0], a.fn[b] = function() {
            return this.callProp(c, arguments);
        };
    }, a.fn.callProp = function(b, c) {
        var e;
        return c || (c = []), this.each(function() {
            var f = a.prop(this, b);
            if (f && f.apply) {
                if (e = f.apply(this, c), void 0 !== e) return !1;
            } else d.warn(b + " is not a method of " + this);
        }), void 0 !== e ? e : this;
    }, d.activeLang = function() {
        var b = a("html").attr("lang") || navigator.browserLanguage || navigator.language || "";
        return p("webshimLocalization", function() {
            d.activeLang(b);
        }), function(a) {
            if (a) if ("string" == typeof a) b = a; else if ("object" == typeof a) {
                var c = arguments, e = this;
                p("webshimLocalization", function() {
                    d.activeLang.apply(e, c);
                });
            }
            return b;
        };
    }(), d.errorLog = [], a.each([ "log", "error", "warn", "info" ], function(a, b) {
        d[b] = function(a) {
            (x[b] && m.debug !== !1 || m.debug) && (d.errorLog.push(a), window.console && console.log && console[console[b] ? b : "log"](a));
        };
    }), function() {
        a.isDOMReady = a.isReady;
        var c = function() {
            a.isDOMReady = !0, o("DOM", !0), setTimeout(function() {
                o("WINDOWLOAD", !0);
            }, 9999);
        };
        b = function() {
            if (!b.run) {
                if ((m.debug || !("crossDomain" in m.ajax) && location.protocol.indexOf("http")) && (m.ajax.crossDomain = !0), 
                a.mobile && (a.mobile.textinput || a.mobile.rangeslider || a.mobile.button) && (m.readyEvt || (m.readyEvt = "pageinit"), 
                m.waitReady = !1), !a.isDOMReady && m.waitReady) {
                    var d = a.ready;
                    a.ready = function(b) {
                        return b !== !0 && document.body && (c(), a.ready = d), d.apply(this, arguments);
                    }, a.ready.promise = d.promise;
                }
                m.readyEvt ? a(document).one(m.readyEvt, c) : a(c);
            }
            b.run = !0;
        }, a(window).on("load", function() {
            c(), setTimeout(function() {
                o("WINDOWLOAD", !0);
            }, 9);
        });
        var e = [], f = function() {
            1 == this.nodeType && d.triggerDomUpdate(this);
        };
        a.extend(d, {
            addReady: function(a) {
                var b = function(b, c) {
                    d.ready("DOM", function() {
                        a(b, c);
                    });
                };
                e.push(b), m.wsdoc && b(m.wsdoc, g);
            },
            triggerDomUpdate: function(b) {
                if (!b || !b.nodeType) return b && b.jquery && b.each(function() {
                    d.triggerDomUpdate(this);
                }), void 0;
                var c = b.nodeType;
                if (1 == c || 9 == c) {
                    var f = b !== document ? a(b) : g;
                    a.each(e, function(a, c) {
                        c(b, f);
                    });
                }
            }
        }), a.fn.htmlPolyfill = function(b) {
            var c = a.fn.html.call(this, b);
            return c === this && a.isDOMReady && this.each(f), c;
        }, a.fn.jProp = function() {
            return this.pushStack(a(a.fn.prop.apply(this, arguments) || []));
        }, a.each([ "after", "before", "append", "prepend", "replaceWith" ], function(b, c) {
            a.fn[c + "Polyfill"] = function(b) {
                return b = a(b), a.fn[c].call(this, b), a.isDOMReady && b.each(f), this;
            };
        }), a.each([ "insertAfter", "insertBefore", "appendTo", "prependTo", "replaceAll" ], function(b, c) {
            a.fn[c.replace(/[A-Z]/, function(a) {
                return "Polyfill" + a;
            })] = function() {
                return a.fn[c].apply(this, arguments), a.isDOMReady && d.triggerDomUpdate(this), 
                this;
            };
        }), a.fn.updatePolyfill = function() {
            return a.isDOMReady && d.triggerDomUpdate(this), this;
        }, a.each([ "getNativeElement", "getShadowElement", "getShadowFocusElement" ], function(b, c) {
            a.fn[c] = function() {
                return this.pushStack(this);
            };
        });
    }(), function() {
        var b = "defineProperty", c = k.prototype.hasOwnProperty, e = [ "configurable", "enumerable", "writable" ], f = function(a) {
            for (var b = 0; 3 > b; b++) void 0 !== a[e[b]] || "writable" === e[b] && void 0 === a.value || (a[e[b]] = !0);
        }, g = function(a) {
            if (a) for (var b in a) c.call(a, b) && f(a[b]);
        };
        k.create && (d.objectCreate = function(b, c, d) {
            g(c);
            var e = k.create(b, c);
            return d && (e.options = a.extend(!0, {}, e.options || {}, d), d = e.options), e._create && a.isFunction(e._create) && e._create(d), 
            e;
        }), k[b] && (d[b] = function(a, c, d) {
            return f(d), k[b](a, c, d);
        }), k.defineProperties && (d.defineProperties = function(a, b) {
            return g(b), k.defineProperties(a, b);
        }), d.getOwnPropertyDescriptor = k.getOwnPropertyDescriptor, d.getPrototypeOf = k.getPrototypeOf;
    }(), u("swfmini", {
        test: function() {
            return window.swfobject && !window.swfmini && (window.swfmini = window.swfobject), 
            "swfmini" in window;
        },
        c: [ 16, 7, 2, 8, 1, 12, 19, 25, 23, 27 ]
    }), r.swfmini.test(), u("sizzle", {
        test: a.expr.filters
    }), u("$ajax", {
        test: a.ajax
    }), q("es5", {
        test: !(!h.ES5 || !Function.prototype.bind),
        c: [ 18, 19, 25, 20, 32 ]
    }), q("dom-extend", {
        f: e,
        noAutoCallback: !0,
        d: [ "es5" ],
        c: [ 16, 7, 2, 15, 30, 3, 8, 4, 9, 10, 25, 19, 20, 26, 31 ]
    }), q("geolocation", {
        test: h.geolocation,
        options: {
            destroyWrite: !0
        },
        d: [ "json-storage" ],
        c: [ 21 ],
        nM: "geolocation"
    }), function() {
        q("canvas", {
            src: "excanvas",
            test: h.canvas,
            options: {
                type: "flash"
            },
            noAutoCallback: !0,
            loadInit: function() {
                var a = this.options.type;
                !a || -1 === a.indexOf("flash") || r.swfmini.test() && !swfmini.hasFlashPlayerVersion("9.0.0") || (this.src = "flash" == a ? "FlashCanvas/flashcanvas" : "FlashCanvasPro/flashcanvas");
            },
            methodNames: [ "getContext" ],
            d: [ e ],
            nM: "canvas"
        });
    }(), function() {
        var b, c, f, g = "form-shim-extend", i = h.input, k = h.inputtypes, l = "formvalidation", n = "form-number-date-api", o = !1, p = !1, s = function() {
            var c, d, e;
            if (!s.run) {
                if (e = a('<fieldset><textarea required="" /></fieldset>')[0], j(l, !(!i.required || !i.pattern)), 
                j("fieldsetelements", d = "elements" in e), "disabled" in e) {
                    if (!d) try {
                        a("textarea", e).is(":invalid") && (e.disabled = !0, d = a("textarea", e).is(":valid"));
                    } catch (f) {}
                    j("fieldsetdisabled", d);
                }
                k && k.range && !window.opera && (c = a('<input type="range" style="-webkit-appearance: slider-horizontal; -moz-appearance: range;" />').appendTo("html"), 
                d = c.css("appearance"), c.remove(), j("csstrackrange", null == d || "range" == d), 
                j("cssrangeinput", "slider-horizontal" == d || "range" == d), j("styleableinputrange", h.csstrackrange || h.cssrangeinput)), 
                h[l] && (p = !(h.fieldsetdisabled && h.fieldsetelements && "value" in document.createElement("progress") && "value" in document.createElement("output")), 
                v.bustedValidity = o = window.opera || p || !i.list), b = h[l] && !o ? "form-native-extend" : g;
            }
            return s.run = !0, !1;
        };
        i && k && s(), document.createElement("datalist"), d.validationMessages = d.validityMessages = {
            langSrc: "i18n/formcfg-",
            availableLangs: [ "ar", "cs", "el", "es", "fr", "he", "hi", "hu", "it", "ja", "lt", "nl", "pl", "pt", "pt-BR", "pt-PT", "ru", "sv", "zh-CN" ]
        }, d.formcfg = a.extend({}, d.validationMessages), d.inputTypes = {}, q("form-core", {
            f: "forms",
            d: [ "es5" ],
            test: s,
            options: {
                placeholderType: "value",
                messagePopover: {},
                list: {
                    popover: {
                        constrainWidth: !0
                    }
                },
                iVal: {
                    sel: ".ws-validate",
                    handleBubble: "hide",
                    recheckDelay: 400
                }
            },
            methodNames: [ "setCustomValidity", "checkValidity", "setSelectionRange" ],
            c: [ 16, 7, 2, 8, 1, 15, 30, 3, 31 ],
            nM: "input"
        }), c = m.forms, q("form-native-extend", {
            f: "forms",
            test: function(b) {
                return !h[l] || o || -1 == a.inArray(n, b || []) || r[n].test();
            },
            d: [ "form-core", e, "form-message" ],
            c: [ 6, 5, 14, 29 ]
        }), q(g, {
            f: "forms",
            test: function() {
                return h[l] && !o;
            },
            d: [ "form-core", e, "sizzle" ],
            c: [ 16, 15, 24, 28 ]
        }), q(g + "2", {
            f: "forms",
            test: function() {
                return h[l] && !p;
            },
            d: [ g ],
            c: [ 24 ]
        }), q("form-message", {
            f: "forms",
            test: function(a) {
                return !(c.customMessages || !h[l] || o || !r[b].test(a));
            },
            d: [ e ],
            c: [ 16, 7, 15, 30, 3, 8, 4, 14, 28 ]
        }), f = {
            noAutoCallback: !0,
            options: c
        }, u("form-validation", a.extend({
            d: [ "form-message", "form-core" ]
        }, f)), u("form-validators", a.extend({}, f)), q(n, {
            f: "forms-ext",
            options: {
                types: "date time range number"
            },
            test: function() {
                var b = !0, c = this.options;
                return c._types || (c._types = c.types.split(" ")), s(), a.each(c._types, function(a, c) {
                    return c in k && !k[c] ? (b = !1, !1) : void 0;
                }), b;
            },
            methodNames: [ "stepUp", "stepDown" ],
            d: [ "forms", e ],
            c: [ 6, 5, 18, 17, 14, 28, 29, 32, 33 ],
            nM: "input inputtypes"
        }), u("range-ui", {
            options: {},
            noAutoCallback: !0,
            test: function() {
                return !!a.fn.rangeUI;
            },
            d: [ "es5" ],
            c: [ 6, 5, 9, 10, 18, 17, 11 ]
        }), q("form-number-date-ui", {
            f: "forms-ext",
            test: function() {
                var a = this.options;
                return s(), p && !a.replaceUI && /Android/i.test(navigator.userAgent) && (a.replaceUI = !0), 
                !a.replaceUI && r[n].test();
            },
            d: [ "forms", e, n, "range-ui" ],
            css: "styles/forms-ext.css",
            options: {
                widgets: {
                    calculateWidth: !0,
                    animate: !0
                }
            },
            c: [ 6, 5, 9, 10, 18, 17, 11 ]
        }), q("form-datalist", {
            f: "forms",
            test: function() {
                return s(), i.list && !c.fD;
            },
            d: [ "form-core", e ],
            c: [ 16, 7, 6, 2, 9, 15, 30, 31, 28, 32, 33 ]
        });
    }(), q("filereader", {
        test: "FileReader" in window,
        d: [ "swfmini", e ],
        c: [ 25, 26, 27 ]
    }), "details" in h || j("details", function() {
        return "open" in document.createElement("details");
    }), q("details", {
        test: h.details,
        d: [ e ],
        options: {
            text: "Details"
        },
        c: [ 21, 22 ]
    }), function() {
        d.mediaelement = {}, q("mediaelement-core", {
            f: "mediaelement",
            noAutoCallback: !0,
            options: {
                preferFlash: !1,
                vars: {},
                params: {},
                attrs: {},
                changeSWF: a.noop
            },
            methodNames: [ "play", "pause", "canPlayType", "mediaLoad:load" ],
            d: [ "swfmini" ],
            c: [ 16, 7, 2, 8, 1, 12, 13, 19, 25, 20, 23 ],
            nM: "audio video texttrackapi"
        }), q("mediaelement-jaris", {
            f: "mediaelement",
            d: [ "mediaelement-core", "swfmini", e ],
            test: function() {
                if (!h.audio || !h.video || d.mediaelement.loadSwf) return !1;
                var a = this.options;
                return a.preferFlash && !r.swfmini.test() && (a.preferFlash = !1), !(a.preferFlash && swfmini.hasFlashPlayerVersion("9.0.115"));
            },
            c: [ 21, 19, 25, 20 ]
        }), v.track = !h.texttrackapi, q("track", {
            options: {
                positionDisplay: !0,
                override: v.track
            },
            test: function() {
                return !this.options.override && !v.track;
            },
            d: [ "mediaelement", e ],
            methodNames: [ "addTextTrack" ],
            c: [ 21, 12, 13, 22 ],
            nM: "texttrackapi"
        }), u("track-ui", {
            d: [ "track", e ]
        });
    }(), q("feature-dummy", {
        test: !0,
        loaded: !0,
        c: w
    }), d.$ = a, d.M = h, window.webshims = d, d.callAsync = function() {
        d.callAsync = a.noop, a(document.scripts || "script").filter("[data-polyfill-cfg]").each(function() {
            try {
                d.setOptions(a(this).data("polyfillCfg"));
            } catch (b) {
                d.warn("error parsing polyfill cfg: " + b);
            }
        }).end().filter("[data-polyfill]").each(function() {
            d.polyfill(a.trim(a(this).data("polyfill") || ""));
        }), i && (i.cfg && (i.cfg.length || (i.cfg = [ [ i.cfg ] ]), a.each(i.cfg, function(a, b) {
            d.setOptions.apply(d, b);
        })), i.ready && a.each(i.ready, function(a, b) {
            d.ready.apply(d, b);
        }), i.lang && d.activeLang(i.lang), "polyfill" in i && d.polyfill(i.polyfill)), 
        d.isReady("jquery", !0);
    }, d.callAsync(), d;
});