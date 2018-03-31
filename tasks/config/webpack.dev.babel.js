import webpack from 'webpack';
import merge from 'webpack-merge';
import webpackBaseConfig from './webpack.base.babel';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';

import appConfig from './app.config';
import baseConfig from './base.config';

import pathUtil from '../utils/path-util';
import vueLoaderUtil from '../utils/vue-loader-util';

const PROTOCOL = 'http://';

let webpackDevConfig = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    path: pathUtil.resolve(baseConfig.dir.build),
    publicPath: PROTOCOL + baseConfig.dev.host + ':' + baseConfig.dev.port,
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.js.map',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderUtil.buildVueStylesLoader({
          sourceMap: true,
          extract: false,
          minimize: false
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].bundle.css'
    }),
    new HtmlWebpackPlugin({
      title: appConfig['title'],
      template: baseConfig.dir.src + '/index.html',
      favicon: baseConfig.dir.src + '/' + baseConfig.file.favicon
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin()
  ],
  devServer: {
    host: baseConfig.dev.host,
    port: baseConfig.dev.port,
    historyApiFallback: true,
    quiet: false,
    noInfo: true,
    stats: {
      cached: false,
      assets: false,
      colors: true,
      version: false,
      hash: false,
      children: false,
      timings: true,
      chunks: true,
      chunkModules: false
    },
    publicPath: PROTOCOL + baseConfig.dev.host + ':' + baseConfig.dev.port,
    proxy: {
      '/api': {
        target: PROTOCOL + baseConfig.dev.host + ':' + baseConfig.dev.port + '/' + baseConfig.dir.build
      },
      '/assets/imgs': {
        target: PROTOCOL + baseConfig.dev.host + ':' + baseConfig.dev.port + '/' + baseConfig.dir.src + '/assets/imgs',
        pathRewrite: {'^/assets/imgs': ''}
      }
    }
  }
});

export default webpackDevConfig;
