const webpack = require('webpack')
const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index',
  },

  output: {
    path: './build/',
    filename: '/js/app.js',
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: [
          path.resolve(__dirname, 'src'),
        ],
      },
    ],
    loaders: [
      {
        test: /\.js?$/,
        include: path.join(__dirname, 'src'),
        loaders: ['babel'],
      },
      {
        test: /\.less$/,
        include: path.join(__dirname, 'src'),
        loader: ExtractTextPlugin.extract('css!postcss!less'),
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        include: path.join(__dirname, 'src'),
        loader: 'url-loader?limit=5120&name=/img/[name].[ext]',
      },
    ],
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({ sourceMap: false }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.test.html'),
      inject: 'body',
      hash: true,
    }),

    new ExtractTextPlugin('/css/app.css'),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '/js/libraries.js',
      minChunks: () => module.resource && module.resource.indexOf(path.resolve(__dirname, 'src')) === -1,
    }),

    new CleanWebpackPlugin(['build'], {
      root: path.resolve(__dirname),
      verbose: true,
      dry: false,
    }),
  ],

  postcss: () => [autoprefixer],

  resolve: {
    root: [
      path.resolve('node_modules'),
      path.resolve('src'),
    ],
    alias: {
      less: path.resolve(__dirname, 'src/less/'),
      components: path.resolve(__dirname, 'src/components/'),
      actions: path.resolve(__dirname, 'src/actions/'),
      constants: path.resolve(__dirname, 'src/constants/'),
      reducers: path.resolve(__dirname, 'src/reducers/'),
      modules: path.resolve(__dirname, 'src/modules/'),
    },
  },
}
