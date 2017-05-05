/* Created by Aquariuslt on 14/04/2017.*/

import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import webpackBaseConfig from './webpack.base.config.babel';
import prodConfig from './prod.config';
import vueLoaderUtil from '../util/vue-loader-util';


let webpackProdConfig = merge(webpackBaseConfig, {
  entry: {
    'sw-register': './tasks/template/service-worker-registration.js'
  },
  devtool: 'source-map',
  output: {
    path: prodConfig.output.path,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js',
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderUtil.buildVueStylesLoader({
          sourceMap: true,
          extract: true,
          minimize: true
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new CopyWebpackPlugin(prodConfig.dir.assets),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        safe: true,
        discardComments: {
          removeAll: true
        }
      },
      canPrint: false
    }),
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css'
    }),
    new HtmlWebpackPlugin({
      template: `./${prodConfig.dir.src}/index.html`,
      favicon: `./${prodConfig.dir.src}/${prodConfig.file.favicon}`,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
      },
      chunksSortMode: 'dependency'
    })

  ],
  stats: {
    colors: true,
    hash: true,
    timings: true,
    chunks: true,
    chunkModules: false,
    chunksSort: 'name',
    children: false,
    modules: false,
    reasons: false,
    warnings: true,
    assets: false,
    version: false
  }
});

export default webpackProdConfig;
