#!/usr/bin/env node
/**
 * Consumes TAP file and sends an email in case of failed tests
 **/
var VERSION = require('../package').version,
	Email = require('email').Email,
	commander = require('commander'),
	tapEater = require('../lib/tap-eater');

// parse CLI options
// @see http://visionmedia.github.io/commander.js
commander
	.version(VERSION)
	.option('-t, --email-to [value]', 'Email address to which failed test report will be sent')
	.option('-f, --email-from [value]', 'Email address from which failed test report will be sent')
	.option('-s, --email-subject [value]', 'The subject of an email')
	.option('-v, --verbose', 'Log each test entry and details')
	.parse(process.argv);

var eater = new tapEater();
eater.setVerbose(commander.verbose);

// run
eater.eat(process.stdin, function(failedAsserts, report) {
	//console.log(JSON.stringify(report, null, 2));

	if (failedAsserts) {
		// send an email
		var msg = new Email({
			from: commander.emailFrom || 'tap-eater@foo.net',
			to: commander.emailTo,
			subject: commander.emailSubject || 'tap-eater report',
			body: report.text
		});

		msg.send(function(err) {
			if (err) {
				console.error(err);
				process.exit(255);
			}
			else {
				process.exit(failedAsserts);
			}
		});
	}
	else {
		process.exit(0);
	}
});
