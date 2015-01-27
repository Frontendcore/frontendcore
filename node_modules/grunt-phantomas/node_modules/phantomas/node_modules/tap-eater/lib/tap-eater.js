/**
 * tap-eater internals
 *
 * @see https://github.com/isaacs/node-tap/blob/master/lib/tap-consumer.js
 **/
module.exports = function() {
	// imports
	var colors = require('ansicolors'),
		extend = require('util')._extend,
		Stream = require('stream').Stream,
		TapConsumer = require('tap').Consumer;
		yaml = require('yamlish');

	var stdout = process.stdout;

	// settings
	var isVerbose = false;

	function onData(data) {
		var color = 'white',
			line = '',
			extra;

		//console.log(JSON.stringify(data, null, 2));

		if (typeof data === 'string')  {
			line = '# ' + data;
			color = 'brightBlue';
		}
		else if (data.ok) {
			line = '✓ ' + data.name.trim();
			color = 'green';
		}
		else {
			line = '✗ ' + data.name.trim();
			color = 'red';

			// failure details
			// YAML encoded details from TAP stream
			var failure = {
				name: data.name
			};

			var info = extend({}, data);
			delete info.id;
			delete info.ok;
			delete info.name;

			if (Object.keys(info).length > 0) {
				failure.info = info;
				extra = yaml.encode(info).replace(/^\n/, '');
			}

			this.report.failures.push(failure);
		}

		if (data.skip) {
			color = 'brightBlack';
		}

		// add entries to the report
		this.report.text += line + "\n" + (extra ? extra + "\n\n" : '');

		// don't emit anything when not in --verbose mode
		if (!isVerbose) return;

		// apply the color when run in TTY context
		if (stdout.isTTY) {
			line = colors[color](line);
		}

		stdout.write(line + "\n");
		if (extra) {
			stdout.write(extra + "\n\n");
		}
	}

	function onEnd(data) {
		var results = this.consumer.results,
			err;

		//console.log(JSON.stringify(results, null, 2));

		this.report.pass = results.pass;
		this.report.skip = results.skip;
		this.report.fail = results.fail;
		this.report.total = results.testsTotal;

		if (!results.ok) {
			err = this.report.fail;
		}
		else {
			err = 0;
		}

		if (typeof this.callback === 'function') {
			this.callback(err, this.report);
		}
	}

	// consumes TAP data from given stream
	function eat(stream, callback) {
		if (!stream instanceof Stream) {
			throw 'eat() accepts Stream only!';
		}

		this.callback = callback;
		this.consumer = new TapConsumer();
		this.report = {
			pass: false,
			skip: false,
			fail: false,
			total: false,
			failures: [],
			text: ''
		};

		// setup events
		this.consumer.on('data', onData.bind(this));
		this.consumer.on('end', onEnd.bind(this));

		// consume the stream
		stream.setEncoding('utf8');
		stream.pipe(this.consumer);
		// yum-yum!
	}

	// public API
	return {
		eat: eat,
		setVerbose: function(val) {
			isVerbose = !!val;
		}
	};
};
