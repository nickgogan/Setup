// @ts-check
// @flow
import CJSShakePlugin from 'webpack-common-shake'; // eslint-disable-line
// type args = { include: string, exclude: string, use: [{}] };

export default () => {
  const treeshakeCommonJS = new CJSShakePlugin.Plugin();

  return {
    module: {
      rules: [
        {
          test: /.js($|\?)/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'cache-loader',
            },
            {
              loader: 'babel-loader', // babel-loader?cacheDirectory - Removed in favor of cache-loader,
              options: {
                // sourceMaps: 'inline',
                // sourceMaps: true,
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
                  'transform-runtime', // Prevents polution of global scope with Promise objects.
                ],
              },
            },
          ],
        },
      ],
    },
    plugins: [treeshakeCommonJS,],
  };
};
