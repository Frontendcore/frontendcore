;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('sortable', [], function () {
		return {
			sInput : null,
			oTarget : [],
			delay: 500,
			placeholer: '<li class="placeholder" data-fc-modules="va">',
			oDefault : {
				oldContainer: null,
				group: 'this',
				nested: false
			},
			afterMove: function (placeholder, container) {

				var oTarget = $(container.el).closest('ol[data-fc-modules=sortable]')[0];

				if(this.oldContainer != container){

					if( this.oldContainer) {
						this.oldContainer.el.removeClass("active");
					}
					container.el.addClass("active");

					this.oldContainer = container;
				}

				this.showEmptyList(oTarget);
				this.hideEmptyList(oTarget);

				$(oTarget).sortable("refresh");
			},
			onDrop: function (item, container, _super) {

				var oTarget = $(container.el).closest('ol[data-fc-modules=sortable]')[0] ? $(container.el).closest('ol[data-fc-modules=sortable]')[0] : $(container.el)[0],
					oReturn;

				if (oTarget !== undefined) {
					if (oTarget.getAttribute('data-fc-output') === 'json' ) {
						oReturn = this.serialize(oTarget);
					} else {
						oReturn = this.arraylize(oTarget);
					}

					if (oTarget.getAttribute('data-fc-input') !== null) {
						this.fillInput( oTarget.getAttribute("data-fc-input"),  oReturn );
					}

					if ( oTarget.getAttribute('data-fc-url') !== null ) {

						this.sendAjax( oTarget.getAttribute('data-fc-url'),  oReturn );
					}

				}

				container.el.removeClass("active");

				var $item = $(item);

				$item.removeClass("dragged").removeAttr("style");

				$("body").removeClass("dragging");

				this.hideEmptyList(oTarget);

				_super(item);
			},
			onDrag: function ($item, position, _super, event) {

				$item.offset($('.placeholder').offset() );
			},
			onDragStart : function ($item, container, _super, event) {

				var oTarget = $($item.context).closest('ol[data-fc-modules=sortable]')[0];

				$item.addClass("dragged");

				$("body").addClass("dragging");

			},
			isValidTarget: function ($item, container) {


				var oTarget = $($item.context).closest('ol[data-fc-modules=sortable]')[0];

				if (oTarget !== undefined) {
					var nDepth = $(container.el.context ,"#" + oTarget.id).parents("ol").length + 1,
						nTotalDepth = oTarget.getAttribute('data-fc-depth') !== null ? oTarget.getAttribute('data-fc-depth') : 2;


					if (nDepth > nTotalDepth) {
						return false;
					}

					if ( $('.dragged').find('li')[0] !== undefined && nDepth > ( nTotalDepth -1 ) ) {
						return false;
					}

					return true;
				} else {
					return true;
				}


			},
			addEmptyList: function(oTarget) {

				if (oTarget !== undefined) {

					$('li', oTarget).each(function(){

						if ( $('ol', this)[0] === undefined ) {

							$(this).append('<ol class="sub-sortable"></ol>');
						}
					});
				}

				$(oTarget).sortable("refresh");
			},
			hideEmptyList: function(oTarget) {

				if (oTarget !== undefined) {

					var nDepth,
						nTotalDepth = oTarget.getAttribute('data-fc-depth') !== null ? oTarget.getAttribute('data-fc-depth') : 2;

					$('li', oTarget).each(function(){

						nDepth = $( this ,"#" + oTarget.id).parents("ol").length;

						if ( nDepth >= nTotalDepth ) {

							$('ol', this).css({
								height: '1px',
								padding: '0px',
								margin: '0px',
								background: 'transparent',
								position: 'absolute'
							});
						}
					});
				}
			},
			showEmptyList: function(oTarget) {

				if (oTarget !== undefined) {

					$('li', oTarget).each(function(){

						if ( $('ol li', this)[0] === undefined ) {

							$('ol', this).removeAttr('style');
						}
					});
				}

				$(oTarget).sortable("refresh");
			},
			onStart: function () {

				var aTargets = document.querySelectorAll('[data-fc-modules="sortable"]'),
					self = this;

				FrontendTools.loadCSS( oGlobalSettings.sPathCss + 'secondary.css');

				FrontendTools.trackModule('JS_Libraries', 'call', 'sortable' );

				$(aTargets).each(function ( index) {
					self.autobind(this, index);
				});
			},
			arraylize : function( oTarget ) {

				var nTotal = $('li', oTarget).length,
					sValue = '';

				$('li', oTarget).each(function( nIndex ){

					if (this.id !== '' ) {
						sValue += this.id ? this.id : this.innerHTML;
					}

					if ( nIndex !== nTotal - 1 && this.id !== '' ) {
						sValue += ',';
					}

				});

				return sValue;

			},
			getSubTree: function( $Target ) {

				var oTree = {},
					self = this;

				$Target.each(function (nLi) {
					oTree[nLi] = {
						order: nLi + 1,
						id: this.getAttribute('data-fc-id') !== null ? this.getAttribute('data-fc-id') : this.id,
						name: this.getAttribute('data-fc-name') !== null ? this.getAttribute('data-fc-name') : this.id,
						subtree: self.getSubTree( $(this).find('> ol').find('> li') )
					};
				});

				return oTree;
			},
			serialize: function( oTarget ) {

				return this.getSubTree( $('#' + oTarget.id + '> li') );

			},
			fillInput : function(sInput, oReturn) {

				if ( typeof(oReturn) === 'object') {
					oReturn = JSON.stringify(oReturn);
				}

				document.getElementById(sInput).value = oReturn;
			},
			sendAjax: function( sUrl, oReturn) {

				var sJson = JSON.stringify( oReturn );

				$.ajax({
					url: sUrl,
					type: 'POST',
					data: { data : sJson },
					dataType: 'json'
				});

			},
			autobind: function (oTarget, index) {

				var oSettings,
					oOptions = {},
					sDate = Math.random(1000).toString(),
					self = this;

				if (oTarget.id === '' ) {
					oTarget.id = 'sortable-' + sDate.replace('.','');
				}

				if (oTarget.getAttribute("data-fc-type") === 'nested') {
					$(oTarget).addClass('js-sortable');
					oOptions.nested = true;
				}

				this.addEmptyList(oTarget);
				this.hideEmptyList(oTarget);

				oOptions.isValidTarget = this.isValidTarget;
				oOptions.addEmptyList = this.addEmptyList;
				oOptions.showEmptyList = this.showEmptyList;
				oOptions.hideEmptyList = this.hideEmptyList;
				oOptions.afterMove = this.afterMove;
				oOptions.onDrop = this.onDrop;
				oOptions.onDrag = this.onDrag;
				oOptions.onDragStart = this.onDragStart;

				if (oTarget.getAttribute("data-fc-handle") !== null) {
					oOptions.handle = oTarget.getAttribute("data-fc-handle");
				}

				oSettings = FrontendTools.mergeOptions(self.oDefault, oOptions);

				self.oTarget[index] = $(oTarget).sortable(oSettings);

				FrontendTools.removeLoading(oTarget);
			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);
