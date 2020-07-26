const webpack = require('webpack')
const fs = require('fs')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const ENVConf = require('../config/env.config.js')
const { publicPath, sassVariateFile } = require('../config/pack.config')
const resolvePath = require('../utils/resolvePath')

const FileTypes = ['.jsx', '.js', '.ts', '.tsx', '.vue']
const baseConfig = {
  context: process.cwd(),
  output: {
    filename: '[name].[hash:10].js', // 输出文件名
    chunkFilename: '[id].[hash:10].js' // 公共代码
  },
  resolve: {
    extensions: FileTypes, // 扩展名
    alias: {
      '@': resolvePath('src'),
      vue$: 'vue/dist/vue.esm.js'
    },
    modules: [resolvePath('node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'thread-loader',
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                whitespace: 'condense'
              },
              hotReload: true // 热重载
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        use: ['thread-loader', 'babel-loader'],
        exclude: /node_modules/,
        include: [resolvePath('src')]
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: ['\\.vue$']
            }
          }
        ]
      },
      { test: /\.css$/, use: ['css-loader', 'postcss-loader'] },
      {
        test: /\.scss$/,
        use: [
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              config: {
                path: resolvePath('./')
              },
              includePaths: [resolvePath('./src')]
            }
          },
          {
            loader: 'sass-resources-loader',
            options: { resources: sassVariateFile }
          }
        ]
      },
      { test: /\.less$/, use: ['css-loader', 'postcss-loader', 'less-loader'] },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        exclude: resolvePath('src/images/svg'),
        include: resolvePath('src'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 20,
              name: 'assets/[name]-[hash:5].[ext]',
              publicPath
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolvePath('src/images/svg')],
        options: {
          symbolID: 'icon-[name]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(ENVConf)
    }),
    new VueLoaderPlugin()
  ]
}

if (fs.existsSync(resolvePath('src/static'))) {
  baseConfig.plugins.push(
      new CopyWebpackPlugin(
          [
            { from: resolvePath('src/static'), to: resolvePath('dist/static') }
          ]
      )
  )
}

module.exports = baseConfig
