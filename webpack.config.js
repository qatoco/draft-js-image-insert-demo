const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './index.js',
  devtool: 'inline-source-map',
  output: { filename: 'bundle.js', publicPath: '' },
  module: {
    rules: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.js$/,
        use: [{ loader: 'babel-loader', options: { presets: ['es2015', 'react', 'stage-0'] } }],
        exclude: /node_modules/
      }
    ]
  },
  devServer: { historyApiFallback: true },
  plugins: [new HtmlWebpackPlugin({ title: 'Example', template: './index.html' })]
};
