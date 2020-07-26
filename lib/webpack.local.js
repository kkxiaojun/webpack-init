// 本地开发
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.js')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { publicPath, port, host, proxy, outputPath, open, openPage, hot = true } = require('../config/pack.config')
const LocalConf = merge(base, {
  output: {
    path: outputPath // 出口路径
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    overlay: {
      errors: true,
      warnings: true
    },
    open,
    openPage,
    publicPath,
    port,
    host,
    proxy,
    hot,
	noInfo: true,
    inline: true,
    compress: true,
    progress: true,
	headers: {
    	'Access-Control-Allow-Origin': '*',
	},
    historyApiFallback: true, // 该选项的作用所有的404都连接到index.html
    // 代理到后端的服务地址，会拦截所有以api开头的请求地址
    watchOptions: {
      // 不监听的文件或文件夹，支持正则匹配
      ignored: /node_modules/,
      // 监听到变化后等300ms再去执行动作
      aggregateTimeout: 300,
      // 默认每秒询问1000次
      poll: 1000
    },
    stats: 'errors-only',
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
	    compilationSuccessInfo: {
		    messages: [`请访问: http://${host}:${port}`]
	    },
    }),
    new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
    new webpack.HotModuleReplacementPlugin() // Hot Module Replacement 的插件
  ]
})

module.exports = merge.smartStrategy({
  'module.rules': 'prepend'
})(
  {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['vue-style-loader']
        },
        {
          test: /\.scss$/,
          use: ['vue-style-loader']
        },
        {
          test: /\.less$/,
          use: ['vue-style-loader']
        }
      ]
    }
  },
  LocalConf
)
