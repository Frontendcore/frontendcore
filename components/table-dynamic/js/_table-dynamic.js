;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('table-dynamic', [], function () {
		return {
			oTable : [],
			oDefault: {
				features: {
					paginate: true,
					sort: true,
					pushState: true,
					search: true,
					recordCount: true,
					perPageSelect: true
				},
				inputs: {
					queries: null,
					sorts: null,
					multisort: ['ctrlKey', 'shiftKey', 'metaKey'],
					page: null,
					queryEvent: 'blur change',
					recordCountTarget: null,
					recordCountPlacement: 'after',
					paginationLinkTarget: null,
					paginationLinkPlacement: 'after',
					paginationClass: 'pagination dynatable-pagination',
					paginationLinkClass: 'dynatable-page-link',
					paginationPrevClass: 'dynatable-page-prev',
					paginationNextClass: 'dynatable-page-next',
					paginationActiveClass: 'dynatable-active-page',
					paginationDisabledClass: 'dynatable-disabled-page',
					paginationPrev: '<i class="icon-step-backward"></i>',
					paginationNext: '<i class="icon-step-forward"></i>',
					paginationGap: [1,2,2,1],
					searchTarget: null,
					searchPlacement: 'before',
					perPageTarget: null,
					perPagePlacement: 'before',
					perPageText: '<i class="icon-table"></i> ',
					recordCountText: '',
					processingText: 'Processing...'
				},
				params: {
					dynatable: 'table',
					queries: 'queries',
					sorts: 'sorts',
					page: '',
					perPage: 'perPage',
					offset: 'offset',
					records: '',
					record: null,
					queryRecordCount: 'queryRecordCount',
					totalRecordCount: 'totalRecordCount'
				}
			},
			wrap: function(oTarget) {
				$(oTarget).wrap('<div class="table-dynamic-wrapper"></div>');
			},
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('table-dynamic'),
					self = this;

				FrontendTools.trackModule('JS_Libraries', 'call', 'table-dynamic' );

				$(aTargets).each(function ( nIndex ) {

					self.wrap(this);

					self.autobind(this, nIndex);
				});
			},
			autobind: function (oTarget, nIndex) {

				var self = this,
					$Target = $(oTarget),
					sClass = '';

					if (oTarget.getAttribute("data-fc-pagination") === 'false') {
						self.oDefault.features.paginate = false;
						self.oDefault.features.perPageSelect = false;
						self.oDefault.features.recordCount = false;
					}

					if (oTarget.getAttribute("data-fc-sort") === 'false') {
						self.oDefault.features.sort = false;
					}

					if (oTarget.getAttribute("data-fc-search") === 'false') {
						self.oDefault.features.search = false;
					}

					if ( self.oDefault.features.search || self.oDefault.features.paginate ) {
						sClass = 'table-dynamic';
					}

					$Target.addClass(sClass);

					FrontendTools.removeLoading(oTarget);

					self.oTable[nIndex] = $Target.dynatable(self.oDefault);

				$('input','.dynatable-search').keyup(function(){
					$(this).blur().focus();
				});

			},
			onStop: function () {
				this.sPathCss = null;
				this.oDefault = null;
			},
			onDestroy: function () {
				delete this.sPathCss;
				delete this.oDefault;
			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);
