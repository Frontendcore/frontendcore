TinyCore.debugMode=!0,describe("truncate",function(){beforeEach(function(a){TinyCore.AMD.require(["truncate"],function(){void 0!==a&&a()})}),it("should exist",function(){oTestedModule=TinyCore.Module.instantiate("truncate"),expect(oTestedModule).toBeTruthy()}),describe("onStart",function(){beforeEach(function(){spyOn(FC,"getDataModules"),spyOn(FC,"trackEvent"),spyOn(oTestedModule,"autobind"),oTestedModule.onStart()}),it("should exist",function(){expect(oTestedModule.onStart).toBeTruthy()}),it('should call FC.trackEvent with "JS_Libraries", "call", "truncate"',function(){expect(FC.trackEvent).toHaveBeenCalledWith("JS_Libraries","call","truncate")})}),describe("autobind",function(){beforeEach(function(){var a=$('<div data-tc-modules="truncate" data-tc-max="50" data-tc-more="[Más]" data-tc-less="[Menos]">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>');spyOn(jQuery.fn,"truncate"),oTestedModule.autobind(a[0])}),it("should exist",function(){spyOn(oTestedModule,"autobind"),expect(oTestedModule.autobind).toBeTruthy()}),it("should call jQuery truncate",function(){expect(jQuery.fn.truncate).toHaveBeenCalled()})})});