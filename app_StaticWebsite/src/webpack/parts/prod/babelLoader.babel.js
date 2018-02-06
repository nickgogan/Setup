import CJSShakePlugin from 'webpack-common-shake'; // eslint-disable-line
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'; //eslint-disable-line
import PrepackJSPlugin from 'prepack-webpack-plugin'; //eslint-disable-line
import OptimizeJSPlugin from 'optimize-js-plugin'; //eslint-disable-line

export default () => {
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

  return {
    module: {
      rules: [
        {
          test: /\.js($|\?)/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'cache-loader',
            },
            {
              loader: 'babel-loader', // babel-loader?cacheDirectory - Removed in favor of cache-loader
              options: {
                presets: [
                  [
                    'env',
                    {
                      modules: false, // Lets webpack deal with the imports.
                      useBuiltIns: true, // Enables polyfills.
                      debug: false,
                    },
                  ],
                  'flow',
                ],
                plugins: [
                  'babel-plugin-transform-imports', // Transforms member-style imports into default-style imports. Used to help with tree shaking if needed.
                  'babel-plugin-syntax-dynamic-import', // Enables things like lazy-loading.
                  'transform-runtime', // Prevents polution of global scope with Promise objects.,
                ],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      treeshakeCommonJS,
      precompileJS, // Must come before uglifying
      uglifyJS,
      enhanceJS, // Must come after uglifying
    ],
  };
};
