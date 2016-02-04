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


            if ( oGlobalSettings.oBindElements[xPath].xpath === FrontendTools.getSelector(target)) {
                callback.call(elms[i], event);
            }
        }
    });


/*
    var $Target = target instanceof jQuery ? target : $(target);

    for ( var nKey = 0; nKey < $Target.length; nKey++  ) {

        var oTarget = $Target[nKey],
            sId = oTarget.id !== '' ? oTarget.id : $Target.selector;


        if ( oTarget !== undefined ) {


            if ( oGlobalSettings.oBindElements ===  undefined ) {
                oGlobalSettings.oBindElements = {};
            }

            oGlobalSettings.oBindElements[sId] = oTarget;

            if (sEvent === 'submit' ) {

                var keyStop = {
                    8: ":not(input:text, textarea, input:file, input:password)", // stop backspace = back
                    13: "input:text, input:password", // stop enter = submit
                    end: null
                };

                if ( oTarget.id === '') {
                    oTarget.id = sId;
                }

                $(document).bind("keydown", function(e){

                    var selector = keyStop[e.which],
                        oParentForm = $(e.target).parents('form')[0];

                    if( selector !== undefined && $(e.target).is(selector) ) {

                        if ( oParentForm !== undefined ) {

                            if ( oParentForm.id === oTarget.id ) {

                                fpCallback(e);
                            }
                        }

                    }

                }).on('click' ,function(e) {

                    var oParentForm = $(e.target).parents('form')[0];

                    if ( e.target.nodeName === 'BUTTON' && oParentForm.id === oTarget.id ) {

                        fpCallback(e);
                    }
                });

            } else {

                $(document).addEvent(sEvent ,function(e) {

                    if (sEvent === 'click') {
                        e.preventDefault();
                    }

                    var eventObject = $(e.target)[0],
                        originalObject = $(oTarget)[0],
                        currentObject;

                    if ( eventObject.nodeName !== originalObject.nodeName ) {
                        currentObject = eventObject.parentNode;
                    } else {
                        currentObject = eventObject;
                    }

                    if ( currentObject.dataset.fcModules !== undefined ) {
                        var bModules = currentObject.dataset.fcModules == originalObject.dataset.fcModules;
                    } else {
                        var bModules = true;
                    }

                    if ( currentObject.nodeName == originalObject.nodeName && bModules && originalObject.className.indexOf(currentObject.className) !== -1  ) {
                        fpCallback(e, currentObject);
                    }

                });
            }

        }

    }
*/
};
