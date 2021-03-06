module.exports = function(grunt) {

	require(fcCwd + "/grunt/_data.js")(grunt);


	if (oData.js !== undefined) {

        var bBeauty = (oData.js !== undefined && oData.js.uglify !== undefined && oData.js.uglify === false ) ? true : false,
            oConfig = {},
            oCore = {
                options: {
                    preserveComments: false,
                    beautify: bBeauty,
                    mangle: false
                },
                files: {}
            },
            oCustom = {
                options: {
                    mangle: false,
                    preserveComments: false,
                    beautify: bBeauty
                },
                files: {}
            };

        if (oData !== undefined) {

            // FRONTENDCORE.JS
            oCore.files[jsDest + '/frontendcore.js'] = [
                fcCwd + '/components/essence/js/libs/modernizr-custom.js',
                fcCwd + '/bower/tinycorejs/build/TinyCore.js',
                fcCwd + '/bower/tinycorejs/src/tools/mediator/TinyCore.Toolbox.Mediator.js',
                fcCwd + '/bower/tinycorejs/build/extensions/AMD/require-2.1.4.min.js',
                fcCwd + '/bower/tinycorejs/src/extensions/AMD/TinyCore.AMD.js',
                fcCwd + '/bower/tinycorejs/src/extensions/AMD/TinyCore.AMD.domBoot.js',
                fcCwd + '/bower/jquery/dist/jquery.js',
                fcCwd + '/components/essence/js/_namespace.js',
                fcCwd + '/components/essence/js/tools/_getSelector.js',
                fcCwd + '/components/essence/js/tools/_bind.js',
                fcCwd + '/components/essence/js/tools/_attributeToArray.js',
                fcCwd + '/components/essence/js/tools/_getDataModules.js',
                fcCwd + '/components/essence/js/tools/_isMobile.js',
                fcCwd + '/components/essence/js/tools/_isVisible.js',
                fcCwd + '/components/essence/js/tools/_loadCSS.js',
                fcCwd + '/components/essence/js/tools/_mergeJSON.js',
                fcCwd + '/components/essence/js/tools/_mergeOptions.js',
                fcCwd + '/components/essence/js/tools/_mixOptions.js',
                fcCwd + '/components/essence/js/tools/_removeLoading.js',
                fcCwd + '/components/essence/js/tools/_track-analytics.js',
                fcCwd + '/components/essence/js/_modules-config.js',
                fcCwd + '/components/essence/js/_init.js'
            ];

            // CODE.JS
            oCore.files[jsDest + '/ui/code.js'] = [
                fcCwd + '/bower/highlightjs/highlight.pack.js',
                fcCwd + '/components/code/js/_code.js'
            ];

            // FORM VALIDATION.JS
            oCore.files[jsDest + '/ui/form-validation-libs.js'] = [
                fcCwd + '/bower/parsleyjs/dist/parsley.js'
            ];

            // INPUT AUTOCOMPLETE
            oCore.files[jsDest + '/ui/autocomplete.js'] = [
                fcCwd + '/bower/Autocompleter/jquery.autocompleter.js',
                fcCwd + '/components/form-autocomplete/js/_autocomplete.js'
            ];

            // TEXTAREA AUTOSIZE
            oCore.files[jsDest + '/ui/autosize.js'] = [
                fcCwd + '/bower/jquery-autosize/jquery.autosize.js',
                fcCwd + '/components/form-autosize/js/_autosize.js'
            ];

            // TIP
            oCore.files[jsDest + '/ui/tip.js'] = [
                fcCwd + '/components/tip/js/_tip.js'
            ];

            // TIP LIBS
            oCore.files[jsDest + '/ui/tipLibs.js'] = [
                fcCwd + '/bower/tooltipster/dist/js/tooltipster.bundle.min.js'
            ];

            // MODAL
            oCore.files[jsDest + '/ui/modal.js'] = [
                fcCwd + '/bower/lightcase/src/js/lightcase.js',
                fcCwd + '/components/modal/js/_modal.js'
            ];

            // SELECT WITH SEARCH
            oCore.files[jsDest + '/ui/select-search.js'] = [
                fcCwd + '/bower/chosen/chosen.jquery.js',
                fcCwd + '/components/form-select-search/js/_select-search.js'
            ];

            // TAG FIELD
            oCore.files[jsDest + '/ui/tag-field.js'] = [
                fcCwd + '/bower/magicsuggest/magicsuggest.js',
                fcCwd + '/components/form-tag-field/js/_tag-field.js'
            ];

            // WYSIWYG
            oCore.files[jsDest + '/ui/wysiwyg-libs.js'] = [
                fcCwd + '/bower/medium-editor/dist/js/medium-editor.js',
            ];

            // WYSIWYG
            oCore.files[jsDest + '/ui/wysiwyg.js'] = [
                fcCwd + '/components/form-wysiwyg/js/_wysiwyg.js'
            ];

            // CAROUSEL
            oCore.files[jsDest + '/ui/carousel.js'] = [
                fcCwd + '/bower/owl-carousel2/dist/owl.carousel.js',
                fcCwd + '/components/carousel/js/_carousel.js'
            ];

            // TRUNCATE
            oCore.files[jsDest + '/ui/truncate.js'] = [
                fcCwd + '/components/truncate/js/_truncate.js'
            ];

            // SORTABLE
            oCore.files[jsDest + '/ui/sortable.js'] = [
                fcCwd + '/bower/jquery-sortable/source/js/jquery-sortable.js',
                fcCwd + '/components/sortable/js/_sortable.js'
            ];

            // TABLE DYNAMIC
            oCore.files[jsDest + '/ui/table-dynamic.js'] = [
                fcCwd + '/bower/dynatable/jquery.dynatable.js',
                fcCwd + '/components/table-dynamic/js/_table-dynamic.js'
            ];

            // TABLE RESPONSIVE
            oCore.files[jsDest + '/ui/table-responsive.js'] = [
                fcCwd + '/bower/stacktable/stacktable.js',
                fcCwd + '/components/table-responsive/js/_table-responsive.js'
            ];

            // CHART LIB
            oCore.files[jsDest + '/ui/chartLibs.js'] = [
                fcCwd + '/bower/chartjs/Chart.js'
            ];

            // IMAGE RESPONSIVE
            oCore.files[jsDest + '/ui/image-responsive.js'] = [
                fcCwd + '/components/image-responsive/js/_image-responsive.js'
            ];

            // SWIPE
            oCore.files[jsDest + '/ui/swipe.js'] = [
                fcCwd + '/bower/jquery-touchswipe/jquery.touchSwipe.js',
                fcCwd + '/components/swipe/js/_swipe.js'
            ];

            // ANCHOR SCROLL TO
            oCore.files[jsDest + '/ui/anchor-scroll.js'] = [
                fcCwd + '/components/anchor-scroll/js/anchor-scroll.js'
            ];

            // INTERNATIONAL PHONE
            oCore.files[jsDest + '/ui/tel-field-libs.js'] = [
                fcCwd + '/bower/intl-tel-input/build/js/intlTelInput.js',
                fcCwd + '/bower/intl-tel-input/build/js/utils.js',
            ];

            // PASSWORD METER
            oCore.files[jsDest + '/ui/password-meter.js'] = [
                fcCwd + '/bower/strength-meter/js/strength-meter.js',
                fcCwd + '/components/form-password-meter/js/_password-meter.js'
            ];

            // RANGE FIELD
            oCore.files[jsDest + '/ui/range-field-libs.js'] = [
                fcCwd + '/bower/nouislider/distribute/nouislider.js',
            ];

            // INFINITE SCROLL
            oCore.files[jsDest + '/ui/infinite-libs.js'] = [
                fcCwd + '/components/infinite/js/_infinite-scroll.js'
            ];

            // DRAGGABLE
            oCore.files[jsDest + '/ui/draggable.js'] = [
                fcCwd + '/components/draggable/js/_draggable.js'
            ];

            var oRoundTrip = {
                options: {
                    mangle: false,
                    preserveComments: false,
                    beautify: bBeauty
                },
                files: {}
            };

            oRoundTrip.files[jsDest + '/roundtrip.js'] = [
                fcCwd + '/bower/twig.js/twig.js',
                fcCwd + '/components/roundtrip/js/_roundtrip.js'
            ];

            // CREATE CUSTOM PACKAGES
            if (typeof oData.js.pkg === 'object') {

                var customObject = oData.js.pkg,
                    customKeys = Object.keys(customObject);

                for (var key in customKeys) {

                    var customFiles = [];

                    for (var file in customObject[customKeys[key]]) {
                        customFiles.push(appCwd + '/' + customObject[customKeys[key]][file])

                    }

                    oCustom.files[appCwd + '/' + customKeys[key]] = customFiles;

                }
            }

            oConfig = {};

            // DEFAULT FC MODULES
            for (var nKey = 0; nKey < oComponents.length; nKey++) {

                oConfig[oComponents[nKey]] = {
                    files: [{
                        expand: true,
                        cwd: fcCwd + '/components/' + oComponents[nKey] + '/js/',
                        src: ['*.js', '!_*.js', '!*.ng.js'],
                        dest: jsDest + '/ui',
                        preserveComments: false,
                        beautify: bBeauty
                    }]
                };
            }

            // ANGULAR FC MODULES
            for (var nKeyNg = 0; nKeyNg < oComponents.length; nKeyNg++) {
                oConfig[oComponents[nKeyNg] + '-ng'] = {
                    files: [{
                        expand: true,
                        cwd: fcCwd + '/components/' + oComponents[nKeyNg] + '/ng/',
                        src: ['*.ng.js'],
                        dest: jsDest + '/ng',
                        preserveComments: false,
                        beautify: bBeauty
                    }]
                };
            }


            var jsModulesFolder =  grunt.option('appCwd') +'/'+ oData.js.dest +'/';

            if (  oData.js.modulesFolder !== undefined ) {
                jsModulesFolder += oData.js.modulesFolder + '/';
            } else {
                jsModulesFolder += 'modules/';
            }

            // USER MODULES
            var oUserModules = {
                files: [{
                    expand: true,
                    cwd: jsModulesFolder,
                    src: ['*.js'],
                    dest: jsModulesFolder,
                    beautify: bBeauty

                }]
            };


            oConfig.core = oCore;
            oConfig.rountrip = oRoundTrip;
            oConfig.custom = oCustom;
            oConfig.userModules = oUserModules;
        }

        return oConfig;
    }
}