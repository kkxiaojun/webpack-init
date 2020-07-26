const program = require('commander')
const checkPostcssConf = require('../utils/checkPostcssConf')

module.exports = function (mode, conf) {
	const PackCliModeHandler = {
		dev: require('./dev'),
		build: require('./build')
	}

	if (!PackCliModeHandler[mode]) {
		program.help()
		return
	}

	checkPostcssConf()

	PackCliModeHandler[mode]()
}
