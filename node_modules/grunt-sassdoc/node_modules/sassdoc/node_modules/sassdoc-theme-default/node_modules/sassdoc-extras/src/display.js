'use strict';

var eachItem = require('./eachItem');

/**
 * Compute a `display` property in regards of `display.access`
 * configuration.
 */
module.exports = function (ctx) {
  var shouldBeDisplayed = function (item) {
    var displayAccess = ctx.view.display.access;
    var displayItemAccess = displayAccess ? (displayAccess.indexOf(item.access[0]) !== -1) : false;
    var isAlias = item.alias;
    var displayAlias = ctx.view.display.alias;

    return displayItemAccess && !(isAlias && !displayAlias);
  };

  ctx.data.count = 0;

  eachItem(ctx.data, function (item) {
    item.display = shouldBeDisplayed(item);

    if (item.display) {
      ctx.data.count++;
    }
  });
};
