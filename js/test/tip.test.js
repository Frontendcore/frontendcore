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
			spyOn( oTools, 'getDataModules');
			spyOn( oTools, 'loadCSS');
			spyOn( oTools, 'trackModule');
			spyOn( oTestedModule, 'autobind');
			oTestedModule.onStart();
		});

		it('should exist', function( done ) {
			expect(oTestedModule.onStart).toBeTruthy();
		});

		it('should call oTools.load CSS', function( done ) {
			expect(oTools.loadCSS).toHaveBeenCalled();
		});

		it('should call oTools.trackModule with "JS_Libraries", "call", "'+  sModuleName + '"', function( done ) {
			expect(oTools.trackModule).toHaveBeenCalledWith('JS_Libraries', 'call', sModuleName );
		});

	});




});
