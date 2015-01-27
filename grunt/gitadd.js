module.exports =  {
	options: {
		verbose: true,
		all: true,
		force: false
	},
	scss: {
		options: {
			cwd: "css/core/"
		},
		files: {
			src: ["./"]
		}
	},
	js: {
		options: {
			cwd: "build/static/js/"
		},
		files: {
			src: ["./"]
		}
	},
	workspace: {
		options: {
			cwd: "./"
		},
		files: {
			src: ["./"]
		}

	}
};