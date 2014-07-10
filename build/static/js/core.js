!function(a) {
    "use strict";
    var b = {
        version: "1.0.0",
        debugMode: !1,
        Module: null,
        Toolbox: null,
        Error: null,
        Utils: null
    };
    a.TinyCore = b, a.define && a.define("TinyCore", b);
}(this), function(a) {
    "use strict";
    var b = a.TinyCore, c = Object.prototype, d = c.hasOwnProperty, e = c.toString;
    Array.prototype.forEach || (Array.prototype.forEach = function(a, b) {
        var c, d;
        for (c = 0, d = this.length; d > c; ++c) c in this && a.call(b, this[c], c, this);
    }), Function.prototype.bind || (Function.prototype.bind = function(a) {
        if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var b = Array.prototype.slice.call(arguments, 1), c = this, d = function() {}, e = function() {
            return c.apply(this instanceof d && a ? this : a, b.concat(Array.prototype.slice.call(arguments)));
        };
        return d.prototype = this.prototype, e.prototype = new d(), e;
    }), String.prototype.trim || (String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "");
    });
    var f = {
        isClass: function(a, b) {
            return e.call(a) === "[object " + b + "]";
        },
        isFunction: function(a) {
            return f.isClass(a, "Function");
        },
        isObject: function(a) {
            return f.isClass(a, "Object");
        },
        isArray: function(a) {
            return f.isClass(a, "Array");
        },
        forEach: function(a, b) {
            if (a && f.isObject(a)) for (var c in a) d.call(a, c) && b(a[c], c);
        },
        extend: function() {
            for (var a = arguments, b = a.length, c = 1, d = a[0] || {}, e = function(a, b) {
                d[b] = f.isObject(a) ? f.extend(d[b], a) : a;
            }; b > c; c++) f.forEach(a[c], e);
            return d;
        },
        tryCatchDecorator: function(a, c, d) {
            if (c.__decorated__) return c;
            var e = function() {
                try {
                    return c.apply(a, arguments);
                } catch (e) {
                    b.Error.log(d + e.message);
                }
            };
            return e.__decorated__ = !0, e;
        },
        createModuleObject: function(a, b) {
            return a.apply(null, b);
        }
    };
    b.Utils = f;
}(this), function(a) {
    "use strict";
    var b = a.TinyCore, c = b.Utils, d = {}, e = -1, f = {
        request: function(a) {
            var b = d[a];
            return b && b.fpFactory && b.fpFactory(++e) || null;
        },
        register: function(a, b) {
            return d[a] || !c.isFunction(b) ? !1 : (d[a] = {
                fpFactory: b
            }, !0);
        }
    };
    b.Toolbox = f;
}(this), function(a) {
    "use strict";
    var b = a.TinyCore, c = {
        log: function(b) {
            a.console && a.console.error && a.console.error(b);
        },
        report: function(a) {
            if (b.debugMode) throw new Error(a);
            c.log(a);
        }
    };
    b.Error = c;
}(this), function(a) {
    "use strict";
    var b = a.TinyCore, c = b.Utils, d = b.Toolbox, e = b.Error, f = {}, g = {
        define: function(a, b, d) {
            return f[a] || !c.isFunction(d) ? !1 : (f[a] = {
                fpCreator: d,
                oInstances: {},
                aToolsNames: b
            }, !0);
        },
        start: function(a, b) {
            var c = g.getInstance(a);
            return c || (c = f[a].oInstances[a] = {
                oInstance: g.instantiate(a)
            }), c.bIsStarted || (c.oInstance.onStart(b), c.bIsStarted = !0), c.bIsStarted;
        },
        stop: function(a, b) {
            var d = g.getInstance(a);
            return d && d.oInstance ? (d.bIsStarted && (c.isFunction(d.oInstance.onStop) && d.oInstance.onStop(), 
            d.bIsStarted = !1), b ? (c.isFunction(d.oInstance.onDestroy) && d.oInstance.onDestroy(), 
            delete f[a], !0) : !d.bIsStarted) : !1;
        },
        instantiate: function(a) {
            var g, h, i = f[a], j = i.aToolsNames, k = j.length, l = [];
            for (i || e.report('The module "' + a + '" is not defined!'); k--; ) g = j[k], l.unshift(d.request(g));
            if (h = c.createModuleObject(i.fpCreator, l), b.debugMode) for (h.__tools__ = h.__tools__ || {}, 
            k = j.length; k--; ) h.__tools__[j[k]] = l[k]; else c.forEach(h, function(b, d) {
                c.isFunction(b) && (h[d] = c.tryCatchDecorator(h, b, 'Error in module "' + a + '" executing method "' + d + '": '));
            });
            return h;
        },
        getModules: function() {
            return f;
        },
        getInstance: function(a, b) {
            var c = f[a];
            return c || e.report('The module "' + a + '" is not defined!'), "undefined" == typeof b && (b = a), 
            c.oInstances[b];
        }
    };
    b.Module = g;
}(this);

var requirejs, require, define;

