;(function (FrontendTools, FrontendCore, FrontendMediator, $) {
	'use strict';

	FrontendCore.define('tabs', [] , function () {

		function start(aTargets) {

			$(aTargets)
				.addClass('tab-container')
				.each(function(){

					// CREATE TABS
					var elements = [],
						oTarget = this;

					$('>', oTarget).each(function() {

						var id = this.id,
							name = this.getAttribute('data-fc-name') || id.replace('-', ' ');

						elements.push(
							'<li id="', id, '-li">',
								'<a href="#', id, '" class="update-tabs">',
									name,
								'</a>',
							'</li>'
						);

						$(this).before(
							$('<header id="#' + id + '-header" class="tab">').append(
								$('<a href="#' + id + '" class="update-tabs">').html(name)
							)
						);
					});

					$(oTarget).prepend(
						$('<nav class="tabs">').append(
							$('<ul>').append(elements.join(''))
						)
					);
				})
				.on('click', 'a.update-tabs', onClick)
				.each(function(){

					// INIT
					var oTarget = this;

					updateTabs(oTarget, $('nav li:first a', oTarget).attr('href'));
					FrontendTools.removeLoading(oTarget);
				});
		}


		function onClick(event) {

			event.preventDefault();
			FrontendMediator.publish('close:wysiwyg');

			var href = $(event.currentTarget).attr('href');
			if (href) {
				updateTabs(event.delegateTarget, href);
			}
		}

		function updateTabs(target, selector) {

			var $tabs = $('a.update-tabs', target),
				$previouslyActive = $('.active a.update-tabs', target),
				$active = $tabs.filter('[href="' + selector + '"]');

			if ($previouslyActive.length === 0) {
				$previouslyActive = $tabs;

			} else if ($previouslyActive.closest($active).length > 0) {
				return;
			}

			$previouslyActive.parent().removeClass('active');
			getPanels($previouslyActive).hide();

			$active.parent().addClass('active');
			getPanels($active).fadeIn();
		}

		function getPanels($tabs) {

			var $panels = $();

			$tabs.each(function () {
				$panels = $panels.add($(this).attr('href'));
			});

			return $panels;
		}

		return {
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('tabs');
				FrontendTools.trackModule('JS_Libraries', 'call', 'tabs');
				start(aTargets);
			}
		};
	});

})(FrontendTools, FrontendCore, FrontendMediator, $);
