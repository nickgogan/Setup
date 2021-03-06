# A Collection of facts I found useful

#### Published on January 1, 2018

1. **node-sass** automatically skips files beginning with '\_' (i.e. partials) when it compiles.

2. **babel-node** can be used to work with a file in memory, as opposed to having an output, like with node-sass.

3. **Babel + ES6 Modules:** ES6 Modules (as in export default router) get wrapped up into an object by module.js, which is what makes the Express use method fail in app.js. 3 options:

   1. use CommonJS, as in module.exports = router.
   2. use ES6 Modules, but export router with an Object wrapper, as in export { router }. Unpack in app.js then.
   3. Use ES6 Modules as export default router, but invoke router.\_default in app.js as the callback to the use() method.
      The project uses ES6 Modules, so 1 is out. 3 doesn't work because default forces us to maintain 'router' as the imported module name in app.js. This causes naming collision when importing the other APIs. So, stick with 2

4. **winston-daily-rotate-file:** This module seems to require path.join(\_\_dirname + ...) as part of the filename object when instantiating it as a Winston transport. Hypothesis: The configuration object that the module uses to instantiate itself looks for these fields verfy explicitly.

5. **ES6 in webpack config files:**
a. `webpack.config.js`:
```
require('babel-register');
module.exports = require('./webpack.config.babel');
```
b. A barebones `.babelrc` in that same directory:
```
{
  "presets": ["env"]
}
```
Webpack seems to require, so just add it.
c. `webpack.config.dev.babel.js`:
```
...
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
```
This is the actual config file and can now be written in ES6+.
Note: `babel-register` is required to work with filename-loaders as seen in `webpack.config.babel.js`. Just like in the webpack configs, these filename loaders can be chained right-to-left.
**Sources**:
1. https://stackoverflow.com/questions/43164716/error-in-using-import-in-webpack-config-babel-js
2. https://stackoverflow.com/questions/31903692/how-can-i-use-es6-in-webpack-config-js

6. `Module not found: Error: Can't resolve 'fs' in ...` error: Add the following to `webpack.common.js`
```
  node: {
    fs: 'empty'
  },
```
**Sources**:
1. https://stackoverflow.com/questions/39249237/node-cannot-find-module-fs-when-using-webpack/39249719#39249719
2. https://github.com/josephsavona/valuable/issues/9
3. https://github.com/webpack-contrib/css-loader/issues/447

6. **postcss-cssnext** (Jan 21st, 2018): The @apply rule and custom property sets are confirmed to not be included in the next major release of postcss-cssnext. This is because these feature will most likely not get support from browser vendors, since the specs for these are considered deprecate. Alternative solutions are being discussed. In the meantime, use PreCSS to fill in this gap and turn off these feature in the postcss config.
- **Date:** 1/20/2018
**Sources**:
1. https://github.com/pascalduez/postcss-apply

7. **postcss-cssnext/initial value plugin**: It seems that `display:initial;`  is not cleaned up after compilation.
- **Date:** 1/21/2018

8. **postcss-cssnext/cssnano**: Couldn't get this to work as part of CSSNext, but was able to make it happen by using it separately from it.
- **Date:** 1/22/2018

9. **extract-text-webpack-plugin**: Could not get this to work with file-loader and/or url-loader. The latter didn't output anything. Using these loaders in the dev postcss webpack config worked fine.
- **Date:** 2/05/2018

10. **postcss-url**: Tried adding this to the PostCSS pipeline to get around the prod webpack config issues in point 9. After much config wrangling, it finally somewhat worked - had to use another plugin called **post-url-mapper** in order to fix the outputted url() values in the final css. However, the browser didn't render the image files and it also doubled them in file size - unacceptable.
- **Date:** 2/06/2018

11. **html-webpack-plugin**: Not able to alter config object settings once set.
- **Date**: 2/07/2018

12. **Babel 7:** Do not upgrade to Babel 7 - it's still too finicky. Also, make sure to `import 'babel-polyfill'` in `main.js`. Otherwise, the polyfill won't be available. Also, server ES6, not ES5, with `babel-preset-env` supporting the last 2 versions of browsers, safari > 8, and not ie < 11.
- **Date:** 2/08/2018

14. **webpack.LoaderOptionsPlugin**: Set it with options `minimize` and `debug` to eliminate debug code and to minize older webpack plugins. It resulted in non-trivial decreased in compiled priject size (as per **Webpack Monitor**).
- **Date:** 2/08/2018

