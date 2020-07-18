const path=require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 4444,
    contentBase: './dist',
    watchContentBase: true,
    open: true
  },
  entry: {
    app: ['./src/js/html5App.js','./src/js/offline.js']
  },
  output: {
    filename: 'js/app.js',
    path: path.resolve('./dist')
 },
 module: {
   rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
        ],
      },
    ],
  },

    plugins: [
      new OptimizeCssAssetsPlugin(),
      new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: 'css/app.css'
        }),
        new CopyPlugin([
          // { from: 'src/fonts', to: 'fonts/' },
          { from: 'src/offlineApp.manifest', to: 'offlineApp.manifest' },
          { from: 'src/index.html', to: 'index.html' },
          { from: 'src/no-network.html', to: 'no-network.html' },
          { from: 'src/new_location.html', to: 'new_location.html' },
          { from: 'src/login.html', to: 'login.html' },
          { from: 'src/bootstrap', to :'bootstrap/'},
          { from: 'src/images', to :'images/'}
        ])
    ]
};
