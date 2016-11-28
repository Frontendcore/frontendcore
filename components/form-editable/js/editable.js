;(function (window, document, oGlobalSettings, FrontendMediator, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('editable', [], function () {

		//<div data-fc-modules="editable" data-fc-mediator="channel:any" data-fc-tag="textarea" data-fc-class="any" data-fc-input-id="myinput" data-fc-edit-type='full/click/focusout/none' data-fc-enter-behaviour='block/stopedit/none'></div>
		var newElementIdPrefix = '_fc_editable_';

		return {
			onStart: function () {

				var aTargets = FrontendTools.getDataModules('editable'),
					self = this;

				FrontendTools.trackModule('JS_Libraries', 'call', 'editable');

				$(aTargets).each( function(nIndex){
					self.autobind(this, nIndex);
				});

			},
			autobind: function (oTarget, nIndex) {

				var sPlaceholder = oTarget.getAttribute('data-fc-placeholder') !== null ? oTarget.getAttribute('data-fc-placeholder') : 'edit here';

				$(oTarget).on('editable', function (event, data) {

					if (data.editable === true) {
						if (oTarget.getAttribute("data-fc-editable-id") !== null) {
							//already in editable state...
							return;
						}

						var newId = $("[id^='" + newElementIdPrefix + "']").sort( function (a, b) {
							if (a.id < b.id)
								return -1;
							return 1;
						}).last().attr('id');
						if (newId === undefined) {
							newId = newElementIdPrefix + '0';
						}
						else {
							newId = newElementIdPrefix + (parseInt(newId.substr(newElementIdPrefix.length)) + 1).toString();
						}

						var newElem = $('<input id="' + newId + '" />');
						if (oTarget.getAttribute("data-fc-tag") !== null) {
							newElem = $('<' + oTarget.getAttribute("data-fc-tag") + ' id="' + newId + '" />');
						}
						if (oTarget.getAttribute("data-fc-class") !== null) {
							newElem.addClass(oTarget.getAttribute("data-fc-class"));
						}


						//save id of new element
						$(oTarget).attr('data-fc-editable-id', newId);
						$(oTarget).hide();

						$(oTarget).after(newElem);


						if ( $(oTarget).text().trim() === sPlaceholder ) {
							newElem.val('');
						} else {
							newElem.val($(oTarget).text().trim());
						}

						var enterBehaviour = oTarget.getAttribute("data-fc-enter-behaviour");
						if ( enterBehaviour === 'block' || enterBehaviour === 'stopedit' ) {
							$(oTarget).parent().on('keypress', newElem, function(event) {
								if (event.keyCode == 13) {
									event.preventDefault();
									if (enterBehaviour === 'stopedit') {
										$(oTarget).trigger('editable', {editable: false});
									}
								}
							});
						}

						$(oTarget).parent().on('change', newElem, function() {
							if (oTarget.getAttribute("data-fc-input-id") !== null) {
								$('#' + oTarget.getAttribute("data-fc-input-id")).val(newElem.val());
							}
							if (oTarget.getAttribute("data-fc-mediator") !== null) {
								FrontendMediator.publish(oTarget.getAttribute("data-fc-mediator"), { value: newElem.val() });
							}
						});

						$(oTarget).parent().on('focusout', newElem, function () {

							var editType = oTarget.getAttribute("data-fc-edit-type");
							if (editType === null)
								return;

							var isEditable = false;
							if (oTarget.getAttribute("data-fc-editable-id") !== null) {
								isEditable = true;
							}

							if (isEditable && (editType =='full' || editType =='focusout')) {
								$(oTarget).trigger('editable', {editable: false});
							}

						});

						if (data.focus === true) {
							newElem.focus();
						}
					}
					else {

						var currentValue = '';
						var dataFcEditableId = oTarget.getAttribute("data-fc-editable-id");
						if ( dataFcEditableId !== null) {
							var elem = $('#' + dataFcEditableId);
							currentValue = elem.val().trim();
							elem.remove();
							$(oTarget).removeAttr('data-fc-editable-id');
							$(oTarget).show();

							//update values also when is set to no editable state
							var dataFcInputId = oTarget.getAttribute("data-fc-input-id");
							if ( dataFcInputId !== null) {
								$('#' + dataFcInputId).val(currentValue);
							}

							var dataFcMediator = oTarget.getAttribute("data-fc-mediator");
							if (dataFcMediator !== null) {
								FrontendMediator.publish(dataFcMediator, { value: currentValue });
							}
						}
						else {
							currentValue = $(oTarget).text().trim();
						}

						var dataFcDisableUpdate = oTarget.getAttribute("data-fc-disable-update");
						if (dataFcDisableUpdate === null) {
							if ( currentValue === '' ) {
								$(oTarget).text(sPlaceholder);
								$(oTarget).css('opacity','.5');
							} else {
								$(oTarget).css('opacity','1');
								$(oTarget).text(currentValue);
							}
						}

					}

				});

				$(oTarget).add($(oTarget).find('*')).on('click', function (event, data) {

					if ( FrontendTools.isMobile.any() && oTarget.getAttribute('data-fc-mobile') === 'false') {
						return;
					}

					event.preventDefault();
					event.stopPropagation();

					var editType = oTarget.getAttribute("data-fc-edit-type");
					if (editType === null)
						return;

					var isEditable = false;
					if (oTarget.getAttribute("data-fc-editable-id") !== null) {
						isEditable = true;
					}

					if (!isEditable && (editType =='full' || editType =='click')) {
						$(oTarget).trigger('editable', {editable: true, focus: true});
					}

				});

				//set initial state to not editable...
				$(oTarget).trigger('editable', {editable: false});
			},
		};
	});

})(window, document, oGlobalSettings, FrontendMediator, FrontendTools, FrontendCore, $);
