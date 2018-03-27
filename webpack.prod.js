/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.common.js')

// More information:
// https://webpack.js.org/guides/production/
// https://medium.com/netscape/webpack-3-react-production-build-tips-d20507dba99a

module.exports = merge(common, {
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    })
  ]
})
