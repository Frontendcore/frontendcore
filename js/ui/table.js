TinyCore.AMD.define('table', ['devicePackage'], function () {
	return {
		sPathCss: oGlobalSettings.sPathCss + 'ui/' + 'table.css',
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
				page: '<i class="icon-page"></i>',
				perPage: 'perPage',
				offset: 'offset',
				records: '',
				record: null,
				queryRecordCount: 'queryRecordCount',
				totalRecordCount: 'totalRecordCount'
			}
		},
		onStart: function () {

			var aTargets = FC.getDataModules('table'),
				self = this;

			FC.loadCSS(this.sPathCss);

			FC.trackEvent('JS_Libraries', 'call', 'table' );

			require(['tableLibs'], function() {
				$(aTargets).each(function () {
					self.autobind(this);
				});
			});
		},
		autobind: function (oTarget, sData) {

			var self = this,
				$Target = $(oTarget),
				sClass = '';

				if (oTarget.getAttribute("data-tc-pagination") === 'false') {
					self.oDefault.features.paginate = false;
					self.oDefault.features.perPageSelect = false;
					self.oDefault.features.recordCount = false;
				}

				if (oTarget.getAttribute("data-tc-sort") === 'false') {
					self.oDefault.features.sort = false;
				}

				if (oTarget.getAttribute("data-tc-search") === 'false') {
					self.oDefault.features.search = false;
				}

				if ( self.oDefault.features.search || self.oDefault.features.paginate ) {
					sClass = 'table-dynamic';
				}

				$Target.dynatable(self.oDefault).addClass(sClass);

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