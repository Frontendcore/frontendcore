FrontendTools.bind = function ( target, sEvent, fpCallback  ) {

    var oTarget = $(target)[0],
        randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26)),
        sId =  oTarget.id === '' ? randLetter + Date.now() : oTarget.id;

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

            $(document).on(sEvent ,function(e) {

                if ( e.target.outerHTML === oTarget.outerHTML ) {

                    fpCallback(e);
                }
            });
        }

    }
};