!function(a,b,c,d,e,f,g){"use strict";f.define("range-field",["range-field-libs"],function(){function a(a,e,h,i){void 0===i&&(i=c,c++),f.require(["range-field-libs"],function(c){g.when(g(a).after('<div id="'+d+i+'"></div>')).then(function(){var f=b.getElementById(d+i);if(void 0!==h.pips&&(e.pips=h.pips),c.create(f,e),f.noUiSlider.on("update",function(b,c){g(a).val(parseFloat(b[c])).trigger("input")}),void 0!==h.inputSync){var j=g(h.inputSync);f.noUiSlider.on("update",function(a,b){j.val(parseFloat(a[b]))}),j.on("change input",function(){f.noUiSlider.set(this.value)})}})})}var c=1e3,d="fc-range-";return{oDefault:{start:5,step:1,behaviour:"snap",connect:[!0,!1],range:{min:0,max:10}},onStart:function(){var a=e.getDataModules("range-field"),b=this;e.trackModule("JS_Libraries","call","range-field"),g(a).each(function(a){b.autobind(this,a)})},bind:function(b,c,d){var f,g=this,h={};f=e.mergeOptions(g.oDefault,c),a(b,f,h,d)},autobind:function(b,c){var d,f=this,g={},h={};null!==b.getAttribute("data-fc-target-input")&&(h.inputSync=b.getAttribute("data-fc-target-input")),null===b.getAttribute("min")&&null===b.getAttribute("max")||(g.range={}),null!==b.getAttribute("min")&&(g.range.min=parseInt(b.getAttribute("min"))),null!==b.getAttribute("max")&&(g.range.max=parseInt(b.getAttribute("max"))),null!==b.getAttribute("value")&&(g.start=parseInt(b.getAttribute("value"))),null!==b.getAttribute("data-fc-pips")&&(h.pips={mode:"positions",values:[0,50,100],density:4}),d=e.mergeOptions(f.oDefault,g),a(b,d,h,c)}}})}(window,document,oGlobalSettings,FrontendMediator,FrontendTools,FrontendCore,$);