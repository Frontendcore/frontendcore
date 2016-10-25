;(function($){

    FrontendCore.define('form-submit', [], function () {
        return {
            onStart: function () {

                var aTarget = FrontendTools.getDataModules('form-submit');

                FrontendTools.trackModule('JS_Libraries', 'call', 'form-submit' );

                $(aTarget).each( function(){
                    $(this).on('click', function(e){
                        e.preventDefault();
                        var oTarget =  '#' + this.href.split('#')[1];
                        $(oTarget).submit();
                    });
                });
            }
        };
    });
})(window.$);