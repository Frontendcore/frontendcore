!function(a,b,c,d,e,f,g){"use strict";var h={};e.define("polyfiller",[],function(){return{onStart:function(){d.isMobile.any()||this.checkBrowser()},checkBrowser:function(){var a,i=d.getDataModules("polyfiller"),j=i[0],k=g.inputtypes.date+g.inputtypes.email+g.inputtypes.number+g.inputtypes.month+g.inputtypes.range+g.inputtypes.datetime+g.inputtypes.color,l=b.getElementsByTagName("input"),m=[],n=!1;a=null!==j.getAttribute("data-fc-tags")?j.getAttribute("data-fc-tags").split(","):["video","audio","source","details"];for(var o=0;o<l.length;o++)m.push(l[o].type);n=m.indexOf("date")+m.indexOf("email")+m.indexOf("month")+m.indexOf("range")+m.indexOf("datetime")+m.indexOf("color"),h.shims="",b.getElementsByTagName("form").length>0&&(g.input.placeholder&&g.input.required||(h.shims+="forms "),5>k&&(h.shims+="forms-ext "));for(var p=0;p<a.length;p++)void 0===f(a[p])[0]||g[a[p]]||(h.shims+=a[p]+" ");0>n&&5>k&&e.requireAndStart("loadPolyfills"),g.inputtypes.color||f("input[type='color']").css({"min-width":"170px"}).after("<style>.color-popover input { padding:2px !important; min-width: 50px; }</style>"),b.querySelectorAll("[data-object-fit]").length>0&&!g.objectfit&&f.getScript(c.sPathJsCore+"shims/object-fit-polyfill.js")}}}),e.define("loadPolyfills",["polyfillsLibs"],function(){return{onStart:function(){h.shims.length>0&&(webshim.setOptions("basePath",c.sPathJsCore+"shims/shims/"),webshim.polyfill(h.shims)),d.trackModule("JS_Libraries","call","polyfillsLibs")}}})}(window,document,oGlobalSettings,FrontendTools,FrontendCore,$,Modernizr);