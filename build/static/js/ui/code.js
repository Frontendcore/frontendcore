var hljs = new function() {
    function a(a) {
        return a.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;");
    }
    function b(a) {
        return a.nodeName.toLowerCase();
    }
    function c(a, b) {
        var c = a && a.exec(b);
        return c && 0 == c.index;
    }
    function d(a) {
        return Array.prototype.map.call(a.childNodes, function(a) {
            return 3 == a.nodeType ? s.useBR ? a.nodeValue.replace(/\n/g, "") : a.nodeValue : "br" == b(a) ? "\n" : d(a);
        }).join("");
    }
    function e(a) {
        var b = (a.className + " " + (a.parentNode ? a.parentNode.className : "")).split(/\s+/);
        return b = b.map(function(a) {
            return a.replace(/^language-/, "");
        }), b.filter(function(a) {
            return r(a) || "no-highlight" == a;
        })[0];
    }
    function f(a, b) {
        var c = {};
        for (var d in a) c[d] = a[d];
        if (b) for (var d in b) c[d] = b[d];
        return c;
    }
    function g(a) {
        var c = [];
        return function d(a, e) {
            for (var f = a.firstChild; f; f = f.nextSibling) 3 == f.nodeType ? e += f.nodeValue.length : "br" == b(f) ? e += 1 : 1 == f.nodeType && (c.push({
                event: "start",
                offset: e,
                node: f
            }), e = d(f, e), c.push({
                event: "stop",
                offset: e,
                node: f
            }));
            return e;
        }(a, 0), c;
    }
    function h(c, d, e) {
        function f() {
            return c.length && d.length ? c[0].offset != d[0].offset ? c[0].offset < d[0].offset ? c : d : "start" == d[0].event ? c : d : c.length ? c : d;
        }
        function g(c) {
            function d(b) {
                return " " + b.nodeName + '="' + a(b.value) + '"';
            }
            k += "<" + b(c) + Array.prototype.map.call(c.attributes, d).join("") + ">";
        }
        function h(a) {
            k += "</" + b(a) + ">";
        }
        function i(a) {
            ("start" == a.event ? g : h)(a.node);
        }
        for (var j = 0, k = "", l = []; c.length || d.length; ) {
            var m = f();
            if (k += a(e.substr(j, m[0].offset - j)), j = m[0].offset, m == c) {
                l.reverse().forEach(h);
                do i(m.splice(0, 1)[0]), m = f(); while (m == c && m.length && m[0].offset == j);
                l.reverse().forEach(g);
            } else "start" == m[0].event ? l.push(m[0].node) : l.pop(), i(m.splice(0, 1)[0]);
        }
        return k + a(e.substr(j));
    }
    function i(a) {
        function b(a) {
            return a && a.source || a;
        }
        function c(c, d) {
            return RegExp(b(c), "m" + (a.cI ? "i" : "") + (d ? "g" : ""));
        }
        function d(e, g) {
            function h(b, c) {
                a.cI && (c = c.toLowerCase()), c.split(" ").forEach(function(a) {
                    var c = a.split("|");
                    i[c[0]] = [ b, c[1] ? Number(c[1]) : 1 ];
                });
            }
            if (!e.compiled) {
                if (e.compiled = !0, e.k = e.k || e.bK, e.k) {
                    var i = {};
                    "string" == typeof e.k ? h("keyword", e.k) : Object.keys(e.k).forEach(function(a) {
                        h(a, e.k[a]);
                    }), e.k = i;
                }
                e.lR = c(e.l || /\b[A-Za-z0-9_]+\b/, !0), g && (e.bK && (e.b = e.bK.split(" ").join("|")), 
                e.b || (e.b = /\B|\b/), e.bR = c(e.b), e.e || e.eW || (e.e = /\B|\b/), e.e && (e.eR = c(e.e)), 
                e.tE = b(e.e) || "", e.eW && g.tE && (e.tE += (e.e ? "|" : "") + g.tE)), e.i && (e.iR = c(e.i)), 
                void 0 === e.r && (e.r = 1), e.c || (e.c = []);
                var j = [];
                e.c.forEach(function(a) {
                    a.v ? a.v.forEach(function(b) {
                        j.push(f(a, b));
                    }) : j.push("self" == a ? e : a);
                }), e.c = j, e.c.forEach(function(a) {
                    d(a, e);
                }), e.starts && d(e.starts, g);
                var k = e.c.map(function(a) {
                    return a.bK ? "\\.?\\b(" + a.b + ")\\b\\.?" : a.b;
                }).concat([ e.tE ]).concat([ e.i ]).map(b).filter(Boolean);
                e.t = k.length ? c(k.join("|"), !0) : {
                    exec: function() {
                        return null;
                    }
                }, e.continuation = {};
            }
        }
        d(a);
    }
    function j(b, d, e, f) {
        function g(a, b) {
            for (var d = 0; d < b.c.length; d++) if (c(b.c[d].bR, a)) return b.c[d];
        }
        function h(a, b) {
            return c(a.eR, b) ? a : a.eW ? h(a.parent, b) : void 0;
        }
        function l(a, b) {
            return !e && c(b.iR, a);
        }
        function m(a, b) {
            var c = w.cI ? b[0].toLowerCase() : b[0];
            return a.k.hasOwnProperty(c) && a.k[c];
        }
        function n(a, b, c, d) {
            var e = d ? "" : s.classPrefix, f = '<span class="' + e, g = c ? "" : "</span>";
            return f += a + '">', f + b + g;
        }
        function o() {
            var b = a(A);
            if (!x.k) return b;
            var c = "", d = 0;
            x.lR.lastIndex = 0;
            for (var e = x.lR.exec(b); e; ) {
                c += b.substr(d, e.index - d);
                var f = m(x, e);
                f ? (B += f[1], c += n(f[0], e[0])) : c += e[0], d = x.lR.lastIndex, e = x.lR.exec(b);
            }
            return c + b.substr(d);
        }
        function p() {
            if (x.sL && !t[x.sL]) return a(A);
            var b = x.sL ? j(x.sL, A, !0, x.continuation.top) : k(A);
            return x.r > 0 && (B += b.r), "continuous" == x.subLanguageMode && (x.continuation.top = b.top), 
            n(b.language, b.value, !1, !0);
        }
        function q() {
            return void 0 !== x.sL ? p() : o();
        }
        function u(b, c) {
            var d = b.cN ? n(b.cN, "", !0) : "";
            b.rB ? (y += d, A = "") : b.eB ? (y += a(c) + d, A = "") : (y += d, A = c), x = Object.create(b, {
                parent: {
                    value: x
                }
            });
        }
        function v(b, c) {
            if (A += b, void 0 === c) return y += q(), 0;
            var d = g(c, x);
            if (d) return y += q(), u(d, c), d.rB ? 0 : c.length;
            var e = h(x, c);
            if (e) {
                var f = x;
                f.rE || f.eE || (A += c), y += q();
                do x.cN && (y += "</span>"), B += x.r, x = x.parent; while (x != e.parent);
                return f.eE && (y += a(c)), A = "", e.starts && u(e.starts, ""), f.rE ? 0 : c.length;
            }
            if (l(c, x)) throw new Error('Illegal lexeme "' + c + '" for mode "' + (x.cN || "<unnamed>") + '"');
            return A += c, c.length || 1;
        }
        var w = r(b);
        if (!w) throw new Error('Unknown language: "' + b + '"');
        i(w);
        for (var x = f || w, y = "", z = x; z != w; z = z.parent) z.cN && (y = n(z.cN, y, !0));
        var A = "", B = 0;
        try {
            for (var C, D, E = 0; ;) {
                if (x.t.lastIndex = E, C = x.t.exec(d), !C) break;
                D = v(d.substr(E, C.index - E), C[0]), E = C.index + D;
            }
            v(d.substr(E));
            for (var z = x; z.parent; z = z.parent) z.cN && (y += "</span>");
            return {
                r: B,
                value: y,
                language: b,
                top: x
            };
        } catch (F) {
            if (-1 != F.message.indexOf("Illegal")) return {
                r: 0,
                value: a(d)
            };
            throw F;
        }
    }
    function k(b, c) {
        c = c || s.languages || Object.keys(t);
        var d = {
            r: 0,
            value: a(b)
        }, e = d;
        return c.forEach(function(a) {
            if (r(a)) {
                var c = j(a, b, !1);
                c.language = a, c.r > e.r && (e = c), c.r > d.r && (e = d, d = c);
            }
        }), e.language && (d.second_best = e), d;
    }
    function l(a) {
        return s.tabReplace && (a = a.replace(/^((<[^>]+>|\t)+)/gm, function(a, b) {
            return b.replace(/\t/g, s.tabReplace);
        })), s.useBR && (a = a.replace(/\n/g, "<br>")), a;
    }
    function m(a) {
        var b = d(a), c = e(a);
        if ("no-highlight" != c) {
            var f = c ? j(c, b, !0) : k(b), i = g(a);
            if (i.length) {
                var m = document.createElementNS("http://www.w3.org/1999/xhtml", "pre");
                m.innerHTML = f.value, f.value = h(i, g(m), b);
            }
            f.value = l(f.value), a.innerHTML = f.value, a.className += " hljs " + (!c && f.language || ""), 
            a.result = {
                language: f.language,
                re: f.r
            }, f.second_best && (a.second_best = {
                language: f.second_best.language,
                re: f.second_best.r
            });
        }
    }
    function n(a) {
        s = f(s, a);
    }
    function o() {
        if (!o.called) {
            o.called = !0;
            var a = document.querySelectorAll("pre code");
            Array.prototype.forEach.call(a, m);
        }
    }
    function p() {
        addEventListener("DOMContentLoaded", o, !1), addEventListener("load", o, !1);
    }
    function q(a, b) {
        var c = t[a] = b(this);
        c.aliases && c.aliases.forEach(function(b) {
            u[b] = a;
        });
    }
    function r(a) {
        return t[a] || t[u[a]];
    }
    var s = {
        classPrefix: "hljs-",
        tabReplace: null,
        useBR: !1,
        languages: void 0
    }, t = {}, u = {};
    this.highlight = j, this.highlightAuto = k, this.fixMarkup = l, this.highlightBlock = m, 
    this.configure = n, this.initHighlighting = o, this.initHighlightingOnLoad = p, 
    this.registerLanguage = q, this.getLanguage = r, this.inherit = f, this.IR = "[a-zA-Z][a-zA-Z0-9_]*", 
    this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*", this.NR = "\\b\\d+(\\.\\d+)?", this.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", 
    this.BNR = "\\b(0b[01]+)", this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", 
    this.BE = {
        b: "\\\\[\\s\\S]",
        r: 0
    }, this.ASM = {
        cN: "string",
        b: "'",
        e: "'",
        i: "\\n",
        c: [ this.BE ]
    }, this.QSM = {
        cN: "string",
        b: '"',
        e: '"',
        i: "\\n",
        c: [ this.BE ]
    }, this.CLCM = {
        cN: "comment",
        b: "//",
        e: "$"
    }, this.CBLCLM = {
        cN: "comment",
        b: "/\\*",
        e: "\\*/"
    }, this.HCM = {
        cN: "comment",
        b: "#",
        e: "$"
    }, this.NM = {
        cN: "number",
        b: this.NR,
        r: 0
    }, this.CNM = {
        cN: "number",
        b: this.CNR,
        r: 0
    }, this.BNM = {
        cN: "number",
        b: this.BNR,
        r: 0
    }, this.REGEXP_MODE = {
        cN: "regexp",
        b: /\//,
        e: /\/[gim]*/,
        i: /\n/,
        c: [ this.BE, {
            b: /\[/,
            e: /\]/,
            r: 0,
            c: [ this.BE ]
        } ]
    }, this.TM = {
        cN: "title",
        b: this.IR,
        r: 0
    }, this.UTM = {
        cN: "title",
        b: this.UIR,
        r: 0
    };
}();

