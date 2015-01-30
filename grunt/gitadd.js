module.exports =  {
	options: {
		verbose: true,
		all: true,
		force: false
	},
	scss: {
		options: {
			cwd: "./../scss/"
		},
		files: {
			src: ["./"]
		}
	},
	js: {
		options: {
			cwd: "./../js/"
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