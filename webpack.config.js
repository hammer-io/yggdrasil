/* eslint-disable global-require,import/no-unresolved */
let config = {}
try {
  switch (process.env.ENV) {
    case 'production':
      config = require('./config/production.json')
      break
    case 'test':
      config = require('./config/test.json')
      break
    default:
      config = require('./config/development.json')
      break
  }
} catch (err) {
  console.error('Couldn\'t load standard configuration. Using default (empty) configs. ' +
    'This could cause things to work incorrectly. Please create and specify an appropriate ' +
    'configuration file. (See README.md for more details of configuration requirements)')
  config = require('./config/default.json')
}

module.exports = {
  entry: [
    'babel-polyfill',
    './index.js'
  ],
  externals: {
    config
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
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
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    port: 8080
  }
}
