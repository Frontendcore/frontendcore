;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('chart', [], function () {
	return {
		ChartJS : null,
		aCharts : [],
		oCharts : [],
		isEmpty : true,
		aDefaultColors: ['96c47f','5b90bf','b55151','b48ead','d6b051','82b2af','d4d659','dcdcdc'],
		oDefault: {

			// START BAR OPTIONS

				//Boolean - Whether grid lines are shown across the chart
				scaleShowGridLines : true,

				//String - Colour of the grid lines
				scaleGridLineColor : "rgba(0,0,0,.05)",

				//Number - Width of the grid lines
				scaleGridLineWidth : 1,

				//Boolean - Whether to show horizontal lines (except X axis)
				scaleShowHorizontalLines: true,

				//Boolean - Whether to show vertical lines (except Y axis)
				scaleShowVerticalLines: true,

				//Boolean - If there is a stroke on each bar
				barShowStroke : true,

				//Number - Pixel width of the bar stroke
				barStrokeWidth : 1,

				//Number - Spacing between each of the X value sets
				barValueSpacing : 15,

				//Number - Spacing between data sets within X values
				barDatasetSpacing : 1,

			//PIE & DOUGHNUT OPTIONS

				//Boolean - Whether we should show a stroke on each segment
				segmentShowStroke : true,

				//String - The colour of each segment stroke
				segmentStrokeColor : "#fff",

				//Number - The width of each segment stroke
				segmentStrokeWidth : 2,

				//Number - The percentage of the chart that we cut out of the middle
				percentageInnerCutout : 0, // This is 0 for Pie charts

				//Boolean - Whether we animate the rotation of the Doughnut
				animateRotate : true,

				//Boolean - Whether we animate scaling the Doughnut from the centre
				animateScale : true,

			// Boolean - Whether to animate the chart
			animation: true,

			// Number - Number of animation steps
			animationSteps: 60,

			// String - Animation easing effect
			animationEasing: "easeOutQuart",

			// Boolean - If we should show the scale at all
			showScale: true,

			// Boolean - If we want to override with a hard coded scale
			scaleOverride: false,

			// ** Required if scaleOverride is true **
			// Number - The number of steps in a hard coded scale
			scaleSteps: null,
			// Number - The value jump in the hard coded scale
			scaleStepWidth: null,
			// Number - The scale starting value
			scaleStartValue: null,

			// String - Colour of the scale line
			scaleLineColor: "rgba(0,0,0,.1)",

			// Number - Pixel width of the scale line
			scaleLineWidth: 1,

			// Boolean - Whether to show labels on the scale
			scaleShowLabels: true,

			// Interpolated JS string - can access value
			scaleLabel: "<%=value%>",

			// Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
			scaleIntegersOnly: true,

			// Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
			scaleBeginAtZero: false,

			// String - Scale label font declaration for the scale label
			scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

			// Number - Scale label font size in pixels
			scaleFontSize: 12,

			// String - Scale label font weight style
			scaleFontStyle: "normal",

			// String - Scale label font colour
			scaleFontColor: "#666",

			// Boolean - whether or not the chart should be responsive and resize when the browser does.
			responsive: true,

			// Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
			maintainAspectRatio: true,

			// Boolean - Determines whether to draw tooltips on the canvas or not
			showTooltips: true,

			// Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
			customTooltips: false,

			// Array - Array of string names to attach tooltip events
			tooltipEvents: ["mousemove", "touchstart", "touchmove"],

			// String - Tooltip background colour
			tooltipFillColor: "rgba(0,0,0,0.8)",

			// String - Tooltip label font declaration for the scale label
			tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

			// Number - Tooltip label font size in pixels
			tooltipFontSize: 14,

			// String - Tooltip font weight style
			tooltipFontStyle: "normal",

			// String - Tooltip label font colour
			tooltipFontColor: "#fff",

			// String - Tooltip title font declaration for the scale label
			tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

			// Number - Tooltip title font size in pixels
			tooltipTitleFontSize: 14,

			// String - Tooltip title font weight style
			tooltipTitleFontStyle: "bold",

			// String - Tooltip title font colour
			tooltipTitleFontColor: "#fff",

			// Number - pixel width of padding around tooltip text
			tooltipYPadding: 6,

			// Number - pixel width of padding around tooltip text
			tooltipXPadding: 6,

			// Number - Size of the caret on the tooltip
			tooltipCaretSize: 8,

			// Number - Pixel radius of the tooltip border
			tooltipCornerRadius: 6,

			// Number - Pixel offset from point x to tooltip edge
			tooltipXOffset: 10,

			// String - Template string for single tooltips
			tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

			// String - Template string for multiple tooltips
			multiTooltipTemplate: "<%= value %>",

			// Function - Will fire on animation progression.
			onAnimationProgress: function(){},

			// Function - Will fire on animation completion.
			onAnimationComplete: function(){},

			type: 'bar'
		},
		hexToRgb: function( hex ) {
			// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
			var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
			hex = hex.replace(shorthandRegex, function(m, r, g, b) {
				return r + r + g + g + b + b;
			});

			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result ? parseInt(result[1], 16)+ "," + parseInt(result[2], 16) + "," + parseInt(result[3], 16) : null;
		},
		wrap: function(oTarget) {
			$(oTarget).wrap( "<div class='chart-wrapper'></div>" );
		},
		onStart: function () {

			var aTargets = FrontendTools.getDataModules('chart'),
				self = this,
				oTarget;

			FrontendTools.loadCSS( oGlobalSettings.sPathCss + 'secondary.css');

			FrontendTools.trackModule('JS_Libraries', 'call', 'chart' );

			require(['chartLibs'], function(Chart){

				self.ChartJS = Chart;

				$(aTargets).each(function (nIndex) {

					oTarget = this;

					self.wrap(oTarget);

					self.autobind(oTarget, nIndex);

					FrontendTools.removeLoading(this);
				});



			});

		},
		autobind: function ( oTarget, nIndex ) {

			if (oTarget.id === '' ) {
				oTarget.id = 'canvas-' + Date.now();
			}

			var oSettings,
				oChartData,
				self = this,
				oOptions = {
					type : oTarget.getAttribute("data-fc-type") !== null ? oTarget.getAttribute("data-fc-type") : 'line'
				},
				aCustomColors =  oTarget.getAttribute("data-fc-colors") !== null ? FrontendTools.attributeToArray(oTarget.getAttribute("data-fc-colors")) : [],
				aColors = aCustomColors.concat( self.aDefaultColors ),
				oCanvas = document.getElementById(oTarget.id).getContext("2d");

			self.isEmpty = true;

			oSettings = FrontendTools.mergeOptions( self.oDefault, oOptions );

			oChartData = self.getCanvasData( oTarget, self.getColors(aColors, oOptions.type) );

			switch(oSettings.type) {
				case "doughnut":
					oSettings.percentageInnerCutout = 50;
					/* falls through */
				case "pie":
					self.oCharts[nIndex] =  self.createChart( oCanvas, oChartData.items, oSettings, self.aCharts[nIndex], nIndex );
					break;
				default:
					self.oCharts[nIndex] =  self.createChart( oCanvas, oChartData.groups, oSettings, self.aCharts[nIndex], nIndex );
				break;
			}

			if (oChartData.legend) {
				self.createLegend(oTarget, self.oCharts[nIndex] );
			}

			if (self.isEmpty) {
				self.createEmptyMessage(oTarget);
			}

		},
		createEmptyMessage: function(oTarget) {



			var sId = oTarget.id + '-no-data',
				sMessage = oTarget.getAttribute("data-fc-text-no-data") !== null ? oTarget.getAttribute("data-fc-text-no-data") : 'No data' ;

			$(oTarget).before('<h3 id="'+ sId +'" class="charts-no-data"><i class="icon-bar-chart-o"></i>'+ sMessage  +'</h3>');

			var nPositionLeft = ($(oTarget).width()/2) - ($('#' + sId).width()/2),
				nPositionTop = ($(oTarget).height()/2) - ($('#' + sId).height()/2);

			$('#' + sId).css({
				'position' : 'absolute',
				'left' : nPositionLeft,
				'margin-top' : nPositionTop
			});
		},
		getColors: function( aColors, sType ) {


			var self = this,
				oColors = {},
				nFillOpacity = 0.5,
				sColor;

			if (sType === 'line') {
				nFillOpacity = 0.05;
			}

			for( var nColors = 0; nColors < aColors.length; nColors++ ) {

				sColor = self.hexToRgb( aColors[nColors] );

				oColors[nColors] = {
					color:"rgba("+ sColor + ", 1)",
					highlight: "rgba("+ sColor + ",0.75)",
					strokeColor: "rgba("+ sColor + ",1)",
					pointColor: "rgba("+ sColor + ",1)",
					pointStrokeColor: "#fff",
					fillColor : "rgba("+ sColor + ","+ nFillOpacity +")",
					highlightFill: "rgba("+ sColor + ",0.75)"
				};
			}

			return oColors;

		},
		getCanvasData : function( oTarget, oColors ) {

			var self = this,
				sLabel,
				$InputsData = $('input[type=hidden]', oTarget),
				nValue,
				oChartData = {
					groups : {
						labels:  oTarget.getAttribute("data-fc-labels-x") !== null ?  FrontendTools.attributeToArray(oTarget.getAttribute("data-fc-labels-x")) : [],
						datasets : []
					},
					items : [],
					legend: true
				};

			$InputsData.each( function( nInput ){

				// Get the label name
				sLabel = this.name !== ''? this.name : 'unlabel';

				nValue = parseInt( this.value, 10 );

				if(sLabel === 'unlabel') {
					oChartData.legend = false;
				}

				// Push the colors for default
				oChartData.groups.datasets[nInput] = FrontendTools.mergeOptions(oChartData.groups.datasets[nInput], oColors[ nInput ]);

				// Push the data for default
				oChartData.groups.datasets[nInput].data = FrontendTools.attributeToArray(this.value);

				// Push the label name
				oChartData.groups.datasets[nInput].label = sLabel;

				// Push the data for Pie & Doughnut
				oChartData.items[nInput] = {
					value: nValue,
					label: sLabel
				};

				// Check if one of the values is not zero
				for (var nKeyData = 0; oChartData.groups.datasets[nInput].data.length > nKeyData; nKeyData++ ) {
					if (oChartData.groups.datasets[nInput].data[nKeyData] > 0 ) {
						nValue = 1;
					}
				}

				// Push the data for Pie & Doughnut
				oChartData.items[nInput] = FrontendTools.mergeOptions(oChartData.items[nInput], oColors[ nInput ]);

				if (nValue > 0) {
					self.isEmpty = false;
				}

			});

			return oChartData;
		},
		createChart: function( oCanvas, oChartData, oSettings, oChart, nIndex ) {

			var self = this,
				sType = oSettings.type.charAt(0).toUpperCase() + oSettings.type.slice(1);

			return new self.ChartJS( oCanvas )[sType]( oChartData, oSettings);
		},
		createLegend: function(oTarget, oChart) {

			$(oTarget).after(oChart.generateLegend() );

		},
		onStop: function () {
			this.oDefault = null;
		},
		onDestroy: function () {
			delete this.oDefault;
		}
	};
});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);
