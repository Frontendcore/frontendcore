'use strict';

var fs = require('fs');

/**
 * Decorate docopt to extract doc from file.
 */
function fdocopt(docopt) {
  docopt = docopt || require('docopt').docopt;

  return function (file, kwargs) {
    return docopt(extract(file), kwargs);
  };
}

/**
 * Extract the first comment from buffer.
 */
function extractBuffer(buffer) {
  return buffer
    .split('/*')[1]
    .split('*/')[0]
    .trim();
}

/**
 * Extract the first comment from file.
 */
function extract(file) {
  return extractBuffer(fs.readFileSync(file, 'utf8'));
}

fdocopt.extractBuffer = extractBuffer;
fdocopt.extract = extract;

module.exports = fdocopt;
