TinyCore.debugMode = !0, describe("tip", function() {
    var a = "tip";
    beforeEach(function(b) {
        TinyCore.AMD.require([ a ], function() {
            b();
        });
    }), it("should exist", function() {
        oTestedModule = TinyCore.Module.instantiate(a), expect(oTestedModule).toBeTruthy();
    }), describe("oDefault", function() {
        it("should have all the parameters", function() {
            expect(oTestedModule.oDefault.fixed).toBeDefined();
        });
    }), describe("onStart", function() {
        beforeEach(function() {
            spyOn(FC, "getDataModules"), spyOn(FC, "loadCSS"), spyOn(FC, "trackEvent"), spyOn(oTestedModule, "autobind"), 
            oTestedModule.onStart();
        }), it("should exist", function() {
            expect(oTestedModule.onStart).toBeTruthy();
        }), it("should call FC.load CSS", function() {
            expect(FC.loadCSS).toHaveBeenCalled();
        }), it('should call FC.trackEvent with "JS_Libraries", "call", "' + a + '"', function() {
            expect(FC.trackEvent).toHaveBeenCalledWith("JS_Libraries", "call", a);
        });
    });
});