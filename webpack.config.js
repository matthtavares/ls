var path = require('path');

module.exports = {
  entry: './assets/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, './assets/js/main.js'),
        loader: 'babel-loader'
      }
    ]
  }
};