hljs.registerLanguage("bash", function(a) {
    var b = {
        cN: "variable",
        v: [ {
            b: /\$[\w\d#@][\w\d_]*/
        }, {
            b: /\$\{(.*?)\}/
        } ]
    }, c = {
        cN: "string",
        b: /"/,
        e: /"/,
        c: [ a.BE, b, {
            cN: "variable",
            b: /\$\(/,
            e: /\)/,
            c: [ a.BE ]
        } ]
    }, d = {
        cN: "string",
        b: /'/,
        e: /'/
    };
    return {
        l: /-?[a-z\.]+/,
        k: {
            keyword: "if then else elif fi for break continue while in do done exit return set declare case esac export exec",
            literal: "true false",
            built_in: "printf echo read cd pwd pushd popd dirs let eval unset typeset readonly getopts source shopt caller type hash bind help sudo",
            operator: "-ne -eq -lt -gt -f -d -e -s -l -a"
        },
        c: [ {
            cN: "shebang",
            b: /^#![^\n]+sh\s*$/,
            r: 10
        }, {
            cN: "function",
            b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
            rB: !0,
            c: [ a.inherit(a.TM, {
                b: /\w[\w\d_]*/
            }) ],
            r: 0
        }, a.HCM, a.NM, c, d, b ]
    };
}), hljs.registerLanguage("cs", function(a) {
    var b = "abstract as base bool break byte case catch char checked const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long new null object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async await ascending descending from get group into join let orderby partial select set value var where yield";
    return {
        k: b,
        c: [ {
            cN: "comment",
            b: "///",
            e: "$",
            rB: !0,
            c: [ {
                cN: "xmlDocTag",
                b: "///|<!--|-->"
            }, {
                cN: "xmlDocTag",
                b: "</?",
                e: ">"
            } ]
        }, a.CLCM, a.CBLCLM, {
            cN: "preprocessor",
            b: "#",
            e: "$",
            k: "if else elif endif define undef warning error line region endregion pragma checksum"
        }, {
            cN: "string",
            b: '@"',
            e: '"',
            c: [ {
                b: '""'
            } ]
        }, a.ASM, a.QSM, a.CNM, {
            bK: "protected public private internal",
            e: /[{;=]/,
            k: b,
            c: [ {
                bK: "class namespace interface",
                starts: {
                    c: [ a.TM ]
                }
            }, {
                b: a.IR + "\\s*\\(",
                rB: !0,
                c: [ a.TM ]
            } ]
        } ]
    };
}), hljs.registerLanguage("ruby", function(a) {
    var b = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?", c = "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor", d = {
        cN: "yardoctag",
        b: "@[A-Za-z]+"
    }, e = {
        cN: "comment",
        v: [ {
            b: "#",
            e: "$",
            c: [ d ]
        }, {
            b: "^\\=begin",
            e: "^\\=end",
            c: [ d ],
            r: 10
        }, {
            b: "^__END__",
            e: "\\n$"
        } ]
    }, f = {
        cN: "subst",
        b: "#\\{",
        e: "}",
        k: c
    }, g = {
        cN: "string",
        c: [ a.BE, f ],
        v: [ {
            b: /'/,
            e: /'/
        }, {
            b: /"/,
            e: /"/
        }, {
            b: "%[qw]?\\(",
            e: "\\)"
        }, {
            b: "%[qw]?\\[",
            e: "\\]"
        }, {
            b: "%[qw]?{",
            e: "}"
        }, {
            b: "%[qw]?<",
            e: ">",
            r: 10
        }, {
            b: "%[qw]?/",
            e: "/",
            r: 10
        }, {
            b: "%[qw]?%",
            e: "%",
            r: 10
        }, {
            b: "%[qw]?-",
            e: "-",
            r: 10
        }, {
            b: "%[qw]?\\|",
            e: "\\|",
            r: 10
        }, {
            b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
        } ]
    }, h = {
        cN: "params",
        b: "\\(",
        e: "\\)",
        k: c
    }, i = [ g, e, {
        cN: "class",
        bK: "class module",
        e: "$|;",
        i: /=/,
        c: [ a.inherit(a.TM, {
            b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
        }), {
            cN: "inheritance",
            b: "<\\s*",
            c: [ {
                cN: "parent",
                b: "(" + a.IR + "::)?" + a.IR
            } ]
        }, e ]
    }, {
        cN: "function",
        bK: "def",
        e: " |$|;",
        r: 0,
        c: [ a.inherit(a.TM, {
            b: b
        }), h, e ]
    }, {
        cN: "constant",
        b: "(::)?(\\b[A-Z]\\w*(::)?)+",
        r: 0
    }, {
        cN: "symbol",
        b: ":",
        c: [ g, {
            b: b
        } ],
        r: 0
    }, {
        cN: "symbol",
        b: a.UIR + "(\\!|\\?)?:",
        r: 0
    }, {
        cN: "number",
        b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
        r: 0
    }, {
        cN: "variable",
        b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
    }, {
        b: "(" + a.RSR + ")\\s*",
        c: [ e, {
            cN: "regexp",
            c: [ a.BE, f ],
            i: /\n/,
            v: [ {
                b: "/",
                e: "/[a-z]*"
            }, {
                b: "%r{",
                e: "}[a-z]*"
            }, {
                b: "%r\\(",
                e: "\\)[a-z]*"
            }, {
                b: "%r!",
                e: "![a-z]*"
            }, {
                b: "%r\\[",
                e: "\\][a-z]*"
            } ]
        } ],
        r: 0
    } ];
    return f.c = i, h.c = i, {
        k: c,
        c: i
    };
}), hljs.registerLanguage("diff", function() {
    return {
        c: [ {
            cN: "chunk",
            r: 10,
            v: [ {
                b: /^\@\@ +\-\d+,\d+ +\+\d+,\d+ +\@\@$/
            }, {
                b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
            }, {
                b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/
            } ]
        }, {
            cN: "header",
            v: [ {
                b: /Index: /,
                e: /$/
            }, {
                b: /=====/,
                e: /=====$/
            }, {
                b: /^\-\-\-/,
                e: /$/
            }, {
                b: /^\*{3} /,
                e: /$/
            }, {
                b: /^\+\+\+/,
                e: /$/
            }, {
                b: /\*{5}/,
                e: /\*{5}$/
            } ]
        }, {
            cN: "addition",
            b: "^\\+",
            e: "$"
        }, {
            cN: "deletion",
            b: "^\\-",
            e: "$"
        }, {
            cN: "change",
            b: "^\\!",
            e: "$"
        } ]
    };
}), hljs.registerLanguage("javascript", function(a) {
    return {
        aliases: [ "js" ],
        k: {
            keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",
            literal: "true false null undefined NaN Infinity",
            built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require"
        },
        c: [ {
            cN: "pi",
            b: /^\s*('|")use strict('|")/,
            r: 10
        }, a.ASM, a.QSM, a.CLCM, a.CBLCLM, a.CNM, {
            b: "(" + a.RSR + "|\\b(case|return|throw)\\b)\\s*",
            k: "return throw case",
            c: [ a.CLCM, a.CBLCLM, a.REGEXP_MODE, {
                b: /</,
                e: />;/,
                r: 0,
                sL: "xml"
            } ],
            r: 0
        }, {
            cN: "function",
            bK: "function",
            e: /\{/,
            c: [ a.inherit(a.TM, {
                b: /[A-Za-z$_][0-9A-Za-z$_]*/
            }), {
                cN: "params",
                b: /\(/,
                e: /\)/,
                c: [ a.CLCM, a.CBLCLM ],
                i: /["'\(]/
            } ],
            i: /\[|%/
        }, {
            b: /\$[(.]/
        }, {
            b: "\\." + a.IR,
            r: 0
        } ]
    };
}), hljs.registerLanguage("xml", function() {
    var a = "[A-Za-z0-9\\._:-]+", b = {
        b: /<\?(php)?(?!\w)/,
        e: /\?>/,
        sL: "php",
        subLanguageMode: "continuous"
    }, c = {
        eW: !0,
        i: /</,
        r: 0,
        c: [ b, {
            cN: "attribute",
            b: a,
            r: 0
        }, {
            b: "=",
            r: 0,
            c: [ {
                cN: "value",
                v: [ {
                    b: /"/,
                    e: /"/
                }, {
                    b: /'/,
                    e: /'/
                }, {
                    b: /[^\s\/>]+/
                } ]
            } ]
        } ]
    };
    return {
        aliases: [ "html" ],
        cI: !0,
        c: [ {
            cN: "doctype",
            b: "<!DOCTYPE",
            e: ">",
            r: 10,
            c: [ {
                b: "\\[",
                e: "\\]"
            } ]
        }, {
            cN: "comment",
            b: "<!--",
            e: "-->",
            r: 10
        }, {
            cN: "cdata",
            b: "<\\!\\[CDATA\\[",
            e: "\\]\\]>",
            r: 10
        }, {
            cN: "tag",
            b: "<style(?=\\s|>|$)",
            e: ">",
            k: {
                title: "style"
            },
            c: [ c ],
            starts: {
                e: "</style>",
                rE: !0,
                sL: "css"
            }
        }, {
            cN: "tag",
            b: "<script(?=\\s|>|$)",
            e: ">",
            k: {
                title: "script"
            },
            c: [ c ],
            starts: {
                e: "</script>",
                rE: !0,
                sL: "javascript"
            }
        }, {
            b: "<%",
            e: "%>",
            sL: "vbscript"
        }, b, {
            cN: "pi",
            b: /<\?\w+/,
            e: /\?>/,
            r: 10
        }, {
            cN: "tag",
            b: "</?",
            e: "/?>",
            c: [ {
                cN: "title",
                b: "[^ /><]+",
                r: 0
            }, c ]
        } ]
    };
}), hljs.registerLanguage("markdown", function() {
    return {
        c: [ {
            cN: "header",
            v: [ {
                b: "^#{1,6}",
                e: "$"
            }, {
                b: "^.+?\\n[=-]{2,}$"
            } ]
        }, {
            b: "<",
            e: ">",
            sL: "xml",
            r: 0
        }, {
            cN: "bullet",
            b: "^([*+-]|(\\d+\\.))\\s+"
        }, {
            cN: "strong",
            b: "[*_]{2}.+?[*_]{2}"
        }, {
            cN: "emphasis",
            v: [ {
                b: "\\*.+?\\*"
            }, {
                b: "_.+?_",
                r: 0
            } ]
        }, {
            cN: "blockquote",
            b: "^>\\s+",
            e: "$"
        }, {
            cN: "code",
            v: [ {
                b: "`.+?`"
            }, {
                b: "^( {4}|	)",
                e: "$",
                r: 0
            } ]
        }, {
            cN: "horizontal_rule",
            b: "^[-\\*]{3,}",
            e: "$"
        }, {
            b: "\\[.+?\\][\\(\\[].+?[\\)\\]]",
            rB: !0,
            c: [ {
                cN: "link_label",
                b: "\\[",
                e: "\\]",
                eB: !0,
                rE: !0,
                r: 0
            }, {
                cN: "link_url",
                b: "\\]\\(",
                e: "\\)",
                eB: !0,
                eE: !0
            }, {
                cN: "link_reference",
                b: "\\]\\[",
                e: "\\]",
                eB: !0,
                eE: !0
            } ],
            r: 10
        }, {
            b: "^\\[.+\\]:",
            e: "$",
            rB: !0,
            c: [ {
                cN: "link_reference",
                b: "\\[",
                e: "\\]",
                eB: !0,
                eE: !0
            }, {
                cN: "link_url",
                b: "\\s",
                e: "$"
            } ]
        } ]
    };
}), hljs.registerLanguage("css", function(a) {
    var b = "[a-zA-Z-][a-zA-Z0-9_-]*", c = {
        cN: "function",
        b: b + "\\(",
        e: "\\)",
        c: [ "self", a.NM, a.ASM, a.QSM ]
    };
    return {
        cI: !0,
        i: "[=/|']",
        c: [ a.CBLCLM, {
            cN: "id",
            b: "\\#[A-Za-z0-9_-]+"
        }, {
            cN: "class",
            b: "\\.[A-Za-z0-9_-]+",
            r: 0
        }, {
            cN: "attr_selector",
            b: "\\[",
            e: "\\]",
            i: "$"
        }, {
            cN: "pseudo",
            b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"
        }, {
            cN: "at_rule",
            b: "@(font-face|page)",
            l: "[a-z-]+",
            k: "font-face page"
        }, {
            cN: "at_rule",
            b: "@",
            e: "[{;]",
            c: [ {
                cN: "keyword",
                b: /\S+/
            }, {
                b: /\s/,
                eW: !0,
                eE: !0,
                r: 0,
                c: [ c, a.ASM, a.QSM, a.NM ]
            } ]
        }, {
            cN: "tag",
            b: b,
            r: 0
        }, {
            cN: "rules",
            b: "{",
            e: "}",
            i: "[^\\s]",
            r: 0,
            c: [ a.CBLCLM, {
                cN: "rule",
                b: "[^\\s]",
                rB: !0,
                e: ";",
                eW: !0,
                c: [ {
                    cN: "attribute",
                    b: "[A-Z\\_\\.\\-]+",
                    e: ":",
                    eE: !0,
                    i: "[^\\s]",
                    starts: {
                        cN: "value",
                        eW: !0,
                        eE: !0,
                        c: [ c, a.NM, a.QSM, a.ASM, a.CBLCLM, {
                            cN: "hexcolor",
                            b: "#[0-9A-Fa-f]+"
                        }, {
                            cN: "important",
                            b: "!important"
                        } ]
                    }
                } ]
            } ]
        } ]
    };
}), hljs.registerLanguage("http", function() {
    return {
        i: "\\S",
        c: [ {
            cN: "status",
            b: "^HTTP/[0-9\\.]+",
            e: "$",
            c: [ {
                cN: "number",
                b: "\\b\\d{3}\\b"
            } ]
        }, {
            cN: "request",
            b: "^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",
            rB: !0,
            e: "$",
            c: [ {
                cN: "string",
                b: " ",
                e: " ",
                eB: !0,
                eE: !0
            } ]
        }, {
            cN: "attribute",
            b: "^\\w",
            e: ": ",
            eE: !0,
            i: "\\n|\\s|=",
            starts: {
                cN: "string",
                e: "$"
            }
        }, {
            b: "\\n\\n",
            starts: {
                sL: "",
                eW: !0
            }
        } ]
    };
}), hljs.registerLanguage("java", function(a) {
    var b = "false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws";
    return {
        k: b,
        i: /<\//,
        c: [ {
            cN: "javadoc",
            b: "/\\*\\*",
            e: "\\*/",
            c: [ {
                cN: "javadoctag",
                b: "(^|\\s)@[A-Za-z]+"
            } ],
            r: 10
        }, a.CLCM, a.CBLCLM, a.ASM, a.QSM, {
            bK: "protected public private",
            e: /[{;=]/,
            k: b,
            c: [ {
                cN: "class",
                bK: "class interface",
                eW: !0,
                i: /[:"<>]/,
                c: [ {
                    bK: "extends implements",
                    r: 10
                }, a.UTM ]
            }, {
                b: a.UIR + "\\s*\\(",
                rB: !0,
                c: [ a.UTM ]
            } ]
        }, a.CNM, {
            cN: "annotation",
            b: "@[A-Za-z]+"
        } ]
    };
}), hljs.registerLanguage("php", function(a) {
    var b = {
        cN: "variable",
        b: "\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"
    }, c = {
        cN: "preprocessor",
        b: /<\?(php)?|\?>/
    }, d = {
        cN: "string",
        c: [ a.BE, c ],
        v: [ {
            b: 'b"',
            e: '"'
        }, {
            b: "b'",
            e: "'"
        }, a.inherit(a.ASM, {
            i: null
        }), a.inherit(a.QSM, {
            i: null
        }) ]
    }, e = {
        v: [ a.BNM, a.CNM ]
    };
    return {
        cI: !0,
        k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
        c: [ a.CLCM, a.HCM, {
            cN: "comment",
            b: "/\\*",
            e: "\\*/",
            c: [ {
                cN: "phpdoc",
                b: "\\s@[A-Za-z]+"
            }, c ]
        }, {
            cN: "comment",
            b: "__halt_compiler.+?;",
            eW: !0,
            k: "__halt_compiler",
            l: a.UIR
        }, {
            cN: "string",
            b: "<<<['\"]?\\w+['\"]?$",
            e: "^\\w+;",
            c: [ a.BE ]
        }, c, b, {
            cN: "function",
            bK: "function",
            e: /[;{]/,
            i: "\\$|\\[|%",
            c: [ a.UTM, {
                cN: "params",
                b: "\\(",
                e: "\\)",
                c: [ "self", b, a.CBLCLM, d, e ]
            } ]
        }, {
            cN: "class",
            bK: "class interface",
            e: "{",
            i: /[:\(\$"]/,
            c: [ {
                bK: "extends implements",
                r: 10
            }, a.UTM ]
        }, {
            bK: "namespace",
            e: ";",
            i: /[\.']/,
            c: [ a.UTM ]
        }, {
            bK: "use",
            e: ";",
            c: [ a.UTM ]
        }, {
            b: "=>"
        }, d, e ]
    };
}), hljs.registerLanguage("python", function(a) {
    var b = {
        cN: "prompt",
        b: /^(>>>|\.\.\.) /
    }, c = {
        cN: "string",
        c: [ a.BE ],
        v: [ {
            b: /(u|b)?r?'''/,
            e: /'''/,
            c: [ b ],
            r: 10
        }, {
            b: /(u|b)?r?"""/,
            e: /"""/,
            c: [ b ],
            r: 10
        }, {
            b: /(u|r|ur)'/,
            e: /'/,
            r: 10
        }, {
            b: /(u|r|ur)"/,
            e: /"/,
            r: 10
        }, {
            b: /(b|br)'/,
            e: /'/
        }, {
            b: /(b|br)"/,
            e: /"/
        }, a.ASM, a.QSM ]
    }, d = {
        cN: "number",
        r: 0,
        v: [ {
            b: a.BNR + "[lLjJ]?"
        }, {
            b: "\\b(0o[0-7]+)[lLjJ]?"
        }, {
            b: a.CNR + "[lLjJ]?"
        } ]
    }, e = {
        cN: "params",
        b: /\(/,
        e: /\)/,
        c: [ "self", b, d, c ]
    }, f = {
        e: /:/,
        i: /[${=;\n]/,
        c: [ a.UTM, e ]
    };
    return {
        k: {
            keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda nonlocal|10 None True False",
            built_in: "Ellipsis NotImplemented"
        },
        i: /(<\/|->|\?)/,
        c: [ b, d, c, a.HCM, a.inherit(f, {
            cN: "function",
            bK: "def",
            r: 10
        }), a.inherit(f, {
            cN: "class",
            bK: "class"
        }), {
            cN: "decorator",
            b: /@/,
            e: /$/
        }, {
            b: /\b(print|exec)\(/
        } ]
    };
}), hljs.registerLanguage("sql", function(a) {
    return {
        cI: !0,
        i: /[<>]/,
        c: [ {
            cN: "operator",
            b: "\\b(begin|end|start|commit|rollback|savepoint|lock|alter|create|drop|rename|call|delete|do|handler|insert|load|replace|select|truncate|update|set|show|pragma|grant|merge)\\b(?!:)",
            e: ";",
            eW: !0,
            k: {
                keyword: "all partial global month current_timestamp using go revoke smallint indicator end-exec disconnect zone with character assertion to add current_user usage input local alter match collate real then rollback get read timestamp session_user not integer bit unique day minute desc insert execute like ilike|2 level decimal drop continue isolation found where constraints domain right national some module transaction relative second connect escape close system_user for deferred section cast current sqlstate allocate intersect deallocate numeric public preserve full goto initially asc no key output collation group by union session both last language constraint column of space foreign deferrable prior connection unknown action commit view or first into float year primary cascaded except restrict set references names table outer open select size are rows from prepare distinct leading create only next inner authorization schema corresponding option declare precision immediate else timezone_minute external varying translation true case exception join hour default double scroll value cursor descriptor values dec fetch procedure delete and false int is describe char as at in varchar null trailing any absolute current_time end grant privileges when cross check write current_date pad begin temporary exec time update catalog user sql date on identity timezone_hour natural whenever interval work order cascade diagnostics nchar having left call do handler load replace truncate start lock show pragma exists number trigger if before after each row merge matched database",
                aggregate: "count sum min max avg"
            },
            c: [ {
                cN: "string",
                b: "'",
                e: "'",
                c: [ a.BE, {
                    b: "''"
                } ]
            }, {
                cN: "string",
                b: '"',
                e: '"',
                c: [ a.BE, {
                    b: '""'
                } ]
            }, {
                cN: "string",
                b: "`",
                e: "`",
                c: [ a.BE ]
            }, a.CNM ]
        }, a.CBLCLM, {
            cN: "comment",
            b: "--",
            e: "$"
        } ]
    };
}), hljs.registerLanguage("ini", function(a) {
    return {
        cI: !0,
        i: /\S/,
        c: [ {
            cN: "comment",
            b: ";",
            e: "$"
        }, {
            cN: "title",
            b: "^\\[",
            e: "\\]"
        }, {
            cN: "setting",
            b: "^[a-z0-9\\[\\]_-]+[ \\t]*=[ \\t]*",
            e: "$",
            c: [ {
                cN: "value",
                eW: !0,
                k: "on off true false yes no",
                c: [ a.QSM, a.NM ],
                r: 0
            } ]
        } ]
    };
}), hljs.registerLanguage("perl", function(a) {
    var b = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when", c = {
        cN: "subst",
        b: "[$@]\\{",
        e: "\\}",
        k: b
    }, d = {
        b: "->{",
        e: "}"
    }, e = {
        cN: "variable",
        v: [ {
            b: /\$\d/
        }, {
            b: /[\$\%\@\*](\^\w\b|#\w+(\:\:\w+)*|{\w+}|\w+(\:\:\w*)*)/
        }, {
            b: /[\$\%\@\*][^\s\w{]/,
            r: 0
        } ]
    }, f = {
        cN: "comment",
        b: "^(__END__|__DATA__)",
        e: "\\n$",
        r: 5
    }, g = [ a.BE, c, e ], h = [ e, a.HCM, f, {
        cN: "comment",
        b: "^\\=\\w",
        e: "\\=cut",
        eW: !0
    }, d, {
        cN: "string",
        c: g,
        v: [ {
            b: "q[qwxr]?\\s*\\(",
            e: "\\)",
            r: 5
        }, {
            b: "q[qwxr]?\\s*\\[",
            e: "\\]",
            r: 5
        }, {
            b: "q[qwxr]?\\s*\\{",
            e: "\\}",
            r: 5
        }, {
            b: "q[qwxr]?\\s*\\|",
            e: "\\|",
            r: 5
        }, {
            b: "q[qwxr]?\\s*\\<",
            e: "\\>",
            r: 5
        }, {
            b: "qw\\s+q",
            e: "q",
            r: 5
        }, {
            b: "'",
            e: "'",
            c: [ a.BE ]
        }, {
            b: '"',
            e: '"'
        }, {
            b: "`",
            e: "`",
            c: [ a.BE ]
        }, {
            b: "{\\w+}",
            c: [],
            r: 0
        }, {
            b: "-?\\w+\\s*\\=\\>",
            c: [],
            r: 0
        } ]
    }, {
        cN: "number",
        b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
        r: 0
    }, {
        b: "(\\/\\/|" + a.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
        k: "split return print reverse grep",
        r: 0,
        c: [ a.HCM, f, {
            cN: "regexp",
            b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
            r: 10
        }, {
            cN: "regexp",
            b: "(m|qr)?/",
            e: "/[a-z]*",
            c: [ a.BE ],
            r: 0
        } ]
    }, {
        cN: "sub",
        bK: "sub",
        e: "(\\s*\\(.*?\\))?[;{]",
        r: 5
    }, {
        cN: "operator",
        b: "-\\w\\b",
        r: 0
    } ];
    return c.c = h, d.c = h, {
        k: b,
        c: h
    };
}), hljs.registerLanguage("objectivec", function(a) {
    var b = {
        keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign self synchronized id nonatomic super unichar IBOutlet IBAction strong weak @private @protected @public @try @property @end @throw @catch @finally @synthesize @dynamic @selector @optional @required",
        literal: "false true FALSE TRUE nil YES NO NULL",
        built_in: "NSString NSDictionary CGRect CGPoint UIButton UILabel UITextView UIWebView MKMapView UISegmentedControl NSObject UITableViewDelegate UITableViewDataSource NSThread UIActivityIndicator UITabbar UIToolBar UIBarButtonItem UIImageView NSAutoreleasePool UITableView BOOL NSInteger CGFloat NSException NSLog NSMutableString NSMutableArray NSMutableDictionary NSURL NSIndexPath CGSize UITableViewCell UIView UIViewController UINavigationBar UINavigationController UITabBarController UIPopoverController UIPopoverControllerDelegate UIImage NSNumber UISearchBar NSFetchedResultsController NSFetchedResultsChangeType UIScrollView UIScrollViewDelegate UIEdgeInsets UIColor UIFont UIApplication NSNotFound NSNotificationCenter NSNotification UILocalNotification NSBundle NSFileManager NSTimeInterval NSDate NSCalendar NSUserDefaults UIWindow NSRange NSArray NSError NSURLRequest NSURLConnection UIInterfaceOrientation MPMoviePlayerController dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
    }, c = /[a-zA-Z@][a-zA-Z0-9_]*/, d = "@interface @class @protocol @implementation";
    return {
        k: b,
        l: c,
        i: "</",
        c: [ a.CLCM, a.CBLCLM, a.CNM, a.QSM, {
            cN: "string",
            b: "'",
            e: "[^\\\\]'",
            i: "[^\\\\][^']"
        }, {
            cN: "preprocessor",
            b: "#import",
            e: "$",
            c: [ {
                cN: "title",
                b: '"',
                e: '"'
            }, {
                cN: "title",
                b: "<",
                e: ">"
            } ]
        }, {
            cN: "preprocessor",
            b: "#",
            e: "$"
        }, {
            cN: "class",
            b: "(" + d.split(" ").join("|") + ")\\b",
            e: "({|$)",
            k: d,
            l: c,
            c: [ a.UTM ]
        }, {
            cN: "variable",
            b: "\\." + a.UIR,
            r: 0
        } ]
    };
}), hljs.registerLanguage("coffeescript", function(a) {
    var b = {
        keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
        literal: "true false null undefined yes no on off",
        reserved: "case default function var void with const let enum export import native __hasProp __extends __slice __bind __indexOf",
        built_in: "npm require console print module exports global window document"
    }, c = "[A-Za-z$_][0-9A-Za-z$_]*", d = a.inherit(a.TM, {
        b: c
    }), e = {
        cN: "subst",
        b: /#\{/,
        e: /}/,
        k: b
    }, f = [ a.BNM, a.inherit(a.CNM, {
        starts: {
            e: "(\\s*/)?",
            r: 0
        }
    }), {
        cN: "string",
        v: [ {
            b: /'''/,
            e: /'''/,
            c: [ a.BE ]
        }, {
            b: /'/,
            e: /'/,
            c: [ a.BE ]
        }, {
            b: /"""/,
            e: /"""/,
            c: [ a.BE, e ]
        }, {
            b: /"/,
            e: /"/,
            c: [ a.BE, e ]
        } ]
    }, {
        cN: "regexp",
        v: [ {
            b: "///",
            e: "///",
            c: [ e, a.HCM ]
        }, {
            b: "//[gim]*",
            r: 0
        }, {
            b: "/\\S(\\\\.|[^\\n])*?/[gim]*(?=\\s|\\W|$)"
        } ]
    }, {
        cN: "property",
        b: "@" + c
    }, {
        b: "`",
        e: "`",
        eB: !0,
        eE: !0,
        sL: "javascript"
    } ];
    return e.c = f, {
        k: b,
        c: f.concat([ {
            cN: "comment",
            b: "###",
            e: "###"
        }, a.HCM, {
            cN: "function",
            b: "(" + c + "\\s*=\\s*)?(\\(.*\\))?\\s*\\B[-=]>",
            e: "[-=]>",
            rB: !0,
            c: [ d, {
                cN: "params",
                b: "\\(",
                rB: !0,
                c: [ {
                    b: /\(/,
                    e: /\)/,
                    k: b,
                    c: [ "self" ].concat(f)
                } ]
            } ]
        }, {
            cN: "class",
            bK: "class",
            e: "$",
            i: /[:="\[\]]/,
            c: [ {
                bK: "extends",
                eW: !0,
                i: /[:="\[\]]/,
                c: [ d ]
            }, d ]
        }, {
            cN: "attribute",
            b: c + ":",
            e: ":",
            rB: !0,
            eE: !0,
            r: 0
        } ])
    };
}), hljs.registerLanguage("nginx", function(a) {
    var b = {
        cN: "variable",
        v: [ {
            b: /\$\d+/
        }, {
            b: /\$\{/,
            e: /}/
        }, {
            b: "[\\$\\@]" + a.UIR
        } ]
    }, c = {
        eW: !0,
        l: "[a-z/_]+",
        k: {
            built_in: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
        },
        r: 0,
        i: "=>",
        c: [ a.HCM, {
            cN: "string",
            c: [ a.BE, b ],
            v: [ {
                b: /"/,
                e: /"/
            }, {
                b: /'/,
                e: /'/
            } ]
        }, {
            cN: "url",
            b: "([a-z]+):/",
            e: "\\s",
            eW: !0,
            eE: !0
        }, {
            cN: "regexp",
            c: [ a.BE, b ],
            v: [ {
                b: "\\s\\^",
                e: "\\s|{|;",
                rE: !0
            }, {
                b: "~\\*?\\s+",
                e: "\\s|{|;",
                rE: !0
            }, {
                b: "\\*(\\.[a-z\\-]+)+"
            }, {
                b: "([a-z\\-]+\\.)+\\*"
            } ]
        }, {
            cN: "number",
            b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
        }, {
            cN: "number",
            b: "\\b\\d+[kKmMgGdshdwy]*\\b",
            r: 0
        }, b ]
    };
    return {
        c: [ a.HCM, {
            b: a.UIR + "\\s",
            e: ";|{",
            rB: !0,
            c: [ a.inherit(a.UTM, {
                starts: c
            }) ],
            r: 0
        } ],
        i: "[^\\s\\}]"
    };
}), hljs.registerLanguage("json", function(a) {
    var b = {
        literal: "true false null"
    }, c = [ a.QSM, a.CNM ], d = {
        cN: "value",
        e: ",",
        eW: !0,
        eE: !0,
        c: c,
        k: b
    }, e = {
        b: "{",
        e: "}",
        c: [ {
            cN: "attribute",
            b: '\\s*"',
            e: '"\\s*:\\s*',
            eB: !0,
            eE: !0,
            c: [ a.BE ],
            i: "\\n",
            starts: d
        } ],
        i: "\\S"
    }, f = {
        b: "\\[",
        e: "\\]",
        c: [ a.inherit(d, {
            cN: null
        }) ],
        i: "\\S"
    };
    return c.splice(c.length, 0, e, f), {
        c: c,
        k: b,
        i: "\\S"
    };
}), hljs.registerLanguage("apache", function(a) {
    var b = {
        cN: "number",
        b: "[\\$%]\\d+"
    };
    return {
        cI: !0,
        c: [ a.HCM, {
            cN: "tag",
            b: "</?",
            e: ">"
        }, {
            cN: "keyword",
            b: /\w+/,
            r: 0,
            k: {
                common: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
            },
            starts: {
                e: /$/,
                r: 0,
                k: {
                    literal: "on off all"
                },
                c: [ {
                    cN: "sqbracket",
                    b: "\\s\\[",
                    e: "\\]$"
                }, {
                    cN: "cbracket",
                    b: "[\\$%]\\{",
                    e: "\\}",
                    c: [ "self", b ]
                }, b, a.QSM ]
            }
        } ],
        i: /\S/
    };
}), hljs.registerLanguage("scss", function(a) {
    {
        var b = "[a-zA-Z-][a-zA-Z0-9_-]*", c = {
            cN: "function",
            b: b + "\\(",
            e: "\\)",
            c: [ "self", a.NM, a.ASM, a.QSM ]
        }, d = {
            cN: "hexcolor",
            b: "#[0-9A-Fa-f]+"
        };
        ({
            cN: "attribute",
            b: "[A-Z\\_\\.\\-]+",
            e: ":",
            eE: !0,
            i: "[^\\s]",
            starts: {
                cN: "value",
                eW: !0,
                eE: !0,
                c: [ c, d, a.NM, a.QSM, a.ASM, a.CBLCLM, {
                    cN: "important",
                    b: "!important"
                } ]
            }
        });
    }
    return {
        cI: !0,
        i: "[=/|']",
        c: [ a.CLCM, a.CBLCLM, {
            cN: "function",
            b: b + "\\(",
            e: "\\)",
            c: [ "self", a.NM, a.ASM, a.QSM ]
        }, {
            cN: "id",
            b: "\\#[A-Za-z0-9_-]+",
            r: 0
        }, {
            cN: "class",
            b: "\\.[A-Za-z0-9_-]+",
            r: 0
        }, {
            cN: "attr_selector",
            b: "\\[",
            e: "\\]",
            i: "$"
        }, {
            cN: "tag",
            b: "\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b",
            r: 0
        }, {
            cN: "pseudo",
            b: ":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)"
        }, {
            cN: "pseudo",
            b: "::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)"
        }, {
            cN: "attribute",
            b: "\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b",
            i: "[^\\s]"
        }, {
            cN: "value",
            b: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
        }, {
            cN: "value",
            b: ":",
            e: ";",
            c: [ d, a.NM, a.QSM, a.ASM, {
                cN: "important",
                b: "!important"
            } ]
        }, {
            cN: "at_rule",
            b: "@",
            e: "[{;]",
            k: "mixin include extend for if else each while charset import debug media page content font-face namespace warn",
            c: [ c, a.QSM, a.ASM, d, a.NM, {
                cN: "preprocessor",
                b: "\\s[A-Za-z0-9_.-]+",
                r: 0
            } ]
        } ]
    };
}), hljs.registerLanguage("cpp", function(a) {
    var b = {
        keyword: "false int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long throw volatile static protected bool template mutable if public friend do return goto auto void enum else break new extern using true class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype noexcept nullptr static_assert thread_local restrict _Bool complex _Complex _Imaginary",
        built_in: "std string cin cout cerr clog stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf"
    };
    return {
        aliases: [ "c" ],
        k: b,
        i: "</",
        c: [ a.CLCM, a.CBLCLM, a.QSM, {
            cN: "string",
            b: "'\\\\?.",
            e: "'",
            i: "."
        }, {
            cN: "number",
            b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
        }, a.CNM, {
            cN: "preprocessor",
            b: "#",
            e: "$",
            c: [ {
                b: "include\\s*<",
                e: ">",
                i: "\\n"
            }, a.CLCM ]
        }, {
            cN: "stl_container",
            b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
            e: ">",
            k: b,
            r: 10,
            c: [ "self" ]
        } ]
    };
}), hljs.registerLanguage("makefile", function(a) {
    var b = {
        cN: "variable",
        b: /\$\(/,
        e: /\)/,
        c: [ a.BE ]
    };
    return {
        c: [ a.HCM, {
            b: /^\w+\s*\W*=/,
            rB: !0,
            r: 0,
            starts: {
                cN: "constant",
                e: /\s*\W*=/,
                eE: !0,
                starts: {
                    e: /$/,
                    r: 0,
                    c: [ b ]
                }
            }
        }, {
            cN: "title",
            b: /^[\w]+:\s*$/
        }, {
            cN: "phony",
            b: /^\.PHONY:/,
            e: /$/,
            k: ".PHONY",
            l: /[\.\w]+/
        }, {
            b: /^\t+/,
            e: /$/,
            c: [ a.QSM, b ]
        } ]
    };
});