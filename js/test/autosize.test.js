// Don't catch errors.
TinyCore.debugMode = true;

describe('autosize', function() {

	beforeEach(function(done) {
		FrontendCore.require(['autosize'], function() {
            if (done !== undefined) {
                done();
            }
		});
	});

	it('should exist', function( done ) {
		oTestedModule = TinyCore.Module.instantiate( 'autosize' );
		expect(oTestedModule).toBeTruthy();
	});

	describe('onStart', function() {

		beforeEach(function() {
			spyOn( FrontendTools, 'getDataModules');
			spyOn( FrontendTools, 'trackModule');
			spyOn( oTestedModule, 'autobind');
			oTestedModule.onStart();
		});

		it('should exist', function( done ) {
			expect(oTestedModule.onStart).toBeTruthy();
		});

		it('should call FrontendTools.trackModule with "JS_Libraries", "call", "autocomplete"', function( done ) {
			expect(FrontendTools.trackModule).toHaveBeenCalledWith('JS_Libraries', 'call', 'autosize' );
		});

	});

	describe('autobind', function( done ) {

		beforeEach(function() {
			var $Object =  $('<textarea data-fc-modules="autosize"></textarea>');
			spyOn(jQuery.fn, "autosize");
			spyOn(jQuery.fn, "addClass");
			oTestedModule.autobind($Object[0]);
		});

		it('should exist', function( done ) {
			spyOn( oTestedModule, 'autobind');
			expect(oTestedModule.autobind).toBeTruthy();
		});

		it('should call jQuery autosize', function( done ) {
			expect(jQuery.fn.autosize).toHaveBeenCalled();
		});
		it('should call jQuery addCLass with "animated height"', function( done ) {
			expect(jQuery.fn.addClass).toHaveBeenCalledWith('animated height');
		});
	});



});
