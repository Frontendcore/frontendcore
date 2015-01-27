fdocopt
=======

> File decorator for [docopt] option parser.

[docopt]: https://github.com/docopt/docopt.coffee

Overview
--------

It's not easy to work with docopt in pure JavaScript since, unlike
Python and CoffeeScript, there's no simple way to define a multiline
string to contain the usage string.

This package provides a decorator for docopt to solve this problem.

```js
#!/usr/bin/env node

'use strict';

/*
Usage: hello [options] <world>

Arguments:
  <world>  Hello world!

Options:
  -h, --help  Show this help.
  --version   Show version.
  --happy     Be happy.
*/

var docopt = require('fdocopt')();
```

By default it will decorate the global docopt instance, so the above is
the same as:

```js
var docopt = require('fdocopt')(require('docopt').docopt);
```

Then, pass the documented filename instead of the usage string:

```js
var args = docopt(__filename);
```

You can also use the internal functions to extract the comment block
from a file or a code buffer:

```js
var doc = require('fdocopt').extract(__filename);
var doc = require('fdocopt').extractBuffer('/** Usage: hello */');
```
