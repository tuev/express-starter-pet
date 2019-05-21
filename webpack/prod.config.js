const merge = require('webpack-merge')
const baseConfig = require('./base.config')
const webpack = require('webpack')
const StartServerPlugin = require('start-server-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = merge(baseConfig, {
  watch: true,
  devtool: 'sourcemap',
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  plugins: [
    new StartServerPlugin('server.js'),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(),
    new Dotenv({
      path: './.env.production'
    }),
    new webpack.DefinePlugin({
      'process.env': { BUILD_TARGET: JSON.stringify('server') }
    }),
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: './index.html',
      excludeChunks: ['server']
    }),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ],
  mode: 'production'
})
