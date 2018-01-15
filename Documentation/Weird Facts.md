# A Collection of facts I found useful

#### Published on January 1, 2018

1. node-sass automatically skips files beginning with '\_' (i.e. partials) when it compiles.

2. babel-node can be used to work with a file in memory, as opposed to having an output, like with node-sass.

3. Babel + ES6 Modules: ES6 Modules (as in export default router) get wrapped up into an object by module.js, which is what makes the Express use method fail in app.js. 3 options:

   1. use CommonJS, as in module.exports = router.
   2. use ES6 Modules, but export router with an Object wrapper, as in export { router }. Unpack in app.js then.
   3. Use ES6 Modules as export default router, but invoke router.\_default in app.js as the callback to the use() method.
      The project uses ES6 Modules, so 1 is out. 3 doesn't work because default forces us to maintain 'router' as the imported module name in app.js. This causes naming collision when importing the other APIs. So, stick with 2

4. winston-daily-rotate-file: This module seems to require path.join(\_\_dirname + ...) as part of the filename object when instantiating it as a Winston transport. Hypothesis: The configuration object that the module uses to instantiate itself looks for these fields verfy explicitly.
