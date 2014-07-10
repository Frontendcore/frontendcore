TinyCore.debugMode = !0, describe("autosize", function() {
    beforeEach(function(a) {
        TinyCore.AMD.require([ "autosize" ], function() {
            a();
        });
    }), it("should exist", function() {
        oTestedModule = TinyCore.Module.instantiate("autosize"), expect(oTestedModule).toBeTruthy();
    }), describe("onStart", function() {
        beforeEach(function() {
            spyOn(FC, "getDataModules"), spyOn(FC, "trackEvent"), spyOn(oTestedModule, "autobind"), 
            oTestedModule.onStart();
        }), it("should exist", function() {
            expect(oTestedModule.onStart).toBeTruthy();
        }), it('should call FC.trackEvent with "JS_Libraries", "call", "autocomplete"', function() {
            expect(FC.trackEvent).toHaveBeenCalledWith("JS_Libraries", "call", "autosize");
        });
    }), describe("autobind", function() {
        beforeEach(function() {
            var a = $('<textarea data-tc-modules="autosize"></textarea>');
            spyOn(jQuery.fn, "autosize"), spyOn(jQuery.fn, "addClass"), oTestedModule.autobind(a[0]);
        }), it("should exist", function() {
            spyOn(oTestedModule, "autobind"), expect(oTestedModule.autobind).toBeTruthy();
        }), it("should call jQuery autosize", function() {
            expect(jQuery.fn.autosize).toHaveBeenCalled();
        }), it('should call jQuery addCLass with "animated height"', function() {
            expect(jQuery.fn.addClass).toHaveBeenCalledWith("animated height");
        });
    });
});