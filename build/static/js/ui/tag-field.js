!function(a){"use strict";var b=function(b,c){var d=this,e={allowFreeEntries:!0,allowDuplicates:!1,ajaxConfig:{},autoSelect:!0,selectFirst:!1,queryParam:"query",beforeSend:function(){},cls:"",data:null,dataUrlParams:{},disabled:!1,disabledField:null,displayField:"name",editable:!0,expanded:!1,expandOnFocus:!1,groupBy:null,hideTrigger:!1,highlight:!0,id:null,infoMsgCls:"",inputCfg:{},invalidCls:"ms-inv",matchCase:!1,maxDropHeight:290,maxEntryLength:null,maxEntryRenderer:function(a){return"Please reduce your entry by "+a+" character"+(a>1?"s":"")},maxSuggestions:null,maxSelection:10,maxSelectionRenderer:function(a){return"You cannot choose more than "+a+" item"+(a>1?"s":"")},method:"POST",minChars:0,minCharsRenderer:function(a){return"Please type "+a+" more character"+(a>1?"s":"")},mode:"local",name:null,noSuggestionText:"No suggestions",placeholder:"Type or click here",renderer:null,required:!1,resultAsString:!1,resultAsStringDelimiter:",",resultsField:"results",selectionCls:"",selectionContainer:null,selectionPosition:"inner",selectionRenderer:null,selectionStacked:!1,sortDir:"asc",sortOrder:null,strictSuggest:!1,style:"",toggleOnClick:!1,typeDelay:400,useTabKey:!1,useCommaKey:!0,useZebraStyle:!1,value:null,valueField:"id",vregex:null,vtype:null},f=a.extend({},c),g=a.extend(!0,{},e,f);this.addToSelection=function(b,c){if(!g.maxSelection||i.length<g.maxSelection){a.isArray(b)||(b=[b]);var e=!1;a.each(b,function(b,c){(g.allowDuplicates||a.inArray(c[g.valueField],d.getValue())===-1)&&(i.push(c),e=!0)}),e===!0&&(p._renderSelection(),this.empty(),c!==!0&&a(this).trigger("selectionchange",[this,this.getSelection()]))}this.input.attr("placeholder","inner"===g.selectionPosition&&this.getValue().length>0?"":g.placeholder)},this.clear=function(a){this.removeFromSelection(i.slice(0),a)},this.collapse=function(){g.expanded===!0&&(this.combobox.detach(),g.expanded=!1,a(this).trigger("collapse",[this]))},this.disable=function(){this.container.addClass("ms-ctn-disabled"),g.disabled=!0,d.input.attr("disabled",!0)},this.empty=function(){this.input.val("")},this.enable=function(){this.container.removeClass("ms-ctn-disabled"),g.disabled=!1,d.input.attr("disabled",!1)},this.expand=function(){!g.expanded&&(this.input.val().length>=g.minChars||this.combobox.children().size()>0)&&(this.combobox.appendTo(this.container),p._processSuggestions(),g.expanded=!0,a(this).trigger("expand",[this]))},this.isDisabled=function(){return g.disabled},this.isValid=function(){var b=g.required===!1||i.length>0;return(g.vtype||g.vregex)&&a.each(i,function(a,c){b=b&&p._validateSingleItem(c[g.valueField])}),b},this.getDataUrlParams=function(){return g.dataUrlParams},this.getName=function(){return g.name},this.getSelection=function(){return i},this.getRawValue=function(){return d.input.val()},this.getValue=function(){return a.map(i,function(a){return a[g.valueField]})},this.removeFromSelection=function(b,c){a.isArray(b)||(b=[b]);var e=!1;a.each(b,function(b,c){var f=a.inArray(c[g.valueField],d.getValue());f>-1&&(i.splice(f,1),e=!0)}),e===!0&&(p._renderSelection(),c!==!0&&a(this).trigger("selectionchange",[this,this.getSelection()]),g.expandOnFocus&&d.expand(),g.expanded&&p._processSuggestions()),this.input.attr("placeholder","inner"===g.selectionPosition&&this.getValue().length>0?"":g.placeholder)},this.getData=function(){return m},this.setData=function(a){g.data=a,p._processSuggestions()},this.setName=function(b){g.name=b,b&&(g.name+=b.indexOf("[]")>0?"":"[]"),d._valueContainer&&a.each(d._valueContainer.children(),function(a,b){b.name=g.name})},this.setSelection=function(a){this.clear(),this.addToSelection(a)},this.setValue=function(b){var c=[];a.each(b,function(b,d){var e=!1;if(a.each(m,function(a,b){if(b[g.valueField]==d)return c.push(b),e=!0,!1}),!e)if("object"==typeof d)c.push(d);else{var f={};f[g.valueField]=d,f[g.displayField]=d,c.push(f)}}),c.length>0&&this.addToSelection(c)},this.setDataUrlParams=function(b){g.dataUrlParams=a.extend({},b)};var h,i=[],j=0,k=!1,l=null,m=[],n=!1,o={BACKSPACE:8,TAB:9,ENTER:13,CTRL:17,ESC:27,SPACE:32,UPARROW:38,DOWNARROW:40,COMMA:188},p={_displaySuggestions:function(b){d.combobox.show(),d.combobox.empty();var c=0,e=0;if(null===l)p._renderComboItems(b),c=j*b.length;else{for(var f in l)e+=1,a("<div/>",{"class":"ms-res-group",html:f}).appendTo(d.combobox),p._renderComboItems(l[f].items,!0);var h=d.combobox.find(".ms-res-group").outerHeight();if(null!==h){var i=e*h;c=j*b.length+i}else c=j*(b.length+e)}if(c<d.combobox.height()||c<=g.maxDropHeight?d.combobox.height(c):c>=d.combobox.height()&&c>g.maxDropHeight&&d.combobox.height(g.maxDropHeight),1===b.length&&g.autoSelect===!0&&d.combobox.children().filter(":not(.ms-res-item-disabled):last").addClass("ms-res-item-active"),g.selectFirst===!0&&d.combobox.children().filter(":not(.ms-res-item-disabled):first").addClass("ms-res-item-active"),0===b.length&&""!==d.getRawValue()){var k=g.noSuggestionText.replace(/\{\{.*\}\}/,d.input.val());p._updateHelper(k),d.collapse()}g.allowFreeEntries===!1&&(0===b.length?(a(d.input).addClass(g.invalidCls),d.combobox.hide()):a(d.input).removeClass(g.invalidCls))},_getEntriesFromStringArray:function(b){var c=[];return a.each(b,function(b,d){var e={};e[g.displayField]=e[g.valueField]=a.trim(d),c.push(e)}),c},_highlightSuggestion:function(b){var c=d.input.val(),e=["^","$","*","+","?",".","(",")",":","!","|","{","}","[","]"];if(a.each(e,function(a,b){c=c.replace(b,"\\"+b)}),0===c.length)return b;var f=g.matchCase===!0?"g":"gi";return b.replace(new RegExp("("+c+")(?!([^<]+)?>)",f),"<em>$1</em>")},_moveSelectedRow:function(a){g.expanded||d.expand();var b,c,e,f;b=d.combobox.find(".ms-res-item:not(.ms-res-item-disabled)"),c="down"===a?b.eq(0):b.filter(":last"),e=d.combobox.find(".ms-res-item-active:not(.ms-res-item-disabled):first"),e.length>0&&("down"===a?(c=e.nextAll(".ms-res-item:not(.ms-res-item-disabled)").first(),0===c.length&&(c=b.eq(0)),f=d.combobox.scrollTop(),d.combobox.scrollTop(0),c[0].offsetTop+c.outerHeight()>d.combobox.height()&&d.combobox.scrollTop(f+j)):(c=e.prevAll(".ms-res-item:not(.ms-res-item-disabled)").first(),0===c.length&&(c=b.filter(":last"),d.combobox.scrollTop(j*b.length)),c[0].offsetTop<d.combobox.scrollTop()&&d.combobox.scrollTop(d.combobox.scrollTop()-j))),b.removeClass("ms-res-item-active"),c.addClass("ms-res-item-active")},_processSuggestions:function(b){var c=null,e=b||g.data;if(null!==e){if("function"==typeof e&&(e=e.call(d,d.getRawValue())),"string"==typeof e){a(d).trigger("beforeload",[d]);var f={};f[g.queryParam]=d.input.val();var h=a.extend(f,g.dataUrlParams);return void a.ajax(a.extend({type:g.method,url:e,data:h,beforeSend:g.beforeSend,success:function(b){c="string"==typeof b?JSON.parse(b):b,p._processSuggestions(c),a(d).trigger("load",[d,c]),p._asyncValues&&(d.setValue("string"==typeof p._asyncValues?JSON.parse(p._asyncValues):p._asyncValues),p._renderSelection(),delete p._asyncValues)},error:function(){throw"Could not reach server"}},g.ajaxConfig))}m=e.length>0&&"string"==typeof e[0]?p._getEntriesFromStringArray(e):e[g.resultsField]||e;var i="remote"===g.mode?m:p._sortAndTrim(m);p._displaySuggestions(p._group(i))}},_render:function(b){if(d.setName(g.name),d.container=a("<div/>",{"class":"ms-ctn form-control "+(g.resultAsString?"ms-as-string ":"")+g.cls+(a(b).hasClass("input-lg")?" input-lg":"")+(a(b).hasClass("input-sm")?" input-sm":"")+(g.disabled===!0?" ms-ctn-disabled":"")+(g.editable===!0?"":" ms-ctn-readonly")+(g.hideTrigger===!1?"":" ms-no-trigger"),style:g.style,id:g.id}),d.container.focus(a.proxy(q._onFocus,this)),d.container.blur(a.proxy(q._onBlur,this)),d.container.keydown(a.proxy(q._onKeyDown,this)),d.container.keyup(a.proxy(q._onKeyUp,this)),d.input=a("<input/>",a.extend({type:"text","class":g.editable===!0?"":" ms-input-readonly",readonly:!g.editable,placeholder:g.placeholder,disabled:g.disabled},g.inputCfg)),d.input.focus(a.proxy(q._onInputFocus,this)),d.input.click(a.proxy(q._onInputClick,this)),d.combobox=a("<div/>",{"class":"ms-res-ctn dropdown-menu"}).height(g.maxDropHeight),d.combobox.on("click","div.ms-res-item",a.proxy(q._onComboItemSelected,this)),d.combobox.on("mouseover","div.ms-res-item",a.proxy(q._onComboItemMouseOver,this)),g.selectionContainer?(d.selectionContainer=g.selectionContainer,a(d.selectionContainer).addClass("ms-sel-ctn")):d.selectionContainer=a("<div/>",{"class":"ms-sel-ctn"}),d.selectionContainer.click(a.proxy(q._onFocus,this)),"inner"!==g.selectionPosition||g.selectionContainer?d.container.append(d.input):d.selectionContainer.append(d.input),d.helper=a("<span/>",{"class":"ms-helper "+g.infoMsgCls}),p._updateHelper(),d.container.append(d.helper),a(b).replaceWith(d.container),!g.selectionContainer)switch(g.selectionPosition){case"bottom":d.selectionContainer.insertAfter(d.container),g.selectionStacked===!0&&(d.selectionContainer.width(d.container.width()),d.selectionContainer.addClass("ms-stacked"));break;case"right":d.selectionContainer.insertAfter(d.container),d.container.css("float","left");break;default:d.container.append(d.selectionContainer)}g.hideTrigger===!1&&(d.trigger=a("<div/>",{"class":"ms-trigger",html:'<div class="ms-trigger-ico"></div>'}),d.trigger.click(a.proxy(q._onTriggerClick,this)),d.container.append(d.trigger)),a(window).resize(a.proxy(q._onWindowResized,this)),null===g.value&&null===g.data||("string"==typeof g.data?(p._asyncValues=g.value,p._processSuggestions()):(p._processSuggestions(),null!==g.value&&(d.setValue(g.value),p._renderSelection()))),a("body").click(function(a){d.container.hasClass("ms-ctn-focus")&&0===d.container.has(a.target).length&&a.target.className.indexOf("ms-res-item")<0&&a.target.className.indexOf("ms-close-btn")<0&&d.container[0]!==a.target&&q._onBlur()}),g.expanded===!0&&(g.expanded=!1,d.expand())},_renderComboItems:function(b,c){var e=this,f="";a.each(b,function(b,d){var h=null!==g.renderer?g.renderer.call(e,d):d[g.displayField],i=null!==g.disabledField&&d[g.disabledField]===!0,j=a("<div/>",{"class":"ms-res-item "+(c?"ms-res-item-grouped ":"")+(i?"ms-res-item-disabled ":"")+(b%2===1&&g.useZebraStyle===!0?"ms-res-odd":""),html:g.highlight===!0?p._highlightSuggestion(h):h,"data-json":JSON.stringify(d)});f+=a("<div/>").append(j).html()}),d.combobox.append(f),j=d.combobox.find(".ms-res-item:first").outerHeight()},_renderSelection:function(){var b=this,c=0,e=0,f=[],h=g.resultAsString===!0&&!k;d.selectionContainer.find(".ms-sel-item").remove(),void 0!==d._valueContainer&&d._valueContainer.remove(),a.each(i,function(c,d){var e,j,k=null!==g.selectionRenderer?g.selectionRenderer.call(b,d):d[g.displayField],l=p._validateSingleItem(d[g.displayField])?"":" ms-sel-invalid";h===!0?e=a("<div/>",{"class":"ms-sel-item ms-sel-text "+g.selectionCls+l,html:k+(c===i.length-1?"":g.resultAsStringDelimiter)}).data("json",d):(e=a("<div/>",{"class":"ms-sel-item "+g.selectionCls+l,html:k}).data("json",d),g.disabled===!1&&(j=a("<span/>",{"class":"ms-close-btn"}).data("json",d).appendTo(e),j.click(a.proxy(q._onTagTriggerClick,b)))),f.push(e)}),d.selectionContainer.prepend(f),d._valueContainer=a("<div/>",{style:"display: none;"}),a.each(d.getValue(),function(b,c){var e=a("<input/>",{type:"hidden",name:g.name,value:c});e.appendTo(d._valueContainer)}),d._valueContainer.appendTo(d.selectionContainer),"inner"!==g.selectionPosition||g.selectionContainer||(d.input.width(0),e=d.input.offset().left-d.selectionContainer.offset().left,c=d.container.width()-e-42,d.input.width(c)),i.length===g.maxSelection?p._updateHelper(g.maxSelectionRenderer.call(this,i.length)):d.helper.hide()},_selectItem:function(a){1===g.maxSelection&&(i=[]),d.addToSelection(a.data("json")),a.removeClass("ms-res-item-active"),g.expandOnFocus!==!1&&i.length!==g.maxSelection||d.collapse(),k?k&&(g.expandOnFocus||n)&&(p._processSuggestions(),n&&d.expand()):d.input.focus()},_sortAndTrim:function(b){var c=d.getRawValue(),e=[],f=[],h=d.getValue();return c.length>0?a.each(b,function(a,b){var d=b[g.displayField];(g.matchCase===!0&&d.indexOf(c)>-1||g.matchCase===!1&&d.toLowerCase().indexOf(c.toLowerCase())>-1)&&(g.strictSuggest!==!1&&0!==d.toLowerCase().indexOf(c.toLowerCase())||e.push(b))}):e=b,a.each(e,function(b,c){(g.allowDuplicates||a.inArray(c[g.valueField],h)===-1)&&f.push(c)}),null!==g.sortOrder&&f.sort(function(a,b){return a[g.sortOrder]<b[g.sortOrder]?"asc"===g.sortDir?-1:1:a[g.sortOrder]>b[g.sortOrder]?"asc"===g.sortDir?1:-1:0}),g.maxSuggestions&&g.maxSuggestions>0&&(f=f.slice(0,g.maxSuggestions)),f},_group:function(b){return null!==g.groupBy&&(l={},a.each(b,function(a,b){var c=g.groupBy.indexOf(".")>-1?g.groupBy.split("."):g.groupBy,d=b[g.groupBy];if("string"!=typeof c)for(d=b;c.length>0;)d=d[c.shift()];void 0===l[d]?l[d]={title:d,items:[b]}:l[d].items.push(b)})),b},_updateHelper:function(a){d.helper.html(a),d.helper.is(":visible")||d.helper.fadeIn()},_validateSingleItem:function(a){if(null!==g.vregex&&g.vregex instanceof RegExp)return g.vregex.test(a);if(null!==g.vtype)switch(g.vtype){case"alpha":return/^[a-zA-Z_]+$/.test(a);case"alphanum":return/^[a-zA-Z0-9_]+$/.test(a);case"email":return/^(\w+)([\-+.][\w]+)*@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/.test(a);case"url":return/(((^https?)|(^ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i.test(a);case"ipaddress":return/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(a)}return!0}},q={_onBlur:function(){if(d.container.removeClass("ms-ctn-focus"),d.collapse(),k=!1,""!==d.getRawValue()&&g.allowFreeEntries===!0){var b={};b[g.displayField]=b[g.valueField]=d.getRawValue().trim(),d.addToSelection(b)}p._renderSelection(),d.isValid()===!1?d.container.addClass(g.invalidCls):""!==d.input.val()&&g.allowFreeEntries===!1&&(d.empty(),p._updateHelper("")),a(d).trigger("blur",[d])},_onComboItemMouseOver:function(b){var c=a(b.currentTarget);c.hasClass("ms-res-item-disabled")||(d.combobox.children().removeClass("ms-res-item-active"),c.addClass("ms-res-item-active"))},_onComboItemSelected:function(b){var c=a(b.currentTarget);c.hasClass("ms-res-item-disabled")||p._selectItem(a(b.currentTarget))},_onFocus:function(){d.input.focus()},_onInputClick:function(){d.isDisabled()===!1&&k&&g.toggleOnClick===!0&&(g.expanded?d.collapse():d.expand())},_onInputFocus:function(){if(d.isDisabled()===!1&&!k){k=!0,d.container.addClass("ms-ctn-focus"),d.container.removeClass(g.invalidCls);var b=d.getRawValue().length;g.expandOnFocus===!0&&d.expand(),i.length===g.maxSelection?p._updateHelper(g.maxSelectionRenderer.call(this,i.length)):b<g.minChars&&p._updateHelper(g.minCharsRenderer.call(this,g.minChars-b)),p._renderSelection(),a(d).trigger("focus",[d])}},_onKeyDown:function(b){var c=d.combobox.find(".ms-res-item-active:not(.ms-res-item-disabled):first"),e=d.input.val();if(a(d).trigger("keydown",[d,b]),b.keyCode===o.TAB&&(g.useTabKey===!1||g.useTabKey===!0&&0===c.length&&0===d.input.val().length))return void q._onBlur();switch(b.keyCode){case o.BACKSPACE:0===e.length&&d.getSelection().length>0&&"inner"===g.selectionPosition&&(i.pop(),p._renderSelection(),a(d).trigger("selectionchange",[d,d.getSelection()]),d.input.attr("placeholder","inner"===g.selectionPosition&&d.getValue().length>0?"":g.placeholder),d.input.focus(),b.preventDefault());break;case o.TAB:case o.ESC:b.preventDefault();break;case o.ENTER:(""!==e||g.expanded)&&b.preventDefault();break;case o.COMMA:g.useCommaKey===!0&&b.preventDefault();break;case o.CTRL:n=!0;break;case o.DOWNARROW:b.preventDefault(),p._moveSelectedRow("down");break;case o.UPARROW:b.preventDefault(),p._moveSelectedRow("up");break;default:i.length===g.maxSelection&&b.preventDefault()}},_onKeyUp:function(b){var c,e=d.getRawValue(),f=a.trim(d.input.val()).length>0&&(!g.maxEntryLength||a.trim(d.input.val()).length<=g.maxEntryLength),j={};if(a(d).trigger("keyup",[d,b]),clearTimeout(h),b.keyCode===o.ESC&&g.expanded&&d.combobox.hide(),b.keyCode===o.TAB&&g.useTabKey===!1||b.keyCode>o.ENTER&&b.keyCode<o.SPACE)return void(b.keyCode===o.CTRL&&(n=!1));switch(b.keyCode){case o.UPARROW:case o.DOWNARROW:b.preventDefault();break;case o.ENTER:case o.TAB:case o.COMMA:if(b.keyCode!==o.COMMA||g.useCommaKey===!0){if(b.preventDefault(),g.expanded===!0&&(c=d.combobox.find(".ms-res-item-active:not(.ms-res-item-disabled):first"),c.length>0))return void p._selectItem(c);f===!0&&g.allowFreeEntries===!0&&(j[g.displayField]=j[g.valueField]=e.trim(),d.addToSelection(j),d.collapse(),d.input.focus());break}default:i.length===g.maxSelection?p._updateHelper(g.maxSelectionRenderer.call(this,i.length)):e.length<g.minChars?(p._updateHelper(g.minCharsRenderer.call(this,g.minChars-e.length)),g.expanded===!0&&d.collapse()):g.maxEntryLength&&e.length>g.maxEntryLength?(p._updateHelper(g.maxEntryRenderer.call(this,e.length-g.maxEntryLength)),g.expanded===!0&&d.collapse()):(d.helper.hide(),g.minChars<=e.length&&(h=setTimeout(function(){g.expanded===!0?p._processSuggestions():d.expand()},g.typeDelay)))}},_onTagTriggerClick:function(b){d.removeFromSelection(a(b.currentTarget).data("json"))},_onTriggerClick:function(){if(d.isDisabled()===!1&&(g.expandOnFocus!==!0||i.length!==g.maxSelection))if(a(d).trigger("triggerclick",[d]),g.expanded===!0)d.collapse();else{var b=d.getRawValue().length;b>=g.minChars?(d.input.focus(),d.expand()):p._updateHelper(g.minCharsRenderer.call(this,g.minChars-b))}},_onWindowResized:function(){p._renderSelection()}};null!==b&&p._render(b)};a.fn.magicSuggest=function(c){var d=a(this);return 1===d.size()&&d.data("magicSuggest")?d.data("magicSuggest"):(d.each(function(d){var e=a(this);if(!e.data("magicSuggest")){"select"===this.nodeName.toLowerCase()&&(c.data=[],c.value=[],a.each(this.children,function(b,d){d.nodeName&&"option"===d.nodeName.toLowerCase()&&(c.data.push({id:d.value,name:d.text}),a(d).attr("selected")&&c.value.push(d.value))}));var f={};a.each(this.attributes,function(a,b){f[b.name]="value"===b.name&&""!==b.value?JSON.parse(b.value):b.value});var g=new b(this,a.extend([],a.fn.magicSuggest.defaults,c,f));e.data("magicSuggest",g),g.container.data("magicSuggest",g)}}),1===d.size()?d.data("magicSuggest"):d)},a.fn.magicSuggest.defaults={}}(jQuery),function(a,b,c,d,e,f){"use strict";e.define("tag-field",[],function(){return{oDefault:{useCommaKey:!0,noSuggestionText:"No result matching the term {{query}}",placeholder:"Add a Tag",maxSelection:null},onStart:function(){var a=d.getDataModules("tag-field"),b=this;d.loadCSS(c.sPathCss+"secondary.css?v="+c.sHash),d.trackModule("JS_Libraries","call","tag-field"),b.autobind(a)},autobind:function(a){var c=this;f(a).each(function(a){var e,g,h,i={},j=this,k=[],l=this;if("INPUT"===j.nodeName&&(l=b.createElement("div"),h=""!==j.getAttribute("name")?j.getAttribute("name"):"tags_array_real",l.id=h,f(j).before(l).css({height:"1px",width:"100%",border:"0px none",padding:"0",margin:"0",position:"absolute"}).parent().css("position","relative")),i.name=""!==j.getAttribute("name")?j.getAttribute("name")+"_array":"tags_array",null!==j.getAttribute("data-fc-max")&&(i.maxSelection=j.getAttribute("data-fc-max")),"restrict"===j.getAttribute("data-fc-mode")?(i.hideTrigger=!1,i.allowFreeEntries=!1):i.hideTrigger=!0,"true"===j.getAttribute("data-fc-select")&&(i.hideTrigger=!1),""!==j.value&&void 0!==j.value&&(i.value=j.value.split(",")),""!==j.placeholder&&(i.placeholder=j.placeholder),null!==j.getAttribute("data-fc-text-no-suggestion")&&(i.noSuggestionText=j.getAttribute("data-fc-text-no-suggestion")),null!==j.getAttribute("data-fc-values")){i.data=[],g=j.getAttribute("data-fc-values").split(",");for(var m in g)i.data.push(g[m])}e=d.mergeOptions(c.oDefault,i),d.removeLoading(l),k[a]=f(l).magicSuggest(e),f(k[a]).on("selectionchange",function(){for(var b="",c=k[a].getValue(),d=0;d<c.length;d++)b+=c[d]+",";j.value=b}),i=null})},onStop:function(){this.sPathCss=null},onDestroy:function(){delete this.sPathCss}}})}(window,document,oGlobalSettings,FrontendTools,FrontendCore,$);