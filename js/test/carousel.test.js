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
			expect(oTestedModule.oDefault.videoWidth).toBeDefined();
			expect(oTestedModule.oDefault.videoHeight).toBeDefined();
			expect(oTestedModule.oDefault.lazyLoad).toBeDefined();
			expect(oTestedModule.oDefault.center).toBeDefined();
			expect(oTestedModule.oDefault.autoplay).toBeDefined();
			expect(oTestedModule.oDefault.autoplayTimeout).toBeDefined();
			expect(oTestedModule.oDefault.autoplayHoverPause).toBeDefined();
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
