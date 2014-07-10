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
            FC.getDataModules("parallax");
            require([ "parallaxLibs" ], function() {
                skrollr.init();
            }), FC.trackEvent("JS_Libraries", "call", "parallax");
        }
    };
});