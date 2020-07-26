const path = require('path')
const root = process.cwd()

module.exports = (...otherPaths) => path.resolve(root, ...otherPaths)
