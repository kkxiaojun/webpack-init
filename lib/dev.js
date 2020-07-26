const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const service = require('./service')

module.exports = function () {
	let webpackConfig = service.loadUserWebpackConfig()

	const { devServer: i61WebpackDev } = webpackConfig
	webpackDevServer.addDevServerEntrypoints(webpackConfig, i61WebpackDev)
	const compiler = webpack(webpackConfig)
	try {
		new webpackDevServer(compiler, i61WebpackDev).listen(i61WebpackDev.port, i61WebpackDev.host, () => {
		})
	} catch (err) {
		console.log(err)
	}
}
