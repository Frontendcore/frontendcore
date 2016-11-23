;(function (window, document, oGlobalSettings, FrontendMediator, FrontendTools, FrontendCore, $) {
	'use strict';

	FrontendCore.define('editable', [], function () {

		//<div data-fc-modules="editable" data-fc-mediator="channel:any" data-fc-tag="textarea" data-fc-class="any" data-fc-input-id="myinput" data-fc-edit-type='full/click/focusout/none'></div>
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

						newElem.val($(oTarget).text().trim());


						/*Prevent enter/submit when editable element is an input*/
						if ( newElem.prop('tagName') == 'INPUT' ) {
							$(oTarget).parent().on('keypress', newElem, function(event) {
								if (event.keyCode == 13) {
									event.preventDefault();
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

						if (oTarget.getAttribute("data-fc-editable-id") !== null) {

							var editableElem = $('#' + oTarget.getAttribute("data-fc-editable-id"));

							//update values also when is set to no editable state
							if (oTarget.getAttribute("data-fc-input-id") !== null) {
								$('#' + oTarget.getAttribute("data-fc-input-id")).val(editableElem.val());
							}
							if (oTarget.getAttribute("data-fc-mediator") !== null) {
								FrontendMediator.publish(oTarget.getAttribute("data-fc-mediator"), { value: editableElem.val() });
							}

							editableElem.remove();
							$(oTarget).removeAttr('data-fc-editable-id');
							$(oTarget).show();
						}

					}

				});

				$(oTarget).add($(oTarget).find('*')).on('click', function (event, data) {
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

			},
		};
	});

})(window, document, oGlobalSettings, FrontendMediator, FrontendTools, FrontendCore, $);
