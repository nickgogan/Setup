// @ts-check

import path from 'path';
import webpack from 'webpack';
import WebpackMerge from 'webpack-merge';
import WebpackHtmlPlugin from 'html-webpack-plugin'; // eslint-disable-line
import WebpackExtractTextPlugin from 'extract-text-webpack-plugin'; // eslint-disable-line
import WebpackDashboardPlugin from 'webpack-dashboard/plugin'; // eslint-disable-line import/no-extraneous-dependencies
import DotenvWebpackPlugin from 'dotenv-webpack'; // eslint-disable-line import/no-extraneous-dependencies
import commonConfig from './webpack.common';

/*
########################################
                      Define Plugins
########################################
*/
const dotEnv = new DotenvWebpackPlugin({
  path: 'C:/A.Project0/PersonalTools/A.Setup/app_StaticWebsite/src/env/dev.env',
  safe: false
});
const webpackDashboard = new WebpackDashboardPlugin();
const htmlTemplate = new WebpackHtmlPlugin({
  template: path.resolve(__dirname, '../templates/index.html'),
  inject: 'body'
});

/*
########################################
              Exported Webpack Config
########################################
*/
module.exports = WebpackMerge(commonConfig, {
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  'env',
                  {
                    targets: {
                      browsers: [
                        'Chrome >= 60',
                        'Safari >= 10.1',
                        'iOS >= 10.3',
                        'Firefox >= 54',
                        'Edge >= 15'
                      ]
                    },
                    modules: false,
                    useBuiltIns: true,
                    debug: false
                  }
                ],
                'flow'
              ],
              plugins: [
                'babel-plugin-syntax-dynamic-import',
                'transform-runtime'
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [dotEnv, htmlTemplate, webpackDashboard],
  devServer: {
    contentBase: '../../build',
    port: 3001
  }
});
