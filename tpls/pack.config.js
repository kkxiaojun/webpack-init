module.exports = `const { mergeBase } = require('@i61/common-webpack')
const path = require('path')
module.exports = mergeBase({
\t// 这里可以放一些公共配置
})({
\tLOCAL: {
\t\t// 本地开发配置
\t\thost: 'localhost', // 域名
\t\tport: 8080, // 端口
\t},
\tDEV: {
\t\t// 开发环境打包配置
\t},
\tTEST: {
\t\t// 测试环境打包配置
\t},
\tPRE: {
\t\t// 预发布环境打包配置
\t},
\tPROD: {
\t\t// 生产环境打包配置
\t}
})
`