!function(Y) {
    function I(a) {
        return "[object Function]" === L.call(a);
    }
    function J(a) {
        return "[object Array]" === L.call(a);
    }
    function x(a, b) {
        if (a) {
            var c;
            for (c = 0; c < a.length && (!a[c] || !b(a[c], c, a)); c += 1) ;
        }
    }
    function M(a, b) {
        if (a) {
            var c;
            for (c = a.length - 1; c > -1 && (!a[c] || !b(a[c], c, a)); c -= 1) ;
        }
    }
    function r(a, b) {
        return da.call(a, b);
    }
    function i(a, b) {
        return r(a, b) && a[b];
    }
    function E(a, b) {
        for (var c in a) if (r(a, c) && b(a[c], c)) break;
    }
    function Q(a, b, c, d) {
        return b && E(b, function(b, e) {
            (c || !r(a, e)) && (d && "string" != typeof b ? (a[e] || (a[e] = {}), Q(a[e], b, c, d)) : a[e] = b);
        }), a;
    }
    function t(a, b) {
        return function() {
            return b.apply(a, arguments);
        };
    }
    function Z(a) {
        if (!a) return a;
        var b = Y;
        return x(a.split("."), function(a) {
            b = b[a];
        }), b;
    }
    function F(a, b, c, d) {
        return b = Error(b + "\nhttp://requirejs.org/docs/errors.html#" + a), b.requireType = a, 
        b.requireModules = d, c && (b.originalError = c), b;
    }
    function ea(a) {
        function b(a, b, c) {
            var d, e, f, g, h, j, k, l = b && b.split("/");
            d = l;
            var m = A.map, n = m && m["*"];
            if (a && "." === a.charAt(0)) if (b) {
                for (d = i(A.pkgs, b) ? l = [ b ] : l.slice(0, l.length - 1), b = a = d.concat(a.split("/")), 
                d = 0; b[d]; d += 1) if (e = b[d], "." === e) b.splice(d, 1), d -= 1; else if (".." === e) {
                    if (1 === d && (".." === b[2] || ".." === b[0])) break;
                    d > 0 && (b.splice(d - 1, 2), d -= 2);
                }
                d = i(A.pkgs, b = a[0]), a = a.join("/"), d && a === b + "/" + d.main && (a = b);
            } else 0 === a.indexOf("./") && (a = a.substring(2));
            if (c && (l || n) && m) {
                for (b = a.split("/"), d = b.length; d > 0; d -= 1) {
                    if (f = b.slice(0, d).join("/"), l) for (e = l.length; e > 0; e -= 1) if ((c = i(m, l.slice(0, e).join("/"))) && (c = i(c, f))) {
                        g = c, h = d;
                        break;
                    }
                    if (g) break;
                    !j && n && i(n, f) && (j = i(n, f), k = d);
                }
                !g && j && (g = j, h = k), g && (b.splice(0, h, g), a = b.join("/"));
            }
            return a;
        }
        function c(a) {
            z && x(document.getElementsByTagName("script"), function(b) {
                return b.getAttribute("data-requiremodule") === a && b.getAttribute("data-requirecontext") === v.contextName ? (b.parentNode.removeChild(b), 
                !0) : void 0;
            });
        }
        function d(a) {
            var b = i(A.paths, a);
            return b && J(b) && 1 < b.length ? (c(a), b.shift(), v.require.undef(a), v.require([ a ]), 
            !0) : void 0;
        }
        function e(a) {
            var b, c = a ? a.indexOf("!") : -1;
            return c > -1 && (b = a.substring(0, c), a = a.substring(c + 1, a.length)), [ b, a ];
        }
        function f(a, c, d, f) {
            var g, h, j = null, k = c ? c.name : null, l = a, m = !0, n = "";
            return a || (m = !1, a = "_@r" + (K += 1)), a = e(a), j = a[0], a = a[1], j && (j = b(j, k, f), 
            h = i(G, j)), a && (j ? n = h && h.normalize ? h.normalize(a, function(a) {
                return b(a, k, f);
            }) : b(a, k, f) : (n = b(a, k, f), a = e(n), j = a[0], n = a[1], d = !0, g = v.nameToUrl(n))), 
            d = !j || h || d ? "" : "_unnormalized" + (L += 1), {
                prefix: j,
                name: n,
                parentMap: c,
                unnormalized: !!d,
                url: g,
                originalName: l,
                isDefine: m,
                id: (j ? j + "!" + n : n) + d
            };
        }
        function g(a) {
            var b = a.id, c = i(B, b);
            return c || (c = B[b] = new v.Module(a)), c;
        }
        function h(a, b, c) {
            var d = a.id, e = i(B, d);
            !r(G, d) || e && !e.defineEmitComplete ? g(a).on(b, c) : "defined" === b && c(G[d]);
        }
        function j(a, b) {
            var c = a.requireModules, d = !1;
            b ? b(a) : (x(c, function(b) {
                (b = i(B, b)) && (b.error = a, b.events.error && (d = !0, b.emit("error", a)));
            }), d || l.onError(a));
        }
        function k() {
            R.length && (fa.apply(D, [ D.length - 1, 0 ].concat(R)), R = []);
        }
        function m(a, b, c) {
            var d = a.map.id;
            a.error ? a.emit("error", a.error) : (b[d] = !0, x(a.depMaps, function(d, e) {
                var f = d.id, g = i(B, f);
                g && !a.depMatched[e] && !c[f] && (i(b, f) ? (a.defineDep(e, G[f]), a.check()) : m(g, b, c));
            }), c[d] = !0);
        }
        function n() {
            var a, b, e, f, g = (e = 1e3 * A.waitSeconds) && v.startTime + e < new Date().getTime(), h = [], i = [], k = !1, l = !0;
            if (!s) {
                if (s = !0, E(B, function(e) {
                    if (a = e.map, b = a.id, e.enabled && (a.isDefine || i.push(e), !e.error)) if (!e.inited && g) d(b) ? k = f = !0 : (h.push(b), 
                    c(b)); else if (!e.inited && e.fetched && a.isDefine && (k = !0, !a.prefix)) return l = !1;
                }), g && h.length) return e = F("timeout", "Load timeout for modules: " + h, null, h), 
                e.contextName = v.contextName, j(e);
                l && x(i, function(a) {
                    m(a, {}, {});
                }), g && !f || !k || !z && !$ || y || (y = setTimeout(function() {
                    y = 0, n();
                }, 50)), s = !1;
            }
        }
        function o(a) {
            r(G, a[0]) || g(f(a[0], null, !0)).init(a[1], a[2]);
        }
        function p(a) {
            var a = a.currentTarget || a.srcElement, b = v.onScriptLoad;
            return a.detachEvent && !V ? a.detachEvent("onreadystatechange", b) : a.removeEventListener("load", b, !1), 
            b = v.onScriptError, (!a.detachEvent || V) && a.removeEventListener("error", b, !1), 
            {
                node: a,
                id: a && a.getAttribute("data-requiremodule")
            };
        }
        function q() {
            var a;
            for (k(); D.length; ) {
                if (a = D.shift(), null === a[0]) return j(F("mismatch", "Mismatched anonymous define() module: " + a[a.length - 1]));
                o(a);
            }
        }
        var s, u, v, w, y, A = {
            waitSeconds: 7,
            baseUrl: "./",
            paths: {},
            pkgs: {},
            shim: {},
            map: {},
            config: {}
        }, B = {}, C = {}, D = [], G = {}, H = {}, K = 1, L = 1;
        return w = {
            require: function(a) {
                return a.require ? a.require : a.require = v.makeRequire(a.map);
            },
            exports: function(a) {
                return a.usingExports = !0, a.map.isDefine ? a.exports ? a.exports : a.exports = G[a.map.id] = {} : void 0;
            },
            module: function(a) {
                return a.module ? a.module : a.module = {
                    id: a.map.id,
                    uri: a.map.url,
                    config: function() {
                        return A.config && i(A.config, a.map.id) || {};
                    },
                    exports: G[a.map.id]
                };
            }
        }, u = function(a) {
            this.events = i(C, a.id) || {}, this.map = a, this.shim = i(A.shim, a.id), this.depExports = [], 
            this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0;
        }, u.prototype = {
            init: function(a, b, c, d) {
                d = d || {}, this.inited || (this.factory = b, c ? this.on("error", c) : this.events.error && (c = t(this, function(a) {
                    this.emit("error", a);
                })), this.depMaps = a && a.slice(0), this.errback = c, this.inited = !0, this.ignore = d.ignore, 
                d.enabled || this.enabled ? this.enable() : this.check());
            },
            defineDep: function(a, b) {
                this.depMatched[a] || (this.depMatched[a] = !0, this.depCount -= 1, this.depExports[a] = b);
            },
            fetch: function() {
                if (!this.fetched) {
                    this.fetched = !0, v.startTime = new Date().getTime();
                    var a = this.map;
                    if (!this.shim) return a.prefix ? this.callPlugin() : this.load();
                    v.makeRequire(this.map, {
                        enableBuildCallback: !0
                    })(this.shim.deps || [], t(this, function() {
                        return a.prefix ? this.callPlugin() : this.load();
                    }));
                }
            },
            load: function() {
                var a = this.map.url;
                H[a] || (H[a] = !0, v.load(this.map.id, a));
            },
            check: function() {
                if (this.enabled && !this.enabling) {
                    var a, b, c = this.map.id;
                    b = this.depExports;
                    var d = this.exports, e = this.factory;
                    if (this.inited) {
                        if (this.error) this.emit("error", this.error); else if (!this.defining) {
                            if (this.defining = !0, 1 > this.depCount && !this.defined) {
                                if (I(e)) {
                                    if (this.events.error) try {
                                        d = v.execCb(c, e, b, d);
                                    } catch (f) {
                                        a = f;
                                    } else d = v.execCb(c, e, b, d);
                                    if (this.map.isDefine && ((b = this.module) && void 0 !== b.exports && b.exports !== this.exports ? d = b.exports : void 0 === d && this.usingExports && (d = this.exports)), 
                                    a) return a.requireMap = this.map, a.requireModules = [ this.map.id ], a.requireType = "define", 
                                    j(this.error = a);
                                } else d = e;
                                this.exports = d, this.map.isDefine && !this.ignore && (G[c] = d, l.onResourceLoad) && l.onResourceLoad(v, this.map, this.depMaps), 
                                delete B[c], this.defined = !0;
                            }
                            this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, 
                            this.emit("defined", this.exports), this.defineEmitComplete = !0);
                        }
                    } else this.fetch();
                }
            },
            callPlugin: function() {
                var a = this.map, c = a.id, d = f(a.prefix);
                this.depMaps.push(d), h(d, "defined", t(this, function(d) {
                    var e, k;
                    k = this.map.name;
                    var m = this.map.parentMap ? this.map.parentMap.name : null, n = v.makeRequire(a.parentMap, {
                        enableBuildCallback: !0
                    });
                    this.map.unnormalized ? (d.normalize && (k = d.normalize(k, function(a) {
                        return b(a, m, !0);
                    }) || ""), d = f(a.prefix + "!" + k, this.map.parentMap), h(d, "defined", t(this, function(a) {
                        this.init([], function() {
                            return a;
                        }, null, {
                            enabled: !0,
                            ignore: !0
                        });
                    })), (k = i(B, d.id)) && (this.depMaps.push(d), this.events.error && k.on("error", t(this, function(a) {
                        this.emit("error", a);
                    })), k.enable())) : (e = t(this, function(a) {
                        this.init([], function() {
                            return a;
                        }, null, {
                            enabled: !0
                        });
                    }), e.error = t(this, function(a) {
                        this.inited = !0, this.error = a, a.requireModules = [ c ], E(B, function(a) {
                            0 === a.map.id.indexOf(c + "_unnormalized") && delete B[a.map.id];
                        }), j(a);
                    }), e.fromText = t(this, function(b, d) {
                        var h = a.name, i = f(h), k = O;
                        d && (b = d), k && (O = !1), g(i), r(A.config, c) && (A.config[h] = A.config[c]);
                        try {
                            l.exec(b);
                        } catch (m) {
                            return j(F("fromtexteval", "fromText eval for " + c + " failed: " + m, m, [ c ]));
                        }
                        k && (O = !0), this.depMaps.push(i), v.completeLoad(h), n([ h ], e);
                    }), d.load(a.name, n, e, A));
                })), v.enable(d, this), this.pluginMaps[d.id] = d;
            },
            enable: function() {
                this.enabling = this.enabled = !0, x(this.depMaps, t(this, function(a, b) {
                    var c, d;
                    if ("string" == typeof a) {
                        if (a = f(a, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), 
                        this.depMaps[b] = a, c = i(w, a.id)) return this.depExports[b] = c(this), void 0;
                        this.depCount += 1, h(a, "defined", t(this, function(a) {
                            this.defineDep(b, a), this.check();
                        })), this.errback && h(a, "error", this.errback);
                    }
                    c = a.id, d = B[c], !r(w, c) && d && !d.enabled && v.enable(a, this);
                })), E(this.pluginMaps, t(this, function(a) {
                    var b = i(B, a.id);
                    b && !b.enabled && v.enable(a, this);
                })), this.enabling = !1, this.check();
            },
            on: function(a, b) {
                var c = this.events[a];
                c || (c = this.events[a] = []), c.push(b);
            },
            emit: function(a, b) {
                x(this.events[a], function(a) {
                    a(b);
                }), "error" === a && delete this.events[a];
            }
        }, v = {
            config: A,
            contextName: a,
            registry: B,
            defined: G,
            urlFetched: H,
            defQueue: D,
            Module: u,
            makeModuleMap: f,
            nextTick: l.nextTick,
            configure: function(a) {
                a.baseUrl && "/" !== a.baseUrl.charAt(a.baseUrl.length - 1) && (a.baseUrl += "/");
                var b = A.pkgs, c = A.shim, d = {
                    paths: !0,
                    config: !0,
                    map: !0
                };
                E(a, function(a, b) {
                    d[b] ? "map" === b ? Q(A[b], a, !0, !0) : Q(A[b], a, !0) : A[b] = a;
                }), a.shim && (E(a.shim, function(a, b) {
                    J(a) && (a = {
                        deps: a
                    }), !a.exports && !a.init || a.exportsFn || (a.exportsFn = v.makeShimExports(a)), 
                    c[b] = a;
                }), A.shim = c), a.packages && (x(a.packages, function(a) {
                    a = "string" == typeof a ? {
                        name: a
                    } : a, b[a.name] = {
                        name: a.name,
                        location: a.location || a.name,
                        main: (a.main || "main").replace(ga, "").replace(aa, "")
                    };
                }), A.pkgs = b), E(B, function(a, b) {
                    !a.inited && !a.map.unnormalized && (a.map = f(b));
                }), (a.deps || a.callback) && v.require(a.deps || [], a.callback);
            },
            makeShimExports: function(a) {
                return function() {
                    var b;
                    return a.init && (b = a.init.apply(Y, arguments)), b || a.exports && Z(a.exports);
                };
            },
            makeRequire: function(c, d) {
                function e(b, h, i) {
                    var k, m;
                    return d.enableBuildCallback && h && I(h) && (h.__requireJsBuild = !0), "string" == typeof b ? I(h) ? j(F("requireargs", "Invalid require call"), i) : c && r(w, b) ? w[b](B[c.id]) : l.get ? l.get(v, b, c) : (k = f(b, c, !1, !0), 
                    k = k.id, r(G, k) ? G[k] : j(F("notloaded", 'Module name "' + k + '" has not been loaded yet for context: ' + a + (c ? "" : ". Use require([])")))) : (q(), 
                    v.nextTick(function() {
                        q(), m = g(f(null, c)), m.skipMap = d.skipMap, m.init(b, h, i, {
                            enabled: !0
                        }), n();
                    }), e);
                }
                return d = d || {}, Q(e, {
                    isBrowser: z,
                    toUrl: function(a) {
                        var d, e = a.lastIndexOf("."), f = a.split("/")[0];
                        return -1 !== e && ("." !== f && ".." !== f || e > 1) && (d = a.substring(e, a.length), 
                        a = a.substring(0, e)), a = v.nameToUrl(b(a, c && c.id, !0), d || ".fake"), d ? a : a.substring(0, a.length - 5);
                    },
                    defined: function(a) {
                        return r(G, f(a, c, !1, !0).id);
                    },
                    specified: function(a) {
                        return a = f(a, c, !1, !0).id, r(G, a) || r(B, a);
                    }
                }), c || (e.undef = function(a) {
                    k();
                    var b = f(a, c, !0), d = i(B, a);
                    delete G[a], delete H[b.url], delete C[a], d && (d.events.defined && (C[a] = d.events), 
                    delete B[a]);
                }), e;
            },
            enable: function(a) {
                i(B, a.id) && g(a).enable();
            },
            completeLoad: function(a) {
                var b, c, e = i(A.shim, a) || {}, f = e.exports;
                for (k(); D.length; ) {
                    if (c = D.shift(), null === c[0]) {
                        if (c[0] = a, b) break;
                        b = !0;
                    } else c[0] === a && (b = !0);
                    o(c);
                }
                if (c = i(B, a), !b && !r(G, a) && c && !c.inited) {
                    if (A.enforceDefine && (!f || !Z(f))) return d(a) ? void 0 : j(F("nodefine", "No define call for " + a, null, [ a ]));
                    o([ a, e.deps || [], e.exportsFn ]);
                }
                n();
            },
            nameToUrl: function(a, b) {
                var c, d, e, f, g, h;
                if (l.jsExtRegExp.test(a)) f = a + (b || ""); else {
                    for (c = A.paths, d = A.pkgs, f = a.split("/"), g = f.length; g > 0; g -= 1) {
                        if (h = f.slice(0, g).join("/"), e = i(d, h), h = i(c, h)) {
                            J(h) && (h = h[0]), f.splice(0, g, h);
                            break;
                        }
                        if (e) {
                            c = a === e.name ? e.location + "/" + e.main : e.location, f.splice(0, g, c);
                            break;
                        }
                    }
                    f = f.join("/"), f += b || (/\?/.test(f) ? "" : ".js"), f = ("/" === f.charAt(0) || f.match(/^[\w\+\.\-]+:/) ? "" : A.baseUrl) + f;
                }
                return A.urlArgs ? f + ((-1 === f.indexOf("?") ? "?" : "&") + A.urlArgs) : f;
            },
            load: function(a, b) {
                l.load(v, a, b);
            },
            execCb: function(a, b, c, d) {
                return b.apply(d, c);
            },
            onScriptLoad: function(a) {
                ("load" === a.type || ha.test((a.currentTarget || a.srcElement).readyState)) && (P = null, 
                a = p(a), v.completeLoad(a.id));
            },
            onScriptError: function(a) {
                var b = p(a);
                return d(b.id) ? void 0 : j(F("scripterror", "Script error", a, [ b.id ]));
            }
        }, v.require = v.makeRequire(), v;
    }
    var l, w, B, D, s, H, P, K, ba, ca, ia = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm, ja = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, aa = /\.js$/, ga = /^\.\//;
    w = Object.prototype;
    var L = w.toString, da = w.hasOwnProperty, fa = Array.prototype.splice, z = !("undefined" == typeof window || !navigator || !document), $ = !z && "undefined" != typeof importScripts, ha = z && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/, V = "undefined" != typeof opera && "[object Opera]" === opera.toString(), C = {}, q = {}, R = [], O = !1;
    if ("undefined" == typeof define) {
        if ("undefined" != typeof requirejs) {
            if (I(requirejs)) return;
            q = requirejs, requirejs = void 0;
        }
        "undefined" != typeof require && !I(require) && (q = require, require = void 0), 
        l = requirejs = function(a, b, c, d) {
            var e, f = "_";
            return !J(a) && "string" != typeof a && (e = a, J(b) ? (a = b, b = c, c = d) : a = []), 
            e && e.context && (f = e.context), (d = i(C, f)) || (d = C[f] = l.s.newContext(f)), 
            e && d.configure(e), d.require(a, b, c);
        }, l.config = function(a) {
            return l(a);
        }, l.nextTick = "undefined" != typeof setTimeout ? function(a) {
            setTimeout(a, 4);
        } : function(a) {
            a();
        }, require || (require = l), l.version = "2.1.4", l.jsExtRegExp = /^\/|:|\?|\.js$/, 
        l.isBrowser = z, w = l.s = {
            contexts: C,
            newContext: ea
        }, l({}), x([ "toUrl", "undef", "defined", "specified" ], function(a) {
            l[a] = function() {
                var b = C._;
                return b.require[a].apply(b, arguments);
            };
        }), z && (B = w.head = document.getElementsByTagName("head")[0], D = document.getElementsByTagName("base")[0]) && (B = w.head = D.parentNode), 
        l.onError = function(a) {
            throw a;
        }, l.load = function(a, b, c) {
            var d, e = a && a.config || {};
            return z ? (d = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script"), 
            d.type = e.scriptType || "text/javascript", d.charset = "utf-8", d.async = !0, d.setAttribute("data-requirecontext", a.contextName), 
            d.setAttribute("data-requiremodule", b), !d.attachEvent || d.attachEvent.toString && 0 > d.attachEvent.toString().indexOf("[native code") || V ? (d.addEventListener("load", a.onScriptLoad, !1), 
            d.addEventListener("error", a.onScriptError, !1)) : (O = !0, d.attachEvent("onreadystatechange", a.onScriptLoad)), 
            d.src = c, K = d, D ? B.insertBefore(d, D) : B.appendChild(d), K = null, d) : ($ && (importScripts(c), 
            a.completeLoad(b)), void 0);
        }, z && M(document.getElementsByTagName("script"), function(a) {
            return B || (B = a.parentNode), (s = a.getAttribute("data-main")) ? (q.baseUrl || (H = s.split("/"), 
            ba = H.pop(), ca = H.length ? H.join("/") + "/" : "./", q.baseUrl = ca, s = ba), 
            s = s.replace(aa, ""), q.deps = q.deps ? q.deps.concat(s) : [ s ], !0) : void 0;
        }), define = function(a, b, c) {
            var d, e;
            "string" != typeof a && (c = b, b = a, a = null), J(b) || (c = b, b = []), !b.length && I(c) && c.length && (c.toString().replace(ia, "").replace(ja, function(a, c) {
                b.push(c);
            }), b = (1 === c.length ? [ "require" ] : [ "require", "exports", "module" ]).concat(b)), 
            O && ((d = K) || (P && "interactive" === P.readyState || M(document.getElementsByTagName("script"), function(a) {
                return "interactive" === a.readyState ? P = a : void 0;
            }), d = P), d && (a || (a = d.getAttribute("data-requiremodule")), e = C[d.getAttribute("data-requirecontext")])), 
            (e ? e.defQueue : R).push([ a, b, c ]);
        }, define.amd = {
            jQuery: !0
        }, l.exec = function(b) {
            return eval(b);
        }, l(q);
    }
}(this), !function(a) {
    "use strict";
    var b = a.TinyCore, c = b.Utils, d = b.Module;
    if (!a.require || !a.define) throw new Error("Cannot add AMD extension to TinyCore: require.js seems to be missing!");
    var e = {
        baseUrl: "modules"
    }, f = {
        require: c.extend({}, e)
    }, g = {
        config: function(b) {
            return "undefined" == typeof b ? f : (c.extend(f, b), a.require.config(f.require), 
            void 0);
        },
        setErrorHandler: function(b) {
            a.require.onError = b;
        },
        define: function(b, c, e) {
            a.define(b, c, function() {
                for (var a = [], f = c.length; f--; ) a.unshift(c[f].split("/").pop());
                d.define(b, a, e);
            });
        },
        require: function(b, c) {
            a.require(b, c);
        },
        requireAndStart: function(a, b) {
            var e = [];
            c.isArray(a) || (a = [ a ]), a.forEach(function(b, c) {
                "string" == typeof b && (a[c] = b = {
                    name: b,
                    startData: {}
                }), e.push(b.name);
            }), g.require(e, function() {
                a.forEach(function(a) {
                    d.start(a.name, a.startData);
                }), b && b(a);
            });
        }
    };
    g.setErrorHandler(function(a) {
        b.Error.log('Error loading module(s) "' + a.requireModules + '": ' + a.message);
    }), b.AMD = g;
}(this), function(a) {
    "use strict";
    var b = a.TinyCore, c = b.Utils, d = b.AMD, e = a.JSON, f = document, g = [], h = {
        nodesIgnored: {
            SCRIPT: !0,
            IFRAME: !0
        }
    }, i = "data-tc-modules", j = ";", k = new RegExp("([\\w-]+)(\\s*:\\s*({[^" + j + "]*}))?"), l = "data-tc-defer", m = ";", n = {}, o = {}, p = null, q = function() {
        return f.attachEvent ? function(a, b, c) {
            a.attachEvent("on" + b, c);
        } : function(a, b, c) {
            a.addEventListener(b, c, !1);
        };
    }(), r = function() {
        return f.detachEvent ? function(a, b, c) {
            a.detachEvent("on" + b, c);
        } : function(a, b, c) {
            a.removeEventListener(b, c, !1);
        };
    }(), s = function(a, b) {
        var c = a.getAttribute(b);
        return c = c ? c.trim() : "";
    }, t = function(a) {
        var b;
        for (o.nodesIgnored[a.nodeName] !== !0 && (b = s(a, i), b && u(a, b)), a = a.firstChild; a; ) 1 === a.nodeType && t(a), 
        a = a.nextSibling;
    }, u = function(a, b) {
        var c, d, e, f, h, i = b.split(j), o = [];
        i.forEach(function(b) {
            var c, d, e = b.match(k) || [], f = e[1] && e[1].trim();
            f && (c = e[3] && e[3].trim(), d = {
                name: f
            }, d.startData = c ? p(c) : {}, d.startData.element = a, o.push(d));
        }), c = s(a, l), c ? (d = c.split(m), d.forEach(function(b) {
            b && (e = b.split(":"), f = e[0] && e[0].trim(), h = e[1] && e[1].trim(), n[f] = n[f] || {}, 
            n[f][h] = n[f][h] || [], n[f][h].push({
                node: a,
                modulesData: o,
                typeVal: h
            }));
        })) : g = g.concat(o);
    }, v = function(a) {
        var b = function(b, c) {
            var d = c.node, e = function() {
                r(d, b, e), h(c.modulesData, a);
            };
            q(d, b, e);
        }, e = function(b, c) {
            setTimeout(function() {
                h(c, a);
            }, b);
        }, g = function(b) {
            var c = function(d) {
                var e = d.pageX || d.clientX + f.body.scrollLeft, g = d.pageY || d.clientY + f.body.scrollTop, i = [];
                b.forEach(function(b, c) {
                    var d = +b.typeVal, f = b.node.getBoundingClientRect(), j = f.left - d, k = f.right + d, l = f.top - d, m = f.bottom + d;
                    e >= j && k >= e && g >= l && m >= g && (i.push(c), h(b.modulesData, a));
                }), i.forEach(function(a) {
                    b.splice(a, 1);
                }), b.length || r(f, "mousemove", c);
            };
            q(f, "mousemove", c);
        }, h = function(a, b) {
            var c = [];
            a.forEach(function(a) {
                var b = a.name;
                n._loaded[b] || (n._loaded[b] = !0, c.push(a));
            }), c.length && d.requireAndStart(c, b);
        }, i = [];
        n._loaded = {}, c.forEach(n.event, function(a, c) {
            a.forEach(function(a) {
                b(c, a);
            });
        }), delete n.event, c.forEach(n.time, function(a, b) {
            var c = [];
            a.forEach(function(a) {
                c = c.concat(a.modulesData);
            }), e(b, c);
        }), delete n.time, c.forEach(n.distance, function(a) {
            i = i.concat(a);
        }), i.length && g(i), delete n.distance;
    }, w = {
        domBoot: function() {
            var a, h;
            c.isFunction(arguments[0]) ? (a = f.body, h = arguments[0]) : (a = arguments[0] || f.body, 
            h = arguments[1]), p = function(a) {
                return e.parse(a);
            }, b.debugMode || (p = c.tryCatchDecorator(null, p, "Error while booting from DOM! ")), 
            o = d.config().domBoot, g = [], t(a), g.length && d.requireAndStart(g, h), v(h);
        }
    };
    c.extend(d.config(), {
        domBoot: h
    }), c.extend(d, w);
}(this);

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
    }
};

