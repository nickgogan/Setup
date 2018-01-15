// @ts-check

import express from 'express';
import morgan from 'morgan';
import * as dotEnv from 'dotenv-safe';

const helpers = require('./server/helpers/helpers');
const loggers = require('./server/helpers/loggers');

console.log(helpers.environment.PORT);
const app = express();

/*
########################################
                        Loggers


Pass HTTP events through loggersd first
########################################
*/
app.use(morgan('dev', { stream: loggers.console.stream }));
app.use(morgan('dev', { stream: loggers.info.stream }));
app.use(morgan('dev', { stream: loggers.warning.stream }));
app.use(morgan('dev', { stream: loggers.error.stream }));

/*
########################################
                        Routes
########################################
*/
const productRoutes = require('./server/API/product/product.routes');
const orderRoutes = require('./server/API/order/order.routes');

app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Root service'
  });
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
/*
########################################
                        Middlewares
########################################
*/

// HTTP 404 handler
app.use(helpers.resourceMissing);
// app.use((req, res, next) => {
//   const error = new Error('Resource not found');
//   error.status = 404;
//   next(error);
// });

app.use((error, req, res, next) => {
  // Respond to client
  const err = helpers.env.NODE_ENV === 'dev' ? error : {};
  const status = err.status || 500;

  res.status(status).json({
    error: {
      message: err.message
    }
  });
  // Respond to myself
  console.log(error);
});

export default app;
