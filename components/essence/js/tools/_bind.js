FrontendTools.bind = function ( selector , eventType, callback  ) {

    var elms;

    if ( typeof selector === 'object' ) {
        elms = [ selector ];
    } else {
        elms = document.querySelectorAll(selector);
    }

    if ( oGlobalSettings.oBindElements ===  undefined ) {
        oGlobalSettings.oBindElements = {};
    }

    document.addEventListener(eventType, function(event) {

        var target = event.target || window.event.srcElement,
            xPath;

        for (var i=0; i<elms.length; i++) {

            xPath = FrontendTools.getSelector(elms[i]);

            if ( oGlobalSettings.oBindElements[xPath] === undefined ) {
                oGlobalSettings.oBindElements[xPath] = {
                    "xpath" : xPath,
                    "action" : callback
                };
            }


            if ( FrontendTools.getSelector(target).indexOf(oGlobalSettings.oBindElements[xPath].xpath) !== -1) {
                callback.call(elms[i], event);
            }
        }
    });

};
