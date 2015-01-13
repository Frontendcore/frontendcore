
// 1. Define your module and set 'notification' as dependency
TinyCore.AMD.define('myModule', ['notification'], function () {
	return {
		// 2. Instantiate mediator as a object in your module
		mediator :  TinyCore.Toolbox.request( 'mediator' ),
		onStart: function () {
			//3 . Publish on mediator the notification
			this.mediator.publish( 'notification', { type : 'ok', message: 'Your message here' } );
		},
		onStop: function () {
			// 4.Set free some memory when module stops
			this.mediator = null;
		},
		onDestroy: function () {

			// 5. Delete oModal to avoid memory problems
			delete this.mediator;
		}
	};
});