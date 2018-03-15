import path from 'path';
import CJSShakePlugin from 'webpack-common-shake'; // eslint-disable-line
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'; //eslint-disable-line
import PrepackJSPlugin from 'prepack-webpack-plugin'; //eslint-disable-line
import OptimizeJSPlugin from 'optimize-js-plugin'; //eslint-disable-line
import { getIfUtils, removeEmpty } from 'webpack-config-utils'; //eslint-disable-line

const uglifyJS = new UglifyJSPlugin({
  cache: true, // Default dir: node_modules/.cache/uglifyjs-webpack-plugin.
  parallel: true,
  uglifyOptions: {
    ie8: false,
  },
});
const precompileJS = new PrepackJSPlugin();
const enhanceJS = new OptimizeJSPlugin();
const treeshakeCommonJS = new CJSShakePlugin.Plugin();

export default env => {
  const { ifProduction, } = getIfUtils(env);

  return {
    module: {
      rules: [
        {
          test: /\.jsx?($|\?)/i,
          exclude: /node_modules/,
          include: path.resolve(__dirname, '../../../src'),
          use: [
            'cache-loader',
            {
              loader: 'babel-loader',
              options: {
                babelrc: false, // Use only the babel settings in this file for babel-loader. .babelrc is still used for the non-webpack parts of the app, such as dealing with the top-level webpack config files.
                presets: [
                  // Presets loaded before plugins
                  // Presets loaded last-to-first
                  'flow',
                  'react',
                  [
                    'env',
                    {
                      modules: false, // Allows webpack deal with the imports.
                      useBuiltIns: true, // Enables polyfills via babel-polyfill
                      debug: false,
                      targets: {
                        browsers: [
                          'last 2 Chrome versions',
                          'last 2 Firefox versions',
                          'last 2 Safari versions',
                          'last 2 Edge versions',
                          'last 2 ChromeAndroid versions',
                          'last 2 iOS versions',
                          'not < 0.5%',
                        ],
                      },
                    },
                  ],
                ],
                plugins: removeEmpty([
                  // Plugins loaded after presets
                  // Plugins loaded first-to-last
                  'transform-runtime', // Prevents polution of global scope with Promise objects. Should be the first plugin loaded.
                  'react-hot-loader/babel',
                  'transform-regenerator',
                  'transform-object-rest-spread',
                  'transform-class-properties',
                  'transform-imports', // Transforms member-style imports into default-style imports. Used to help with tree shaking if needed.
                  'transform-react-router-optimize', // React Router exposes all methods on the top-level import, but allows devs to use imports referencing files inside /lib, which can result in smaller bundle sizes. This plugin automates this.
                  'syntax-dynamic-import', // Enables things like lazy-loading.
                  'transform-flow-strip-types', // Using Flow instead of prop-types
                  ifProduction('transform-react-constant-elements'), // Hoists element creation to top level for subtrees that are fully static, which reduces calls to React.createElement. Only used prod, since it makes warning messages more cryptic.
                  ifProduction('transform-react-remove-prop-types'), // Remove React propTypes-related functions from the prod build, which should save some bandwidth.
                  ifProduction('transform-react-inline-elements'), // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-inline-elements
                ]),
                ignore: [
                  '.cache-loader',
                  '*.ts',
                  './dist/*',
                  './build/*',
                  './docs',
                  './Documentation',
                ],
              },
            },
          ],
        },
      ],
    },
    plugins: removeEmpty([
      treeshakeCommonJS,
      ifProduction(precompileJS), // Must come before uglifying
      ifProduction(uglifyJS),
      ifProduction(enhanceJS), // Must come after uglifying
    ]),
  };
};
