TinyCore.debugMode = !0, describe("Autocomplete", function() {
    beforeEach(function(a) {
        TinyCore.AMD.require([ "autocomplete" ], function() {
            a();
        });
    }), it("should exist", function() {
        oTestedModule = TinyCore.Module.instantiate("autocomplete"), expect(oTestedModule).toBeTruthy();
    }), describe("oDefault", function() {
        it("should have all the parameters", function() {
            expect(oTestedModule.oDefault.inputClass).toBeDefined(), expect(oTestedModule.oDefault.resultsClass).toBeDefined(), 
            expect(oTestedModule.oDefault.loadingClass).toBeDefined(), expect(oTestedModule.oDefault.autoFill).toBeDefined(), 
            expect(oTestedModule.oDefault.minChars).toBeDefined(), expect(oTestedModule.oDefault.max).toBeDefined(), 
            expect(oTestedModule.oDefault.nMaxItems).toBeDefined(), expect(oTestedModule.oDefault.addButtonClass).toBeDefined(), 
            expect(oTestedModule.oDefault.addButtonText).toBeDefined(), expect(oTestedModule.oDefault.autocomplete).toBeDefined(), 
            expect(oTestedModule.oDefault.completeOnBlur).toBeDefined(), expect(oTestedModule.oDefault.completeOnSeparator).toBeDefined(), 
            expect(oTestedModule.oDefault.mustMatch).toBeDefined(), expect(oTestedModule.oDefault.matchContains).toBeDefined(), 
            expect(oTestedModule.oDefault.scrollHeight).toBeDefined(), expect(oTestedModule.oDefault.autoOpenDelay).toBeDefined();
        });
    }), describe("onStart", function() {
        beforeEach(function() {
            spyOn(FC, "getDataModules"), spyOn(FC, "loadCSS"), spyOn(FC, "trackEvent"), spyOn(oTestedModule, "autobind"), 
            oTestedModule.onStart();
        }), it("should exist", function() {
            expect(oTestedModule.onStart).toBeTruthy();
        }), it("should call FC.load CSS", function() {
            expect(FC.loadCSS).toHaveBeenCalled();
        }), it('should call FC.trackEvent with "JS_Libraries", "call", "autocomplete"', function() {
            expect(FC.trackEvent).toHaveBeenCalledWith("JS_Libraries", "call", "autocomplete");
        });
    }), describe("autobind", function() {
        beforeEach(function() {
            var a = $('<input name="toyName" value="foo" data-tc-values="foo,bar">');
            spyOn(jQuery.fn, "autocomplete"), spyOn(jQuery.fn, "focus"), spyOn(FC, "mixOptions"), 
            oTestedModule.autobind(a[0]);
        }), it("should exist", function() {
            expect(oTestedModule.autobind).toBeTruthy();
        }), it("should call jQuery autocomplete", function() {
            expect(jQuery.fn.autocomplete).toHaveBeenCalled();
        }), it("should call jQuery focus", function() {
            expect(jQuery.fn.focus).toHaveBeenCalled();
        });
    });
});