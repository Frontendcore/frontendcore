module.exports = function (grunt) {
  'use strict';

  grunt.registerMultiTask('version', 'Synchronize version of JSON setting files with Grunt task.', function() {

    var options = this.options({
      base: 'package.json',
      space: 2
    });

    if (!grunt.file.isFile(options.base)) {
      grunt.log.error(options.base + ' is not found.');
      return false;
    }

    var baseJSON = grunt.file.readJSON(options.base);
    if (baseJSON.version === undefined) {
      grunt.log.error('"version" of base file is undefined.');
      return false;
    }

    this.filesSrc.filter(function(file) {
      if (grunt.file.isFile(file)) {
        return true;
      } else {
        grunt.log.warn(file + ' is not found.');
        return false;
      }
    }).forEach(function(file) {
      syncVersion(file, baseJSON.version, options.space);
    });
  });

  function syncVersion(file, version, space) {
    var json = grunt.file.readJSON(file);
    json.version = version;
    var string = JSON.stringify(json, null, new Array(space + 1).join(' '));
    grunt.file.write(file, string);
  }
};
