const fs = require('fs')
const path = require('path')
module.exports = function () {
	const resolve = (...arg) => path.resolve(process.cwd(), ...arg);
	let isExist = false;
	[
		'.postcssrc',
		'.postcssrc.js',
		'postcss.config.js',
		'.postcssrc.yaml',
		'.postcssrc.json'
	].forEach(item => {
		fs.existsSync(resolve(process.cwd(), item)) && (isExist = true)
	})
	if (!isExist) {
		console.log('找不到postcss配置文件，请检查')
		process.exit(0)
	}
}
