/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    port: 8080
  }
})
