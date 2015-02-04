module.exports =  {
	generator: {
		src: ['../generator/app/templates/css/_config/*'],
		overwrite: true,
		replacements: [{
			from: '-default',
			to: '-custom'
		}]
	}
};