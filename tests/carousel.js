// Don't catch errors.
TinyCore.debugMode = true;

describe('carousel', function() {

	var sModuleName = 'carousel';

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
			expect(oTestedModule.oDefault.items).toBeDefined();
			expect(oTestedModule.oDefault.loop).toBeDefined();
			expect(oTestedModule.oDefault.margin).toBeDefined();
			expect(oTestedModule.oDefault.merge).toBeDefined();
			expect(oTestedModule.oDefault.video).toBeDefined();
			expect(oTestedModule.oDefault.autoHeight).toBeDefined();
			expect(oTestedModule.oDefault.videoWidth).toBeDefined();
			expect(oTestedModule.oDefault.videoHeight).toBeDefined();
			expect(oTestedModule.oDefault.lazyLoad).toBeDefined();
			expect(oTestedModule.oDefault.center).toBeDefined();
			expect(oTestedModule.oDefault.autoplay).toBeDefined();
			expect(oTestedModule.oDefault.autoplayTimeout).toBeDefined();
			expect(oTestedModule.oDefault.autoplayHoverPause).toBeDefined();
			expect(oTestedModule.oDefault.responsive).toBeDefined();
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
