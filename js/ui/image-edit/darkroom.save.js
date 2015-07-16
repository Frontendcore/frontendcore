; (function (window, document, FrontendMediator, Darkroom) {
	'use strict';

	Darkroom.plugins.save = Darkroom.Plugin.extend({
		defaults: {
			callback: function () {
				this.darkroom.selfDestroy();
				FrontendMediator.publish('image-edit:save', { oImage: this.darkroom.image._element});

			}
		},

		initialize: function InitDarkroomSavePlugin() {
			var buttonGroup = this.darkroom.toolbar.createButtonGroup(),
				self = this;

			this.destroyButton = buttonGroup.createButton({
				image: 'save'
			});

			this.destroyButton.addEventListener('click', this.options.callback.bind(this) );

		}
	});
})(window, document, FrontendMediator, Darkroom);
