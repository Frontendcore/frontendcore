!function(a) {
    jQuery.fn.serializeTree = function(b, c, d) {
        var e, f = "";
        return e = void 0 == d ? this.children() : this.children().not(d), e.length > 0 ? e.each(function() {
            var e = a(this), g = "";
            e.find("ul").length > 0 ? (c += "[" + e.attr(b) + "]", g = a("ul:first", e).serializeTree(b, c, d), 
            c = c.replace(/\[[^\]\[]*\]$/, "")) : e.find("ol").length > 0 ? (c += "[" + e.attr(b) + "]", 
            g = a("ol:first", e).serializeTree(b, c, d), c = c.replace(/\[[^\]\[]*\]$/, "")) : f += "&" + c + "[]=" + e.attr(b), 
            g && (f += g);
        }) : f += "&" + c + "[" + this.attr(b) + "]=", f ? f : !1;
    };
}(jQuery), function(a) {
    var b, c = a();
    a.fn.sortable = function(d) {
        var e = String(d);
        return d = a.extend({
            connectWith: !1
        }, d), this.each(function() {
            if (/^enable|disable|destroy$/.test(e)) {
                var f = a(this).children(a(this).data("items")).attr("draggable", "enable" == e);
                return "destroy" == e && f.add(this).removeData("connectWith items").off("dragstart.h5s dragend.h5s selectstart.h5s dragover.h5s dragenter.h5s drop.h5s"), 
                void 0;
            }
            var g, h, f = a(this).children(d.items), i = a("<" + (/^ul|ol$/i.test(this.tagName) ? "li" : "div") + ' class="sortable-placeholder">');
            f.find(d.handle).mousedown(function() {
                g = !0;
            }).mouseup(function() {
                g = !1;
            }), a(this).data("items", d.items), c = c.add(i), d.connectWith && a(d.connectWith).add(this).data("connectWith", d.connectWith), 
            f.attr("draggable", "true").on("dragstart.h5s", function(c) {
                if (d.handle && !g) return !1;
                g = !1;
                var e = c.originalEvent.dataTransfer;
                e.effectAllowed = "move", e.setData("Text", "dummy"), h = (b = a(this)).addClass("sortable-dragging").index();
            }).on("dragend.h5s", function() {
                b && (b.removeClass("sortable-dragging").show(), c.detach(), h != b.index() && b.parent().trigger("sortupdate", {
                    item: b
                }), b = null);
            }).not("a[href], img").on("selectstart.h5s", function() {
                return this.dragDrop && this.dragDrop(), !1;
            }).end().add([ this, i ]).on("dragover.h5s dragenter.h5s drop.h5s", function(e) {
                return f.is(b) || d.connectWith === a(b).parent().data("connectWith") ? "drop" == e.type ? (e.stopPropagation(), 
                c.filter(":visible").after(b), b.trigger("dragend.h5s"), !1) : (e.preventDefault(), 
                e.originalEvent.dataTransfer.dropEffect = "move", f.is(this) ? (d.forcePlaceholderSize && i.height(b.outerHeight()), 
                b.hide(), a(this)[i.index() < a(this).index() ? "after" : "before"](i), c.not(i).detach()) : c.is(this) || a(this).children(d.items).length || (c.detach(), 
                a(this).append(i)), !1) : !0;
            });
        });
    };
}(jQuery);