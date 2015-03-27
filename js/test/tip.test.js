// Don't catch errors.
FrontendCore.debug = true;

describe('tip', function() {

	var sModuleName = 'tip';

	beforeEach(function(done) {
		FrontendCore.require([sModuleName], function() {
            if (done !== undefined) {
                done();
            }
		});
	});

	it('should exist', function( done ) {
		oTestedModule = FrontendCore.instantiate( sModuleName );
		expect(oTestedModule).toBeTruthy();
	});

	describe('oDefault', function() {
		it('should have all the parameters', function( done ) {
			expect(oTestedModule.oDefault.fixed).toBeDefined();
		});
	});

	describe('onStart', function() {

		beforeEach(function() {
			spyOn( FrontendTools, 'getDataModules');
			spyOn( FrontendTools, 'loadCSS');
			spyOn( FrontendTools, 'trackModule');
			spyOn( oTestedModule, 'autobind');
			oTestedModule.onStart();
		});

		it('should exist', function( done ) {
			expect(oTestedModule.onStart).toBeTruthy();
		});

		it('should call FrontendTools.load CSS', function( done ) {
			expect(FrontendTools.loadCSS).toHaveBeenCalled();
		});

		it('should call FrontendTools.trackModule with "JS_Libraries", "call", "'+  sModuleName + '"', function( done ) {
			expect(FrontendTools.trackModule).toHaveBeenCalledWith('JS_Libraries', 'call', sModuleName );
		});

	});




});
