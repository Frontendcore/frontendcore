// Don't catch errors.
TinyCore.debugMode = true;

describe('dropdown', function() {

    var oTestedModule;

	beforeEach(function(done) {
		TinyCore.AMD.require(['dropdown'], function() {
            if (done !== undefined) {
                done();
            }
		});
	});

	it('should exist', function( done ) {
		oTestedModule = TinyCore.Module.instantiate( 'dropdown' );
		expect(oTestedModule).toBeTruthy();
	});

	describe('onStart', function() {

		var $Object;

		beforeEach(function() {
			$Object =  $('<nav class="navigation" data-tc-modules="dropdown"><ul> <li class="navigation-dropdown"><a title="Fruits" href="#fruits" id="toggle">Fruits</a><ul id="fruits"><li><a title="Oranges" href="#tab1">Oranges</a></li><li><a title="Apples" href="#tab2">Apples</a></li><li><a title="Bananas" href="#tab3">Bananas</a></li></ul></li><li class="navigation-dropdown"><a title="Vegetables" href="#vegetables">Vegetables</a> <ul id="vegetables"><li><a title="Menu item 1" href="#tab1">Oranges</a></li><li><a title="Menu item 2" href="#tab2">Apples</a></li><li><a title="Menu item 3" href="#tab3">Bananas</a></li></ul></li><li><a title="Menu item 3" href="#tab3">Lettuce</a></li></ul></nav>');
			spyOn( oTools, 'getDataModules');
			spyOn( oTools, 'trackModule');
			oTestedModule.onStart();
		});

		afterEach(function(){
			$Object.remove();
		});

		it('should exist', function( done ) {
			expect(oTestedModule.onStart).toBeTruthy();
		});

		it('should call oTools.trackModule with "JS_Libraries", "call", "dropdown"', function( done ) {
			expect(oTools.trackModule).toHaveBeenCalledWith('JS_Libraries', 'call', 'dropdown' );
		});

	});


	describe('slideToggle', function( done ) {

		var $Object;

		beforeEach(function() {
			$Object =  $('<a href="#toggle-slide" data-tc-modules="toggle" class="button">Click to toggle Class</a><div id="toggle-slide" class="box-invert"><p>Hello World!</p></div>');
			spyOn(jQuery.fn, "slideToggle");
			oTestedModule.slideToggle($Object[0]);
		});

		afterEach(function(){
			$Object.remove();
		});

		it('should exist', function( done ) {
			spyOn( oTestedModule, 'slideToggle');
			expect(oTestedModule.slideToggle).toBeTruthy();
		});

		it('should Call jQuery slideToggle', function( done ) {

			expect(jQuery.fn.slideToggle).toHaveBeenCalled();
		});

	});


});
