const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
  devTool: 'eval',
  devServer: {
    historyApiFallback: true,
    hot: true,
    stats: {
      colors: true,
    },
  },

  entry: [
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/only-dev-server',
    './src/index',
  ],

  output: {
    path: path.join(__dirname, 'js'),
    publicPath: 'http://localhost:8080/',
    filename: 'app.js',
    pathinfo: true,
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
        loaders: ['react-hot', 'babel'],
      },
      {
        test: /\.less$/,
        include: path.join(__dirname, 'src'),
        loaders: ['style', 'css', 'postcss', 'less'],
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        include: path.join(__dirname, 'src'),
        loader: 'url-loader?limit=5120&name=/img/[name].[ext]',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.dev.html'),
      inject: 'body',
      hash: true,
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'libraries.js',
      minChunks: () => module.resource && module.resource.indexOf(path.resolve(__dirname, 'src')) === -1,
    }),

    new webpack.HotModuleReplacementPlugin(),
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
      routes: path.resolve(__dirname, 'src/routes/'),
    },
  },
}
