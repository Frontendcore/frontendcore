!function(a,b,c,d,e,f,g,h){"use strict";e.define("wysiwyg",[],function(){return{mediator:f,bResize:!1,_oConstants:{EDITOR_SUFIX:"-editor",TEXTAREA_SUFIX:"-textarea",TEXTAREA_CLASS:"fc-wysiwyg-textarea",FULLSCREEN_EDITABLE_CLASS:"fc-wysiwyg-full-screen",TextHelp:"Select some text to get some formatting options.",TextVisual:'<i class="icon-eye"></i> VISUAL',TextHtml:'<i class="icon-code"></i> HTML',TextFullscreen:'<i class="icon-arrows-alt"></i> FULLSCREEN',TextMinscreen:'<i class="icon-minus"></i> MINIMIZE'},oDefault:{"class":"fc-wysiwyg",debug:!1,stay:!1,list:["bold","italic","underline","insertunorderedlist","createlink"]},onStart:function(){var a=d.getDataModules("wysiwyg"),b=this;d.loadCSS(c.sPathCss+"secondary.css?v="+c.sHash),d.trackModule("JS_Libraries","call","wysiwyg"),g(a).each(function(){"true"!==this.getAttribute("data-fc-active")&&(this.setAttribute("data-fc-active","true"),b.autobind(this))}),b.fDatePollyfill(),b.mediator.subscribe("close:wysiwyg",this.closeFormatOptions)},fDatePollyfill:function(){Date.now||(Date.now=function(){return(new Date).getTime()})},closeFormatOptions:function(){g(".fc-wysiwyg-menu").hide()},updateTextarea:function(a,c){c.value="<br>"==b.getElementById(a).innerHTML?"":b.getElementById(a).innerHTML},updateEditArea:function(a,c){b.getElementById(a).innerHTML=g("#"+c.id).val()},createEditArea:function(a,c,d){var e=b.createElement("div");return e.id=a,e.className="fc-wysiwyg",e.innerHTML=g(c).text(),e.setAttribute("data-help",d.help),e},createLink:function(a,c,d){var e=b.createElement("a");return e.innerHTML=d,e.href="#",e.id=c+"-"+a,e.className="button _small",e},createLinkGroup:function(a){var c=b.createElement("div");c.className="fc-wysiwyg-switch button-group ph-n";for(var d=0;d<a.length;d++)c.appendChild(a[d]);return c},bindForm:function(a,b){var c=this;g("#"+a).parents("form").on("submit",function(){g("#"+a).is(":visible")?c.updateEditArea(a,b):c.updateTextarea(a,b)})},bindHtmlButton:function(a,b,c){var d=this;g(b).on("focus",function(){g(this).parent().find(".fc-wysiwyg-switch").fadeIn()}).on("blur",function(){g(this).parent().find(".fc-wysiwyg-switch").fadeOut(),d.updateEditArea(a,b)}),g("#html-"+a).on("click",function(e){e.preventDefault(),g("#"+a).toggle(),g("#"+b.id).toggleClass(d._oConstants.TEXTAREA_CLASS),g("#"+a).is(":visible")?(this.innerHTML=c.html,d.updateEditArea(a,b),g("#"+a).focus()):(g(b).focus(),d.bResize===!1&&(require(["autosize"],function(){g(b).autosize()}),d.bResize=!0),d.closeFormatOptions(),this.innerHTML=c.visual,d.updateTextarea(a,b))})},bindScreenButton:function(a,b,c){var d=this;g("#screen-"+a).on("click",function(e){e.preventDefault(),g("#"+a).toggleClass(d._oConstants.FULLSCREEN_EDITABLE_CLASS),g("#"+b.id).toggleClass(d._oConstants.FULLSCREEN_EDITABLE_CLASS),g(this).parent().toggleClass("fc-wysiwyg-switch-full-screen"),g(".pen-menu").toggleClass("pen-menu-full-screen"),this.innerHTML.indexOf(c.minscreen)==-1?(g("body").css({overflow:"hidden",height:"100%"}),this.innerHTML=c.minscreen):(g("body").css({overflow:"auto",height:"auto"}),this.innerHTML=c.fullscreen)})},bindTextarea:function(a,b){var c=this;g("#"+a).on("blur",function(){c.updateTextarea(a,b),g(this).parent().find(".fc-wysiwyg-switch").fadeOut()}).on("focus",function(){g(this).parent().find(".fc-wysiwyg-switch").fadeIn()})},getText:function(a){for(var b,c=this,d={},e=["visual","help","fullscreen","minscreen","html"],f=0;f<e.length;f++)b=e[f],null!==a.getAttribute("data-fc-text-"+b)?d[b]=a.getAttribute("data-fc-text-"+b):d[b]=c._oConstants["Text"+b.charAt(0).toUpperCase()+b.slice(1)];return d},autobind:function(c){g(c).parent().css("position","relative");var e,f,i,j,k,l,m={},n=this,o=n.getText(c),p=Math.floor(Date.now()/1e3),q=c.id?c.id+n._oConstants.EDITOR_SUFIX:p+n._oConstants.EDITOR_SUFIX,r=c.getAttribute("data-fc-format-options"),s=n.createEditArea(q,c,o),t=[];if(""===c.id&&(c.id=p+n._oConstants.TEXTAREA_SUFIX),a.navigator.userAgent.indexOf("MSIE")===-1&&(null!==c.getAttribute("data-fc-html")?"false"!==c.getAttribute("data-fc-html")&&(j=n.createLink(q,"html",o.html),t.push(j)):(j=n.createLink(q,"html",o.html),t.push(j)),null!==c.getAttribute("data-fc-fullscreen")?"false"!==c.getAttribute("data-fc-fullscreen")&&(k=n.createLink(q,"screen",o.fullscreen),t.push(k)):(k=n.createLink(q,"screen",o.fullscreen),t.push(k))),t.length>0&&(l=n.createLinkGroup(t),g(c).after(l)),c.className=n._oConstants.TEXTAREA_CLASS+" fc-wysiwyg-html",g(c).before(s),m.editor=b.getElementById(q),m.textarea=c,null!==r){i=r.split(","),m.list=[];for(var u=0;i.length>u;u++)m.list.push(i[u])}e=d.mergeOptions(n.oDefault,m),f=new h(e),n.bindForm(q,c,o),n.bindTextarea(q,c,o),a.navigator.userAgent.indexOf("MSIE")===-1&&(null!==c.getAttribute("data-fc-html")?"false"!==c.getAttribute("data-fc-html")&&n.bindHtmlButton(q,c,o):n.bindHtmlButton(q,c,o),null!==c.getAttribute("data-fc-fullscreen")?"false"!==c.getAttribute("data-fc-fullscreen")&&n.bindScreenButton(q,c,o):n.bindScreenButton(q,c,o)),g("div[contenteditable]",c.parentNode).bind("paste",function(a){b.execCommand("insertHTML",!1,a.originalEvent.clipboardData.getData("text")),a.preventDefault()}),d.removeLoading(c)}}})}(window,document,oGlobalSettings,FrontendTools,FrontendCore,FrontendMediator,$,Pen);