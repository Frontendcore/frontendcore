module.exports = function( grunt ) {

    require(fcCwd + "/grunt/_data.js")(grunt);

	return  {
        install: {
            options: {
                copy: true,
                targetDir: './lib',
                layout: 'byType',
                install: true,
                verbose: true,
                prune: false,
                cleanTargetDir: true,
                cleanBowerDir: true,
                bowerOptions: {}
            }
        }
	}
}