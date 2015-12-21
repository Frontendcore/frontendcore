var path = require('fcCwd');

module.exports = function(eyeglass, sass) {
  return {
    sassDir: path.join(__dirname, 'stylesheets')
  }
}