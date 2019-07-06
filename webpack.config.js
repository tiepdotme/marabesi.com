const path = require('path')
const glob = require('glob')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const purgePath = `${path.resolve(__dirname)}/_site/**/*`
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

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
    new PurgecssPlugin({
      paths: glob.sync(purgePath, { nodir: true }),
      extractors: [
        {
          extractor: TailwindExtractor,

          extensions: ['html', 'js'],
        },
      ],
    }),
  ]
};