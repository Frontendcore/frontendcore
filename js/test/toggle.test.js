// Don't catch errors.
TinyCore.debugMode = true;

describe('toggle', function() {

    var oTestedModule;

	beforeEach(function(done) {
		TinyCore.AMD.require(['toggle'], function() {
            if (done !== undefined) {
                done();
            }
		});
	});

	it('should exist', function( done ) {
		oTestedModule = TinyCore.Module.instantiate( 'toggle' );
		expect(oTestedModule).toBeTruthy();
	});

	describe('onStart', function() {

		beforeEach(function() {
			spyOn( oTools, 'getDataModules');
			spyOn( oTools, 'trackModule');
			oTestedModule.onStart();
		});

		it('should exist', function( done ) {
			expect(oTestedModule.onStart).toBeTruthy();
		});

		it('should call oTools.trackModule with "JS_Libraries", "call", "toggle"', function( done ) {
			expect(oTools.trackModule).toHaveBeenCalledWith('JS_Libraries', 'call', 'toggle' );
		});

	});

	describe('toggleClass', function( done ) {

        var $Object;

		beforeEach(function() {
			$Object =  $('<a href="#toggle-class" data-tc-modules="toggle" data-tc-class="hidden" class="button">Click to toggle Class</a><div id="toggle-class" class="box-invert"><p>Hello World!</p></div>');
            spyOn(jQuery.fn, "toggleClass");
            oTestedModule.toggleClass($Object[0]);
		});

        afterEach(function(){
            $Object.remove();
        });

		it('should exist', function( done ) {
            spyOn( oTestedModule, 'toggleClass');
			expect(oTestedModule.toggleClass).toBeTruthy();
		});

        it('should Call jQuery toggleClass', function( done ) {
            expect(jQuery.fn.toggleClass).toHaveBeenCalled();
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

    describe('toggleAnimation', function( done ) {

        var $Object;

        beforeEach(function() {
            $Object =  $('<a href="#toggle-animation-attention" data-tc-modules="toggle" data-tc-animation="bounce" class="button">bounce</a> <p class="fz-h1" id="toggle-animation-attention">Hello World!</p>');
            spyOn( oTestedModule, 'toggleAnimation');
            oTestedModule.toggleAnimation($Object[0]);
            console.info($Object[0]);
        });

        afterEach(function(){
            $Object.remove();
        });

        it('should exist', function( done ) {

            expect(oTestedModule.toggleAnimation).toBeTruthy();
        });


    });


});
