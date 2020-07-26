// 生产环境
const merge = require('webpack-merge')
const base = require('./webpack.base.js')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { isShowAnalyzer, outputPath, publicPath } = require('../config/pack.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const resolvePath = require('../utils/resolvePath')
// node环境
const prodConfig = merge(base, {
  output: {
    path: outputPath || resolvePath('./dist'),
    publicPath: publicPath || '/'
  },
  mode: 'production',
  stats: 'errors-only',
  plugins: [
    // css压缩
    new OptimizeCssAssetsPlugin({}),
    // css抽离
    new MiniCssExtractPlugin({
      filename: 'css/[name].css?[hash]'
    }),
  ],

  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        elementUI: {
          enforce: true,
          name: true,
          priority: 10,
          test: /[\\/]node_modules[\\/](element-ui)[\\/]/
        },
        vueLib: {
          enforce: true,
          name: true,
          priority: 20,
          test: /[\\/]node_modules[\\/](vue|vue-router|vuex)[\\/]/
        },
        commons: {
          enforce: true,
          name: true,
          test: /[\\/]node_modules[\\/]/
        }
      }
    }
  }
})
if (isShowAnalyzer) {
  prodConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = merge.smartStrategy({
  'module.rules': 'prepend'
})(
  {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader]
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader]
        },
        {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader]
        }
      ]
    }
  },
  prodConfig
)
