import * as merge from 'webpack-merge';
import * as BundleAnalyzerPlugin from 'webpack-bundle-analyzer/lib/BundleAnalyzerPlugin';

import webpackProdConfig from './webpack.prod';

const webpackAnalyzeConfig = merge(webpackProdConfig, {
  plugins: [new BundleAnalyzerPlugin()]
});

export default webpackAnalyzeConfig;
