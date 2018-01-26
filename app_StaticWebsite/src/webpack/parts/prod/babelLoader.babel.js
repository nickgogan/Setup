// @ts-check
// @flow
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'; //eslint-disable-line
import PrepackPlugin from 'prepack-webpack-plugin'; //eslint-disable-line
import OptimizeJSPlugin from 'optimize-js-plugin'; //eslint-disable-line

// type args = { include: string, exclude: string, use: [{}] };

export default () => {
  const uglifyJS = new UglifyJSPlugin({
    cache: true, // Default dir: node_modules/.cache/uglifyjs-webpack-plugin.
    parallel: true,
    uglifyOptions: {
      ie8: false,
    },
  });
  const precompileJS = new PrepackPlugin({});
  const enhanceJS = new OptimizeJSPlugin();

  return {
    module: {
      rules: [
        {
          test: /\.js($|\?)/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader?cacheDirectory',
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
                  // 'babel-plugin-transform-import', // Transforms member-style imports into default-style imports. Used to help with tree shaking if needed. No member-style imports in the boilerplate, so not enabling it by default.
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
      precompileJS, // Must come before uglifying
      uglifyJS,
      enhanceJS, // Must come after uglifying
    ],
  };
};
