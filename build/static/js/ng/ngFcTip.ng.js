!function(a,b,c,d){"use strict";var e=b.ngModule||a.module("frontendcore",[]);e.directive("ngFcTip",["$document",function(a){return{link:function(a,c,d){b.require(["tip"],function(){var a=b.instantiate("tip");a.autobind(c[0])})}}}])}(angular,FrontendCore,FrontendMediator,FrontendTools);