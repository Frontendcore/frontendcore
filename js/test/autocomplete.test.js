// Don't catch errors.
TinyCore.debugMode = true;

describe('Autocomplete', function() {

	beforeEach(function(done) {
		FrontendCore.require(['autocomplete'], function() {
			if (done !== undefined) {
                done();
            }
		});
	});

	it('should exist', function( done ) {
		oTestedModule = TinyCore.Module.instantiate( 'autocomplete' );
		expect(oTestedModule).toBeTruthy();
	});

	describe('oDefault', function() {
		it('should have all the parameters', function( done ) {
			expect(oTestedModule.oDefault.limit).toBeDefined();
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

		it('should call FrontendTools.trackModule with "JS_Libraries", "call", "autocomplete"', function( done ) {
			expect(FrontendTools.trackModule).toHaveBeenCalledWith('JS_Libraries', 'call', 'autocomplete' );
		});

	});

	describe('autobind', function() {

		beforeEach(function() {
			var $input =  $('<input name="toyName" value="foo" data-fc-values="foo,bar">');
			spyOn(jQuery.fn, "autocompleter");
			spyOn(FrontendTools, "mergeJSON");
			oTestedModule.autobind($input[0]);
		});

		it('should exist', function( done ) {
			expect(oTestedModule.autobind).toBeTruthy();
		});


		it('should call jQuery autocompleter', function( done ) {
			expect(jQuery.fn.autocompleter).toHaveBeenCalled();
		});


	});



});
