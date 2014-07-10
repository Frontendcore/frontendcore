!function(a, b, c) {
    "use strict";
    function d(c) {
        if (e = b.documentElement, f = b.body, S(), gb = this, c = c || {}, lb = c.constants || {}, 
        c.easing) for (var d in c.easing) V[d] = c.easing[d];
        sb = c.edgeStrategy || "set", jb = {
            beforerender: c.beforerender,
            render: c.render
        }, kb = c.forceHeight !== !1, kb && (Hb = c.scale || 1), mb = c.mobileDeceleration || y, 
        ob = c.smoothScrolling !== !1, pb = c.smoothScrollingDuration || z, qb = {
            targetTop: gb.getScrollTop()
        }, Pb = (c.mobileCheck || function() {
            return /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent || navigator.vendor || a.opera);
        })(), Pb ? (ib = b.getElementById("skrollr-body"), ib && fb(), W(), Bb(e, [ s, v ], [ t ])) : Bb(e, [ s, u ], [ t ]), 
        gb.refresh(), vb(a, "resize orientationchange", function() {
            var a = e.clientWidth, b = e.clientHeight;
            (b !== Mb || a !== Lb) && (Mb = b, Lb = a, Nb = !0);
        });
        var g = T();
        return function h() {
            Z(), ub = g(h);
        }(), gb;
    }
    var e, f, g = a.skrollr = {
        get: function() {
            return gb;
        },
        init: function(a) {
            return gb || new d(a);
        },
        VERSION: "0.6.17"
    }, h = Object.prototype.hasOwnProperty, i = a.Math, j = a.getComputedStyle, k = "touchstart", l = "touchmove", m = "touchcancel", n = "touchend", o = "skrollable", p = o + "-before", q = o + "-between", r = o + "-after", s = "skrollr", t = "no-" + s, u = s + "-desktop", v = s + "-mobile", w = "linear", x = 1e3, y = .004, z = 200, A = "start", B = "end", C = "center", D = "bottom", E = "___skrollable_id", F = /^(?:input|textarea|button|select)$/i, G = /^\s+|\s+$/g, H = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/, I = /\s*([\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi, J = /^([a-z\-]+)\[(\w+)\]$/, K = /-([a-z])/g, L = function(a, b) {
        return b.toUpperCase();
    }, M = /[\-+]?[\d]*\.?[\d]+/g, N = /\{\?\}/g, O = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g, P = /[a-z\-]+-gradient/g, Q = "", R = "", S = function() {
        var a = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
        if (j) {
            var b = j(f, null);
            for (var c in b) if (Q = c.match(a) || +c == c && b[c].match(a)) break;
            if (!Q) return Q = R = "", void 0;
            Q = Q[0], "-" === Q.slice(0, 1) ? (R = Q, Q = {
                "-webkit-": "webkit",
                "-moz-": "Moz",
                "-ms-": "ms",
                "-o-": "O"
            }[Q]) : R = "-" + Q.toLowerCase() + "-";
        }
    }, T = function() {
        var b = a.requestAnimationFrame || a[Q.toLowerCase() + "RequestAnimationFrame"], c = Eb();
        return (Pb || !b) && (b = function(b) {
            var d = Eb() - c, e = i.max(0, 1e3 / 60 - d);
            return a.setTimeout(function() {
                c = Eb(), b();
            }, e);
        }), b;
    }, U = function() {
        var b = a.cancelAnimationFrame || a[Q.toLowerCase() + "CancelAnimationFrame"];
        return (Pb || !b) && (b = function(b) {
            return a.clearTimeout(b);
        }), b;
    }, V = {
        begin: function() {
            return 0;
        },
        end: function() {
            return 1;
        },
        linear: function(a) {
            return a;
        },
        quadratic: function(a) {
            return a * a;
        },
        cubic: function(a) {
            return a * a * a;
        },
        swing: function(a) {
            return -i.cos(a * i.PI) / 2 + .5;
        },
        sqrt: function(a) {
            return i.sqrt(a);
        },
        outCubic: function(a) {
            return i.pow(a - 1, 3) + 1;
        },
        bounce: function(a) {
            var b;
            if (.5083 >= a) b = 3; else if (.8489 >= a) b = 9; else if (.96208 >= a) b = 27; else {
                if (!(.99981 >= a)) return 1;
                b = 91;
            }
            return 1 - i.abs(3 * i.cos(a * b * 1.028) / b);
        }
    };
    d.prototype.refresh = function(a) {
        var d, e, f = !1;
        for (a === c ? (f = !0, hb = [], Ob = 0, a = b.getElementsByTagName("*")) : a = [].concat(a), 
        d = 0, e = a.length; e > d; d++) {
            var g = a[d], h = g, i = [], j = ob, k = sb;
            if (g.attributes) {
                for (var l = 0, m = g.attributes.length; m > l; l++) {
                    var n = g.attributes[l];
                    if ("data-anchor-target" !== n.name) if ("data-smooth-scrolling" !== n.name) if ("data-edge-strategy" !== n.name) {
                        var p = n.name.match(H);
                        if (null !== p) {
                            var q = {
                                props: n.value,
                                element: g
                            };
                            i.push(q);
                            var r = p[1];
                            r = r && lb[r.substr(1)] || 0;
                            var s = p[2];
                            /p$/.test(s) ? (q.isPercentage = !0, q.offset = ((0 | s.slice(0, -1)) + r) / 100) : q.offset = (0 | s) + r;
                            var t = p[3], u = p[4] || t;
                            t && t !== A && t !== B ? (q.mode = "relative", q.anchors = [ t, u ]) : (q.mode = "absolute", 
                            t === B ? q.isEnd = !0 : q.isPercentage || (q.frame = q.offset * Hb, delete q.offset));
                        }
                    } else k = n.value; else j = "off" !== n.value; else if (h = b.querySelector(n.value), 
                    null === h) throw 'Unable to find anchor target "' + n.value + '"';
                }
                if (i.length) {
                    var v, w, x;
                    !f && E in g ? (x = g[E], v = hb[x].styleAttr, w = hb[x].classAttr) : (x = g[E] = Ob++, 
                    v = g.style.cssText, w = Ab(g)), hb[x] = {
                        element: g,
                        styleAttr: v,
                        classAttr: w,
                        anchorTarget: h,
                        keyFrames: i,
                        smoothScrolling: j,
                        edgeStrategy: k
                    }, Bb(g, [ o ], []);
                }
            }
        }
        for (yb(), d = 0, e = a.length; e > d; d++) {
            var y = hb[a[d][E]];
            y !== c && ($(y), ab(y));
        }
        return gb;
    }, d.prototype.relativeToAbsolute = function(a, b, c) {
        var d = e.clientHeight, f = a.getBoundingClientRect(), g = f.top, h = f.bottom - f.top;
        return b === D ? g -= d : b === C && (g -= d / 2), c === D ? g += h : c === C && (g += h / 2), 
        g += gb.getScrollTop(), g + .5 | 0;
    }, d.prototype.animateTo = function(a, b) {
        b = b || {};
        var d = Eb(), e = gb.getScrollTop();
        return nb = {
            startTop: e,
            topDiff: a - e,
            targetTop: a,
            duration: b.duration || x,
            startTime: d,
            endTime: d + (b.duration || x),
            easing: V[b.easing || w],
            done: b.done
        }, nb.topDiff || (nb.done && nb.done.call(gb, !1), nb = c), gb;
    }, d.prototype.stopAnimateTo = function() {
        nb && nb.done && nb.done.call(gb, !0), nb = c;
    }, d.prototype.isAnimatingTo = function() {
        return !!nb;
    }, d.prototype.setScrollTop = function(b, c) {
        return rb = c === !0, Pb ? Qb = i.min(i.max(b, 0), Gb) : a.scrollTo(0, b), gb;
    }, d.prototype.getScrollTop = function() {
        return Pb ? Qb : a.pageYOffset || e.scrollTop || f.scrollTop || 0;
    }, d.prototype.getMaxScrollTop = function() {
        return Gb;
    }, d.prototype.on = function(a, b) {
        return jb[a] = b, gb;
    }, d.prototype.off = function(a) {
        return delete jb[a], gb;
    }, d.prototype.destroy = function() {
        var a = U();
        a(ub), xb(), Bb(e, [ t ], [ s, u, v ]);
        for (var b = 0, d = hb.length; d > b; b++) eb(hb[b].element);
        e.style.overflow = f.style.overflow = "auto", e.style.height = f.style.height = "auto", 
        ib && g.setStyle(ib, "transform", "none"), gb = c, ib = c, jb = c, kb = c, Gb = 0, 
        Hb = 1, lb = c, mb = c, Ib = "down", Jb = -1, Lb = 0, Mb = 0, Nb = !1, nb = c, ob = c, 
        pb = c, qb = c, rb = c, Ob = 0, sb = c, Pb = !1, Qb = 0, tb = c;
    };
    var W = function() {
        var d, g, h, j, o, p, q, r, s, t, u, v;
        vb(e, [ k, l, m, n ].join(" "), function(a) {
            var e = a.changedTouches[0];
            for (j = a.target; 3 === j.nodeType; ) j = j.parentNode;
            switch (o = e.clientY, p = e.clientX, t = a.timeStamp, F.test(j.tagName) || a.preventDefault(), 
            a.type) {
              case k:
                d && d.blur(), gb.stopAnimateTo(), d = j, g = q = o, h = p, s = t;
                break;

              case l:
                r = o - q, v = t - u, gb.setScrollTop(Qb - r, !0), q = o, u = t;
                break;

              default:
              case m:
              case n:
                var f = g - o, w = h - p, x = w * w + f * f;
                if (49 > x) {
                    if (!F.test(d.tagName)) {
                        d.focus();
                        var y = b.createEvent("MouseEvents");
                        y.initMouseEvent("click", !0, !0, a.view, 1, e.screenX, e.screenY, e.clientX, e.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, 0, null), 
                        d.dispatchEvent(y);
                    }
                    return;
                }
                d = c;
                var z = r / v;
                z = i.max(i.min(z, 3), -3);
                var A = i.abs(z / mb), B = z * A + .5 * mb * A * A, C = gb.getScrollTop() - B, D = 0;
                C > Gb ? (D = (Gb - C) / B, C = Gb) : 0 > C && (D = -C / B, C = 0), A *= 1 - D, 
                gb.animateTo(C + .5 | 0, {
                    easing: "outCubic",
                    duration: A
                });
            }
        }), a.scrollTo(0, 0), e.style.overflow = f.style.overflow = "hidden";
    }, X = function() {
        var a, b, c, d, f, g, h, j, k;
        for (j = 0, k = hb.length; k > j; j++) for (a = hb[j], b = a.element, c = a.anchorTarget, 
        d = a.keyFrames, f = 0, g = d.length; g > f; f++) {
            h = d[f];
            var l = h.offset;
            h.isPercentage && (l *= e.clientHeight, h.frame = l), "relative" === h.mode && (eb(b), 
            h.frame = gb.relativeToAbsolute(c, h.anchors[0], h.anchors[1]) - l, eb(b, !0)), 
            kb && !h.isEnd && h.frame > Gb && (Gb = h.frame);
        }
        for (Gb = i.max(Gb, zb()), j = 0, k = hb.length; k > j; j++) {
            for (a = hb[j], d = a.keyFrames, f = 0, g = d.length; g > f; f++) h = d[f], h.isEnd && (h.frame = Gb - h.offset);
            a.keyFrames.sort(Fb);
        }
    }, Y = function(a, b) {
        for (var c = 0, d = hb.length; d > c; c++) {
            var e, f, i = hb[c], j = i.element, k = i.smoothScrolling ? a : b, l = i.keyFrames, m = l[0].frame, n = l[l.length - 1].frame, s = m > k, t = k > n, u = l[s ? 0 : l.length - 1];
            if (s || t) {
                if (s && -1 === i.edge || t && 1 === i.edge) continue;
                switch (Bb(j, [ s ? p : r ], [ p, q, r ]), i.edge = s ? -1 : 1, i.edgeStrategy) {
                  case "reset":
                    eb(j);
                    continue;

                  case "ease":
                    k = u.frame;
                    break;

                  default:
                  case "set":
                    var v = u.props;
                    for (e in v) h.call(v, e) && (f = db(v[e].value), g.setStyle(j, e, f));
                    continue;
                }
            } else 0 !== i.edge && (Bb(j, [ o, q ], [ p, r ]), i.edge = 0);
            for (var w = 0, x = l.length - 1; x > w; w++) if (k >= l[w].frame && k <= l[w + 1].frame) {
                var y = l[w], z = l[w + 1];
                for (e in y.props) if (h.call(y.props, e)) {
                    var A = (k - y.frame) / (z.frame - y.frame);
                    A = y.props[e].easing(A), f = cb(y.props[e].value, z.props[e].value, A), f = db(f), 
                    g.setStyle(j, e, f);
                }
                break;
            }
        }
    }, Z = function() {
        Nb && (Nb = !1, yb());
        var a, b, d = gb.getScrollTop(), e = Eb();
        if (nb) e >= nb.endTime ? (d = nb.targetTop, a = nb.done, nb = c) : (b = nb.easing((e - nb.startTime) / nb.duration), 
        d = nb.startTop + b * nb.topDiff | 0), gb.setScrollTop(d, !0); else if (!rb) {
            var f = qb.targetTop - d;
            f && (qb = {
                startTop: Jb,
                topDiff: d - Jb,
                targetTop: d,
                startTime: Kb,
                endTime: Kb + pb
            }), e <= qb.endTime && (b = V.sqrt((e - qb.startTime) / pb), d = qb.startTop + b * qb.topDiff | 0);
        }
        if (Pb && ib && g.setStyle(ib, "transform", "translate(0, " + -Qb + "px) " + tb), 
        rb || Jb !== d) {
            Ib = d > Jb ? "down" : Jb > d ? "up" : Ib, rb = !1;
            var h = {
                curTop: d,
                lastTop: Jb,
                maxTop: Gb,
                direction: Ib
            }, i = jb.beforerender && jb.beforerender.call(gb, h);
            i !== !1 && (Y(d, gb.getScrollTop()), Jb = d, jb.render && jb.render.call(gb, h)), 
            a && a.call(gb, !1);
        }
        Kb = e;
    }, $ = function(a) {
        for (var b = 0, c = a.keyFrames.length; c > b; b++) {
            for (var d, e, f, g, h = a.keyFrames[b], i = {}; null !== (g = I.exec(h.props)); ) f = g[1], 
            e = g[2], d = f.match(J), null !== d ? (f = d[1], d = d[2]) : d = w, e = e.indexOf("!") ? _(e) : [ e.slice(1) ], 
            i[f] = {
                value: e,
                easing: V[d]
            };
            h.props = i;
        }
    }, _ = function(a) {
        var b = [];
        return O.lastIndex = 0, a = a.replace(O, function(a) {
            return a.replace(M, function(a) {
                return a / 255 * 100 + "%";
            });
        }), R && (P.lastIndex = 0, a = a.replace(P, function(a) {
            return R + a;
        })), a = a.replace(M, function(a) {
            return b.push(+a), "{?}";
        }), b.unshift(a), b;
    }, ab = function(a) {
        var b, c, d = {};
        for (b = 0, c = a.keyFrames.length; c > b; b++) bb(a.keyFrames[b], d);
        for (d = {}, b = a.keyFrames.length - 1; b >= 0; b--) bb(a.keyFrames[b], d);
    }, bb = function(a, b) {
        var c;
        for (c in b) h.call(a.props, c) || (a.props[c] = b[c]);
        for (c in a.props) b[c] = a.props[c];
    }, cb = function(a, b, c) {
        var d, e = a.length;
        if (e !== b.length) throw "Can't interpolate between \"" + a[0] + '" and "' + b[0] + '"';
        var f = [ a[0] ];
        for (d = 1; e > d; d++) f[d] = a[d] + (b[d] - a[d]) * c;
        return f;
    }, db = function(a) {
        var b = 1;
        return N.lastIndex = 0, a[0].replace(N, function() {
            return a[b++];
        });
    }, eb = function(a, b) {
        a = [].concat(a);
        for (var c, d, e = 0, f = a.length; f > e; e++) d = a[e], c = hb[d[E]], c && (b ? (d.style.cssText = c.dirtyStyleAttr, 
        Bb(d, c.dirtyClassAttr)) : (c.dirtyStyleAttr = d.style.cssText, c.dirtyClassAttr = Ab(d), 
        d.style.cssText = c.styleAttr, Bb(d, c.classAttr)));
    }, fb = function() {
        tb = "translateZ(0)", g.setStyle(ib, "transform", tb);
        var a = j(ib), b = a.getPropertyValue("transform"), c = a.getPropertyValue(R + "transform"), d = b && "none" !== b || c && "none" !== c;
        d || (tb = "");
    };
    g.setStyle = function(a, b, c) {
        var d = a.style;
        if (b = b.replace(K, L).replace("-", ""), "zIndex" === b) d[b] = isNaN(c) ? c : "" + (0 | c); else if ("float" === b) d.styleFloat = d.cssFloat = c; else try {
            Q && (d[Q + b.slice(0, 1).toUpperCase() + b.slice(1)] = c), d[b] = c;
        } catch (e) {}
    };
    var gb, hb, ib, jb, kb, lb, mb, nb, ob, pb, qb, rb, sb, tb, ub, vb = g.addEvent = function(b, c, d) {
        var e = function(b) {
            return b = b || a.event, b.target || (b.target = b.srcElement), b.preventDefault || (b.preventDefault = function() {
                b.returnValue = !1;
            }), d.call(this, b);
        };
        c = c.split(" ");
        for (var f, g = 0, h = c.length; h > g; g++) f = c[g], b.addEventListener ? b.addEventListener(f, d, !1) : b.attachEvent("on" + f, e), 
        Rb.push({
            element: b,
            name: f,
            listener: d
        });
    }, wb = g.removeEvent = function(a, b, c) {
        b = b.split(" ");
        for (var d = 0, e = b.length; e > d; d++) a.removeEventListener ? a.removeEventListener(b[d], c, !1) : a.detachEvent("on" + b[d], c);
    }, xb = function() {
        for (var a, b = 0, c = Rb.length; c > b; b++) a = Rb[b], wb(a.element, a.name, a.listener);
        Rb = [];
    }, yb = function() {
        var a = gb.getScrollTop();
        Gb = 0, kb && !Pb && (f.style.height = "auto"), X(), kb && !Pb && (f.style.height = Gb + e.clientHeight + "px"), 
        Pb ? gb.setScrollTop(i.min(gb.getScrollTop(), Gb)) : gb.setScrollTop(a, !0), rb = !0;
    }, zb = function() {
        var a = ib && ib.offsetHeight || 0, b = i.max(a, f.scrollHeight, f.offsetHeight, e.scrollHeight, e.offsetHeight, e.clientHeight);
        return b - e.clientHeight;
    }, Ab = function(b) {
        var c = "className";
        return a.SVGElement && b instanceof a.SVGElement && (b = b[c], c = "baseVal"), b[c];
    }, Bb = function(b, d, e) {
        var f = "className";
        if (a.SVGElement && b instanceof a.SVGElement && (b = b[f], f = "baseVal"), e === c) return b[f] = d, 
        void 0;
        for (var g = b[f], h = 0, i = e.length; i > h; h++) g = Db(g).replace(Db(e[h]), " ");
        g = Cb(g);
        for (var j = 0, k = d.length; k > j; j++) -1 === Db(g).indexOf(Db(d[j])) && (g += " " + d[j]);
        b[f] = Cb(g);
    }, Cb = function(a) {
        return a.replace(G, "");
    }, Db = function(a) {
        return " " + a + " ";
    }, Eb = Date.now || function() {
        return +new Date();
    }, Fb = function(a, b) {
        return a.frame - b.frame;
    }, Gb = 0, Hb = 1, Ib = "down", Jb = -1, Kb = Eb(), Lb = 0, Mb = 0, Nb = !1, Ob = 0, Pb = !1, Qb = 0, Rb = [];
}(window, document);