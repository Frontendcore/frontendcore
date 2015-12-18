;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $, RoundTrip) {
    'use strict';

    FrontendCore.define('product-total', [], function (utils) {

        var autobind = function( oTarget ) {


            FrontendTools.bind( oTarget, 'submit', function(e){

                var newData = {
                    "products" : {
                        "0" : {
                            "name" : "flower",
                            "quantity" : Math.random()
                        },
                        "1" : {
                            "name" : "suitcase",
                            "quantity" : Math.random()
                        },
                        "2" : {
                            "name" : "shit",
                            "quantity" : Math.random()
                        },
                        "3" : {
                            "name" : "shit",
                            "quantity" : Math.random()
                        }
                    },
                    "list" : {
                        "0" : {
                            "name" : "flower",
                            "quantity" : Math.random()
                        },
                        "1" : {
                            "name" : "suitcase",
                            "quantity" : Math.random()
                        },
                        "2" : {
                            "name" : "shit",
                            "quantity" : Math.random()
                        },
                        "3" : {
                            "name" : "shit",
                            "quantity" : Math.random()
                        }
                    }
                };

                RoundTrip.Data( newData );

                e.preventDefault();
            });

        }

        return {
            onStart: function () {

                var aTargets = FrontendTools.getDataModules('product-total');

                FrontendTools.trackModule('JS_Libraries', 'call', 'product-total');

                FrontendTools.bind( '#click-me' , 'click', function(e){
                    e.preventDefault();
                    console.log('CLICKER!')
                });

                FrontendTools.bind( document.getElementById('click-me') , 'mouseover', function(e){
                    e.preventDefault();
                    console.log('OVER!')
                });

                $(aTargets).each( function(){
                    autobind(this);
                });


            }
        }
    });

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $, RoundTrip);