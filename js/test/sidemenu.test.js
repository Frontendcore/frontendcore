// Don't catch errors.
TinyCore.debugMode = true;

describe('sidemenu', function() {

	beforeEach(function(done) {
		TinyCore.AMD.require(['sidemenu'], function() {
            if (done !== undefined) {
                done();
            }
		});
	});

	it('should exist', function( done ) {
		oTestedModule = TinyCore.Module.instantiate( 'sidemenu' );
		expect(oTestedModule).toBeTruthy();
	});

	describe('onStart', function() {

		beforeEach(function() {
			spyOn( oTools, 'getDataModules');
			spyOn( oTools, 'trackModule');
			spyOn( oTestedModule, 'autobind');
			oTestedModule.onStart();
		});

		it('should exist', function( done ) {
			expect(oTestedModule.onStart).toBeTruthy();
		});

		it('should call oTools.trackModule with "JS_Libraries", "call", "sidemenu"', function( done ) {
			expect(oTools.trackModule).toHaveBeenCalledWith('JS_Libraries', 'call', 'sidemenu' );
		});

	});

	describe('autobind', function( done ) {

		beforeEach(function() {
			var $Object =  $('<a data-tc-modules="sidemenu" href="#side-menu-left">Toggle menu left</a><div id="side-menu-left" class="hidden"><ul><li><a href="#">List 1</a></li></ul></div>');
            spyOn(jQuery.fn, "sidr");
			oTestedModule.autobind($Object[0]);
		});

		it('should exist', function( done ) {
			spyOn( oTestedModule, 'autobind');
			expect(oTestedModule.autobind).toBeTruthy();
		});

		it('should call jQuery sidr', function( done ) {
            expect(jQuery.fn.sidr).toHaveBeenCalled();
		});

	});



});
