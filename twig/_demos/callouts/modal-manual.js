
// 1. Define your module and set 'modal' as dependency
TinyCore.AMD.define('myModule', ['modal'], function () {
	return {

		// 2. Instantiate modal as a object in your module
		oModal:  TinyCore.Module.instantiate( 'modal' ),

		onStart: function () {

			// 3. Save into a local var the scope
			var self = this;

			$('a').on('click',function(event) {
				event.preventDefault();

				// 4.Open in a modal this href
				self.oModal.open({
					href: this.href,
					width: '90%',
					height: '80%',
					onComplete: function() {
						// This function will be called when modal is rendered
					}
				});

				// 5. Closes the modal window
				self.oModal.close();
			});
		},
		onStop: function () {

			// 6.Set free some memory when module stops
			this.oModal = null;
		},
		onDestroy: function () {

			// 7. Delete oModal to avoid memory problems
			delete this.oModal;
		}
	};
});