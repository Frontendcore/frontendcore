!function(a){FrontendCore.define("number-field",[],function(){return{onStart:function(){var b=FrontendTools.getDataModules("number-field");FrontendTools.loadCSS(oGlobalSettings.sPathCss+"secondary.css?v="+oGlobalSettings.sHash),FrontendTools.trackModule("JS_Libraries","call","range-field"),a(b).each(function(){var b=a(this).parent();a(this).wrap('<div class="number-field-wrapper"></div>').after('<a href="#" class="number-field-button _dec">-</a><a href="#" class="number-field-button _inc">+</a>'),a(".number-field-button",b).on("click",function(b){b.preventDefault();var c,d=a(this),e=d.parent().find("input").val();c="+"==d.text()?parseFloat(e)+1:e>1?parseFloat(e)-1:1,d.parent().find("input").val(c).change()})})}}})}(window.$);