// @flow

import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'GET products'
  });
});

router.get('/:productID', (req, res, next) => {
  const id = req.params.productID;

  if (id === 'special') {
    res.status(200).json({
      message: 'GET such a special product ID!'
    });
  } else {
    res.status(200).json({
      message: `GET product ${id}`
    });
  }
});

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'POST products'
  });
});

/* Note: ES6 Modules (as in export default router) gets wrapped up into a module by module.js, which is what makes the Express use method fail in app.js. 3 options:
1. use CommonJS, as in module.exports = router.
2. use ES6 Modules, but export router with an Object wrapper, as in export { router }. Unpack in app.js then.
3. Use ES6 Modules as export default router, but invoke router._default in app.js as the callback to the use() method.
The project uses ES6 Modules, so 1 is out. 3 doesn't work because default forces us to maintain 'router' as the imported module name in app.js. This causes naming collision when importing the other APIs. So, stick with 2.
*/
export { router };
// module.exports = router;
