!function(a) {
    a.fn.autoSuggest = function(b, c) {
        var d = {
            asHtmlID: !1,
            startText: "Enter Name Here",
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
            neverSubmit: !1,
            selectionLimit: !1,
            showResultList: !0,
            start: function() {},
            selectionClick: function() {},
            selectionAdded: function() {},
            selectionRemoved: function(a) {
                a.remove();
            },
            formatList: !1,
            beforeRetrieve: function(a) {
                return a;
            },
            retrieveComplete: function(a) {
                return a;
            },
            resultClick: function() {},
            resultsComplete: function() {}
        }, e = a.extend(d, c), f = "object", g = 0;
        if ("string" == typeof b) {
            f = "string";
            var h = b;
        } else {
            var i = b;
            for (k in b) b.hasOwnProperty(k) && g++;
        }
        return "object" == f && g > 0 || "string" == f ? this.each(function(b) {
            function c() {
                if (46 == lastKeyPressCode || lastKeyPressCode > 8 && 32 > lastKeyPressCode) return r.hide();
                var b = n.val().replace(/[\\]+|[\/]+/g, "");
                if (b != C) if (C = b, b.length >= e.minChars) if (p.addClass("loading"), "string" == f) {
                    var c = "";
                    e.retrieveLimit && (c = "&limit=" + encodeURIComponent(e.retrieveLimit)), e.beforeRetrieve && (b = e.beforeRetrieve.call(this, b)), 
                    a.getJSON(h + "?" + e.queryParam + "=" + encodeURIComponent(b) + c + e.extraParams, function(a) {
                        g = 0;
                        var c = e.retrieveComplete.call(this, a);
                        for (k in c) c.hasOwnProperty(k) && g++;
                        d(c, b);
                    });
                } else e.beforeRetrieve && (b = e.beforeRetrieve.call(this, b)), d(i, b); else p.removeClass("loading"), 
                r.hide();
            }
            function d(b, c) {
                e.matchCase || (c = c.toLowerCase());
                var d = 0;
                r.html(s.html("")).hide();
                for (var f = 0; g > f; f++) {
                    var h = f;
                    E++;
                    var i = !1;
                    if ("value" == e.searchObjProps) var k = b[h].value; else for (var k = "", l = e.searchObjProps.split(","), m = 0; m < l.length; m++) {
                        var q = a.trim(l[m]);
                        k = k + b[h][q] + " ";
                    }
                    if (k && (e.matchCase || (k = k.toLowerCase()), -1 != k.search(c) && -1 == t.val().search("," + b[h][e.selectedValuesProp] + ",") && (i = !0)), 
                    i) {
                        var u = a('<li class="as-result-item" id="as-result-item-' + h + '"></li>').click(function() {
                            var b = a(this).data("data"), c = b.num;
                            if (a("#as-selection-" + c, p).length <= 0 && !D) {
                                var d = b.attributes;
                                n.val("").focus(), C = "", j(d, c), e.resultClick.call(this, b), r.hide();
                            }
                            D = !1;
                        }).mousedown(function() {
                            o = !1;
                        }).mouseover(function() {
                            a("li", s).removeClass("active"), a(this).addClass("active");
                        }).data("data", {
                            attributes: b[h],
                            num: E
                        }), v = a.extend({}, b[h]);
                        if (e.matchCase) var w = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + c + ")(?![^<>]*>)(?![^&;]+;)", "g"); else var w = new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + c + ")(?![^<>]*>)(?![^&;]+;)", "gi");
                        if (e.resultsHighlight && (v[e.selectedItemProp] = v[e.selectedItemProp].replace(w, "<em>$1</em>")), 
                        u = e.formatList ? e.formatList.call(this, v, u) : u.html(v[e.selectedItemProp]), 
                        s.append(u), delete v, d++, e.retrieveLimit && e.retrieveLimit == d) break;
                    }
                }
                p.removeClass("loading"), 0 >= d && s.html('<li class="as-message">' + e.emptyText + "</li>"), 
                s.css("width", p.outerWidth()), r.show(), e.resultsComplete.call(this);
            }
            function j(b, c) {
                t.val(t.val() + b[e.selectedValuesProp] + ",");
                var d = a('<li class="as-selection-item" id="as-selection-' + c + '"></li>').click(function() {
                    e.selectionClick.call(this, a(this)), p.children().removeClass("selected"), a(this).addClass("selected");
                }).mousedown(function() {
                    o = !1;
                }), f = a('<a class="as-close">&times;</a>').click(function() {
                    return t.val(t.val().replace("," + b[e.selectedValuesProp] + ",", ",")), e.selectionRemoved.call(this, d), 
                    o = !0, n.focus(), !1;
                });
                q.before(d.html(b[e.selectedItemProp]).prepend(f)), e.selectionAdded.call(this, q.prev());
            }
            function l(b) {
                if (a(":visible", r).length > 0) {
                    var c = a("li", r);
                    if ("down" == b) var d = c.eq(0); else var d = c.filter(":last");
                    var e = a("li.active:first", r);
                    e.length > 0 && (d = "down" == b ? e.next() : e.prev()), c.removeClass("active"), 
                    d.addClass("active");
                }
            }
            if (e.asHtmlID) {
                b = e.asHtmlID;
                var m = b;
            } else {
                b = b + "" + Math.floor(100 * Math.random());
                var m = "as-input-" + b;
            }
            e.start.call(this);
            var n = a(this);
            n.attr("autocomplete", "off").addClass("as-input").attr("id", m).val(e.startText);
            var o = !1;
            n.wrap('<ul class="as-selections" id="as-selections-' + b + '"></ul>').wrap('<li class="as-original" id="as-original-' + b + '"></li>');
            var p = a("#as-selections-" + b), q = a("#as-original-" + b), r = a('<div class="as-results" id="as-results-' + b + '"></div>').hide(), s = a('<ul class="as-list"></ul>'), t = a('<input type="hidden" class="as-values" name="as_values_' + b + '" id="as-values-' + b + '" />'), u = "";
            if ("string" == typeof e.preFill) {
                for (var v = e.preFill.split(","), w = 0; w < v.length; w++) {
                    var x = {};
                    x[e.selectedValuesProp] = v[w], "" != v[w] && j(x, "000" + w);
                }
                u = e.preFill;
            } else {
                u = "";
                var y = 0;
                for (k in e.preFill) e.preFill.hasOwnProperty(k) && y++;
                if (y > 0) for (var w = 0; y > w; w++) {
                    var z = e.preFill[w][e.selectedValuesProp];
                    void 0 == z && (z = ""), u = u + z + ",", "" != z && j(e.preFill[w], "000" + w);
                }
            }
            if ("" != u) {
                n.val("");
                var A = u.substring(u.length - 1);
                "," != A && (u += ","), t.val("," + u), a("li.as-selection-item", p).addClass("blur").removeClass("selected");
            }
            n.after(t), p.click(function() {
                o = !0, n.focus();
            }).mousedown(function() {
                o = !1;
            }).after(r);
            var B = null, C = "", D = !1;
            n.focus(function() {
                return a(this).val() == e.startText && "" == t.val() ? a(this).val("") : o && (a("li.as-selection-item", p).removeClass("blur"), 
                "" != a(this).val() && (s.css("width", p.outerWidth()), r.show())), o = !0, !0;
            }).blur(function() {
                "" == a(this).val() && "" == t.val() && "" == u ? a(this).val(e.startText) : o && (a("li.as-selection-item", p).addClass("blur").removeClass("selected"), 
                r.hide(), a(this).trigger("update"));
            }).keydown(function(b) {
                switch (lastKeyPressCode = b.keyCode, first_focus = !1, b.keyCode) {
                  case 38:
                    b.preventDefault(), l("up");
                    break;

                  case 40:
                    b.preventDefault(), l("down");
                    break;

                  case 8:
                    if ("" == n.val()) {
                        var d = t.val().split(",");
                        d = d[d.length - 2], p.children().not(q.prev()).removeClass("selected"), q.prev().hasClass("selected") ? (t.val(t.val().replace("," + d + ",", ",")), 
                        e.selectionRemoved.call(this, q.prev())) : (e.selectionClick.call(this, q.prev()), 
                        q.prev().addClass("selected"));
                    }
                    1 == n.val().length && (r.hide(), C = ""), a(":visible", r).length > 0 && (B && clearTimeout(B), 
                    B = setTimeout(function() {
                        c();
                    }, e.keyDelay));
                    break;

                  case 9:
                  case 188:
                    D = !0;
                    var f = n.val().replace(/(,)/g, "");
                    if ("" != f && t.val().search("," + f + ",") < 0 && f.length >= e.minChars) {
                        b.preventDefault();
                        var g = {};
                        g[e.selectedItemProp] = f, g[e.selectedValuesProp] = f;
                        var h = a("li", p).length;
                        j(g, "00" + (h + 1)), n.val("");
                    }

                  case 13:
                    D = !1;
                    var i = a("li.active:first", r);
                    if (i.length > 0) i.click(), r.hide(); else {
                        D = !0;
                        var f = n.val().replace(/(,)/g, "");
                        if ("" != f && t.val().search("," + f + ",") < 0 && f.length >= e.minChars) {
                            b.preventDefault();
                            var g = {};
                            g[e.selectedItemProp] = f, g[e.selectedValuesProp] = f;
                            var h = a("li", p).length;
                            j(g, "00" + (h + 1)), n.val("");
                        }
                    }
                    (e.neverSubmit || i.length > 0) && b.preventDefault();
                    break;

                  default:
                    e.showResultList && (e.selectionLimit && a("li.as-selection-item", p).length >= e.selectionLimit ? (s.html('<li class="as-message">' + e.limitText + "</li>"), 
                    r.show()) : (B && clearTimeout(B), B = setTimeout(function() {
                        c();
                    }, e.keyDelay)));
                }
            }).on("update", function() {
                D = !0;
                var b = n.val().replace(/(,)/g, "");
                if ("" != b && t.val().search("," + b + ",") < 0 && b.length >= e.minChars) {
                    var c = {};
                    c[e.selectedItemProp] = b, c[e.selectedValuesProp] = b;
                    var d = a("li", p).length;
                    j(c, "00" + (d + 1)), n.val("");
                }
            });
            var E = 0;
        }) : void 0;
    };
}(jQuery);