if (!oGlobalSettings) var oGlobalSettings = {};

oGlobalSettings.sPathJs || (oGlobalSettings.sPathJs = "js/"), oGlobalSettings.sPathRoot || (oGlobalSettings.sPathRoot = oGlobalSettings.sPathJs + "../../"), 
oGlobalSettings.sPathJsModules || (oGlobalSettings.sPathJsModules = oGlobalSettings.sPathJs + "modules"), 
oGlobalSettings.sPathJsLibs || (oGlobalSettings.sPathJsLibs = oGlobalSettings.sPathJs + "../../"), 
oGlobalSettings.sPathJsCore || (oGlobalSettings.sPathJsCore = oGlobalSettings.sPathJs + "../../"), 
oGlobalSettings.sPathcss || (oGlobalSettings.sPathcss = "./css/"), oGlobalSettings.bTrackModules || (oGlobalSettings.bTrackModules = !1), 
oGlobalSettings.sHash || (oGlobalSettings.sHash = "1"), oGlobalSettings.aPaths || (oGlobalSettings.aPaths = {}), 
oGlobalSettings.sDevice || (oGlobalSettings.sDevice = "desktop");

for (var oModules = {}, aModules = [ "devicePackage", "sidemenuLibs", "codeLibs", "sortableLibs", "tagsLibs", "modalLibs", "autocompleteLibs", "autosizeLibs", "graphLibs", "statsLibs", "wysiwygLibs", "truncateLibs", "tipLibs", "cartLibs", "polyfillsLibs", "parallaxLibs" ], nKey = 0; nKey < aModules.length; nKey++) switch (aModules[nKey]) {
  case "devicePackage":
    oModules[aModules[nKey]] = void 0 !== oGlobalSettings.aPaths[aModules[nKey]] ? oGlobalSettings.aPaths[aModules[nKey]] : oGlobalSettings.sPathJsCore + "devices/" + oGlobalSettings.sDevice;
    break;

  case "wysiwygLibs":
    oModules[aModules[nKey]] = void 0 !== oGlobalSettings.aPaths[aModules[nKey]] ? oGlobalSettings.aPaths[aModules[nKey]] : oGlobalSettings.sPathRoot + "libs/tinyMCE/tinymce.min";
    break;

  default:
    oModules[aModules[nKey]] = void 0 !== oGlobalSettings.aPaths[aModules[nKey]] ? oGlobalSettings.aPaths[aModules[nKey]] : oGlobalSettings.sPathJsCore + "ui/" + aModules[nKey].replace("Libs", "");
}

