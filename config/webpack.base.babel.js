import pathUtil from './utils/path-util';
import baseConfig from './base.config';

let webpackBaseConfig = {
  entry: {
    main: pathUtil.resolve(baseConfig.dir.src) + '/' + 'main.js'
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
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        include: [
          pathUtil.resolve(baseConfig.dir.src),
          pathUtil.resolve(baseConfig.dir.test.unit),
          pathUtil.resolve(baseConfig.dir.test.e2e)
        ],
        loader: 'babel-loader'
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
        test: /\.(woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          useRelativePath: true,
          publicPath: '/' + baseConfig.dir.dist.fonts,
          limit: 1000
        }
      },
      {
        test: /\.properties$/,
        include: pathUtil.resolve(baseConfig.dir.src),
        loader: 'properties-json-loader'
      }
    ]
  }
};

export default webpackBaseConfig;
