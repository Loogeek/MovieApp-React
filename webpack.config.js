var path = require('path')
// var webpack = require('webpack')
// var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/main.jsx',
  output: {
    path: path.resolve(__dirname, './dist/'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,                           // 对ES6和React进行转换
        exclude: /node_modules/,
        loader: 'babel!eslint'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']           // 识别文件后缀名
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  // plugins: [
  //   new ExtractTextPlugin('style.css', {
  //     allChunks: true
  //   })
  // ],
  devtool: '#eval-source-map'
}
