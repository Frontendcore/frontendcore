!function(a){function b(a,b){return 3==a.nodeType?d(a,b):c(a,b)}function c(c,d){var e,c=a(c),f=c.clone().empty();return c.contents().each(function(){var a=d-f.text().length;0!=a&&(e=b(this,a),e&&f.append(e))}),f}function d(b,c,d){var f=e(b.data);h&&(f=f.replace(/^ /,"")),h=!!f.match(/ $/);var g=f.lastIndexOf(" ",c),f=f.slice(0,g);return f=a("<div/>").text(f).html()}function e(a){return a.replace(/\s+/g," ")}function f(b){var c=a(b),d=c.children(":last");if(!d)return b;var e=d.css("display");return e&&"inline"!=e?f(d):c}function g(b){var c=a(b),d=c.children(":last");return d&&d.is("p")?d:b}var h=!0;a.fn.truncate=function(c){var d=a.extend({},a.fn.truncate.defaults,c);a(this).each(function(){var c=a.trim(e(a(this).text())).length;if(!(c<=d.max_length)){var h=d.max_length-d.more.length-d.link_prefix.length-d.link_suffix.length,i=b(this,h),j=a(this).hide();i.insertAfter(j),f(i).append(d.link_prefix+'<a href="#more" class="'+d.css_more_class+'">'+d.more+"</a>"+d.link_suffix),g(j).append(d.link_prefix+'<a href="#less" class="'+d.css_less_class+'">'+d.less+"</a>"+d.link_suffix),i.find("a:last").click(function(){return i.hide(),j.show(),!1}),j.find("a:last").click(function(){return i.show(),j.hide(),!1})}})},a.fn.truncate.defaults={max_length:100,more:"…more",less:"less",css_more_class:"truncator-link truncator-more",css_less_class:"truncator-link truncator-less",link_prefix:"",link_suffix:""}}(jQuery),function(a,b,c,d,e,f){"use strict";e.define("truncate",[],function(){return{oDefault:{max_length:100,more:"(+)",less:"(-)"},onStart:function(){var a=d.getDataModules("truncate"),b=this;d.trackModule("JS_Libraries","call","truncate"),b.autobind(a)},autobind:function(a){var c=this;f(a).each(function(){var a,e={};if(null!==this.getAttribute("data-fc-max")&&(e.max_length=this.getAttribute("data-fc-max")),null!==this.getAttribute("data-fc-more")&&(e.more=this.getAttribute("data-fc-more")),"false"===this.getAttribute("data-fc-less")){var g=b.createElement("style");g.type="text/css",g.innerHTML=".truncator-less { display: none; }",b.body.appendChild(g)}else null!==this.getAttribute("data-fc-less")&&(e.less=this.getAttribute("data-fc-less"));a=d.mergeOptions(c.oDefault,e),d.removeLoading(this),f(this).truncate(a)})}}})}(window,document,oGlobalSettings,FrontendTools,FrontendCore,$);