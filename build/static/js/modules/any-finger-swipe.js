!function(a,b,c,d,e,f){"use strict";e.define("any-finger-swipe",["swipe"],function(){return{onStart:function(){d.swipe("#any-finger-swipe",{swipe:function(a,b,c,d,e,g){f(this).text("You swiped "+b+" with "+e+" fingers")},threshold:0,fingers:"all"})}}})}(window,document,oGlobalSettings,FrontendTools,FrontendCore,$);