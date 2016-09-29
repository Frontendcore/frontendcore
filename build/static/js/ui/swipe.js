!function(a){"function"==typeof define&&define.amd&&define.amd.jQuery?define(["jquery"],a):a("undefined"!=typeof module&&module.exports?require("jquery"):jQuery)}(function(a){"use strict";function b(b){return!b||void 0!==b.allowPageScroll||void 0===b.swipe&&void 0===b.swipeStatus||(b.allowPageScroll=k),void 0!==b.click&&void 0===b.tap&&(b.tap=b.click),b||(b={}),b=a.extend({},a.fn.swipe.defaults,b),this.each(function(){var d=a(this),e=d.data(C);e||(e=new c(this,b),d.data(C,e))})}function c(b,c){function d(b){if(!(ja()||a(b.target).closest(c.excludedElements,Ta).length>0)){var d=b.originalEvent?b.originalEvent:b;if(!d.pointerType||"mouse"!=d.pointerType||0!=c.fallbackToMouseEvents){var e,f=d.touches,g=f?f[0]:d;return Ua=v,f?Va=f.length:c.preventDefaultEvents!==!1&&b.preventDefault(),Ja=0,Ka=null,La=null,Ra=null,Ma=0,Na=0,Oa=0,Pa=1,Qa=0,Sa=qa(),ha(),la(0,g),!f||Va===c.fingers||c.fingers===t||R()?(Xa=za(),2==Va&&(la(1,f[1]),Na=Oa=ta(Wa[0].start,Wa[1].start)),(c.swipeStatus||c.pinchStatus)&&(e=J(d,Ua))):e=!1,e===!1?(Ua=y,J(d,Ua),e):(c.hold&&(bb=setTimeout(a.proxy(function(){Ta.trigger("hold",[d.target]),c.hold&&(e=c.hold.call(Ta,d,d.target))},this),c.longTapThreshold)),ka(!0),null)}}}function D(a){var b=a.originalEvent?a.originalEvent:a;if(Ua!==x&&Ua!==y&&!ia()){var d,e=b.touches,f=e?e[0]:b,g=ma(f);if(Ya=za(),e&&(Va=e.length),c.hold&&clearTimeout(bb),Ua=w,2==Va&&(0==Na?(la(1,e[1]),Na=Oa=ta(Wa[0].start,Wa[1].start)):(ma(e[1]),Oa=ta(Wa[0].end,Wa[1].end),Ra=va(Wa[0].end,Wa[1].end)),Pa=ua(Na,Oa),Qa=Math.abs(Na-Oa)),Va===c.fingers||c.fingers===t||!e||R()){if(Ka=ya(g.start,g.end),La=ya(g.last,g.end),P(a,La),Ja=wa(g.start,g.end),Ma=sa(),oa(Ka,Ja),d=J(b,Ua),!c.triggerOnTouchEnd||c.triggerOnTouchLeave){var h=!0;if(c.triggerOnTouchLeave){var i=Aa(this);h=Ba(g.end,i)}!c.triggerOnTouchEnd&&h?Ua=I(w):c.triggerOnTouchLeave&&!h&&(Ua=I(x)),Ua!=y&&Ua!=x||J(b,Ua)}}else Ua=y,J(b,Ua);d===!1&&(Ua=y,J(b,Ua))}}function E(a){var b=a.originalEvent?a.originalEvent:a,d=b.touches;if(d){if(d.length&&!ia())return ga(b),!0;if(d.length&&ia())return!0}return ia()&&(Va=$a),Ya=za(),Ma=sa(),M()||!L()?(Ua=y,J(b,Ua)):c.triggerOnTouchEnd||c.triggerOnTouchEnd===!1&&Ua===w?(c.preventDefaultEvents!==!1&&a.preventDefault(),Ua=x,J(b,Ua)):!c.triggerOnTouchEnd&&Y()?(Ua=x,K(b,Ua,o)):Ua===w&&(Ua=y,J(b,Ua)),ka(!1),null}function F(){Va=0,Ya=0,Xa=0,Na=0,Oa=0,Pa=1,ha(),ka(!1)}function G(a){var b=a.originalEvent?a.originalEvent:a;c.triggerOnTouchLeave&&(Ua=I(x),J(b,Ua))}function H(){Ta.unbind(Ea,d),Ta.unbind(Ia,F),Ta.unbind(Fa,D),Ta.unbind(Ga,E),Ha&&Ta.unbind(Ha,G),ka(!1)}function I(a){var b=a,d=O(),e=L(),f=M();return!d||f?b=y:!e||a!=w||c.triggerOnTouchEnd&&!c.triggerOnTouchLeave?!e&&a==x&&c.triggerOnTouchLeave&&(b=y):b=x,b}function J(a,b){var c,d=a.touches;return(V()||U())&&(c=K(a,b,m)),(S()||R())&&c!==!1&&(c=K(a,b,n)),ea()&&c!==!1?c=K(a,b,p):fa()&&c!==!1?c=K(a,b,q):da()&&c!==!1&&(c=K(a,b,o)),b===y&&F(a),b===x&&(d?d.length||F(a):F(a)),c}function K(b,d,k){var l;if(k==m){if(Ta.trigger("swipeStatus",[d,Ka||null,Ja||0,Ma||0,Va,Wa,La]),c.swipeStatus&&(l=c.swipeStatus.call(Ta,b,d,Ka||null,Ja||0,Ma||0,Va,Wa,La),l===!1))return!1;if(d==x&&T()){if(clearTimeout(ab),clearTimeout(bb),Ta.trigger("swipe",[Ka,Ja,Ma,Va,Wa,La]),c.swipe&&(l=c.swipe.call(Ta,b,Ka,Ja,Ma,Va,Wa,La),l===!1))return!1;switch(Ka){case e:Ta.trigger("swipeLeft",[Ka,Ja,Ma,Va,Wa,La]),c.swipeLeft&&(l=c.swipeLeft.call(Ta,b,Ka,Ja,Ma,Va,Wa,La));break;case f:Ta.trigger("swipeRight",[Ka,Ja,Ma,Va,Wa,La]),c.swipeRight&&(l=c.swipeRight.call(Ta,b,Ka,Ja,Ma,Va,Wa,La));break;case g:Ta.trigger("swipeUp",[Ka,Ja,Ma,Va,Wa,La]),c.swipeUp&&(l=c.swipeUp.call(Ta,b,Ka,Ja,Ma,Va,Wa,La));break;case h:Ta.trigger("swipeDown",[Ka,Ja,Ma,Va,Wa,La]),c.swipeDown&&(l=c.swipeDown.call(Ta,b,Ka,Ja,Ma,Va,Wa,La))}}}if(k==n){if(Ta.trigger("pinchStatus",[d,Ra||null,Qa||0,Ma||0,Va,Pa,Wa]),c.pinchStatus&&(l=c.pinchStatus.call(Ta,b,d,Ra||null,Qa||0,Ma||0,Va,Pa,Wa),l===!1))return!1;if(d==x&&Q())switch(Ra){case i:Ta.trigger("pinchIn",[Ra||null,Qa||0,Ma||0,Va,Pa,Wa]),c.pinchIn&&(l=c.pinchIn.call(Ta,b,Ra||null,Qa||0,Ma||0,Va,Pa,Wa));break;case j:Ta.trigger("pinchOut",[Ra||null,Qa||0,Ma||0,Va,Pa,Wa]),c.pinchOut&&(l=c.pinchOut.call(Ta,b,Ra||null,Qa||0,Ma||0,Va,Pa,Wa))}}return k==o?d!==y&&d!==x||(clearTimeout(ab),clearTimeout(bb),Z()&&!aa()?(_a=za(),ab=setTimeout(a.proxy(function(){_a=null,Ta.trigger("tap",[b.target]),c.tap&&(l=c.tap.call(Ta,b,b.target))},this),c.doubleTapThreshold)):(_a=null,Ta.trigger("tap",[b.target]),c.tap&&(l=c.tap.call(Ta,b,b.target)))):k==p?d!==y&&d!==x||(clearTimeout(ab),clearTimeout(bb),_a=null,Ta.trigger("doubletap",[b.target]),c.doubleTap&&(l=c.doubleTap.call(Ta,b,b.target))):k==q&&(d!==y&&d!==x||(clearTimeout(ab),_a=null,Ta.trigger("longtap",[b.target]),c.longTap&&(l=c.longTap.call(Ta,b,b.target)))),l}function L(){var a=!0;return null!==c.threshold&&(a=Ja>=c.threshold),a}function M(){var a=!1;return null!==c.cancelThreshold&&null!==Ka&&(a=pa(Ka)-Ja>=c.cancelThreshold),a}function N(){return null===c.pinchThreshold||Qa>=c.pinchThreshold}function O(){var a;return a=!c.maxTimeThreshold||!(Ma>=c.maxTimeThreshold)}function P(a,b){if(c.preventDefaultEvents!==!1)if(c.allowPageScroll===k)a.preventDefault();else{var d=c.allowPageScroll===l;switch(b){case e:(c.swipeLeft&&d||!d&&c.allowPageScroll!=r)&&a.preventDefault();break;case f:(c.swipeRight&&d||!d&&c.allowPageScroll!=r)&&a.preventDefault();break;case g:(c.swipeUp&&d||!d&&c.allowPageScroll!=s)&&a.preventDefault();break;case h:(c.swipeDown&&d||!d&&c.allowPageScroll!=s)&&a.preventDefault();break;case k:}}}function Q(){var a=W(),b=X(),c=N();return a&&b&&c}function R(){return!!(c.pinchStatus||c.pinchIn||c.pinchOut)}function S(){return!(!Q()||!R())}function T(){var a=O(),b=L(),c=W(),d=X(),e=M(),f=!e&&d&&c&&b&&a;return f}function U(){return!!(c.swipe||c.swipeStatus||c.swipeLeft||c.swipeRight||c.swipeUp||c.swipeDown)}function V(){return!(!T()||!U())}function W(){return Va===c.fingers||c.fingers===t||!z}function X(){return 0!==Wa[0].end.x}function Y(){return!!c.tap}function Z(){return!!c.doubleTap}function $(){return!!c.longTap}function _(){if(null==_a)return!1;var a=za();return Z()&&a-_a<=c.doubleTapThreshold}function aa(){return _()}function ba(){return(1===Va||!z)&&(isNaN(Ja)||Ja<c.threshold)}function ca(){return Ma>c.longTapThreshold&&Ja<u}function da(){return!(!ba()||!Y())}function ea(){return!(!_()||!Z())}function fa(){return!(!ca()||!$())}function ga(a){Za=za(),$a=a.touches.length+1}function ha(){Za=0,$a=0}function ia(){var a=!1;if(Za){var b=za()-Za;b<=c.fingerReleaseThreshold&&(a=!0)}return a}function ja(){return!(Ta.data(C+"_intouch")!==!0)}function ka(a){Ta&&(a===!0?(Ta.bind(Fa,D),Ta.bind(Ga,E),Ha&&Ta.bind(Ha,G)):(Ta.unbind(Fa,D,!1),Ta.unbind(Ga,E,!1),Ha&&Ta.unbind(Ha,G,!1)),Ta.data(C+"_intouch",a===!0))}function la(a,b){var c={start:{x:0,y:0},last:{x:0,y:0},end:{x:0,y:0}};return c.start.x=c.last.x=c.end.x=b.pageX||b.clientX,c.start.y=c.last.y=c.end.y=b.pageY||b.clientY,Wa[a]=c,c}function ma(a){var b=void 0!==a.identifier?a.identifier:0,c=na(b);return null===c&&(c=la(b,a)),c.last.x=c.end.x,c.last.y=c.end.y,c.end.x=a.pageX||a.clientX,c.end.y=a.pageY||a.clientY,c}function na(a){return Wa[a]||null}function oa(a,b){a!=k&&(b=Math.max(b,pa(a)),Sa[a].distance=b)}function pa(a){if(Sa[a])return Sa[a].distance}function qa(){var a={};return a[e]=ra(e),a[f]=ra(f),a[g]=ra(g),a[h]=ra(h),a}function ra(a){return{direction:a,distance:0}}function sa(){return Ya-Xa}function ta(a,b){var c=Math.abs(a.x-b.x),d=Math.abs(a.y-b.y);return Math.round(Math.sqrt(c*c+d*d))}function ua(a,b){var c=b/a*1;return c.toFixed(2)}function va(){return Pa<1?j:i}function wa(a,b){return Math.round(Math.sqrt(Math.pow(b.x-a.x,2)+Math.pow(b.y-a.y,2)))}function xa(a,b){var c=a.x-b.x,d=b.y-a.y,e=Math.atan2(d,c),f=Math.round(180*e/Math.PI);return f<0&&(f=360-Math.abs(f)),f}function ya(a,b){if(Ca(a,b))return k;var c=xa(a,b);return c<=45&&c>=0?e:c<=360&&c>=315?e:c>=135&&c<=225?f:c>45&&c<135?h:g}function za(){var a=new Date;return a.getTime()}function Aa(b){b=a(b);var c=b.offset(),d={left:c.left,right:c.left+b.outerWidth(),top:c.top,bottom:c.top+b.outerHeight()};return d}function Ba(a,b){return a.x>b.left&&a.x<b.right&&a.y>b.top&&a.y<b.bottom}function Ca(a,b){return a.x==b.x&&a.y==b.y}var c=a.extend({},c),Da=z||B||!c.fallbackToMouseEvents,Ea=Da?B?A?"MSPointerDown":"pointerdown":"touchstart":"mousedown",Fa=Da?B?A?"MSPointerMove":"pointermove":"touchmove":"mousemove",Ga=Da?B?A?"MSPointerUp":"pointerup":"touchend":"mouseup",Ha=Da?B?"mouseleave":null:"mouseleave",Ia=B?A?"MSPointerCancel":"pointercancel":"touchcancel",Ja=0,Ka=null,La=null,Ma=0,Na=0,Oa=0,Pa=1,Qa=0,Ra=0,Sa=null,Ta=a(b),Ua="start",Va=0,Wa={},Xa=0,Ya=0,Za=0,$a=0,_a=0,ab=null,bb=null;try{Ta.bind(Ea,d),Ta.bind(Ia,F)}catch(cb){a.error("events not supported "+Ea+","+Ia+" on jQuery.swipe")}this.enable=function(){return this.disable(),Ta.bind(Ea,d),Ta.bind(Ia,F),Ta},this.disable=function(){return H(),Ta},this.destroy=function(){H(),Ta.data(C,null),Ta=null},this.option=function(b,d){if("object"==typeof b)c=a.extend(c,b);else if(void 0!==c[b]){if(void 0===d)return c[b];c[b]=d}else{if(!b)return c;a.error("Option "+b+" does not exist on jQuery.swipe.options")}return null}}var d="1.6.18",e="left",f="right",g="up",h="down",i="in",j="out",k="none",l="auto",m="swipe",n="pinch",o="tap",p="doubletap",q="longtap",r="horizontal",s="vertical",t="all",u=10,v="start",w="move",x="end",y="cancel",z="ontouchstart"in window,A=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled&&!z,B=(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&!z,C="TouchSwipe",D={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:!0,triggerOnTouchLeave:!1,allowPageScroll:"auto",fallbackToMouseEvents:!0,excludedElements:".noSwipe",preventDefaultEvents:!0};a.fn.swipe=function(c){var d=a(this),e=d.data(C);if(e&&"string"==typeof c){if(e[c])return e[c].apply(e,Array.prototype.slice.call(arguments,1));a.error("Method "+c+" does not exist on jQuery.swipe")}else if(e&&"object"==typeof c)e.option.apply(e,arguments);else if(!(e||"object"!=typeof c&&c))return b.apply(this,arguments);return d},a.fn.swipe.version=d,a.fn.swipe.defaults=D,a.fn.swipe.phases={PHASE_START:v,PHASE_MOVE:w,PHASE_END:x,PHASE_CANCEL:y},a.fn.swipe.directions={LEFT:e,RIGHT:f,UP:g,DOWN:h,IN:i,OUT:j},a.fn.swipe.pageScroll={NONE:k,HORIZONTAL:r,VERTICAL:s,AUTO:l},a.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,FOUR:4,FIVE:5,ALL:t}}),function(a,b,c,d,e,f){"use strict";d.swipe=function(a,b){void 0===b.allowPageScroll&&(b.allowPageScroll="vertical"),f(a).swipe(b)},e.define("swipe",[],function(){return{onStart:function(){var a=d.getDataModules("swipe"),b=this;f(a).each(function(a){b.autobind(this,a)}),d.trackModule("JS_Libraries","call","swipe")},autobind:function(a,b){}}})}(window,document,oGlobalSettings,FrontendTools,FrontendCore,$);