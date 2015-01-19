// Don't catch errors.
TinyCore.debugMode = true;

describe('code', function() {

	beforeEach(function(done) {
		TinyCore.AMD.require(['code'], function() {
            if (done !== undefined) {
                done();
            }
		});
	});

	it('should exist', function( done ) {
		oTestedModule = TinyCore.Module.instantiate( 'code' );
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

		it('should call FC.trackEvent with "JS_Libraries", "call", "code"', function( done ) {
			expect(FC.trackEvent).toHaveBeenCalledWith('JS_Libraries', 'call', 'code' );
		});

	});

	describe('autobind', function( done ) {

		beforeEach(function() {
			var $Object =  $('<pre><code></code></pre>');
			spyOn(hljs, "highlightBlock");
			oTestedModule.autobind($Object[0]);
		});

		it('should exist', function( done ) {
			spyOn( oTestedModule, 'autobind');
			expect(oTestedModule.autobind).toBeTruthy();
		});

		it('should call hljs highlightBlock', function( done ) {
			expect(hljs.highlightBlock).toHaveBeenCalled();
		});

	});



});
