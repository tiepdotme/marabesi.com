const path = require('path')
const glob = require('glob')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const purgePath = `${path.resolve(__dirname)}/**/{*.html, *.css}`
const NODE_ENV = process.env.NODE_ENV

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || []
  }
}

const plugins = [
  new MiniCssExtractPlugin({
    filename: "[name]-bundle.css",
  }),
];

if (NODE_ENV !== 'development') {
  plugins.push(
    new PurgecssPlugin({
      whitelist: ['bibliography'],
      paths: glob.sync(purgePath, { nodir: true, ignore: '{node_modules,vendor}/**' }),
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ['html', 'js'],
        },
      ],
    }),
  )
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
  plugins,
}