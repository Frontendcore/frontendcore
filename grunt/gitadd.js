module.exports =  {
	options: {
		verbose: true,
		all: true,
		force: true
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