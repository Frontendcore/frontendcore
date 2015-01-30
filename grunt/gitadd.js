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
	site: {
		options: {
			cwd: "./../site/build/"
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