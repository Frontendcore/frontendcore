!function(a) {
    var b = !1, c = !1, d = {
        isUrl: function(a) {
            var b = new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i");
            return b.test(a) ? !0 : !1;
        },
        loadContent: function(a, b) {
            a.html(b);
        },
        addPrefix: function(a) {
            var b = a.attr("id"), c = a.attr("class");
            "string" == typeof b && "" !== b && a.attr("id", b.replace(/([A-Za-z0-9_.\-]+)/g, "sidr-id-$1")), 
            "string" == typeof c && "" !== c && "sidr-inner" !== c && a.attr("class", c.replace(/([A-Za-z0-9_.\-]+)/g, "sidr-class-$1")), 
            a.removeAttr("style");
        },
        execute: function(d, f, g) {
            "function" == typeof f ? (g = f, f = "sidr") : f || (f = "sidr");
            var h, i, j, k = a("#" + f), l = a(k.data("body")), m = a("html"), n = k.outerWidth(!0), o = k.data("speed"), p = k.data("side"), q = k.data("displace"), r = k.data("onOpen"), s = k.data("onClose"), t = "sidr" === f ? "sidr-open" : "sidr-open " + f + "-open";
            if ("open" === d || "toggle" === d && !k.is(":visible")) {
                if (k.is(":visible") || b) return;
                if (c !== !1) return e.close(c, function() {
                    e.open(f);
                }), void 0;
                b = !0, "left" === p ? (h = {
                    left: n + "px"
                }, i = {
                    left: "0px"
                }) : (h = {
                    right: n + "px"
                }, i = {
                    right: "0px"
                }), l.is("body") && (j = m.scrollTop(), m.css("overflow-x", "hidden").scrollTop(j)), 
                q ? l.addClass("sidr-animating").css({
                    width: l.width(),
                    position: "absolute"
                }).animate(h, o, function() {
                    a(this).addClass(t);
                }) : setTimeout(function() {
                    a(this).addClass(t);
                }, o), k.css("display", "block").animate(i, o, function() {
                    b = !1, c = f, "function" == typeof g && g(f), l.removeClass("sidr-animating");
                }), r();
            } else {
                if (!k.is(":visible") || b) return;
                b = !0, "left" === p ? (h = {
                    left: 0
                }, i = {
                    left: "-" + n + "px"
                }) : (h = {
                    right: 0
                }, i = {
                    right: "-" + n + "px"
                }), l.is("body") && (j = m.scrollTop(), m.removeAttr("style").scrollTop(j)), l.addClass("sidr-animating").animate(h, o).removeClass(t), 
                k.animate(i, o, function() {
                    k.removeAttr("style").hide(), l.removeAttr("style"), a("html").removeAttr("style"), 
                    b = !1, c = !1, "function" == typeof g && g(f), l.removeClass("sidr-animating");
                }), s();
            }
        }
    }, e = {
        open: function(a, b) {
            d.execute("open", a, b);
        },
        close: function(a, b) {
            d.execute("close", a, b);
        },
        toggle: function(a, b) {
            d.execute("toggle", a, b);
        },
        toogle: function(a, b) {
            d.execute("toggle", a, b);
        }
    };
    a.sidr = function(b) {
        return e[b] ? e[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "function" != typeof b && "string" != typeof b && b ? (a.error("Method " + b + " does not exist on jQuery.sidr"), 
        void 0) : e.toggle.apply(this, arguments);
    }, a.fn.sidr = function(b) {
        var c = a.extend({
            name: "sidr",
            speed: 200,
            side: "left",
            source: null,
            renaming: !0,
            body: "body",
            displace: !0,
            onOpen: function() {},
            onClose: function() {}
        }, b), f = c.name, g = a("#" + f);
        if (0 === g.length && (g = a("<div />").attr("id", f).appendTo(a("body"))), g.addClass("sidr").addClass(c.side).data({
            speed: c.speed,
            side: c.side,
            body: c.body,
            displace: c.displace,
            onOpen: c.onOpen,
            onClose: c.onClose
        }), "function" == typeof c.source) {
            var h = c.source(f);
            d.loadContent(g, h);
        } else if ("string" == typeof c.source && d.isUrl(c.source)) a.get(c.source, function(a) {
            d.loadContent(g, a);
        }); else if ("string" == typeof c.source) {
            var i = "", j = c.source.split(",");
            if (a.each(j, function(b, c) {
                i += '<div class="sidr-inner">' + a(c).html() + "</div>";
            }), c.renaming) {
                var k = a("<div />").html(i);
                k.find("*").each(function(b, c) {
                    var e = a(c);
                    d.addPrefix(e);
                }), i = k.html();
            }
            d.loadContent(g, i);
        } else null !== c.source && a.error("Invalid Sidr Source");
        return this.each(function() {
            var b = a(this), c = b.data("sidr");
            c || (b.data("sidr", f), "ontouchstart" in document.documentElement ? (b.bind("touchstart", function(a) {
                a.originalEvent.touches[0];
                this.touched = a.timeStamp;
            }), b.bind("touchend", function(a) {
                var b = Math.abs(a.timeStamp - this.touched);
                200 > b && (a.preventDefault(), e.toggle(f));
            })) : b.click(function(a) {
                a.preventDefault(), e.toggle(f);
            }));
        });
    };
}(jQuery);