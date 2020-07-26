const resolvePath = require('../utils/resolvePath')
const tryRequire = require('try-require')

const localConfig = tryRequire(resolvePath('config', './local.pack.config.js')) || {}
const userConfig = tryRequire(resolvePath('config', './pack.config.js')) || {}

const curEnvKey = (process.env.PROCESS_ENV || 'LOCAL').toLocaleUpperCase()
const BaseConf = {
  outputPath: resolvePath('./dist'),
  publicPath: '/',
  htmlTemplatePath: resolvePath('src/index.html'),
  isShowAnalyzer: false,
  sassVariateFile: []
}

const WebpackConf = {
  LOCAL: {
    devtool: 'source-map',
    host: 'localhost', // 域名
    port: 8080, // 端口
    hot: true, // 是否热跟新
    proxy: {
      // 代理
    }
  },
  DEV: {
  },
  TEST: {
  },
  PRE: {
  },
  PROD: {
  },
  GRAY: {
  }
}
console.log('pack.config环境：', curEnvKey)
// 返回整合后的配置对象
module.exports = Object.assign(
    {},
    BaseConf,
    WebpackConf[curEnvKey],
    localConfig[curEnvKey],
    userConfig[curEnvKey]
)
