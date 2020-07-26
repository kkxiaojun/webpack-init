const tryRequire = require('try-require')
const resolvePath = require('../utils/resolvePath')
const localConfig = tryRequire(resolvePath('config', './local.env.config.js')) || {}
const userConfig = tryRequire(resolvePath('config', './env.config.js')) || {}

const curEnvKey = (process.env.PROCESS_ENV_CONF || process.env.PROCESS_ENV || 'LOCAL').toLocaleUpperCase()
// 环境变量的默认配置放这里
const BaseConf = {
  BASE_API: '/'
}
// 需要不同环境做区分的放这里
const ProcessEnvConf = {
  LOCAL: {
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
console.log('env.config环境：', curEnvKey)
// 返回整合后的配置对象
module.exports = Object.assign(
    {},
    BaseConf,
    ProcessEnvConf[curEnvKey],
    localConfig[curEnvKey],
    userConfig[curEnvKey]
)
