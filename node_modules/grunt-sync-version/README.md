# grunt-sync-version

## About

Synchronize version of JSON setting files with Grunt task.

## Usage

```js
module.exports = function (grunt) {

  grunt.initConfig({
    version: {
      options: {
        base: 'base.json'
      },
      files: ['package.json']
    }
  });

  // load grunt-sync-version
  grunt.loadNpmTasks('grunt-sync-version');

  // register task
  grunt.registerTask('default', 'version');
};
```
### files

Type `String` or `Array`

Specify targets to apply version.

### Options

#### base

Type: `String`

Base json file. **This is optional.**  
If `base` is omitted, `package.json` will be loaded.

#### space

Type: `Number`

## License

MIT.
