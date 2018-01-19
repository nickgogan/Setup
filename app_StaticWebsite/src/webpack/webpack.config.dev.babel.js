// @ts-check

import path from 'path';
import webpack from 'webpack';
import WebpackMerge from 'webpack-merge';
import WebpackHtmlPlugin from 'html-webpack-plugin'; // eslint-disable-line
import WebpackHtmlHarddiskPlugin from 'html-webpack-harddisk-plugin';
import WebpackExtractTextPlugin from 'extract-text-webpack-plugin'; // eslint-disable-line
import DotenvWebpackPlugin from 'dotenv-webpack'; // eslint-disable-line import/no-extraneous-dependencies
import dotEnv from 'dotenv-safe'; // eslint-disable-line import/no-extraneous-dependencies
import common from './webpack.common';

/*
########################################
                    Define Constants
########################################
*/
const env = dotEnv.load({
  path: path.resolve(__dirname, './../env/dev.env'),
  sample: path.resolve(__dirname, './../env/dev.example.env')
}).parsed;
const ENV = Object.assign({}, common.PATHS, env);

/*
########################################
                      Define Plugins
########################################
*/
const dotEnvWebpack = new DotenvWebpackPlugin({
  path: path.join(__dirname, '../env/dev.env'),
  safe: false
});
const htmlToHdd = new WebpackHtmlHarddiskPlugin({
  outputPath: path.resolve(__dirname, '../../dist')
});
const htmlIndex = new WebpackHtmlPlugin({
  template: path.resolve(__dirname, '../templates/index.html'),
  title: 'test',
  desc: 'desc',
  inject: 'body',
  alwaysWriteToDisk: true
});
const HMR = new webpack.HotModuleReplacementPlugin();

/*
########################################
                        PROD
########################################
*/
const extractText = new WebpackExtractTextPlugin({
  allChunks: true, // Needed to work with CommonsChunkPlugin to extract the CSS from those extracted chunks.
  filename: './dist/styles/[name].css'
});

/*
########################################
              Exported Webpack Config
########################################
*/
module.exports = WebpackMerge(common.config, {
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
      },
      {
        // TODO: Figure out source maps
        // DEV
        test: /\.css$/,
        // include,
        // exclude,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            },
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('precss'),
                require('postcss-cssnext')({ browsers: 'ie >= 11' })
              ]
            }
          }
        ]
        // TEST: Combine HMR with extracting CSS to file
        // use:
        // ['css-hot-loader'].concat(
        // PROD
        // extractText.extract({
        //   fallback: 'style-loader',
        //   use: [
        //     {
        //       loader: 'css-loader',
        //       options: {
        //         importLoaders: 2
        //       }
        //     },
        //     {
        //       loader: 'postcss-loader',
        //       options: {
        //         plugins: () => [
        //           require('precss'),
        //           require('postcss-cssnext')()
        //         ]
        //       }
        //     }
        //   ]
        // })
        // )
      }
    ]
  },
  plugins: [dotEnvWebpack, htmlIndex, htmlToHdd, extractText, HMR],
  devServer: {
    contentBase:
      'C:/A.Project0/PersonalTools/A.Setup/app_StaticWebsite/src/assets/',
    host: ENV.HOST,
    port: ENV.PORT
  }
});
