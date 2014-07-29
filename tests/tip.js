// Don't catch errors.
TinyCore.debugMode = true;

describe('tip', function() {

	var sModuleName = 'tip';

	beforeEach(function(done) {
		TinyCore.AMD.require([sModuleName], function() {
            if (done !== undefined) {
                done();
            }
		});
	});

	it('should exist', function( done ) {
		oTestedModule = TinyCore.Module.instantiate( sModuleName );
		expect(oTestedModule).toBeTruthy();
	});

	describe('oDefault', function() {
		it('should have all the parameters', function( done ) {
			expect(oTestedModule.oDefault.fixed).toBeDefined();
		});
	});

	describe('onStart', function() {

		beforeEach(function() {
			spyOn( FC, 'getDataModules');
			spyOn( FC, 'loadCSS');
			spyOn( FC, 'trackEvent');
			spyOn( oTestedModule, 'autobind');
			oTestedModule.onStart();
		});

		it('should exist', function( done ) {
			expect(oTestedModule.onStart).toBeTruthy();
		});

		it('should call FC.load CSS', function( done ) {
			expect(FC.loadCSS).toHaveBeenCalled();
		});

		it('should call FC.trackEvent with "JS_Libraries", "call", "'+  sModuleName + '"', function( done ) {
			expect(FC.trackEvent).toHaveBeenCalledWith('JS_Libraries', 'call', sModuleName );
		});

	});




});