TinyCore.AMD.config({
    require: {
        urlArgs: "v=" + oGlobalSettings.sHash,
        baseUrl: oGlobalSettings.sPathJsModules,
        paths: {
            libs: oGlobalSettings.sPathJsLibs,
            devicePackage: oModules.devicePackage,
            sidemenuLibs: oModules.sidemenuLibs,
            codeLibs: oModules.codeLibs,
            sortableLibs: oModules.sortableLibs,
            tagsLibs: oModules.tagsLibs,
            modalLibs: oModules.modalLibs,
            autocompleteLibs: oModules.autocompleteLibs,
            autosizeLibs: oModules.autosizeLibs,
            graphLibs: oModules.graphLibs,
            statsLibs: oModules.statsLibs,
            wysiwygLibs: oModules.wysiwygLibs,
            truncateLibs: oModules.truncateLibs,
            tipLibs: oModules.tipLibs,
            cartLibs: oModules.cartLibs,
            polyfillsLibs: oModules.polyfillsLibs,
            parallaxLibs: oModules.parallaxLibs
        }
    }
}), function() {
    var a = "onDomReady", b = !1, c = [];
    if (!window[a] || "function" != typeof window[a]) {
        var d = function() {
            if (!document.body) return setTimeout(d, 13);
            for (var a = 0; a < c.length; a++) c[a]();
            c = [];
        }, e = function() {
            if (document.addEventListener) {
                var a = function() {
                    document.removeEventListener("DOMContentLoaded", a, !1), d();
                };
                document.addEventListener("DOMContentLoaded", a, !1), window.addEventListener("load", d, !1);
            } else if (document.attachEvent) {
                var b = function() {
                    "complete" === document.readyState && (document.detachEvent("onreadystatechange", b), 
                    d());
                };
                document.attachEvent("onreadystatechange", b), window.attachEvent("onload", d);
                var e = !1;
                try {
                    e = null === window.frameElement;
                } catch (f) {}
                if (document.documentElement.doScroll && e) {
                    var g = function() {
                        if (0 !== c.length) {
                            try {
                                document.documentElement.doScroll("left");
                            } catch (a) {
                                return setTimeout(g, 1), void 0;
                            }
                            d();
                        }
                    };
                    g();
                }
            }
        };
        window[a] = function(a) {
            c.push(a), "complete" == document.readyState ? d() : b || (e(), b = !0);
        };
    }
}();

