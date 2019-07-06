const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: [
    path.join(__dirname, 'src', 'main'),
  ],
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'assets')
  },
  module: {
    rules: [{
      test: /.js$/,
      exclude: [
        path.resolve(__dirname, 'node_modules'),
      ],
      loader: 'babel-loader',
      query: {
        presets: ['@babel/preset-env']
      }
    }, {
        test: /\.s(a|c)ss$/,
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }]
  },
  resolve: {
    extensions: ['.json', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]-bundle.css",
    }),
  ]
};