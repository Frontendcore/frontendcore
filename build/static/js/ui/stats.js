document.createElement("canvas").getContext || !function() {
    function a() {
        return this.context_ || (this.context_ = new j(this));
    }
    function b(a, b) {
        var c = x.call(arguments, 2);
        return function() {
            return a.apply(b, c.concat(x.call(arguments)));
        };
    }
    function c(a) {
        var b = a.srcElement;
        switch (a.propertyName) {
          case "width":
            b.style.width = b.attributes.width.nodeValue + "px", b.getContext().clearRect();
            break;

          case "height":
            b.style.height = b.attributes.height.nodeValue + "px", b.getContext().clearRect();
        }
    }
    function d(a) {
        var b = a.srcElement;
        b.firstChild && (b.firstChild.style.width = b.clientWidth + "px", b.firstChild.style.height = b.clientHeight + "px");
    }
    function e() {
        return [ [ 1, 0, 0 ], [ 0, 1, 0 ], [ 0, 0, 1 ] ];
    }
    function f(a, b) {
        for (var c = e(), d = 0; 3 > d; d++) for (var f = 0; 3 > f; f++) {
            for (var g = 0, h = 0; 3 > h; h++) g += a[d][h] * b[h][f];
            c[d][f] = g;
        }
        return c;
    }
    function g(a, b) {
        b.fillStyle = a.fillStyle, b.lineCap = a.lineCap, b.lineJoin = a.lineJoin, b.lineWidth = a.lineWidth, 
        b.miterLimit = a.miterLimit, b.shadowBlur = a.shadowBlur, b.shadowColor = a.shadowColor, 
        b.shadowOffsetX = a.shadowOffsetX, b.shadowOffsetY = a.shadowOffsetY, b.strokeStyle = a.strokeStyle, 
        b.globalAlpha = a.globalAlpha, b.arcScaleX_ = a.arcScaleX_, b.arcScaleY_ = a.arcScaleY_, 
        b.lineScale_ = a.lineScale_;
    }
    function h(a) {
        var b, c = 1;
        if (a = String(a), "rgb" == a.substring(0, 3)) {
            var d = a.indexOf("(", 3), e = a.indexOf(")", d + 1), f = a.substring(d + 1, e).split(",");
            b = "#";
            for (var g = 0; 3 > g; g++) b += z[Number(f[g])];
            4 == f.length && "a" == a.substr(3, 1) && (c = f[3]);
        } else b = a;
        return {
            color: b,
            alpha: c
        };
    }
    function i(a) {
        switch (a) {
          case "butt":
            return "flat";

          case "round":
            return "round";

          case "square":
          default:
            return "square";
        }
    }
    function j(a) {
        this.m_ = e(), this.mStack_ = [], this.aStack_ = [], this.currentPath_ = [], this.strokeStyle = "#000", 
        this.fillStyle = "#000", this.lineWidth = 1, this.lineJoin = "miter", this.lineCap = "butt", 
        this.miterLimit = 1 * v, this.globalAlpha = 1, this.canvas = a;
        var b = a.ownerDocument.createElement("div");
        b.style.width = a.clientWidth + "px", b.style.height = a.clientHeight + "px", b.style.overflow = "hidden", 
        b.style.position = "absolute", a.appendChild(b), this.element_ = b, this.arcScaleX_ = 1, 
        this.arcScaleY_ = 1, this.lineScale_ = 1;
    }
    function k(a, b, c, d) {
        a.currentPath_.push({
            type: "bezierCurveTo",
            cp1x: b.x,
            cp1y: b.y,
            cp2x: c.x,
            cp2y: c.y,
            x: d.x,
            y: d.y
        }), a.currentX_ = d.x, a.currentY_ = d.y;
    }
    function l(a) {
        for (var b = 0; 3 > b; b++) for (var c = 0; 2 > c; c++) if (!isFinite(a[b][c]) || isNaN(a[b][c])) return !1;
        return !0;
    }
    function m(a, b, c) {
        if (l(b) && (a.m_ = b, c)) {
            var d = b[0][0] * b[1][1] - b[0][1] * b[1][0];
            a.lineScale_ = u(t(d));
        }
    }
    function n(a) {
        this.type_ = a, this.x0_ = 0, this.y0_ = 0, this.r0_ = 0, this.x1_ = 0, this.y1_ = 0, 
        this.r1_ = 0, this.colors_ = [];
    }
    function o() {}
    var p = Math, q = p.round, r = p.sin, s = p.cos, t = p.abs, u = p.sqrt, v = 10, w = v / 2, x = Array.prototype.slice, y = {
        init: function(a) {
            if (/MSIE/.test(navigator.userAgent) && !window.opera) {
                var c = a || document;
                c.createElement("canvas"), "complete" !== c.readyState ? c.attachEvent("onreadystatechange", b(this.init_, this, c)) : this.init_(c);
            }
        },
        init_: function(a) {
            if (a.namespaces.g_vml_ || a.namespaces.add("g_vml_", "urn:schemas-microsoft-com:vml", "#default#VML"), 
            a.namespaces.g_o_ || a.namespaces.add("g_o_", "urn:schemas-microsoft-com:office:office", "#default#VML"), 
            !a.styleSheets.ex_canvas_) {
                var b = a.createStyleSheet();
                b.owningElement.id = "ex_canvas_", b.cssText = "canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}g_vml_\\:*{behavior:url(#default#VML)}g_o_\\:*{behavior:url(#default#VML)}";
            }
            for (var c = a.getElementsByTagName("canvas"), d = 0; d < c.length; d++) this.initElement(c[d]);
        },
        initElement: function(b) {
            if (!b.getContext) {
                b.getContext = a, b.innerHTML = "", b.attachEvent("onpropertychange", c), b.attachEvent("onresize", d);
                var e = b.attributes;
                e.width && e.width.specified ? b.style.width = e.width.nodeValue + "px" : b.width = b.clientWidth, 
                e.height && e.height.specified ? b.style.height = e.height.nodeValue + "px" : b.height = b.clientHeight;
            }
            return b;
        }
    };
    y.init();
    for (var z = [], A = 0; 16 > A; A++) for (var B = 0; 16 > B; B++) z[16 * A + B] = A.toString(16) + B.toString(16);
    var C = j.prototype;
    C.clearRect = function() {
        this.element_.innerHTML = "";
    }, C.beginPath = function() {
        this.currentPath_ = [];
    }, C.moveTo = function(a, b) {
        var c = this.getCoords_(a, b);
        this.currentPath_.push({
            type: "moveTo",
            x: c.x,
            y: c.y
        }), this.currentX_ = c.x, this.currentY_ = c.y;
    }, C.lineTo = function(a, b) {
        var c = this.getCoords_(a, b);
        this.currentPath_.push({
            type: "lineTo",
            x: c.x,
            y: c.y
        }), this.currentX_ = c.x, this.currentY_ = c.y;
    }, C.bezierCurveTo = function(a, b, c, d, e, f) {
        var g = this.getCoords_(e, f), h = this.getCoords_(a, b), i = this.getCoords_(c, d);
        k(this, h, i, g);
    }, C.quadraticCurveTo = function(a, b, c, d) {
        var e = this.getCoords_(a, b), f = this.getCoords_(c, d), g = {
            x: this.currentX_ + 2 / 3 * (e.x - this.currentX_),
            y: this.currentY_ + 2 / 3 * (e.y - this.currentY_)
        }, h = {
            x: g.x + (f.x - this.currentX_) / 3,
            y: g.y + (f.y - this.currentY_) / 3
        };
        k(this, g, h, f);
    }, C.arc = function(a, b, c, d, e, f) {
        c *= v;
        var g = f ? "at" : "wa", h = a + s(d) * c - w, i = b + r(d) * c - w, j = a + s(e) * c - w, k = b + r(e) * c - w;
        h != j || f || (h += .125);
        var l = this.getCoords_(a, b), m = this.getCoords_(h, i), n = this.getCoords_(j, k);
        this.currentPath_.push({
            type: g,
            x: l.x,
            y: l.y,
            radius: c,
            xStart: m.x,
            yStart: m.y,
            xEnd: n.x,
            yEnd: n.y
        });
    }, C.rect = function(a, b, c, d) {
        this.moveTo(a, b), this.lineTo(a + c, b), this.lineTo(a + c, b + d), this.lineTo(a, b + d), 
        this.closePath();
    }, C.strokeRect = function(a, b, c, d) {
        var e = this.currentPath_;
        this.beginPath(), this.moveTo(a, b), this.lineTo(a + c, b), this.lineTo(a + c, b + d), 
        this.lineTo(a, b + d), this.closePath(), this.stroke(), this.currentPath_ = e;
    }, C.fillRect = function(a, b, c, d) {
        var e = this.currentPath_;
        this.beginPath(), this.moveTo(a, b), this.lineTo(a + c, b), this.lineTo(a + c, b + d), 
        this.lineTo(a, b + d), this.closePath(), this.fill(), this.currentPath_ = e;
    }, C.createLinearGradient = function(a, b, c, d) {
        var e = new n("gradient");
        return e.x0_ = a, e.y0_ = b, e.x1_ = c, e.y1_ = d, e;
    }, C.createRadialGradient = function(a, b, c, d, e, f) {
        var g = new n("gradientradial");
        return g.x0_ = a, g.y0_ = b, g.r0_ = c, g.x1_ = d, g.y1_ = e, g.r1_ = f, g;
    }, C.drawImage = function(a) {
        var b, c, d, e, f, g, h, i, j = a.runtimeStyle.width, k = a.runtimeStyle.height;
        a.runtimeStyle.width = "auto", a.runtimeStyle.height = "auto";
        var l = a.width, m = a.height;
        if (a.runtimeStyle.width = j, a.runtimeStyle.height = k, 3 == arguments.length) b = arguments[1], 
        c = arguments[2], f = g = 0, h = d = l, i = e = m; else if (5 == arguments.length) b = arguments[1], 
        c = arguments[2], d = arguments[3], e = arguments[4], f = g = 0, h = l, i = m; else {
            if (9 != arguments.length) throw Error("Invalid number of arguments");
            f = arguments[1], g = arguments[2], h = arguments[3], i = arguments[4], b = arguments[5], 
            c = arguments[6], d = arguments[7], e = arguments[8];
        }
        var n = this.getCoords_(b, c), o = [], r = 10, s = 10;
        if (o.push(" <g_vml_:group", ' coordsize="', v * r, ",", v * s, '"', ' coordorigin="0,0"', ' style="width:', r, "px;height:", s, "px;position:absolute;"), 
        1 != this.m_[0][0] || this.m_[0][1]) {
            var t = [];
            t.push("M11=", this.m_[0][0], ",", "M12=", this.m_[1][0], ",", "M21=", this.m_[0][1], ",", "M22=", this.m_[1][1], ",", "Dx=", q(n.x / v), ",", "Dy=", q(n.y / v), "");
            var u = n, w = this.getCoords_(b + d, c), x = this.getCoords_(b, c + e), y = this.getCoords_(b + d, c + e);
            u.x = p.max(u.x, w.x, x.x, y.x), u.y = p.max(u.y, w.y, x.y, y.y), o.push("padding:0 ", q(u.x / v), "px ", q(u.y / v), "px 0;filter:progid:DXImageTransform.Microsoft.Matrix(", t.join(""), ", sizingmethod='clip');");
        } else o.push("top:", q(n.y / v), "px;left:", q(n.x / v), "px;");
        o.push(' ">', '<g_vml_:image src="', a.src, '"', ' style="width:', v * d, "px;", " height:", v * e, 'px;"', ' cropleft="', f / l, '"', ' croptop="', g / m, '"', ' cropright="', (l - f - h) / l, '"', ' cropbottom="', (m - g - i) / m, '"', " />", "</g_vml_:group>"), 
        this.element_.insertAdjacentHTML("BeforeEnd", o.join(""));
    }, C.stroke = function(a) {
        var b = [], c = h(a ? this.fillStyle : this.strokeStyle), d = c.color, e = c.alpha * this.globalAlpha, f = 10, g = 10;
        b.push("<g_vml_:shape", ' filled="', !!a, '"', ' style="position:absolute;width:', f, "px;height:", g, 'px;"', ' coordorigin="0 0" coordsize="', v * f, " ", v * g, '"', ' stroked="', !a, '"', ' path="');
        for (var j = {
            x: null,
            y: null
        }, k = {
            x: null,
            y: null
        }, l = 0; l < this.currentPath_.length; l++) {
            var m, n = this.currentPath_[l];
            switch (n.type) {
              case "moveTo":
                m = n, b.push(" m ", q(n.x), ",", q(n.y));
                break;

              case "lineTo":
                b.push(" l ", q(n.x), ",", q(n.y));
                break;

              case "close":
                b.push(" x "), n = null;
                break;

              case "bezierCurveTo":
                b.push(" c ", q(n.cp1x), ",", q(n.cp1y), ",", q(n.cp2x), ",", q(n.cp2y), ",", q(n.x), ",", q(n.y));
                break;

              case "at":
              case "wa":
                b.push(" ", n.type, " ", q(n.x - this.arcScaleX_ * n.radius), ",", q(n.y - this.arcScaleY_ * n.radius), " ", q(n.x + this.arcScaleX_ * n.radius), ",", q(n.y + this.arcScaleY_ * n.radius), " ", q(n.xStart), ",", q(n.yStart), " ", q(n.xEnd), ",", q(n.yEnd));
            }
            n && ((null == j.x || n.x < j.x) && (j.x = n.x), (null == k.x || n.x > k.x) && (k.x = n.x), 
            (null == j.y || n.y < j.y) && (j.y = n.y), (null == k.y || n.y > k.y) && (k.y = n.y));
        }
        if (b.push(' ">'), a) if ("object" == typeof this.fillStyle) {
            var o = this.fillStyle, r = 0, s = {
                x: 0,
                y: 0
            }, t = 0, u = 1;
            if ("gradient" == o.type_) {
                var w = o.x0_ / this.arcScaleX_, x = o.y0_ / this.arcScaleY_, y = o.x1_ / this.arcScaleX_, z = o.y1_ / this.arcScaleY_, A = this.getCoords_(w, x), B = this.getCoords_(y, z), C = B.x - A.x, D = B.y - A.y;
                r = 180 * Math.atan2(C, D) / Math.PI, 0 > r && (r += 360), 1e-6 > r && (r = 0);
            } else {
                var A = this.getCoords_(o.x0_, o.y0_), E = k.x - j.x, F = k.y - j.y;
                s = {
                    x: (A.x - j.x) / E,
                    y: (A.y - j.y) / F
                }, E /= this.arcScaleX_ * v, F /= this.arcScaleY_ * v;
                var G = p.max(E, F);
                t = 2 * o.r0_ / G, u = 2 * o.r1_ / G - t;
            }
            var H = o.colors_;
            H.sort(function(a, b) {
                return a.offset - b.offset;
            });
            for (var I = H.length, J = H[0].color, K = H[I - 1].color, L = H[0].alpha * this.globalAlpha, M = H[I - 1].alpha * this.globalAlpha, N = [], l = 0; I > l; l++) {
                var O = H[l];
                N.push(O.offset * u + t + " " + O.color);
            }
            b.push('<g_vml_:fill type="', o.type_, '"', ' method="none" focus="100%"', ' color="', J, '"', ' color2="', K, '"', ' colors="', N.join(","), '"', ' opacity="', M, '"', ' g_o_:opacity2="', L, '"', ' angle="', r, '"', ' focusposition="', s.x, ",", s.y, '" />');
        } else b.push('<g_vml_:fill color="', d, '" opacity="', e, '" />'); else {
            var P = this.lineScale_ * this.lineWidth;
            1 > P && (e *= P), b.push("<g_vml_:stroke", ' opacity="', e, '"', ' joinstyle="', this.lineJoin, '"', ' miterlimit="', this.miterLimit, '"', ' endcap="', i(this.lineCap), '"', ' weight="', P, 'px"', ' color="', d, '" />');
        }
        b.push("</g_vml_:shape>"), this.element_.insertAdjacentHTML("beforeEnd", b.join(""));
    }, C.fill = function() {
        this.stroke(!0);
    }, C.closePath = function() {
        this.currentPath_.push({
            type: "close"
        });
    }, C.getCoords_ = function(a, b) {
        var c = this.m_;
        return {
            x: v * (a * c[0][0] + b * c[1][0] + c[2][0]) - w,
            y: v * (a * c[0][1] + b * c[1][1] + c[2][1]) - w
        };
    }, C.save = function() {
        var a = {};
        g(this, a), this.aStack_.push(a), this.mStack_.push(this.m_), this.m_ = f(e(), this.m_);
    }, C.restore = function() {
        g(this.aStack_.pop(), this), this.m_ = this.mStack_.pop();
    }, C.translate = function(a, b) {
        var c = [ [ 1, 0, 0 ], [ 0, 1, 0 ], [ a, b, 1 ] ];
        m(this, f(c, this.m_), !1);
    }, C.rotate = function(a) {
        var b = s(a), c = r(a), d = [ [ b, c, 0 ], [ -c, b, 0 ], [ 0, 0, 1 ] ];
        m(this, f(d, this.m_), !1);
    }, C.scale = function(a, b) {
        this.arcScaleX_ *= a, this.arcScaleY_ *= b;
        var c = [ [ a, 0, 0 ], [ 0, b, 0 ], [ 0, 0, 1 ] ];
        m(this, f(c, this.m_), !0);
    }, C.transform = function(a, b, c, d, e, g) {
        var h = [ [ a, b, 0 ], [ c, d, 0 ], [ e, g, 1 ] ];
        m(this, f(h, this.m_), !0);
    }, C.setTransform = function(a, b, c, d, e, f) {
        var g = [ [ a, b, 0 ], [ c, d, 0 ], [ e, f, 1 ] ];
        m(this, g, !0);
    }, C.clip = function() {}, C.arcTo = function() {}, C.createPattern = function() {
        return new o();
    }, n.prototype.addColorStop = function(a, b) {
        b = h(b), this.colors_.push({
            offset: a,
            color: b.color,
            alpha: b.alpha
        });
    }, G_vmlCanvasManager = y, CanvasRenderingContext2D = j, CanvasGradient = n, CanvasPattern = o;
}(), function(a) {
    a.fn.visualize = function(b, c) {
        return a(this).each(function() {
            function d() {
                var b = e.colors, c = e.textColors, d = {
                    dataGroups: function() {
                        var d = [];
                        if ("x" == e.parseDirection) f.find("tr:gt(0)").filter(e.rowFilter).each(function(f) {
                            d[f] = {}, d[f].points = [], d[f].color = b[f], c[f] && (d[f].textColor = c[f]), 
                            a(this).find("td").filter(e.colFilter).each(function() {
                                d[f].points.push(parseFloat(a(this).text()));
                            });
                        }); else for (var g = f.find("tr:eq(1) td").filter(e.colFilter).size(), h = 0; g > h; h++) d[h] = {}, 
                        d[h].points = [], d[h].color = b[h], c[h] && (d[h].textColor = c[h]), f.find("tr:gt(0)").filter(e.rowFilter).each(function() {
                            d[h].points.push(1 * a(this).find("td").filter(e.colFilter).eq(h).text());
                        });
                        return d;
                    },
                    allData: function() {
                        var b = [];
                        return a(this.dataGroups()).each(function() {
                            b.push(this.points);
                        }), b;
                    },
                    dataSum: function() {
                        var b = 0, c = this.allData().join(",").split(",");
                        return a(c).each(function() {
                            b += parseFloat(this);
                        }), b;
                    },
                    topValue: function() {
                        var b = 0, c = this.allData().join(",").split(",");
                        return a(c).each(function() {
                            parseFloat(this, 10) > b && (b = parseFloat(this));
                        }), b;
                    },
                    bottomValue: function() {
                        var b = 0, c = this.allData().join(",").split(",");
                        return a(c).each(function() {
                            b > this && (b = parseFloat(this));
                        }), b;
                    },
                    memberTotals: function() {
                        var b = [], c = this.dataGroups();
                        return a(c).each(function(d) {
                            var e = 0;
                            a(c[d].points).each(function(a) {
                                e += c[d].points[a];
                            }), b.push(e);
                        }), b;
                    },
                    yTotals: function() {
                        for (var b = [], c = this.dataGroups(), d = this.xLabels().length, e = 0; d > e; e++) {
                            b[e] = [];
                            var f = 0;
                            a(c).each(function() {
                                b[e].push(this.points[e]);
                            }), b[e].join(",").split(","), a(b[e]).each(function() {
                                f += parseFloat(this);
                            }), b[e] = f;
                        }
                        return b;
                    },
                    topYtotal: function() {
                        var b = 0, c = this.yTotals().join(",").split(",");
                        return a(c).each(function() {
                            parseFloat(this, 10) > b && (b = parseFloat(this));
                        }), b;
                    },
                    totalYRange: function() {
                        return this.topValue() - this.bottomValue();
                    },
                    xLabels: function() {
                        var b = [];
                        return "x" == e.parseDirection ? f.find("tr:eq(0) th").filter(e.colFilter).each(function() {
                            b.push(a(this).html());
                        }) : f.find("tr:gt(0) th").filter(e.rowFilter).each(function() {
                            b.push(a(this).html());
                        }), b;
                    },
                    yLabels: function() {
                        var a = [];
                        a.push(p);
                        for (var b = Math.round(e.height / e.yLabelInterval), c = Math.ceil(r / b) || 1; a[a.length - 1] < o - c; ) a.push(a[a.length - 1] + c);
                        return a.push(o), a;
                    }
                };
                return d;
            }
            var e = a.extend({
                type: "bar",
                width: a(this).width(),
                height: a(this).height(),
                appendTitle: !0,
                title: null,
                appendKey: !0,
                rowFilter: "*",
                colFilter: "*",
                colors: [ "#be1e2d", "#666699", "#92d5ea", "#ee8310", "#8d10ee", "#5a3b16", "#26a4ed", "#f45a90", "#e9e744" ],
                textColors: [],
                parseDirection: "x",
                pieMargin: 20,
                pieLabelsAsPercent: !0,
                pieLabelPos: "inside",
                lineWeight: 4,
                barGroupMargin: 10,
                barMargin: 1,
                yLabelInterval: 30
            }, b);
            e.width = parseFloat(e.width), e.height = parseFloat(e.height);
            var f = a(this), g = {
                pie: function() {
                    k.addClass("visualize-pie"), "outside" == e.pieLabelPos && k.addClass("visualize-pie-outside");
                    var b = Math.round(i.width() / 2), c = Math.round(i.height() / 2), d = c - e.pieMargin, f = 0, g = a('<ul class="visualize-labels"></ul>').insertAfter(i);
                    a.each(q, function(h) {
                        var i = 0 >= this || isNaN(this) ? 0 : this / n;
                        y.beginPath(), y.moveTo(b, c), y.arc(b, c, d, f * Math.PI * 2 - .5 * Math.PI, (f + i) * Math.PI * 2 - .5 * Math.PI, !1), 
                        y.lineTo(b, c), y.closePath(), y.fillStyle = m[h].color, y.fill();
                        var j = f + i / 2, k = "inside" == e.pieLabelPos ? d / 1.5 : d + d / 5, l = Math.round(b + Math.sin(j * Math.PI * 2) * k), o = Math.round(c - Math.cos(j * Math.PI * 2) * k), p = l > b ? "right" : "left", q = o > c ? "bottom" : "top", r = parseFloat((100 * i).toFixed(2));
                        if (r) {
                            var s = e.pieLabelsAsPercent ? r + "%" : this, t = a('<span class="visualize-label">' + s + "</span>").css(p, 0).css(q, 0);
                            if (t) {
                                a('<li class="visualize-label-pos"></li>').appendTo(g).css({
                                    left: l,
                                    top: o
                                }).append(t);
                            }
                            t.css("font-size", d / 8).css("margin-" + p, -t.width() / 2).css("margin-" + q, -t.outerHeight() / 2), 
                            m[h].textColor && t.css("color", m[h].textColor);
                        }
                        f += i;
                    });
                },
                line: function(b) {
                    b ? k.addClass("visualize-area") : k.addClass("visualize-line");
                    var c = i.width() / (t.length - 1), d = a('<ul class="visualize-labels-x"></ul>').width(i.width()).height(i.height()).insertBefore(i);
                    a.each(t, function(b) {
                        var e = a("<li><span>" + this + "</span></li>").prepend('<span class="line" />').css("left", c * b).appendTo(d), f = e.find("span:not(.line)"), g = f.width() / -2;
                        0 == b ? g = 0 : b == t.length - 1 && (g = -f.width()), f.css("margin-left", g).addClass("label");
                    });
                    var f = i.height() / r, g = i.height() / (u.length - 1), h = a('<ul class="visualize-labels-y"></ul>').width(i.width()).height(i.height()).insertBefore(i);
                    a.each(u, function(b) {
                        var c = a("<li><span>" + this + "</span></li>").prepend('<span class="line"  />').css("bottom", g * b).prependTo(h), d = c.find("span:not(.line)"), e = d.height() / -2;
                        0 == b ? e = -d.height() : b == u.length - 1 && (e = 0), d.css("margin-top", e).addClass("label");
                    }), y.translate(0, s), a.each(m, function() {
                        y.beginPath(), y.lineWidth = e.lineWeight, y.lineJoin = "round";
                        var d = this.points, g = 0;
                        y.moveTo(0, -(d[0] * f)), a.each(d, function() {
                            y.lineTo(g, -(this * f)), g += c;
                        }), y.strokeStyle = this.color, y.stroke(), b ? (y.lineTo(g, 0), y.lineTo(0, 0), 
                        y.closePath(), y.fillStyle = this.color, y.globalAlpha = .3, y.fill(), y.globalAlpha = 1) : y.closePath();
                    });
                },
                area: function() {
                    g.line(!0);
                },
                bar: function() {
                    k.addClass("visualize-bar");
                    var b = i.width() / t.length, c = a('<ul class="visualize-labels-x"></ul>').width(i.width()).height(i.height()).insertBefore(i);
                    a.each(t, function(d) {
                        var e = a('<li><span class="label">' + this + "</span></li>").prepend('<span class="line" />').css("left", b * d).width(b).appendTo(c), f = e.find("span.label");
                        f.addClass("label");
                    });
                    var d = i.height() / r, f = i.height() / (u.length - 1), g = a('<ul class="visualize-labels-y"></ul>').width(i.width()).height(i.height()).insertBefore(i);
                    a.each(u, function(b) {
                        var c = a("<li><span>" + this + "</span></li>").prepend('<span class="line"  />').css("bottom", f * b).prependTo(g), d = c.find("span:not(.line)"), e = d.height() / -2;
                        0 == b ? e = -d.height() : b == u.length - 1 && (e = 0), d.css("margin-top", e).addClass("label");
                    }), y.translate(0, s);
                    for (var h = 0; h < m.length; h++) {
                        y.beginPath();
                        var j = (b - 2 * e.barGroupMargin) / m.length, l = j - 2 * e.barMargin;
                        y.lineWidth = l;
                        for (var n = m[h].points, o = 0, p = 0; p < n.length; p++) {
                            var q = o - e.barGroupMargin + h * j + j / 2;
                            q += 2 * e.barGroupMargin, y.moveTo(q, 0), y.lineTo(q, Math.round(-n[p] * d)), o += b;
                        }
                        y.strokeStyle = m[h].color, y.stroke(), y.closePath();
                    }
                }
            }, h = document.createElement("canvas");
            h.setAttribute("height", e.height), h.setAttribute("width", e.width);
            var i = a(h), j = e.title || f.find("caption").text(), k = (c || a('<div class="visualize" role="img" aria-label="Chart representing data from the table: ' + j + '" />')).height(e.height).width(e.width).append(i), l = d(), m = l.dataGroups(), n = (l.allData(), 
            l.dataSum()), o = l.topValue(), p = l.bottomValue(), q = l.memberTotals(), r = l.totalYRange(), s = e.height * (o / r), t = l.xLabels(), u = l.yLabels();
            if (e.appendTitle || e.appendKey) var v = a('<div class="visualize-info"></div>').appendTo(k);
            if (e.appendTitle && a('<div class="visualize-title">' + j + "</div>").appendTo(v), 
            e.appendKey) {
                var w, x = a('<ul class="visualize-key"></ul>');
                w = "x" == e.parseDirection ? f.find("tr:gt(0) th").filter(e.rowFilter) : f.find("tr:eq(0) th").filter(e.colFilter), 
                w.each(function(b) {
                    a('<li><span class="visualize-key-color" style="background: ' + m[b].color + '"></span><span class="visualize-key-label">' + a(this).text() + "</span></li>").appendTo(x);
                }), x.appendTo(v);
            }
            c || k.insertAfter(this), "undefined" != typeof G_vmlCanvasManager && (G_vmlCanvasManager.init(), 
            G_vmlCanvasManager.initElement(i[0]));
            var y = i[0].getContext("2d");
            g[e.type](), a(".visualize-line li:first-child span.line, .visualize-line li:last-child span.line, .visualize-area li:first-child span.line, .visualize-area li:last-child span.line, .visualize-bar li:first-child span.line,.visualize-bar .visualize-labels-y li:last-child span.line").css("border", "none"), 
            c || k.bind("visualizeRefresh", function() {
                f.visualize(e, a(this).empty());
            });
        }).next();
    };
}(jQuery);