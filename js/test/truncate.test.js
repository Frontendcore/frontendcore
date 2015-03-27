// Don't catch errors.
FrontendCore.debug = true;

describe('truncate', function() {

	beforeEach(function(done) {
		FrontendCore.require(['truncate'], function() {
            if (done !== undefined) {
                done();
            }
		});
	});

	it('should exist', function( done ) {
		oTestedModule = FrontendCore.instantiate( 'truncate' );
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

		it('should call FrontendTools.trackModule with "JS_Libraries", "call", "truncate"', function( done ) {
			expect(FrontendTools.trackModule).toHaveBeenCalledWith('JS_Libraries', 'call', 'truncate' );
		});

	});

	describe('autobind', function( done ) {

		beforeEach(function() {
			var $Object =  $('' +'<div data-fc-modules="truncate" data-fc-max="50" data-fc-more="[Más]" data-fc-less="[Menos]">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>');
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
