/* eslint-disable global-require,import/no-unresolved */
let config = {}
switch (process.env.ENV) {
  case 'production':
    config = JSON.stringify(require('./config/production.json'))
    break
  case 'test':
    config = JSON.stringify(require('./config/test.json'))
    break
  default:
    try {
      config = JSON.stringify(require('./config/development.json'))
    } catch (err) {
      console.error('Couldn\'t load development configuration. Using default (empty) configs. ' +
        'This could cause things to work incorrectly. Please create and specify an appropriate ' +
        'configuration file.')
      config = JSON.stringify(require('./config/default.json'))
    }
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
            presets: ['react', 'es2015', 'stage-1'],
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
};
