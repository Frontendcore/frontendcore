!function(a,b,c,d,e,f){"use strict";e.define("chart",[],function(){return{ChartJS:null,aCharts:[],oCharts:[],isEmpty:!0,aDefaultColors:["96c47f","5b90bf","b55151","b48ead","d6b051","82b2af","d4d659","dcdcdc"],oDefault:{scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,barShowStroke:!0,barStrokeWidth:1,barValueSpacing:15,barDatasetSpacing:1,segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,percentageInnerCutout:0,animateRotate:!0,animateScale:!0,animation:!0,animationSteps:60,animationEasing:"easeOutQuart",showScale:!0,scaleOverride:!1,scaleSteps:null,scaleStepWidth:null,scaleStartValue:null,scaleLineColor:"rgba(0,0,0,.1)",scaleLineWidth:1,scaleShowLabels:!0,scaleLabel:"<%=value%>",scaleIntegersOnly:!0,scaleBeginAtZero:!1,scaleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",scaleFontSize:12,scaleFontStyle:"normal",scaleFontColor:"#666",responsive:!0,maintainAspectRatio:!0,showTooltips:!0,customTooltips:!1,tooltipEvents:["mousemove","touchstart","touchmove"],tooltipFillColor:"rgba(0,0,0,0.8)",tooltipFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipFontSize:14,tooltipFontStyle:"normal",tooltipFontColor:"#fff",tooltipTitleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipTitleFontSize:14,tooltipTitleFontStyle:"bold",tooltipTitleFontColor:"#fff",tooltipYPadding:6,tooltipXPadding:6,tooltipCaretSize:8,tooltipCornerRadius:6,tooltipXOffset:10,tooltipTemplate:"<%if (label){%><%=label%>: <%}%><%= value %>",multiTooltipTemplate:"<%= value %>",onAnimationProgress:function(){},onAnimationComplete:function(){},type:"bar"},hexToRgb:function(a){var b=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;a=a.replace(b,function(a,b,c,d){return b+b+c+c+d+d});var c=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);return c?parseInt(c[1],16)+","+parseInt(c[2],16)+","+parseInt(c[3],16):null},wrap:function(a){f(a).wrap("<div class='chart-wrapper'></div>")},onStart:function(){var a,b=d.getDataModules("chart"),e=this;d.loadCSS(c.sPathCss+"secondary.css"),d.trackModule("JS_Libraries","call","chart"),require(["chartLibs"],function(c){e.ChartJS=c,f(b).each(function(b){a=this,e.wrap(a),e.autobind(a,b),d.removeLoading(this)})})},autobind:function(a,c){""===a.id&&(a.id="canvas-"+Date.now());var e,f,g=this,h={type:null!==a.getAttribute("data-fc-type")?a.getAttribute("data-fc-type"):"line"},i=null!==a.getAttribute("data-fc-colors")?d.attributeToArray(a.getAttribute("data-fc-colors")):[],j=i.concat(g.aDefaultColors),k=b.getElementById(a.id).getContext("2d");switch(g.isEmpty=!0,e=d.mergeOptions(g.oDefault,h),f=g.getCanvasData(a,g.getColors(j,h.type)),e.type){case"doughnut":e.percentageInnerCutout=50;case"pie":g.oCharts[c]=g.createChart(k,f.items,e,g.aCharts[c],c);break;default:g.oCharts[c]=g.createChart(k,f.groups,e,g.aCharts[c],c)}f.legend&&g.createLegend(a,g.oCharts[c]),g.isEmpty&&g.createEmptyMessage(a)},createEmptyMessage:function(a){var b=a.id+"-no-data",c=null!==a.getAttribute("data-fc-text-no-data")?a.getAttribute("data-fc-text-no-data"):"No data";f(a).before('<h3 id="'+b+'" class="charts-no-data"><i class="icon-bar-chart-o"></i>'+c+"</h3>");var d=f(a).width()/2-f("#"+b).width()/2,e=f(a).height()/2-f("#"+b).height()/2;f("#"+b).css({position:"absolute",left:d,"margin-top":e})},getColors:function(a,b){var c,d=this,e={},f=.5;"line"===b&&(f=.05);for(var g=0;g<a.length;g++)c=d.hexToRgb(a[g]),e[g]={color:"rgba("+c+", 1)",highlight:"rgba("+c+",0.75)",strokeColor:"rgba("+c+",1)",pointColor:"rgba("+c+",1)",pointStrokeColor:"#fff",fillColor:"rgba("+c+","+f+")",highlightFill:"rgba("+c+",0.75)"};return e},getCanvasData:function(a,b){var c,e,g=this,h=f("input[type=hidden]",a),i={groups:{labels:null!==a.getAttribute("data-fc-labels-x")?d.attributeToArray(a.getAttribute("data-fc-labels-x")):[],datasets:[]},items:[],legend:!0};return h.each(function(a){c=""!==this.name?this.name:"unlabel",e=parseInt(this.value,10),"unlabel"===c&&(i.legend=!1),i.groups.datasets[a]=d.mergeOptions(i.groups.datasets[a],b[a]),i.groups.datasets[a].data=d.attributeToArray(this.value),i.groups.datasets[a].label=c,i.items[a]={value:e,label:c};for(var f=0;i.groups.datasets[a].data.length>f;f++)i.groups.datasets[a].data[f]>0&&(e=1);i.items[a]=d.mergeOptions(i.items[a],b[a]),e>0&&(g.isEmpty=!1)}),i},createChart:function(a,b,c,d,e){var f=this,g=c.type.charAt(0).toUpperCase()+c.type.slice(1);return new f.ChartJS(a)[g](b,c)},createLegend:function(a,b){f(a).after(b.generateLegend())},onStop:function(){this.oDefault=null},onDestroy:function(){delete this.oDefault}}})}(window,document,oGlobalSettings,FrontendTools,FrontendCore,$);