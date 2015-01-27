'use strict';

var marked = require('marked');

module.exports = function (ctx) {

  if (ctx.package && ctx.package.description) {
    ctx.package.htmlDescription = marked(ctx.package.description);
  }

  /**
   * Wrapper for `marked` that takes only one argument to avoid
   * problem with `map` additional arguments.
   */
  function md(str) {
    return marked(str);
  }

  /**
   * Return a function that will apply `fn` on `obj[key]` to generate
   * `obj[newKey]`.
   */
  function applyKey(fn, key, newKey) {
    return function (obj) {
      if (key in obj) {
        obj[newKey] = fn(obj[key]);
      }

      return obj;
    };
  }

  for (var type in ctx.data) {
    for (var name in ctx.data[type]) {
      var item = ctx.data[type][name];

      if ('description' in item) {
        item.htmlDescription = marked(item.description);
      }

      if ('author' in item) {
        item.htmlAuthor = item.author.map(md);
      }

      if ('throws' in item) {
        item.htmlThrows = item.throws.map(md);
      }

      if ('todo' in item) {
        item.htmlTodo = item.todo.map(md);
      }

      if ('returns' in item) {
        item.htmlReturns = item.returns.map(
          applyKey(md, 'description', 'htmlDescription')
        );
      }

      if ('example' in item) {
        item.example = item.example.map(
          applyKey(md, 'description', 'htmlDescription')
        );
      }

      if ('parameters' in item) {
        item.parameters = item.parameters.map(
          applyKey(md, 'description', 'htmlDescription')
        );
      }

      if ('prop' in item) {
        item.prop = item.prop.map(
          applyKey(md, 'description', 'htmlDescription')
        );
      }

      if ('content' in item) {
        item.content = item.content.map(
          applyKey(md, 'description', 'htmlDescription')
        );
      }
    }
  }
};
