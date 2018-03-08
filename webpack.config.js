const path = require('path');

const config = {
  entry: path.resolve(__dirname, 'demo-src/index.js'),

  externals: {
    ractive: 'Ractive'
  },

  module: {
    rules: [
      { test: /(\.ractive\.html|\.js)$/, loader: 'buble-loader' },
      { test: /\.ractive\.html$/, loader: 'ractive-bin-loader' }
    ]
  },

  output: {
    path: path.resolve(__dirname, 'demo'),
    filename: 'bundle.js'
  },

  resolve: {
    alias: {
      cmp: path.resolve(__dirname, 'src')
    },
    extensions: [ '.js', '.json', '.ractive.html' ]
  }
}

if (process.env.NODE_ENV === 'production') {
  config.plugins = [
    new (require('webpack').optimize.UglifyJsPlugin)()
  ];
}

module.exports = config;
