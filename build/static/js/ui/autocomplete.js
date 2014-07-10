!function(a, b) {
    "use strict";
    function c(b) {
        b = a.extend({}, M, b || {}), null === J && (J = a("body"));
        for (var c = a(this), e = 0, f = c.length; f > e; e++) d(c.eq(e), b);
        return c;
    }
    function d(b, c) {
        if (!b.hasClass("autocompleter-node")) {
            c = a.extend({}, c, b.data("autocompleter-options")), "string" != typeof c.source || ".json" !== c.source.slice(-5) && c.asLocal !== !0 || a.ajax({
                url: c.source,
                type: "GET",
                dataType: "json",
                async: !1
            }).done(function(a) {
                c.source = a;
            });
            var d = '<div class="autocompleter ' + c.customClass.join(" ") + '" id="autocompleter-' + (C + 1) + '">';
            c.hint && (d += '<div class="autocompleter-hint"></div>'), d += '<ul class="autocompleter-list"></ul>', 
            d += "</div>", b.addClass("autocompleter-node").after(d);
            var e = b.next(".autocompleter").eq(0), f = b.attr("autocomplete");
            b.attr("autocomplete", "off");
            var g = a.extend({
                $node: b,
                $autocompleter: e,
                $selected: null,
                $list: null,
                index: -1,
                hintText: !1,
                source: !1,
                jqxhr: !1,
                response: null,
                focused: !1,
                query: "",
                originalAutocomplete: f,
                guid: C++
            }, c);
            g.$autocompleter.on("mousedown.autocompleter", ".autocompleter-item", g, r).data("autocompleter", g), 
            g.$node.on("keyup.autocompleter", g, j).on("keydown.autocompleter", g, k).on("focus.autocompleter", g, l).on("blur.autocompleter", g, m).on("mousedown.autocompleter", g, n);
        }
    }
    function e(a, b, c) {
        var d = [];
        if (a = a.toUpperCase(), b.length) for (var e = 0; 2 > e; e++) for (var f in b) if (d.length < c.limit) {
            var g = c.customLabel && b[f][c.customLabel] ? b[f][c.customLabel] : b[f].label;
            switch (e) {
              case 0:
                0 === g.toUpperCase().search(a) && (d.push(b[f]), delete b[f]);
                break;

              case 1:
                -1 !== g.toUpperCase().search(a) && (d.push(b[f]), delete b[f]);
            }
        }
        return d;
    }
    function f(b) {
        if (b.query = a.trim(b.$node.val()), !b.empty && 0 === b.query.length) return g(b), 
        void 0;
        if ("object" == typeof b.source) {
            g(b);
            var c = e(b.query, B(b.source), b);
            c.length && h(c, b);
        } else {
            b.jqxhr && b.jqxhr.abort();
            var d = a.extend({
                limit: b.limit,
                query: b.query
            }, b.combine());
            b.jqxhr = a.ajax({
                url: b.source,
                dataType: "json",
                data: d,
                beforeSend: function(a) {
                    if (b.$autocompleter.addClass("autocompleter-ajax"), g(b), b.cache) {
                        var c = y(this.url);
                        c && (a.abort(), h(c, b));
                    }
                }
            }).done(function(a) {
                b.offset && (a = w(a, b.offset)), b.cache && x(this.url, a), h(a, b);
            }).always(function() {
                b.$autocompleter.removeClass("autocompleter-ajax");
            });
        }
    }
    function g(a) {
        a.response = null, a.$list = null, a.$selected = null, a.index = 0, a.$autocompleter.find(".autocompleter-list").empty(), 
        a.$autocompleter.find(".autocompleter-hint").removeClass("autocompleter-hint-show").empty(), 
        a.hintText = !1, q(null, a);
    }
    function h(a, b) {
        i(a, b), b.$autocompleter.hasClass("autocompleter-focus") && o(null, b);
    }
    function i(b, c) {
        for (var d = "", e = 0, f = b.length; f > e; e++) {
            var g = [ "autocompleter-item" ];
            c.selectFirst && 0 === e && !c.changeWhenSelect && g.push("autocompleter-item-selected");
            var h = new RegExp(c.query, "gi"), i = c.customLabel && b[e][c.customLabel] ? b[e][c.customLabel] : b[e].label, j = i;
            i = c.highlightMatches ? i.replace(h, "<strong>$&</strong>") : i;
            var k = c.customValue && b[e][c.customValue] ? b[e][c.customValue] : b[e].value;
            if (c.template) {
                var l = c.template.replace(/({{ label }})/gi, i);
                for (var m in b[e]) if (b[e].hasOwnProperty(m)) {
                    var n = new RegExp("{{ " + m + " }}", "gi");
                    l = l.replace(n, b[e][m]);
                }
                i = l;
            }
            d += k ? '<li data-value="' + k + '" data-label="' + j + '" class="' + g.join(" ") + '">' + i + "</li>" : '<li data-label="' + j + '" class="' + g.join(" ") + '">' + i + "</li>";
        }
        if (b.length && c.hint) {
            var o = b[0].label.substr(0, c.query.length).toUpperCase() === c.query.toUpperCase() ? b[0].label : !1;
            if (o && c.query !== b[0].label) {
                var p = new RegExp(c.query, "i"), q = o.replace(p, "<span>" + c.query + "</span>");
                c.$autocompleter.find(".autocompleter-hint").addClass("autocompleter-hint-show").html(q), 
                c.hintText = q;
            }
        }
        c.response = b, c.$autocompleter.find(".autocompleter-list").html(d), c.$selected = c.$autocompleter.find(".autocompleter-item-selected").length ? c.$autocompleter.find(".autocompleter-item-selected") : null, 
        c.$list = b.length ? c.$autocompleter.find(".autocompleter-item") : null, c.index = c.$selected ? c.$list.index(c.$selected) : -1, 
        c.$autocompleter.find(".autocompleter-item").each(function(b, d) {
            a(d).data(c.response[b]);
        });
    }
    function j(b) {
        var c = b.data, d = b.keyCode ? b.keyCode : b.which;
        if (40 !== d && 38 !== d || !c.$autocompleter.hasClass("autocompleter-show")) -1 === a.inArray(d, D) && -1 === a.inArray(d, c.ignoredKeyCode) && f(c); else {
            var e, g, h = c.$list.length;
            h && (h > 1 ? c.index === h - 1 ? (e = c.changeWhenSelect ? -1 : 0, g = c.index - 1) : 0 === c.index ? (e = c.index + 1, 
            g = c.changeWhenSelect ? -1 : h - 1) : -1 === c.index ? (e = 0, g = h - 1) : (e = c.index + 1, 
            g = c.index - 1) : -1 === c.index ? (e = 0, g = 0) : (g = -1, e = -1), c.index = 40 === d ? e : g, 
            c.$list.removeClass("autocompleter-item-selected"), -1 !== c.index && c.$list.eq(c.index).addClass("autocompleter-item-selected"), 
            c.$selected = c.$autocompleter.find(".autocompleter-item-selected").length ? c.$autocompleter.find(".autocompleter-item-selected") : null, 
            c.changeWhenSelect && t(c));
        }
    }
    function k(a) {
        var b = a.keyCode ? a.keyCode : a.which, c = a.data;
        if (40 === b || 38 === b) a.preventDefault(), a.stopPropagation(); else if (39 === b) {
            if (c.hint && c.hintText && c.$autocompleter.find(".autocompleter-hint").hasClass("autocompleter-hint-show")) {
                a.preventDefault(), a.stopPropagation();
                var d = c.$autocompleter.find(".autocompleter-item").length ? c.$autocompleter.find(".autocompleter-item").eq(0).attr("data-label") : !1;
                d && (c.query = d, s(c));
            }
        } else 13 === b && c.$autocompleter.hasClass("autocompleter-show") && c.$selected && r(a);
    }
    function l(a, b) {
        if (!b) {
            var c = a.data;
            c.$autocompleter.addClass("autocompleter-focus"), c.$node.prop("disabled") || c.$autocompleter.hasClass("autocompleter-show") || c.focusOpen && (f(c), 
            c.focused = !0, setTimeout(function() {
                c.focused = !1;
            }, 500));
        }
    }
    function m(a, b) {
        a.preventDefault(), a.stopPropagation();
        var c = a.data;
        b || (c.$autocompleter.removeClass("autocompleter-focus"), q(a));
    }
    function n(c) {
        if ("mousedown" !== c.type || -1 === a.inArray(c.which, [ 2, 3 ])) {
            var d = c.data;
            if (d.$list && !d.focused && !d.$node.is(":disabled")) if (H && !I) {
                var e = d.$select[0];
                if (b.document.createEvent) {
                    var f = b.document.createEvent("MouseEvents");
                    f.initMouseEvent("mousedown", !1, !0, b, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), 
                    e.dispatchEvent(f);
                } else e.fireEvent && e.fireEvent("onmousedown");
            } else d.$autocompleter.hasClass("autocompleter-closed") ? o(c) : d.$autocompleter.hasClass("autocompleter-show") && q(c);
        }
    }
    function o(a, b) {
        var c = a ? a.data : b;
        !c.$node.prop("disabled") && !c.$autocompleter.hasClass("autocompleter-show") && c.$list && c.$list.length && (c.$autocompleter.removeClass("autocompleter-closed").addClass("autocompleter-show"), 
        J.on("click.autocompleter-" + c.guid, ":not(.autocompleter-item)", c, p));
    }
    function p(b) {
        a(b.target).hasClass("autocompleter-node") || 0 === a(b.currentTarget).parents(".autocompleter").length && q(b);
    }
    function q(a, b) {
        var c = a ? a.data : b;
        c.$autocompleter.hasClass("autocompleter-show") && (c.$autocompleter.removeClass("autocompleter-show").addClass("autocompleter-closed"), 
        J.off(".autocompleter-" + c.guid));
    }
    function r(b) {
        if ("mousedown" !== b.type || -1 === a.inArray(b.which, [ 2, 3 ])) {
            var c = b.data;
            b.preventDefault(), b.stopPropagation(), "mousedown" === b.type && a(this).length && (c.$selected = a(this), 
            c.index = c.$list.index(c.$selected)), c.$node.prop("disabled") || (q(b), u(c), 
            "click" === b.type && c.$node.trigger("focus", [ !0 ]));
        }
    }
    function s(a) {
        t(a), v(a), f(a);
    }
    function t(a) {
        if (a.$selected) {
            a.hintText && a.$autocompleter.find(".autocompleter-hint").hasClass("autocompleter-hint-show") && a.$autocompleter.find(".autocompleter-hint").removeClass("autocompleter-hint-show");
            var b = a.$selected.attr("data-value") ? a.$selected.attr("data-value") : a.$selected.attr("data-label");
            a.$node.val(b);
        } else a.hintText && !a.$autocompleter.find(".autocompleter-hint").hasClass("autocompleter-hint-show") && a.$autocompleter.find(".autocompleter-hint").addClass("autocompleter-hint-show"), 
        a.$node.val(a.query);
    }
    function u(a) {
        t(a), v(a), g(a);
    }
    function v(a) {
        a.callback.call(a.$autocompleter, a.$node.val(), a.index, a.response[a.index]), 
        a.$node.trigger("change");
    }
    function w(a, b) {
        for (b = b.split("."); a && b.length; ) a = a[b.shift()];
        return a;
    }
    function x(a, b) {
        if (L && a && b) {
            O[a] = {
                value: b
            };
            try {
                localStorage.setItem(K, JSON.stringify(O));
            } catch (c) {
                var d = c.code || c.number || c.message;
                if (22 !== d) throw c;
                A();
            }
        }
    }
    function y(a) {
        if (a) {
            var b = O[a] && O[a].value ? O[a].value : !1;
            return b;
        }
    }
    function z() {
        if (L) {
            var a = localStorage.getItem(K) || "{}";
            return JSON.parse(a);
        }
    }
    function A() {
        try {
            localStorage.removeItem(K), O = z();
        } catch (a) {
            throw a;
        }
    }
    function B(a) {
        if (null === a || "object" != typeof a) return a;
        var b = a.constructor();
        for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
        return b;
    }
    var C = 0, D = [ 9, 13, 17, 19, 20, 27, 33, 34, 35, 36, 37, 39, 44, 92, 113, 114, 115, 118, 119, 120, 122, 123, 144, 145 ], E = [ "source", "empty", "limit", "cache", "focusOpen", "selectFirst", "changeWhenSelect", "highlightMatches", "ignoredKeyCode", "customLabel", "customValue", "template", "offset", "combine", "callback" ], F = b.navigator.userAgent || b.navigator.vendor || b.opera, G = /Firefox/i.test(F), H = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(F), I = G && H, J = null, K = "autocompleterCache", L = function() {
        var a = "undefined" != typeof b.localStorage;
        if (a) try {
            localStorage.setItem("autocompleter", "autocompleter"), localStorage.removeItem("autocompleter");
        } catch (c) {
            a = !1;
        }
        return a;
    }(), M = {
        source: null,
        asLocal: !1,
        empty: !0,
        limit: 10,
        customClass: [],
        cache: !0,
        focusOpen: !0,
        hint: !1,
        selectFirst: !1,
        changeWhenSelect: !0,
        highlightMatches: !1,
        ignoredKeyCode: [],
        customLabel: !1,
        customValue: !1,
        template: !1,
        offset: !1,
        combine: a.noop,
        callback: a.noop
    }, N = {
        defaults: function(b) {
            return M = a.extend(M, b || {}), a(this);
        },
        option: function(b) {
            return a(this).each(function(c, d) {
                var e = a(d).next(".autocompleter").data("autocompleter");
                for (var f in b) -1 !== a.inArray(f, E) && (e[f] = b[f]);
            });
        },
        open: function() {
            return a(this).each(function(b, c) {
                var d = a(c).next(".autocompleter").data("autocompleter");
                d && o(null, d);
            });
        },
        close: function() {
            return a(this).each(function(b, c) {
                var d = a(c).next(".autocompleter").data("autocompleter");
                d && q(null, d);
            });
        },
        clearCache: function() {
            A();
        },
        destroy: function() {
            return a(this).each(function(b, c) {
                var d = a(c).next(".autocompleter").data("autocompleter");
                d && (d.jqxhr && d.jqxhr.abort(), d.$autocompleter.hasClass("open") && d.$autocompleter.find(".autocompleter-selected").trigger("click.autocompleter"), 
                d.originalAutocomplete ? d.$node.attr("autocomplete", d.originalAutocomplete) : d.$node.removeAttr("autocomplete"), 
                d.$node.off(".autocompleter").removeClass("autocompleter-node"), d.$autocompleter.off(".autocompleter").remove());
            });
        }
    }, O = z();
    a.fn.autocompleter = function(a) {
        return N[a] ? N[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? this : c.apply(this, arguments);
    }, a.autocompleter = function(a) {
        "defaults" === a ? N.defaults.apply(this, Array.prototype.slice.call(arguments, 1)) : "clearCache" === a && N.clearCache.apply(this, null);
    };
}(jQuery, window);