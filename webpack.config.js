const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/index.js'],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
  },
    devServer: {
      static: {
        directory: __dirname + '/dist',
    },
      compress: true,
      port: 9000,
  },
  plugins: [
    new HTMLPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ],
  resolve: {
    extensions: ['.js']
  }
};