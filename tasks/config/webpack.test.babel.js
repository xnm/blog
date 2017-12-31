import ExtractTextPlugin from 'extract-text-webpack-plugin';

import webpack from 'webpack';
import merge from 'webpack-merge';

import webpackBaseConfig from './webpack.base.babel';
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
