/*global module:false*/
module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		compass: {
            dist: {
				options: {
                    require: 'susy',
					config: 'config.rb'
				}
			}
		},
        sassdoc: {
            dist: {
                src: 'css/core/',
                dest: 'build/sassdoc/',
                options: {
                    verbose: false,
                    display: {
                        access: ['public'],
                        alias: false,
                        watermark: true
                    },
                    package: './package.json'
                }
            }

        },

		cssmin: {
			combine: {
				files: {
					'build/static/css/ui/modal.css': [
						'bower_components/jquery-colorbox/example5/colorbox.css'
					],
					'build/static/css/ui/code.css': [
                        'js/libs/highlightjs/styles/github.css'
					],
					'build/static/css/ui/autocomplete.css': [
						'bower_components/Autocompleter/jquery.autocompleter.css'
					],
					'build/static/css/ui/tags.css': [
						'js/libs/jquery-autosuggest/autoSuggest.css'
					],
					'build/static/css/ui/stats.css': [
						'js/libs/jquery-visualize/css/visualize.css',
						'js/libs/jquery-visualize/css/visualize-light.css'
					],
					'build/static/css/ui/sidemenu.css': [
						'bower_components/sidr/dist/stylesheets/jquery.sidr.dark.css'
					],
					'build/static/css/ui/wysiwyg.css': [
						'bower_components/tinymce/skins/lightgray/skin.min.css'
					],
					'build/static/css/ui/tip.css': [
						'bower_components/opentip/css/opentip.css'
					]
				}
			}
		},
		uglify: {
			options: {
				beautify: false
			},
			core: {
				files: {
					'build/static/js/ui.js': [
						'js/base/_responsive-images.js',
						'js/ui/code.js',
						'js/ui/sortable.js',
						'js/ui/tags.js',
						'js/ui/truncate.js',
						'js/ui/tabs.js',
						'js/ui/autocomplete.js',
						'js/ui/autosize.js',
						'js/ui/modals.js',
						'js/ui/wysiwyg.js',
						'js/ui/graphs.js',
						'js/ui/stats.js',
						'js/ui/polyfills.js',
						'js/ui/toggle.js',
						'js/ui/tip.js',
						'js/ui/carousel.js',
						'js/ui/sidemenu.js',
						'js/ui/cart.js',
						'js/ui/parallax.js',
						'js/ui/table.js',
						'js/ui/notification.js',
						'js/ui/dropdown.js'
					],
					'build/static/js/core.js': [
						'bower_components/tinycorejs/build/TinyCore.js',
						'bower_components/tinycorejs/build/tools/mediator/TinyCore.Toolbox.Mediator.min.js',
						'bower_components/tinycorejs/build/extensions/AMD/require-2.1.4.min.js',
						'bower_components/tinycorejs/build/extensions/AMD/TinyCore.AMD+domBoot.min.js',
						'js/base/_device-detection.js',
						'js/base/_modules-config.js',
						'js/base/_dom-ready.js',
						'js/base/_query-selector.js',
						'js/base/_tools.js',
						'build/static/js/ui.js',
						'js/base/_init.js'
					],
					'build/static/js/devices/desktop.js': [
						'bower_components/jquery/dist/jquery.js',
						'js/libs/modernizr/modernizr-custom.js',
						'bower_components/jquery-unveil/jquery.unveil.js'
					],
					'build/static/js/devices/mobile.js': [
						'bower_components/zepto/zepto.js',
						'js/libs/modernizr/modernizr-custom.js',
						'bower_components/jquery-unveil/jquery.unveil.js'
					],
					'build/static/js/ui/stats.js': [
						'js/libs/jquery-visualize/js/excanvas.js',
						'js/libs/jquery-visualize/js/visualize.jQuery.js'
					],
					'build/static/js/ui/modal.js': [
						'bower_components/jquery-colorbox/jquery.colorbox.js'
					],
					'build/static/js/ui/tags.js': [
						'js/libs/jquery-autosuggest/jquery.autoSuggest.js'
					],
					'build/static/js/ui/wysiwyg.js': [
						'bower_components/pen/src/pen.js',
						'bower_components/pen/src/markdown.js'
					],
					'build/static/js/ui/parallax.js': [
						'js/libs/skrollr/skrollr.js'
					],
					'build/static/js/ui/autocomplete.js': [
						'bower_components/Autocompleter/jquery.autocompleter.js'
					],
					'build/static/js/ui/sortable.js': [
						'js/libs/jquery-serialize/jquery.serializetree.js',
						'bower_components/jquery.sortable/index.js'
					],
					'build/static/js/ui/serialize.js': [
						'js/libs/jquery-serialize/jquery.serializetree.js',
						'js/ui/serialize.js'
					],
					'build/static/js/ui/code.js': [
                        'js/libs/highlightjs/highlight.pack.js'
					],
					'build/static/js/ui/truncate.js': [
						'bower_components/jquery.truncator.js/jquery.truncator.js'
					],
					'build/static/js/ui/polyfills.js': [
						'js/libs/modernizr/modernizr-custom.js',
						'js/libs/webshims/polyfiller.js'
					],
					'build/static/js/ui/sidemenu.js': [
						'bower_components/sidr/dist/jquery.sidr.js'
					],
					'build/static/js/ui/autosize.js': [
						'bower_components/jquery-autosize/jquery.autosize.js'
					],
					'build/static/js/ui/tip.js': [
						'bower_components/opentip/downloads/opentip-jquery.js'
					],
					'build/static/js/ui/cart.js': [
						'bower_components/simplecart-js/simpleCart.js'
					],
                    'build/static/js/ui/carousel.js': [
                        'js/libs/owl-carousel/owl.carousel.js'
                    ],
					'build/static/js/ui/table.js': [
						'bower_components/dynatable/jquery.dynatable.js'
					],
					'build/static/js/ie-old.js': [
						'js/libs/ie-polyfills/queryselector.js',
						'js/libs/ie-polyfills/html5shiv.js',
						'js/libs/ie-polyfills/ecmascript5.js'
					],
					'build/static/js/_oGlobalSettings.js': [
						'js/base/_oGlobalSettings.js'
					]
				}
			},
			tests: {
				files: [{
					expand: true,
					src: 'tests/**/*.js',
					dest: 'build/tests',
					cwd: './'
				}]
			}
		},
		jshint: {
			options: {
				globals: {
					console: true
				}
			},
			dist: ['Gruntfile.js', 'js/core/**/*.js', 'js/ui/**/*.js']

		},
		jasmine: {
			main:{
				src: [
                    'build/static/js/ui/*.js'
                ],
				options: {
					specs: 'tests/*.js',
                    vendor :  [
                        'js/base/_oGlobalSettings.js',
                        'build/static/js/core.js',
                        'build/static/js/devices/desktop.js',
                        'build/static/js/ui/*.js'
                    ],
                    outfile: 'build/data/tests.html',
                    keepRunner: true
				}
			}
		},
        changelog: {
            options: {
                dest: 'changelog.md'
            }
        },
        clean: {
            sassdoc: {
                src: ['build/sassdoc']
            },
            changelog: {
                src: ['changelog.md']
            }
        },
		twigRender: {
			dist: {
				files: [
					{
						data: 'database.json',
						expand: true,
						cwd: 'twig/',
						src: ['**/*.html.twig', '!**/_*.html.twig'],
						dest: 'build/',
						ext: '.html'
					}
				]
			}
		},
		watch: {
			scripts: {
				files: ['js/core/**/*.js', 'js/ui/**/*.js', 'js/libs/**/*.js', 'Gruntfile.js'],
				tasks: ['js']
			},
			tests: {
				files: ['tests/**/*.js'],
				tasks: ['tests']
			},
			scss: {
				files: ['css/**/*.scss'],
				tasks: ['scss']
			},
			twig: {
				files: ['twig/**/*.twig','database.json','twig/**/*.html'],
				tasks: ['twig']
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sassdoc');
    grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-twig-render');
    grunt.loadNpmTasks('grunt-conventional-changelog');
    grunt.registerTask('js', ['uglify:core', 'jshint','jasmine']);
	grunt.registerTask('tests', ['uglify:tests','jasmine']);
	//grunt.registerTask('scss', ['compass', 'cssmin','clean:sassdoc','sassdoc']);
	grunt.registerTask('twig', ['twigRender']);
	grunt.registerTask('scss', ['compass', 'cssmin','twig']);
	grunt.registerTask('log', ['clean:changelog','changelog','stencil']);

	grunt.registerTask('default', ['twig','scss', 'js']);

	grunt.event.on('watch', function (action, filepath) {
		grunt.config(['default'], filepath);
	});
};