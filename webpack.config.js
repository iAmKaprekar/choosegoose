const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devServer: {
    static: { 
      directory: path.resolve(__dirname, './assets'), 
      publicPath: '/assets'
    },
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000'
      }
    ],
    headers: {'Access-Control-Allow-Origin': '*'},
  },
  entry: path.join(__dirname, 'client/App.jsx'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          },
        },
      },
      {
        test: /.s?[ac]ss$/i,
        // test: /\.s?css/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client/index.html'),
      inject: false
    }),
  ],
  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
  },
};
