const webpack = require('webpack')
const service = require('./service')

module.exports = function () {
	let webpackConfig = service.loadUserWebpackConfig()
	try {
		webpack(webpackConfig, (err, stats) => {
			if (err) throw err
			process.stdout.write(
				stats.toString({
					colors: true,
					modules: false,
					chunks: false,
					chunkModules: false
				}) + '\n\n'
			)
			if (stats.hasErrors()) {
				console.log('构建时候出现错误')
				process.exit(1)
			}
			console.log('构建完成')
		})
	} catch (err) {
		console.log(err)
	}
}
