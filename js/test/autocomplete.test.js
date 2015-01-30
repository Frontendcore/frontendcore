// Don't catch errors.
TinyCore.debugMode = true;

describe('Autocomplete', function() {

	beforeEach(function(done) {
		TinyCore.AMD.require(['autocomplete'], function() {
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

		it('should call oTools.trackModule with "JS_Libraries", "call", "autocomplete"', function( done ) {
			expect(oTools.trackModule).toHaveBeenCalledWith('JS_Libraries', 'call', 'autocomplete' );
		});

	});

	describe('autobind', function() {

		beforeEach(function() {
			var $input =  $('<input name="toyName" value="foo" data-tc-values="foo,bar">');
			spyOn(jQuery.fn, "autocompleter");
			spyOn(oTools, "mergeJSON");
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
