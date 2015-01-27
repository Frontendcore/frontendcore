'use strict';

var eachItem = require('./eachItem');

module.exports = function (data){
  var flat = [];
  eachItem(data, function (item){
    flat.push(item);
  });
  return flat;
};
