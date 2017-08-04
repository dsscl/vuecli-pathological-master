var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

// var rootUrl = 'http://localhost:8080/'

// if (process.env.server === 'dev') {
//   rootUrl = config.dev.env.RootUrl
// } else if (process.env.server === 'prod') {
//   rootUrl = config.build.env.RootUrl
// } else if (process.env.server === 'pre') {
//   rootUrl = config.build.pre.RootUrl
// } else {
//   rootUrl = config.test.env.RootUrl
// }

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        // test: /\.(js|vue)$/,
        // loader: 'eslint-loader',
        // enforce: 'pre',
        // include: [resolve('src'), resolve('test')],
        // options: {
        //   formatter: require('eslint-friendly-formatter')
        // }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
