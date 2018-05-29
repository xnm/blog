import ExtractTextPlugin from 'extract-text-webpack-plugin';

import webpack from 'webpack';
import merge from 'webpack-merge';

import webpackBaseConfig from './webpack.base.babel';

let webpackTestConfig = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
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
