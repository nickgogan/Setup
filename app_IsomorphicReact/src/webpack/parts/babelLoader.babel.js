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
          use: [
            {
              loader: 'cache-loader',
            },
            {
              loader: 'babel-loader', // babel-loader?cacheDirectory - Removed in favor of cache-loader
              options: {
                presets: [
                  // Presets loaded before plugins
                  // Presets loaded last-to-first
                  [
                    'env',
                    {
                      modules: false, // Lets webpack deal with the imports.
                      useBuiltIns: true, // Enables polyfills.
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
                  'flow',
                  'react',
                ],
                // "sourceMaps": true,
                plugins: removeEmpty([
                  // Plugins loaded after presets
                  // Plugins loaded first-to-last
                  'transform-runtime', // Prevents polution of global scope with Promise objects. Should be the first plugin loaded.
                  'transform-imports', // Transforms member-style imports into default-style imports. Used to help with tree shaking if needed.
                  'syntax-dynamic-import', // Enables things like lazy-loading.
                  'transform-flow-strip-types', // Using Flow instead of prop-types
                  ifProduction('transform-react-constant-elements'), // Hoists element creation to top level for subtrees that are fully static, which reduces calls to React.createElement. Only used prod, since it makes warning messages more cryptic.
                  ifProduction('transform-react-inline-elements'), // Replaces React.createElement function with babelHelpers.jsx, which is faster and inlines components when possible. If using rest/spread or ref, it will revert to React.createElement.
                  ifProduction('transform-react-remove-prop-types'), // Remove React propTypes-related functions from the prod build, which should save some bandwidth.
                ]),
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
