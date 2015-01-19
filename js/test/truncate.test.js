// Don't catch errors.
TinyCore.debugMode = true;

describe('truncate', function() {

	beforeEach(function(done) {
		TinyCore.AMD.require(['truncate'], function() {
            if (done !== undefined) {
                done();
            }
		});
	});

	it('should exist', function( done ) {
		oTestedModule = TinyCore.Module.instantiate( 'truncate' );
		expect(oTestedModule).toBeTruthy();
	});

	describe('onStart', function() {

		beforeEach(function() {
			spyOn( FC, 'getDataModules');
			spyOn( FC, 'trackEvent');
			spyOn( oTestedModule, 'autobind');
			oTestedModule.onStart();
		});

		it('should exist', function( done ) {
			expect(oTestedModule.onStart).toBeTruthy();
		});

		it('should call FC.trackEvent with "JS_Libraries", "call", "truncate"', function( done ) {
			expect(FC.trackEvent).toHaveBeenCalledWith('JS_Libraries', 'call', 'truncate' );
		});

	});

	describe('autobind', function( done ) {

		beforeEach(function() {
			var $Object =  $('' +'<div data-tc-modules="truncate" data-tc-max="50" data-tc-more="[Más]" data-tc-less="[Menos]">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>');
            spyOn(jQuery.fn, "truncate");
			oTestedModule.autobind($Object[0]);
		});

		it('should exist', function( done ) {
			spyOn( oTestedModule, 'autobind');
			expect(oTestedModule.autobind).toBeTruthy();
		});

		it('should call jQuery truncate', function( done ) {
            expect(jQuery.fn.truncate).toHaveBeenCalled();
		});

	});



});
