!function(a, b, c, d, e, f) {
    "use strict";
    e.define("form-validation", [ "form-validation-libs" ], function() {
        function a(a, b, e) {
            "" === b.id && (b.id = "form-validation-" + e);
            var g, h = a, i = {}, j = "en";
            null !== b.getAttribute("data-fc-language") ? j = b.getAttribute("data-fc-language") : navigator.language && (j = navigator.language, 
            -1 !== navigator.language.indexOf("en-") ? j = "en" : -1 !== navigator.language.indexOf("ar-") ? j = "ar" : -1 !== navigator.language.indexOf("es-") ? j = "es" : -1 !== navigator.language.indexOf("fr-") ? j = "fr" : -1 !== navigator.language.indexOf("zh-tw") ? j = "zh_tw" : -1 !== navigator.language.indexOf("zh-") && (j = "zh_cn")), 
            f.getScript(c.sPathJsCore + "ui/forms-locale/" + j + ".js"), g = d.mergeOptions(h.oDefault, i), 
            f(b).parsley(g), f.listen("parsley:form:error", function() {
                f("input.error:hidden", b).each(function() {
                    var a = f(this).closest('[style="display: none;"]').attr("id");
                    return void 0 !== a ? (f('a[href="#' + a + '"]').click(), !1) : void alert(this.name + ": This field is hidden and required.");
                });
            });
        }
        return {
            oDefault: {
                namespace: "data-fc-",
                inputs: "input, textarea, select",
                excluded: "input[type=button], input[type=submit], input[type=reset], input[type=hidden]",
                priorityEnabled: !0,
                uiEnabled: !0,
                validationThreshold: 3,
                focus: "first",
                trigger: "blur",
                errorClass: "error",
                successClass: "success",
                classHandler: function(a) {},
                errorsContainer: function(a) {},
                errorsWrapper: '<ul class="form-error-message"></ul>',
                errorTemplate: "<li></li>"
            },
            onStart: function() {
                var a = d.getDataModules("form-validation"), b = this;
                d.trackModule("JS_Libraries", "call", "form-validation"), f(a).each(function(a) {
                    b.autobind(this, a);
                });
            },
            autobind: function(b, c) {
                a(this, b, c);
            },
            onStop: function() {
                this.sPathCss = null;
            },
            onDestroy: function() {
                delete this.sPathCss;
            }
        };
    });
}(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);