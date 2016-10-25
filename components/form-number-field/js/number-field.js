;(function($){

    FrontendCore.define('number-field', [], function () {
        return {
            onStart: function () {

                var aTarget = FrontendTools.getDataModules('number-field');

                FrontendTools.loadCSS( oGlobalSettings.sPathCss + 'secondary.css?v=' + oGlobalSettings.sHash );

                FrontendTools.trackModule('JS_Libraries', 'call', 'range-field' );

                $(aTarget).each( function(){

                    var oParent = $(this).parent();

                    $(this).wrap('<div class="number-field-wrapper"></div>').after('<a href="#" class="number-field-button _dec">-</a><a href="#" class="number-field-button _inc">+</a>');

                    $(".number-field-button", oParent).on("click", function(e) {

                        e.preventDefault();

                        var $button = $(this),
                            newVal,
                            oldValue = $button.parent().find("input").val();

                        if ($button.text() == "+") {
                            newVal = parseFloat(oldValue) + 1;
                        } else {
                            // Don't allow decrementing below zero
                            if (oldValue > 0) {
                                newVal = parseFloat(oldValue) - 1;
                            } else {
                                newVal = 0;
                            }
                        }

                        $button.parent().find("input").val(newVal);

                    });


                });



            }
        };
    });

})(window.$);