/* Created by Aquariuslt on 14/04/2017.*/

import merge from 'webpack-merge';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';

import appConfig from './app.config';
import baseConfig from './base.config';
import webpackBaseConfig from './webpack.base.babel';

import pathUtil from './utils/path-util';

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
        test: /\.less$/,
        include: pathUtil.resolve(baseConfig.dir.src),
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        include: pathUtil.resolve(baseConfig.dir.src),
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: baseConfig.dir.dist.css + '/' + '[name].[chunkhash].css',
      chunkFilename: baseConfig.dir.dist.css + '/' + '[name].[chunkhash].css'
    }),
    new HtmlWebpackPlugin({
      title: appConfig['title'],
      template: baseConfig.dir.src + '/index.html',
      favicon: baseConfig.dir.src + '/' + baseConfig.file.favicon,
      google_site_verification: appConfig['features']['google_site_verification'],
      google_analytics: appConfig['features']['google_analytics'],
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
      },
      chunksSortMode: 'dependency'
    }),
    new WebpackPwaManifest({
      filename: 'manifest.json',
      name: appConfig['features']['manifest']['name'],
      short_name: appConfig['features']['manifest']['short_name'],
      description: appConfig['features']['manifest']['description'],
      background_color: appConfig['theme'],
      start_url: '/',
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
    new CopyWebpackPlugin(baseConfig.dir.assets),
    new VueLoaderPlugin(),
    new OfflinePlugin({
      ServiceWorker: {
        minify: true
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
          filename: baseConfig.dir.dist.js + '/' + 'vendors.[chunkhash].js',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          discardComments: {
            removeAll: true
          }
        },
        canPrint: false
      })
    ]
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
