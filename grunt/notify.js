module.exports = function(grunt) {
	return {
		css: {
			options: {
				title: 'SCSS compiled',  // optional
				message: 'All scss compiled with no errors.' //required
			}
		},
		js: {
			options: {
				title: 'JS compiled',  // optional
				message: 'All js hinted and copied with no errors.' //required
			}
		},
		html: {
			options: {
				title: 'Docs compiled',  // optional
				message: 'All TPLS generated.', //required
			}
		},
		icons: {
			options: {
				title: 'Icons created',  // optional
				message: 'All svg include into the css webfont.', //required
			}
		},
		all: {
			options: {
				title: 'Frontendcore Finish!',  // optional
				message: 'Congratulations you have a new build!' //required
			}
		},
		notify_hooks: {
			options: {
				message: 'ok',
				enabled: true,
				max_jshint_notifications: 5, // maximum number of notifications from jshint output
				title: "Many Faced God", // defaults to the name in package.json, or will use project directory's name
				success: false, // whether successful grunt executions should be notified automatically
				duration: 3 // the duration of notification in seconds, for `notify-send only
			}
		}
	}

}