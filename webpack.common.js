const ConfigWebpackPlugin = require('config-webpack')

// These are the webpack configuration details common to both
// dev and production environments. See webpack.dev.js and
// webpack.prod.js for more configuration details.

module.exports = {
  entry: [
    'babel-polyfill',
    './index.js'
  ],
  output: {
    path: `${__dirname}/build`,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    // Defines the CONFIG variable that converts config file usage
    // into string literals
    new ConfigWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env', 'stage-1'],
            plugins: ['transform-decorators-legacy']
          }
        }
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-react-loader'
        }
      }
    ]
  }
}
