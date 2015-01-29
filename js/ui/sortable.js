
TinyCore.AMD.define('sortable', ['devicePackage'], function () {
	return {
		sInput : null,
		oTarget : [],
		delay: 500,
		placeholer: '<li class="placeholder" data-tc-modules="va">',
		oDefault : {
			oldContainer: null,
			group: 'this',
			nested: false
		},
		afterMove: function (placeholder, container) {

			var oTarget = $(container.el).closest('ol[data-tc-modules=sortable]')[0];

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

			var oTarget = $(container.el).closest('ol[data-tc-modules=sortable]')[0] ? $(container.el).closest('ol[data-tc-modules=sortable]')[0] : $(container.el)[0],
				oReturn;

			if (oTarget !== undefined) {
				if (oTarget.getAttribute('data-tc-output') === 'json' ) {
					oReturn = this.serialize(oTarget);
				} else {
					oReturn = this.arraylize(oTarget);
				}

				if (oTarget.getAttribute('data-tc-input') !== null) {
					this.fillInput( oTarget.getAttribute("data-tc-input"),  oReturn );
				}

				if ( oTarget.getAttribute('data-tc-url') !== null ) {

					this.sendAjax( oTarget.getAttribute('data-tc-url'),  oReturn );
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

			var oTarget = $($item.context).closest('ol[data-tc-modules=sortable]')[0];

			$item.addClass("dragged");

			$("body").addClass("dragging");

		},
		isValidTarget: function ($item, container) {


			var oTarget = $($item.context).closest('ol[data-tc-modules=sortable]')[0],
				nDepth = $(container.el.context ,"#" + oTarget.id).parents("ol").length + 1,
				nTotalDepth = oTarget.getAttribute('data-tc-depth') !== null ? oTarget.getAttribute('data-tc-depth') : 2;


			if (nDepth > nTotalDepth) {
				return false;
			}

			if ( $('.dragged').find('li')[0] !== undefined && nDepth > ( nTotalDepth -1 ) ) {
				return false;
			}

			return true;
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
					nTotalDepth = oTarget.getAttribute('data-tc-depth') !== null ? oTarget.getAttribute('data-tc-depth') : 2;

				$('li', oTarget).each(function(){

					nDepth = $( this ,"#" + oTarget.id).parents("ol").length;

					console.log(nDepth + '...' + nTotalDepth);

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

			var aTargets = document.querySelectorAll('[data-tc-modules="sortable"]'),
				self = this;

			FC.trackEvent('JS_Libraries', 'call', 'sortable' );

			require(['sortableLibs'], function() {
				$(aTargets).each(function ( index) {
					self.autobind(this, index);
				});
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
		serialize: function( oTarget ) {

			var oTree = {},
				sTargetId = $(oTarget).attr('id'),
				sId,
				sName;

			$('#' + sTargetId + '> li').each(function( nIndex ){

				sId = this.id;

				oTree[nIndex] = {
					order: nIndex + 1,
					id: this.dataset.tcId !== undefined ? this.dataset.tcId : this.id,
					name: this.dataset.tcName !== undefined ? this.dataset.tcName : this.id,
					subtree: {}
				};


				$('li', this).each(function (nLi) {
					oTree[nIndex].subtree[nLi] = {
						order: nLi + 1,
						id: this.dataset.tcId !== undefined ? this.dataset.tcId : this.id,
						name: this.dataset.tcName !== undefined ? this.dataset.tcName : this.id
					};
				});

			});

			return oTree;

		},
		fillInput : function(sInput, oReturn) {

			if ( typeof(oReturn) === 'object') {
				oReturn = JSON.stringify(oReturn);
			}

			document.getElementById(sInput).value = oReturn;
		},
		sendAjax: function( sUrl, oReturn) {

			$.ajax({
				url: sUrl,
				type: 'POST',
				data: oReturn,
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

			if (oTarget.getAttribute("data-tc-type") === 'nested') {
				$(oTarget).addClass('sortable');
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

			if (oTarget.getAttribute("data-tc-handle") !== null) {
				oOptions.handle = oTarget.getAttribute("data-tc-handle");
			}

			oSettings = FC.mixOptions(oOptions, self.oDefault);

			self.oTarget[index] = $(oTarget).sortable(oSettings);
		}
	};
});