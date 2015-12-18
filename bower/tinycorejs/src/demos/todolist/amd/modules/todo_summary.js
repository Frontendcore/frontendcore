/**
 * The summary module, responsible for displaying the updated count of completed vs remaining todos.
 * Also responsible for providing a way to clear the todo list when clicking on one of the "clear" links.
 *
 * Topics subscribed : "todo:add", "todo:update", "todo:remove", "storage:sync"
 * Topics published : "list:clear", "list:clean"
 */
TinyCore.AMD.define( 'todo_summary', ['mediator', 'tools/events'], function ( _mediator, _events )
{
	'use strict';

	// Private variable.
	var _oClearAll = null,
		_oClearCompleted = null;

	// The module.
	return {
		/**
		 * This method will be called when the module is started.
		 * @param  {Object} oStartData The start data.
		 */
		onStart : function ( oStartData )
		{
			var self = this,
				oTotal = document.getElementById( 'count-total' ),
				oDone = document.getElementById( 'count-done' );

			this.setCount( oTotal, 0 );
			this.setCount( oDone, 0 );

			_mediator.subscribe( 'todo:add', function ( oTopic )
			{
				console.info(oTopic.name, oTopic.data);
				self.incCount( oTotal, +1 );
			} );

			_mediator.subscribe( 'todo:update', function ( oTopic )
			{
				console.info(oTopic.name, oTopic.data);
				self.incCount( oDone, oTopic.data.done ? +1 : -1 );
			} );

			_mediator.subscribe( 'todo:remove', function ( oTopic )
			{
				console.info(oTopic.name, oTopic.data);
				self.incCount( oTotal, -1 );

				if ( oTopic.data.done )
				{
					self.incCount( oDone, -1 );
				}
			} );

			_mediator.subscribe( 'storage:sync', function ( oTopic )
			{
				console.info(oTopic.name, oTopic.data);
				var oData = oTopic.data;
				self.setCount( oTotal, oData.total );
				self.setCount( oDone, oData.done );
			} );

			_oClearAll = document.getElementById( 'clear-list' );
			_oClearCompleted = document.getElementById( 'clear-completed' );

			_events.on( _oClearAll, 'click', this.onClearListClick );
			_events.on( _oClearCompleted, 'click', this.onClearCompletedClick );
		},

		/**
		 * This method will be called when the module is stopped.
		 */
		onStop : function ()
		{
			_events.off( _oClearCompleted, 'click', this.onClearCompletedClick );
			_events.off( _oClearAll, 'click', this.onClearListClick );

			_oClearCompleted = _oClearAll = null;
		},

		/**
		 * Sets a given count
		 * @param  {DOM Element} oElement The DOM element that holds the count to set
		 * @param  {Number} nNewCount The new count
		 */
		setCount : function ( oElement, nNewCount )
		{
			oElement.innerHTML = nNewCount;
		},

		/**
		 * Increment a given count
		 * @param  {DOM Element} oElement The DOM element that holds the count to increment
		 * @param  {Number} nInc The count increment
		 */
		incCount : function ( oElement, nInc )
		{
			var nCurrentCount = parseInt( oElement.innerHTML, 10 );
			this.setCount( oElement, nCurrentCount + nInc );
		},

		/**
		 * This method will be called when the "clear list" link is clicked.
		 * @param  {Event} eEvent The click event object
		 */
		onClearListClick : function ( eEvent )
		{
			eEvent.preventDefault();
			_mediator.publish( 'list:clear' ); // Let's request some cleanup...
		},

		/**
		 * This method will be called when the "clear completed" link is clicked.
		 * @param  {Event} eEvent The click event object
		 */
		onClearCompletedClick : function ( eEvent )
		{
			eEvent.preventDefault();
			_mediator.publish( 'list:clean' ); // Let's request some cleanup...
		}
	};
} );
