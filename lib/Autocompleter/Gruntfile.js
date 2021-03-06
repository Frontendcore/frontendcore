module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: '/*\n' +
					' * <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
					' * <%= pkg.description %>\n' +
					' * <%= pkg.homepage %>\n' +
					' *\n' +
					' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; <%= pkg.license %> Licensed\n' +
					' */\n\n'
		},
		// JS Hint
		jshint: {
			options: {
				globals: {
					'jQuery': true,
					'$'     : true
				},
				browser:   true,
				curly:     true,
				eqeqeq:    true,
				forin:     true,
				freeze:    true,
				immed:	   true,
				latedef:   true,
				newcap:    true,
				noarg:     true,
				nonew:     true,
				smarttabs: true,
				sub:       true,
				undef:     true,
				validthis: true
			},
			files: ['src/<%= pkg.codename %>.js']
		},
		// Concat
		concat: {
			js: {
				options: {
					banner: '<%= meta.banner %>'
				},
				files: {
					'<%= pkg.codename %>.js': [ 'src/<%= pkg.codename %>.js' ]
				}
			},
			css: {
				options: {
					banner: '<%= meta.banner %>'
				},
				files: {
					'<%= pkg.codename %>.css': [ 'src/<%= pkg.codename %>.css' ]
				}
			}
		},
		// Uglify
		uglify: {
			options: {
				banner: '<%= meta.banner %>',
				report: 'min'
			},
			target: {
				files: {
					'<%= pkg.codename %>.min.js': [ '<%= pkg.codename %>.js' ]
				}
			}
		},
		//Bower sync
		sync: {
			all: {
				options: {
					sync: [ 'name', 'version', 'description', 'author', 'license', 'homepage' ],
					overrides: {
						main: [
							'<%= pkg.codename %>.js',
							'<%= pkg.codename %>.css'
						],
						ignore: [ "*.jquery.json", "Gruntfile.js", "src/" ]
					}
				}
			}
		}
	});

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-jquerymanifest');
	grunt.loadNpmTasks('grunt-npm2bower-sync');

	// Default task.
	grunt.registerTask('default', [ 'jshint', 'concat', 'uglify', 'sync' ]);
};
