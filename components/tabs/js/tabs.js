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

					$('a.update-tabs', oTarget).each( function(){
						FrontendTools.bind( this, 'click', onClick);

					});

					$(oTarget).prepend(
						$('<nav class="tabs">').append(
							$('<ul>').append(elements.join(''))
						)
					);

					updateTabs(oTarget, $('nav li:first a', oTarget).attr('href'));
					FrontendTools.removeLoading(oTarget);

				});

		}


		function onClick(event) {

			event.preventDefault();

			FrontendMediator.publish('close:wysiwyg');

			var href = '#' + event.target.href.split('#')[1],
				target = $( event.target).parents('[data-fc-modules=tabs]')[0];

			if (href) {
				updateTabs( target, href);
			}
		}

		function updateTabs(target, selector) {

			var $tabs = $('a.update-tabs', target),
				$previouslyActive = $('.tabs-active a.update-tabs', target),
				$active = $tabs.filter('[href="' + selector + '"]');

			if ($previouslyActive.length === 0) {
				$previouslyActive = $tabs;

			} else if ($previouslyActive.closest($active).length > 0) {
				return;
			}

			$previouslyActive.parent().removeClass('tabs-active');
			getPanels($previouslyActive).hide();

			$active.parent().addClass('tabs-active');
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
