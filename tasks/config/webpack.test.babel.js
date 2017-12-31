import ExtractTextPlugin from 'extract-text-webpack-plugin';

import webpack from 'webpack';
import merge from 'webpack-merge';

import webpackBaseConfig from './webpack.base.babel';

import pathUtil from '../utils/path-util';
import vueLoaderUtil from '../utils/vue-loader-util';

let webpackTestConfig = merge(webpackBaseConfig, {
  devtool: 'eval-source-map',
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
      },
      {
        enforce: 'post',
        test: /\.js$/,
        include: [
          pathUtil.resolve('src'),
          pathUtil.resolve('test/unit')
        ],
        exclude: [
          pathUtil.resolve('node_modules')
        ],
        loader: 'istanbul-instrumenter-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"testing"'
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].bundle.css'
    })
  ]
});

delete webpackTestConfig.entry;
export default webpackTestConfig;
