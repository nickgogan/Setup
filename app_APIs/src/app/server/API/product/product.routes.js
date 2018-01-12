// @ts-check

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
    message: `POST products`
  });
});

// export { router };
module.exports = router;
