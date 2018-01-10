// @flow

import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'GET products'
  });
});

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'POST products'
  });
});

export default router;
