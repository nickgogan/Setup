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
                    },
                  ],
                  'stage-0',
                  'flow',
                  'react',
                ],
                // "sourceMaps": true,
                plugins: [
                  // Plugins loaded after presets
                  // Plugins loaded first-to-last
                  'transform-runtime', // Prevents polution of global scope with Promise objects.,
                  'transform-imports', // Transforms member-style imports into default-style imports. Used to help with tree shaking if needed.
                  'syntax-dynamic-import', // Enables things like lazy-loading.
                  'transform-flow-strip-types', // Using Flow instead of prop-types
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
