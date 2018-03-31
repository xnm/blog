/* Created by Aquariuslt on 14/04/2017.*/

import merge from 'webpack-merge';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import OfflinePlugin from 'offline-plugin';

import appConfig from './app.config';
import baseConfig from './base.config';
import webpackBaseConfig from './webpack.base.babel';

import pathUtil from '../utils/path-util';
import vueLoaderUtil from '../utils/vue-loader-util';

let webpackProdConfig = merge(webpackBaseConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: pathUtil.resolve(baseConfig.dir.dist.root),
    filename: baseConfig.dir.dist.js + '/' + '[name].[chunkhash].js',
    chunkFilename: baseConfig.dir.dist.js + '/' + '[id].[chunkhash].js',
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
      filename: baseConfig.dir.dist.css + '/' + '[name].[chunkhash].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: appConfig['title'],
      template: baseConfig.dir.src + '/index.html',
      favicon: baseConfig.dir.src + '/' + baseConfig.file.favicon,
      google_site_verification: appConfig['features']['google_site_verification'],
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
      },
      chunksSortMode: 'dependency'
    }),
    new WebpackPwaManifest({
      filename: baseConfig.dir.dist.manifest + '/' + 'manifest.json',
      name: appConfig['features']['manifest']['name'],
      short_name: appConfig['features']['manifest']['short_name'],
      description: appConfig['features']['manifest']['description'],
      background_color: appConfig['theme'],
      start_url: '.',
      theme_color: appConfig['theme'],
      icons: [
        {
          src: pathUtil.resolve(baseConfig.dir.src + '/' + baseConfig.file.favicon),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: baseConfig.dir.dist.img,
          type: 'image/png',
          density: 0.75
        }
      ]
    }),
    new OfflinePlugin({
      ServiceWorker: {
        minify: false
      }
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          filename: baseConfig.dir.dist.js + '/' + 'vendor.[chunkhash].js',
          chunks: 'all'
        }
      }
    }
  },
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
