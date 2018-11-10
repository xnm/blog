import merge from 'webpack-merge';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';

import webpackBaseConfig from './webpack.base.babel';

import pathUtil from '../utils/path-util';

import packageJson from '../../package.json';

const baseConfig = packageJson.config.base;

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
      template: `./${baseConfig.dir.src}/index.html`,
      favicon: `./${baseConfig.dir.src}/favicon.ico`,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false
      },
      chunksSortMode: 'dependency'
    }),
    new OfflinePlugin({
      ServiceWorker: {
        minify: true
      }
    }),
    new VueLoaderPlugin()
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
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          safe: true,
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
    env: true,
    hash: true,
    timings: true,
    chunks: true,
    chunkModules: false,
    chunksSort: 'field',
    children: false,
    modules: false,
    reasons: false,
    warnings: false,
    assets: false,
    version: true,
    publicPath: true
  }
});

export default webpackProdConfig;
