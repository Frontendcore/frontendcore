FrontendCore.define('myModule', [], function () {
	return {
		onStart: function () {

			// 1. Require and start the 'notification' module
			FrontendCore.requireAndStart( ['notification'], function(){
				//2 . On callback use the mediator to publish the notification
				FrontendMediator.publish( 'notification', { type : 'success', message: 'Your message here' } );
			});
		}
	};
});