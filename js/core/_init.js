$LAB.setOptions(
    {
        AlwaysPreserveOrder: false,
        UsePreloading: true,
        UseLocalXHR: true,
        UseCachePreload: true,
        AllowDuplicates: false,
        AppendTo: "head",
        BasePath: ""
    });

CORE.behaviour.modules.isset = function (sId) {

};


onDomReady(function () {
    var sConsoleMessage = 'DEVICE: ';
    // polyfill for querySelector
    if (!document.querySelectorAll) {
        document.querySelectorAll = function (selector) {
            var doc = document,
                head = doc.documentElement.firstChild,
                styleTag = doc.createElement('STYLE');
            head.appendChild(styleTag);
            doc.__qsaels = [];

            styleTag.styleSheet.cssText = selector + "{x:expression(document.__qsaels.push(this))}";
            window.scrollBy(0, 0);
            return doc.__qsaels;
        };
    }

    if (isMobile.any()) {
        $LAB.script(oGlobalSettings.sPathJs + 'devices/mobile.js').wait(function () {
            sConsoleMessage += 'Mobile' + '\n';
            loadModules();
        });
    } else {
        $LAB.script(oGlobalSettings.sPathJs + 'devices/desktop.js').wait(function () {
            sConsoleMessage += 'Desktop' + '\n';
            loadModules();
        }).wait(function () {
                var bLoadPolyfills = bPolyfills ? bPolyfills : false;

                if (bLoadPolyfills) {

                }
            });
    }

    function loadModules() {
        var sId = '',
            oModules = document.querySelectorAll("[id]"),
            oUi = document.querySelectorAll("[data-ui]"),
            aUi = {},
            key,
            nCounter,
            aTarget;

        sConsoleMessage += 'UI LIBS: ';

        // To load UI libraries based on elements of the DOM
        for (nCounter = 0; nCounter < oUi.length; nCounter++) {
            sId = oUi[nCounter].getAttribute('data-ui');
            aUi[sId] = oGlobalSettings.sPathJs + 'ui/' + sId + '.js';
        }

        for (key in aUi) {
            $LAB.script( aUi[key] );
            sConsoleMessage += key + ' | ' ;
        }

        sConsoleMessage += '\n';

        sConsoleMessage += 'LAUNCH MODULES: ';

        // To Execute behaviours based on modular elements
        for (nCounter = 0; nCounter < oModules.length; nCounter++) {

            sId = oModules[nCounter].id;

            if (CORE.behaviour.modules[ sId ] !== undefined) {
                if (CORE.behaviour.modules[ sId ].require !== undefined) {
                    $LAB.script(CORE.behaviour.modules[ sId ].require).wait(CORE.behaviour.modules[ sId ].init());
                } else {
                    CORE.behaviour.modules[ sId ].init();
                }
                sConsoleMessage += sId + ' | ';
            }
        }

        // Returns performance and development info
        if (console) {
            console.log(sConsoleMessage + '\n' + 'TOTAL ID ELEMENTS:' + nCounter);
        }

        // Always execute the common behaviour (if exist)
        if (CORE.behaviour.common !== undefined) {
            CORE.behaviour.common();
        }

        // To execute behaviours based on pages
        if (typeof CORE.behaviour.page[document.body.id] != "undefined") {
            CORE.behaviour.page[document.body.id]();
        }
    }
});