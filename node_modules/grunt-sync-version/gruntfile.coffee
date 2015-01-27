module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    version:
      options:
        base: 'package.json'
      files: ['sample.json']

  grunt.loadTasks 'tasks'

  grunt.registerTask 'default', 'version'
