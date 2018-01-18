// @ts-check
// @flow

import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin'; // eslint-disable-line import/no-extraneous-dependencies
import pkg from '../../package.json';
import fs from 'fs';

/*
########################################
                        Constants
########################################
*/
const SRC_PATH = './src/';
const SRC_FULL_PATH = path.resolve(__dirname, '../../src');
const PUBLIC_PATH = '../../dist/assets/';
const PUBLIC_FULL_PATH = path.resolve(__dirname, PUBLIC_PATH);

console.log(`~~~~~~~~~~~~~~~~~~~~\n\t${PUBLIC_FULL_PATH}\n~~~~~~~~~~~~~~~~~~~~
`);

/*
########################################
              Exported Webpack Config
########################################
*/
module.exports = {
  // context:

  // target: node

  entry: {
    main: path.join(SRC_FULL_PATH, 'js/main.js'),
    hmr: [
      'webpack/hot/dev-server',
      `webpack-dev-server/client?http://localhost:3001`
    ]
  },

  // Prevents weird fs errors. See 'Weird Findings' #6
  externals: {
    fs: 'commonjs fs'
  },

  // node: {
  //   fs: 'empty'
  //   // fs: 'commonjs fs'
  // },

  output: {
    path: PUBLIC_FULL_PATH,
    filename: `[name].js`,
    chunkFilename: `[name].v${pkg.version}.js`
    // publicPath: PUBLIC_PATH
  },

  // Allow absolute paths in imports.
  resolve: {
    modules: ['node_modules', SRC_FULL_PATH],
    extensions: ['.js']
  },

  plugins: [
    // cleaning up the build directory prior to update
    new CleanWebpackPlugin([PUBLIC_PATH])
  ]
};
