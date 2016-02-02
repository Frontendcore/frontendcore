
// 1. Define your module and set 'notification' as dependency
FrontendCore.define('myModule', ['notification'], function () {
	return {
		onStart: function () {
			//2 . Publish on mediator the notification
			FrontendMediator.publish( 'notification', { type : 'success', message: 'Your message here' } );
		},
		onStop: function () {
			// 3.Set free some memory when module stops
			FrontendMediator = null;
		},
		onDestroy: function () {
			// 4. Delete oModal to avoid memory problems
			delete this.mediator;
		}
	};
});