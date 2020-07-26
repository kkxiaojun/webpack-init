exports.resolvePath = require('./utils/resolvePath')
exports.merge = require('webpack-merge')
exports.mergeBase = function(base) {
	return (obj) => {
		['LOCAL', 'DEV', 'TEST', 'PRE', 'PROD', 'GRAY'].forEach(key => {
			obj[key] = exports.merge(obj[key], base, obj[key])
		})
		return obj
	}
}
exports.getConfig = function(mode) {
	return {
		dev: require('./lib/webpack.local'),
		build: require('./lib/webpack.build')
	}[mode]
}