var FC = {};

if (FC.loadCSS = function(a) {
    a && oGlobalSettings.bCss && !document.getElementById(a) && $(document.body).append('<link rel="stylesheet" type="text/css" id="' + a + '" href="' + a + '" />');
}, FC.getDataModules = function(a) {
    return document.querySelectorAll('[data-tc-modules="' + a + '"]');
}, FC.mixOptions = function(a, b) {
    var c;
    for (c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
    return b;
}, void 0 === _gaq) var _gaq = null;

FC.trackEvent = function(a, b, c, d) {
    null !== _gaq && oGlobalSettings.bTrackModules && _gaq.push([ "_trackEvent", a, b, c, d ]);
}, FC.trackPage = function(a) {
    _gaq.push([ "_trackPageview", a ]);
}, TinyCore.AMD.define("responsive-images", [ "devicePackage" ], function() {
    return {
        onStart: function() {
            $("img").unveil(200), $(window).resize(function() {
                $("img").unveil(200);
            }), FC.trackEvent("JS_Libraries", "call", "responsive-images");
        },
        onStop: function() {
            this.sPathCss = null;
        },
        onDestroy: function() {
            delete this.sPathCss;
        }
    };
}), TinyCore.AMD.define("code", [ "devicePackage", "codeLibs" ], function() {
    return {
        sPathCss: oGlobalSettings.sPathCss + "ui/code.css",
        onStart: function() {
            var a = document.querySelectorAll('[data-tc-modules="code"]');
            FC.loadCSS(this.sPathCss), FC.trackEvent("JS_Libraries", "call", "code"), this.autobind(a);
        },
        autobind: function(a) {
            $(a).each(function(a, b) {
                hljs.highlightBlock(b);
            });
        },
        onStop: function() {
            this.sPathCss = null;
        },
        onDestroy: function() {
            delete this.sPathCss;
        }
    };
}), TinyCore.AMD.define("sortable", [ "devicePackage" ], function() {
    return {
        onStart: function() {
            var a = document.querySelectorAll('[data-tc-modules="sortable"]'), b = this;
            FC.trackEvent("JS_Libraries", "call", "sortable"), require([ "sortableLibs" ], function() {
                b.autobind(a);
            });
        },
        autobind: function(a) {
            $(a).each(function() {
                var a = {}, b = this;
                null !== b.getAttribute("data-tc-url") && (a.ajax_url = this.getAttribute("data-tc-url")), 
                a.object = null !== b.getAttribute("data-tc-object") ? this.getAttribute("data-tc-object") : "sortable", 
                null !== b.getAttribute("data-tc-handle") && (a.handle = this.getAttribute("data-tc-handle")), 
                $(this).sortable(a), void 0 !== a.ajax_url && null !== a.ajax_url && $(this).bind("sortupdate", function() {
                    $.ajax({
                        url: a.ajax_url,
                        data: {
                            order: $(b).serializeTree("id", a.object)
                        },
                        type: "POST",
                        dataType: "json"
                    });
                });
            });
        }
    };
}), TinyCore.AMD.define("tags", [ "devicePackage" ], function() {
    return {
        sPathCss: oGlobalSettings.sPathCss + "ui/tags.css",
        oDefault: {
            asHtmlID: !1,
            startText: "Add a tag...",
            emptyText: "No Results Found",
            preFill: {},
            limitText: "No More Selections Are Allowed",
            selectedItemProp: "value",
            selectedValuesProp: "value",
            searchObjProps: "value",
            queryParam: "q",
            retrieveLimit: !1,
            extraParams: "",
            matchCase: !1,
            minChars: 1,
            keyDelay: 400,
            resultsHighlight: !0,
            neverSubmit: !0,
            selectionLimit: !1,
            showResultList: !0
        },
        onStart: function() {
            var a = document.querySelectorAll('[data-tc-modules="tags"]'), b = this;
            FC.loadCSS(this.sPathCss), FC.trackEvent("JS_Libraries", "call", "tags"), require([ "tagsLibs" ], function() {
                b.autobind(a);
            });
        },
        autobind: function(a) {
            var b = this;
            $(a).each(function() {
                var a, c, d, e = {}, f = this, g = [], h = this.getAttribute("name"), i = !1;
                if (null !== f.getAttribute("required") && (i = !0), null !== f.getAttribute("data-tc-max") && (e.selectionLimit = f.getAttribute("data-tc-max")), 
                null !== f.getAttribute("data-tc-text-noresult") && (e.emptyText = f.getAttribute("data-tc-text-noresult")), 
                null !== f.getAttribute("data-tc-text-max") && (e.limitText = f.getAttribute("data-tc-text-max")), 
                e.preFill = "" !== f.value ? f.value : !1, "" !== f.placeholder && (e.startText = f.placeholder), 
                null !== f.getAttribute("data-tc-values")) {
                    c = f.getAttribute("data-tc-values").split(",");
                    for (var j in c) g.push({
                        value: c[j]
                    });
                } else g.push({
                    value: ""
                });
                i && (e.selectionRemoved = function(a) {
                    var b = $("input[name=" + h + "]");
                    "," == b.attr("value") && b.attr("value", ""), a.fadeTo("fast", 0, function() {
                        a.remove();
                    });
                }), a = FC.mixOptions(e, b.oDefault), $(f).autoSuggest(g, a).removeAttr("name"), 
                d = $(f).next(), d.attr("name", h), i && (d.attr("style", "position:absolute; height:1px; padding:0;").attr("type", "text").attr("required", "required"), 
                $(f).removeAttr("required"));
            });
        },
        onStop: function() {
            this.sPathCss = null;
        },
        onDestroy: function() {
            delete this.sPathCss;
        }
    };
}), TinyCore.AMD.define("truncate", [ "devicePackage" ], function() {
    return {
        oDefault: {
            max_length: 100,
            more: "[+]",
            less: "[-]"
        },
        onStart: function() {
            var a = document.querySelectorAll('[data-tc-modules="truncate"]'), b = this;
            FC.trackEvent("JS_Libraries", "call", "truncate"), require([ "truncateLibs" ], function() {
                b.autobind(a);
            });
        },
        autobind: function(a) {
            var b = this;
            $(a).each(function() {
                var a, c = {};
                null !== this.getAttribute("data-tc-max") && (c.max_length = this.getAttribute("data-tc-max")), 
                null !== this.getAttribute("data-tc-more") && (c.more = this.getAttribute("data-tc-more")), 
                null !== this.getAttribute("data-tc-less") && (c.less = this.getAttribute("data-tc-less")), 
                a = FC.mixOptions(c, b.oDefault), $(this).truncate(a);
            });
        },
        onStop: function() {
            this.sPathCss = null;
        },
        onDestroy: function() {
            delete this.sPathCss;
        }
    };
}), TinyCore.AMD.define("tabs", [ "devicePackage" ], function() {
    return {
        onStart: function() {
            var a = document.querySelectorAll('[data-tc-modules="tabs"]');
            FC.loadCSS(this.sPathCss), FC.trackEvent("JS_Libraries", "call", "tabs"), this.autobind(a);
        },
        autobind: function(a) {
            var b = this;
            $(a).each(function() {
                var a, c = this, d = null, e = b.getTabsInfo(c);
                $(c).addClass("tab-container"), a = b.createDesktopTabs(e);
                for (var f = 0; f < e.length; f++) $(document.getElementById(e[f].id)).before(b.createMobileTabs(e[f].id, e[f].name));
                $(this).prepend(a), $("a.update-tabs", c).bind("click", function(a) {
                    a.preventDefault();
                    var d = (a.srcElement || a.target).href;
                    -1 !== d.indexOf("#") && b.updateTabs(c, d.split("#")[1]);
                }), null === d && (d = $("nav li:first a", c)[0]), b.updateTabs(c, d.href.split("#")[1]);
            });
        },
        toggleTabs: function(a) {
            $(a).each(function() {
                $(this).bind("click", function(a) {
                    a.preventDefault();
                    var b = this.href;
                    -1 !== b.indexOf("#") && $(document.getElementById(b.split("#")[1])).slideToggle();
                });
            });
        },
        getTabsInfo: function(a) {
            var b = {};
            return $("> section", a).each(function(a) {
                var c = this;
                b[a] = {}, b[a].id = this.id, b[a].name = null !== c.getAttribute("data-tc-name") ? c.getAttribute("data-tc-name") : c.id.replace("-", " "), 
                b.length = a + 1;
            }), b;
        },
        createDesktopTabs: function(a) {
            var b = document.createElement("nav"), c = document.createElement("ul"), d = "";
            b.className = "tabs";
            for (var e = 0; e < a.length; e++) d += '<li id="' + a[e].id + '-li"><a href="#' + a[e].id + '" class="update-tabs">' + a[e].name + "</a></li>";
            return c.innerHTML = d, b.innerHTML = c.outerHTML, b;
        },
        createMobileTabs: function(a, b) {
            var c = document.createElement("header"), d = document.createElement("a"), e = b;
            return c.className = "tab", c.id = a + "-header", d.innerHTML = e, d.href = "#" + a, 
            d.className = "update-tabs", c.innerHTML = d.outerHTML, c;
        },
        updateTabs: function(a, b) {
            $("> nav a.update-tabs, > header.tab a.update-tabs", a).each(function() {
                var a = $("#" + this.href.split("#")[1]), c = this.href.split("#")[1], d = $(document.getElementById(c + "-li")), e = $(document.getElementById(c + "-header"));
                -1 !== this.href.indexOf(b) ? (d.addClass("active"), e.addClass("active"), a.fadeIn()) : (d.removeClass("active"), 
                e.removeClass("active"), a.hide());
            });
        }
    };
}), TinyCore.AMD.define("autocomplete", [ "devicePackage" ], function() {
    return {
        sPathCss: oGlobalSettings.sPathCss + "ui/autocomplete.css",
        oDefault: {
            limit: 12
        },
        onStart: function() {
            var a = FC.getDataModules("autocomplete"), b = this;
            FC.loadCSS(this.sPathCss), FC.trackEvent("JS_Libraries", "call", "autocomplete"), 
            require([ "autocompleteLibs" ], function() {
                $(a).each(function() {
                    b.autobind(this);
                });
            });
        },
        autobind: function(a, b) {
            var c, d, e = this, f = {}, g = $(a), h = a.getAttribute("data-tc-values"), i = {};
            if (f.source = [], void 0 === b && null !== h) {
                d = a.getAttribute("data-tc-values").split(","), console.log(d);
                for (var j = 0; d.length > j; j++) i = {}, i.value = d[j], i.label = d[j], f.source.push(i);
            }
            c = FC.mixOptions(f, e.oDefault), g.autocompleter(c);
        },
        onStop: function() {
            this.sPathCss = null, this.oDefault = null;
        },
        onDestroy: function() {
            delete this.sPathCss, delete this.oDefault;
        }
    };
}), TinyCore.AMD.define("autosize", [ "devicePackage" ], function() {
    return {
        onStart: function() {
            var a = FC.getDataModules("autosize"), b = this;
            FC.trackEvent("JS_Libraries", "call", "autosize"), require([ "autosizeLibs" ], function() {
                $(a).each(function() {
                    b.autobind(this);
                });
            });
        },
        autobind: function(a) {
            $(a).addClass("animated height"), $(a).autosize();
        }
    };
}), TinyCore.AMD.define("modal", [ "devicePackage" ], function() {
    return {
        sPathCss: oGlobalSettings.sPathCss + "ui/modal.css",
        oDefault: {
            maxWidth: "95%",
            maxHeight: "95%",
            onComplete: function() {
                TinyCore.AMD.domBoot(document.getElementById("cboxLoadedContent"));
            }
        },
        onStart: function() {
            var a = document.querySelectorAll('[data-tc-modules="modal"]'), b = this;
            FC.loadCSS(this.sPathCss), FC.trackEvent("JS_Libraries", "call", "modal"), require([ "modalLibs" ], function() {
                b.autobind(a);
            });
        },
        autobind: function(a) {
            var b, c, d, e = this;
            $(a).each(function() {
                var a, f = {};
                if (d = this.href, -1 != this.className.indexOf("group")) {
                    c = this.className.split(" "), b = "";
                    for (var g = 0; g < c.length; g++) -1 != c[g].indexOf("group") && (b = c[g]);
                }
                b && (f.rel = b), -1 !== d.indexOf("#") ? (f.inline = !0, f.href = "#" + d.split("#")[1]) : (f.iframe = -1 === d.indexOf(".jpg") && -1 === d.indexOf(".png") && -1 === d.indexOf(".gif") && -1 === d.indexOf(".bmp") ? !0 : !1, 
                f.inline = !1, f.href = d), f.width = null !== this.getAttribute("data-tc-width") ? this.getAttribute("data-tc-width") : !1, 
                f.height = null !== this.getAttribute("data-tc-height") ? this.getAttribute("data-tc-height") : !1, 
                a = FC.mixOptions(f, e.oDefault), $(this).colorbox(a);
            });
        },
        open: function(a) {
            var b = this, c = FC.mixOptions(a, b.oDefault);
            (void 0 !== c.sUrl || "#" !== c.sUrl) && $.colorbox(c);
        },
        close: function() {
            $.colorbox.close();
        },
        onStop: function() {
            this.sPathCss = null, this.oDefault = null;
        },
        onDestroy: function() {
            delete this.sPathCss, delete this.oDefault;
        }
    };
}), TinyCore.AMD.define("wysiwyg", [ "devicePackage", "wysiwygLibs" ], function() {
    return {
        sPathCss: oGlobalSettings.sPathCss + "ui/tags.css",
        oDefault: {
            selector: ".js-wysiwyg",
            menubar: !1,
            plugins: [ "advlist autolink lists link image charmap print preview anchor pagebreak", "searchreplace visualblocks code fullscreen spellchecker searchreplace", "insertdatetime media table paste autoresize" ],
            setup: function(a) {
                a.on("change", function() {
                    tinyMCE.triggerSave();
                });
            },
            language: "en",
            spellchecker_language: "en",
            spellchecker_rpc_url: "http://" + document.domain + "/spellchecker",
            extended_valid_elements: "-strong,-h2,-h3,-span,-i,-em,-p abbr[title|lang],acronym[title|lang],code[class],object[*],embed[*],param[*],uvinum:product[*]",
            invalid_elements: "font,h1,h4,h5,h6,span",
            toolbar: "styleselect |  bold italic underline | alignleft aligncenter alignright alignjustify |  bullist numlist | image media | link | pagebreak | searchreplace | undo redo | spellchecker | code ",
            relative_urls: !1,
            button_tile_map: !0,
            cleanup_on_startup: !0,
            paste_as_text: !0,
            paste_auto_cleanup_on_paste: !0,
            paste_convert_middot_lists: !0,
            remove_script_host: !0,
            theme_advanced_blockformats: "h2,h3,p,address,pre,code",
            autoresize_min_height: 200,
            autoresize_max_height: 600,
            entity_encoding: "raw",
            content_css: oGlobalSettings.sPathJs + "libs/tinyMCE/skins/lightgray/content.min.css"
        },
        onStart: function() {
            var a = document.querySelectorAll('[data-tc-modules="wysiwyg"]');
            FC.loadCSS(this.sPathCss), FC.trackEvent("JS_Libraries", "call", "wysiwyg"), this.autobind(a);
        },
        autobind: function(a) {
            var b = this;
            $(a).each(function() {
                var a, c = {}, d = this, e = [], f = 0;
                if (d.className += " js-wysiwyg", null !== d.getAttribute("data-tc-plugins")) for (e = d.getAttribute("data-tc-plugins").split(","), 
                c.plugins = []; f < e.length; f++) c.plugins.push(e[f]);
                null !== this.getAttribute("data-tc-language") && (c.language = this.getAttribute("data-tc-language"), 
                c.spellchecker_language = this.getAttribute("data-tc-language")), null !== this.getAttribute("data-tc-invalid") && (c.invalid_elements = this.getAttribute("data-tc-invalid")), 
                null !== this.getAttribute("data-tc-toolbar") && (c.toolbar1 = this.getAttribute("data-tc-toolbar")), 
                null !== this.getAttribute("data-tc-toolbar-2") && (c.toolbar2 = this.getAttribute("data-tc-toolbar-2")), 
                null !== this.getAttribute("data-tc-spellchecker") && (c.spellchecker_rpc_url = this.getAttribute("data-tc-spellchecker")), 
                null !== this.getAttribute("data-tc-extended-valid-elements") && (c.extended_valid_elements = this.getAttribute("data-tc-extended-valid-elements")), 
                null !== this.getAttribute("data-tc-css") && (c.content_css = this.getAttribute("data-tc-css")), 
                null !== this.getAttribute("data-tc-maxHeight") && (c.autoresize_max_height = this.getAttribute("data-tc-maxHeight")), 
                null !== this.getAttribute("data-tc-encoding") && (c.entity_encoding = this.getAttribute("data-tc-encoding")), 
                a = FC.mixOptions(c, b.oDefault), tinymce.init(a), setTimeout(function() {
                    d.style.display = "block", d.style.height = "30px", d.style.marginTop = "-30px";
                }, 500);
            });
        },
        onStop: function() {
            this.sPathCss = null;
        },
        onDestroy: function() {
            delete this.sPathCss;
        }
    };
}), TinyCore.AMD.define("stats", [ "devicePackage" ], function() {
    return {
        sPathCss: oGlobalSettings.sPathCss + "ui/stats.css",
        oDefault: {
            type: "bar",
            table: "modal",
            height: "300",
            width: "420",
            pieMargin: "10"
        },
        onStart: function() {
            var a = document.querySelectorAll('[data-tc-modules="stats"]'), b = this;
            FC.loadCSS(this.sPathCss), FC.trackEvent("JS_Libraries", "call", "graph"), require([ "statsLibs" ], function() {
                b.autobind(a);
            });
        },
        autobind: function(a) {
            var b = this;
            $(a).each(function() {
                var a, c, d, e, f, g, h, i = {}, j = this.getAttribute("data-tc-table"), k = String.fromCharCode(65 + Math.floor(26 * Math.random())), l = k + Date.now();
                null !== this.getAttribute("data-tc-type") && (i.type = this.getAttribute("data-tc-type")), 
                null !== this.getAttribute("data-tc-height") && (i.type = this.getAttribute("data-tc-height")), 
                null !== this.getAttribute("data-tc-width") ? i.width = this.getAttribute("data-tc-width") : (f = $(this).parent(), 
                g = parseInt(f.css("padding-left"), 10), h = parseInt(f.css("padding-right"), 10), 
                i.width = f.width() - (g + h + 44)), "hide" === j && (this.style.display = "none"), 
                a = FC.mixOptions(i, b.oDefault), "down" === j ? $(this).visualize(a).insertBefore(this) : $(this).visualize(a), 
                (null === j || "modal" === j) && (c = document.createElement("a"), c.id = l + 1, 
                c.href = "#" + l, c.className = "icon-table visualize-icon-table", c.setAttribute("data-tc-modules", "modal"), 
                $(this).before(c), e = document.createElement("div"), e.id = l, e.className = "box-text", 
                e.innerHTML = this.outerHTML, d = document.createElement("div"), d.className = "hidden", 
                d.innerHTML = e.outerHTML, $(this).before(d), $(this).remove(), TinyCore.AMD.domBoot(document.getElementById(l + 1)));
            });
        },
        onStop: function() {
            this.oDefault = null;
        },
        onDestroy: function() {
            delete this.oDefault;
        }
    };
});

var oPolyfills = {};

TinyCore.AMD.define("polyfills", [ "devicePackage" ], function() {
    return {
        sPathCss: oGlobalSettings.sPathCss + "ui/modal.css",
        onStart: function() {
            for (var a = [ "video", "audio", "source" ], b = Modernizr.inputtypes.date + Modernizr.inputtypes.email + Modernizr.inputtypes.number + Modernizr.inputtypes.month + Modernizr.inputtypes.range + Modernizr.inputtypes.datetime, c = document.getElementsByTagName("input"), d = [], e = !1, f = 0; f < c.length; f++) d.push(c[f].type);
            e = d.indexOf("date") + d.indexOf("email") + d.indexOf("month") + d.indexOf("range") + d.indexOf("datetime"), 
            oPolyfills.shims = [], document.getElementsByTagName("form").length > 0 && (Modernizr.input.placeholder && Modernizr.input.required || oPolyfills.shims.push("forms"), 
            5 > b && oPolyfills.shims.push("forms-ext"));
            for (var g = 0; g < a.length; g++) void 0 === $(a[g])[0] || Modernizr[a[g]] || oPolyfills.shims.push(a[g]);
            oPolyfills.options = {
                basePath: oGlobalSettings.sPathJs + "shims/",
                waitReady: !1
            }, e > -5 && 5 > b && TinyCore.AMD.requireAndStart("loadPolyfills");
        }
    };
}), TinyCore.AMD.define("loadPolyfills", [ "polyfillsLibs" ], function() {
    return {
        sPathCss: oGlobalSettings.sPathCss + "ui/modal.css",
        onStart: function() {
            $.webshims.setOptions(oPolyfills.options), $.webshims.polyfill(oPolyfills.shims), 
            FC.trackEvent("JS_Libraries", "call", "polyfills");
        }
    };
}), TinyCore.AMD.define("toggle", [ "devicePackage" ], function() {
    return {
        aAnimations: [ "flash", "bounce", "shake", "tada", "pulse", "rubberband", "fade", "swing", "tada", "wobble", "flip", "rotate", "slide", "hinge", "roll" ],
        aVariations: [ [ "-in", "-out" ], [ "-up", "-down" ], [ "-left", "-right" ] ],
        onStart: function() {
            var a = document.querySelectorAll('[data-tc-modules="toggle"]'), b = this;
            FC.trackEvent("JS_Libraries", "call", "toggle"), $(a).each(function() {
                var a = this;
                null !== a.getAttribute("data-tc-class") ? b.toggleClass(a) : null !== a.getAttribute("data-tc-animation") ? b.toggleAnimation(a) : b.slideToggle(a);
            });
        },
        getOpositeAnimation: function(a) {
            for (var b, c, d = a || "", e = this.aVariations, f = 0; f < e.length; f++) b = e[f][0], 
            c = e[f][1], -1 !== a.indexOf(b) ? d = d.replace(b, c) : -1 !== a.indexOf(c) && (d = d.replace(c, b));
            return d;
        },
        cleanAnimations: function(a) {
            for (var b, c = this.aAnimations, d = a.split(" "), e = 0; e < c.length; e++) b = d.indexOf(c[e]), 
            -1 !== b && d.splice(b, 1);
            return b = d.indexOf("animated"), -1 == b && d.push("animated"), d.toString().replace(",", " ");
        },
        toggleAnimation: function(a) {
            var b, c = this;
            $(a).bind("click", function(d) {
                d.preventDefault();
                var e, f = this.href, g = a.getAttribute("data-tc-animation") || "", h = null;
                -1 !== f.indexOf("#") && (h = $(document.getElementById(f.split("#")[1]))), e = h.attr("class"), 
                b = c.getOpositeAnimation(g), h.attr("class", c.cleanAnimations(e)), h.removeClass(b).addClass(g), 
                $(this).attr("data-tc-animation", b);
            });
        },
        toggleClass: function(a) {
            $(a).bind("click", function(b) {
                b.preventDefault();
                var c = this.href, d = a.getAttribute("data-tc-class") || "";
                -1 !== c.indexOf("#") && $(document.getElementById(c.split("#")[1])).toggleClass(d, "bounce-out");
            });
        },
        slideToggle: function(a) {
            $(a).bind("click", function(a) {
                a.preventDefault();
                var b = this.href;
                -1 !== b.indexOf("#") && $(document.getElementById(b.split("#")[1])).slideToggle();
            });
        }
    };
}), TinyCore.AMD.define("tip", [ "devicePackage" ], function() {
    return {
        sPathCss: oGlobalSettings.sPathCss + "ui/tips.css",
        oDefault: {
            fixed: !0
        },
        onStart: function() {
            var a = FC.getDataModules("tip"), b = this;
            FC.loadCSS(this.sPathCss), FC.trackEvent("JS_Libraries", "call", "tip"), require([ "tipLibs" ], function() {
                $(a).each(function() {
                    b.autobind(this);
                });
            });
        },
        autobind: function(a) {
            var b, c = this, d = {};
            null !== a.getAttribute("data-tc-title") && (d.title = a.getAttribute("data-tc-title")), 
            null !== a.getAttribute("data-tc-content") && (d.content = a.getAttribute("data-tc-content")), 
            b = FC.mixOptions(d, c.oDefault), void 0 !== b.content && new Opentip(a, b.content, b);
        },
        onStop: function() {
            this.sPathCss = null, this.oDefault = null;
        },
        onDestroy: function() {
            delete this.sPathCss, delete this.oDefault;
        }
    };
}), TinyCore.AMD.define("sidemenu", [ "devicePackage" ], function() {
    return {
        sPathCss: oGlobalSettings.sPathCss + "ui/sidemenu.css",
        oDefault: {
            renaming: !1
        },
        onStart: function() {
            var a = document.querySelectorAll('[data-tc-modules="sidemenu"]'), b = this;
            FC.loadCSS(this.sPathCss), FC.trackEvent("JS_Libraries", "call", "sidemenu"), require([ "sidemenuLibs" ], function() {
                b.autobind(a);
            });
        },
        autobind: function(a) {
            var b = this;
            $(a).each(function() {
                var a, c = {}, d = this, e = this.href;
                null !== d.getAttribute("data-tc-position") && (c.side = this.getAttribute("data-tc-position")), 
                -1 !== e.indexOf("#") && (c.source = "#" + e.split("#")[1], c.name = e.split("#")[1] + "-" + new Date().getTime()), 
                a = FC.mixOptions(c, b.oDefault), $(this).sidr(a);
            });
        },
        onStop: function() {
            this.sPathCss = null;
        },
        onDestroy: function() {
            delete this.sPathCss;
        }
    };
}), TinyCore.AMD.define("loadSideMenu", [ "sidemenuLibs" ], function() {
    return {
        onStart: function() {}
    };
}), TinyCore.AMD.define("cart", [ "devicePackage", "cartLibs" ], function() {
    return {
        sPathCss: oGlobalSettings.sPathCss + "ui/cart.css",
        oDefault: {},
        onStart: function() {
            var a = this;
            simpleCart({
                cartColumns: [ {
                    view: function(a) {
                        return "<span>" + a.get("quantity") + "</span><div><a href='javascript:;' class='simpleCart_increment'><i class='icon-caret-up'></i> </a><a href='javascript:;' class='simpleCart_decrement'><i class='icon-caret-down'></i></a></div>";
                    },
                    attr: "custom"
                }, {
                    attr: "name",
                    label: !1
                }, {
                    view: "currency",
                    attr: "total",
                    label: !1
                } ],
                cartStyle: "div",
                checkout: {
                    type: "PayPal",
                    email: "you@yours.com"
                }
            }), FC.loadCSS(this.sPathCss), FC.trackEvent("JS_Libraries", "call", "autocomplete"), 
            $(document.getElementById("cart-link")).bind("click", function(b) {
                b.preventDefault(), a.autobind(this);
            }), simpleCart.init();
        },
        autobind: function(a) {
            var b = ($(a), $(document.getElementById(a.href.split("#")[1])));
            b.toggleClass("hidden");
        },
        onStop: function() {
            this.sPathCss = null, this.oDefault = null;
        },
        onDestroy: function() {
            delete this.sPathCss, delete this.oDefault;
        }
    };
}), TinyCore.AMD.define("parallax", [ "devicePackage" ], function() {
    return {
        onStart: function() {
            FC.getDataModules("parallax"), require([ "parallaxLibs" ], function() {
                skrollr.init();
            }), FC.trackEvent("JS_Libraries", "call", "parallax");
        }
    };
}), onDomReady(function() {
    TinyCore.AMD.domBoot(function(a) {
        for (var b = 0; b < a.length; b++) FC.trackEvent("JS_Libraries", "execute", a[b].name);
    }), oGlobalSettings.bResponsiveImages === !0 && (TinyCore.AMD.requireAndStart("responsive-images"), 
    FC.trackEvent("JS_Libraries", "execute", "responsive-images")), oGlobalSettings.bCart === !0 && (TinyCore.AMD.requireAndStart("cart"), 
    FC.trackEvent("JS_Libraries", "execute", "cart"));
});