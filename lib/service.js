const Config = require('webpack-chain');
const merge = require('webpack-merge')
const fs = require('fs')
const path = require('path')
const tryRequire = require('try-require')
const resolvePath = require('../utils/resolvePath')
const { htmlTemplatePath } = require('../config/pack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = new class Service {

	getEntry(files) {
		const FileTypes = ['.jsx', '.js', '.ts', '.tsx', '.vue']
		let filePath = '', entryName = '', htmlPath = '';
		if (!Array.isArray(files)) {
			files = [files]
		}
		files.forEach(basePath => {
			!filePath && FileTypes.find(type => {
				const testPath = resolvePath(basePath[0] === '/' ? './' : './src', basePath + type)
				fs.existsSync(testPath)
				&& (filePath = testPath)
				&& (entryName = basePath.split('/').splice(-3, 2).join('_'))
			})
		})
		if (!filePath) {
			console.log('can not found the entry file', files)
		} else {
			htmlPath = filePath.replace(path.extname(filePath), '.html')
			htmlPath = fs.existsSync(htmlPath) ? htmlPath : ''
		}
		return [entryName, filePath, htmlPath];
	}

	isDev() {
		return process.env.PROCESS_MODE === 'DEV'
	}

	isInPage() {
		return !!process.env.PROCESS_PAGE
	}

	webpackChain(cb) {
		const config = new Config()
		cb && cb(config)
		return config.toConfig()
	}

	loadUserWebpackConfig() {
		let [entryName, entryFile, htmlPath] = this.getEntry(process.env.PROCESS_PAGE || ['index', 'main'])

		const defaultWebpackConfig = this.webpackChain(config => {
			config.entry(entryName)
				.add(entryFile)
				.end()
				.plugin('html')
				.use(HtmlWebpackPlugin, [{
					template: this.isInPage && htmlPath || htmlTemplatePath,
					minify: true
				}])
		})

		const userWebpackConfig = this.isDev()
			? (tryRequire(resolvePath('config', './webpack.dev.js')) || require('../lib/webpack.local'))
			: (tryRequire(resolvePath('config', './webpack.build.js')) || require('../lib/webpack.build'))

		let webpackConfig = merge(defaultWebpackConfig, userWebpackConfig)
		if (webpackConfig.webpackChain) {
			webpackConfig = merge(webpackConfig, this.webpackChain(config => {
				webpackConfig.webpackChain(config)
			}))
		}
		return webpackConfig
	}
}
