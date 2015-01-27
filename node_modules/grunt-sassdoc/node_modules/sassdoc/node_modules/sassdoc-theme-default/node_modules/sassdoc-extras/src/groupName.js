'use strict';

var eachItem = require('./eachItem');

/**
 * Compute a `groupName` object from `group` array with slug as key and
 * title as value.
 *
 * Also compute a `groups` property in `ctx`.
 */
module.exports = function (ctx) {
  ctx.groups = {};

  var groups = ctx.view.groups || {};

  // Lowercase the slugs
  Object.keys(groups).forEach(function (slug) {
    ctx.groups[slug.toLowerCase()] = groups[slug];
  });

  eachItem(ctx.data, function (item) {
    var group = {};

    item.group.forEach(function (groups) {
      groups.forEach(function (slug) {
        slug = slug.toLowerCase();

        if (slug in ctx.groups) {
          group[slug] = ctx.groups[slug];
        } else {
          group[slug] = ctx.groups[slug] = slug;
        }
      });
    });

    item.groupName = group;
  });
};
