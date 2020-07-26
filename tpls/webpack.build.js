module.exports = `const { getConfig, merge } = require('@i61/common-webpack')

// 可以通过webpackMerge对其进行合并
module.exports = merge(getConfig('build'))
`
