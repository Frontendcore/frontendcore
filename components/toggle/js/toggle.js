;(function (window, document, oGlobalSettings, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('toggle', [], function () {
		return {
			aAnimations: ['flash', 'bounce', 'shake', 'tada', 'pulse', 'rubberband', 'fade', 'swing', 'tada', 'wobble', 'flip', 'rotate', 'slide', 'hinge', 'roll'],
			aVariations: [
				['-in', '-out'],
				['-up', '-down'],
				['-left', '-right']
			],
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('toggle'),
					self = this;

				$(aTargets).each(function (nIndex) {
					self.autobind(this, nIndex);
				});

				FrontendTools.trackModule('JS_Libraries', 'call', 'toggle');

			},
			autobind: function (oTarget, nIndex) {

				 var self = this;

                FrontendTools.bind( oTarget, 'click',function (event) {

                    event.preventDefault();

                    if (oTarget.getAttribute("data-fc-class") !== null) {
                        self.toggleClass(oTarget);
                    } else if (oTarget.getAttribute("data-fc-animation") !== null) {
                        self.toggleAnimation(oTarget);
                    } else {
                        self.slideToggle(oTarget);
                    }

                    if (oTarget.getAttribute("data-fc-scroll") !== null) {

                        if (
                            (oTarget.getAttribute("data-fc-scroll").indexOf('mobile') && FrontendTools.isMobile.any()) ||
                            (oTarget.getAttribute("data-fc-scroll").indexOf('desktop') && !FrontendTools.isMobile.any()) ||
                            (oTarget.getAttribute("data-fc-scroll") === 'true')
                        ) {
                            FrontendCore.require(['anchor-scroll'], function () {
                                var oAnchor = FrontendCore.instantiate('anchor-scroll');
                                var oLink = oTarget.cloneNode(true);

                                if (oLink.getAttribute("data-fc-scroll-to") !== null) {
                                    oLink.href = oLink.getAttribute("data-fc-scroll-to");
                                }

                                oAnchor.scrollTo( event, oLink);
                            });
                        }

                    }

                });
            },
			toggle: function (sId) {
                if ( sId !== null && sId !== undefined && sId !== '') {
                    $('[href="#' + sId + '"]').each( function () {

                        if ( this.getAttribute('data-fc-self-toggle') === 'slide' ) {
                            $(this).slideToggle('fast');
                        } else if ( this.getAttribute('data-fc-self-toggle') !== null) {
                            $(this).toggle('fast');

                        }
                        if ( this.getAttribute('data-fc-publish') !== -1) {
                        	FrontendMediator.publish (this.getAttribute('data-fc-publish'));
						}
                    });
                }
			},
			getOpositeAnimation: function (sClass) {

				var sClassOposite = sClass || '',
					sWhite,
					sBlack,
					aVariations = this.aVariations;

				for (var nKey = 0; nKey < aVariations.length; nKey++) {
					sWhite = aVariations[nKey][0];
					sBlack = aVariations[nKey][1];

					if (sClass.indexOf(sWhite) !== -1) {
						sClassOposite = sClassOposite.replace(sWhite, sBlack);
					} else if (sClass.indexOf(sBlack) !== -1) {
						sClassOposite = sClassOposite.replace(sBlack, sWhite);
					}
				}

				return sClassOposite;
			},
			cleanAnimations: function (sClass) {
				var aAnimations = this.aAnimations,
					aClassNames = sClass.split(' '),
					nIndex;

				for (var nKey = 0; nKey < aAnimations.length; nKey++) {
					nIndex = aClassNames.indexOf(aAnimations[nKey]);
					if (nIndex !== -1) {
						aClassNames.splice(nIndex, 1);
					}
				}

				nIndex = aClassNames.indexOf('animated');

				if (nIndex == -1) {
					aClassNames.push('animated');
				}


				return aClassNames.toString().replace(',', ' ');

			},
			toggleAnimation: function (oThis) {

				var self = this,
					sClassOposite = '',
					sHref = oThis.href,
					sClassName = oThis.getAttribute('data-fc-animation') || '',
					$Target = null,
					sTargetClassName,
                    sId;

				if (sHref.indexOf('#') !== -1) {
				    sId = sHref.split('#')[1];
					$Target = $(document.getElementById( sId ));
				}

				sTargetClassName = $Target.attr('class');

				sClassOposite = self.getOpositeAnimation(sClassName);

				$Target.attr('class', self.cleanAnimations(sTargetClassName));

				$Target.removeClass(sClassOposite).addClass(sClassName);

				$(oThis).attr('data-fc-animation', sClassOposite);

                self.toggle(sId);

			},
			toggleClass: function (oThis) {

				var self = this,
					sHref = oThis.href,
					sClassName = oThis.getAttribute('data-fc-class') || '',
                    sId;

				if (sHref.indexOf('#') !== -1) {
                    sId = sHref.split('#')[1];
					$(document.getElementById(sId)).toggleClass(sClassName, 'bounce-out');
				}

				$(oThis).toggleClass('active');

                self.toggle(sId);

			},
			slideToggle: function (oThis) {

				var self = this,
					sHref = oThis.href,
					sId,
					oTarget;

				if (sHref.indexOf('#') !== -1) {

					sId = sHref.split('#')[1];
					oTarget = document.getElementById(sId);

					if ($(oTarget).is(':visible')) {

						$(oTarget).slideUp("normal", function () {
							$(oTarget).css('position', 'fixed');

							setTimeout(function () {
								$(oTarget).css('position', 'relative');
							}, 1);
						});

					} else {
						$(oTarget).css('position', 'fixed');

						setTimeout(function () {
							$(oTarget).css('position', 'relative');
						}, 1);

						$(oTarget).slideDown();
					}

					self.toggle(sId);


				}

			}
		};
	});

})(window, document, oGlobalSettings, FrontendTools, FrontendCore, $);
