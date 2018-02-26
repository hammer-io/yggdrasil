module.exports = {
  entry: [
    'babel-polyfill',
    './index.js'
  ],
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
