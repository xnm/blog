import ExtractTextPlugin from 'extract-text-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';

import pathUtil from '../utils/path-util';

import baseConfig from './base.config';

let webpackBaseConfig = {
  entry: {
    main: pathUtil.resolve('src') + '/main.js'
  },
  resolve: {
    extensions: [
      '.js',
      '.vue'
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': pathUtil.resolve(baseConfig.dir.src)
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          pathUtil.resolve(baseConfig.dir.src),
          pathUtil.resolve(baseConfig.dir.test.unit)
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: [
          pathUtil.resolve(baseConfig.dir.src),
          pathUtil.resolve(baseConfig.dir.test.unit)
        ],
        loader: ExtractTextPlugin.extract({
          use: ['css-loader'],
          fallback: ['style-loader']
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          useRelativePath: true,
          publicPath: './',
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          useRelativePath: true,
          publicPath: './',
          name: '[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin({
      shorthands: true,
      paths: true
    })
  ]
};

export default webpackBaseConfig;
