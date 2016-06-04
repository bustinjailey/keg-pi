module.exports = {
  context: __dirname + '/app',
  entry: {
    javascript: './app.js',
    html: './index.html'
  },
  output: {
    filename: 'app.js',
    path: __dirname + '/dist'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader']
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: 'style!css!less'
      },
      {
        test: /\.(jpeg|jpg|png|gif|svg)$/i,
        exclude: /node_modules/,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.ico$/,
        exclude: /node_modules/,
        loaders: [
          'file?name=[name].[ext]&context=./images'
        ]
      }
    ]
  },
  devtool: 'source-map'
};
