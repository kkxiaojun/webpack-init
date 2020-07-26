const program = require("commander");
const path = require('path')
const fs = require('fs')
const resolvePath = require('../utils/resolvePath')

const configPath = resolvePath('config')
const copyFile = function (destFileName, content) {
	const destPath = path.join(configPath, destFileName)
	fs.writeFileSync(destPath, content)
	console.log('create file: ', destPath)
}

const CliTypes = {
	webpack: true,
	config: true,
}

module.exports = function(type) {
	type = type.toLocaleLowerCase()

	if (!CliTypes[type]) {
		program.help()
		return
	}

	if(!fs.existsSync(configPath)){
		fs.mkdirSync(configPath)
	}

	if (type === CliTypes.webpack) {
		copyFile('webpack.dev.js', require('../tpls/webpack.dev.js'))
		copyFile('webpack.build.js', require('../tpls/webpack.build.js'))
	} else if (type === CliTypes.config) {
		copyFile('env.config.js', require('../tpls/env.config.js'))
		copyFile('pack.config.js', require('../tpls/pack.config.js'))
	}
}
