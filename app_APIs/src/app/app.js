// @ts-check

import express from 'express';
import morgan from 'morgan';
import * as dotEnv from 'dotenv-safe';
import * as helpers from './server/helpers/helpers';
import logger from './server/helpers/loggers';

const env = dotEnv.load({
  path: 'src/app/env/.env',
  sample: 'src/app/env/.env.example',
  allowEmptyValues: true
});

const app = express();

// Pass all events through the loggers first
app.use(morgan('dev', { stream: logger.stream }));

/*
########################################
                        Routes
########################################
*/
const productRoutes = require('./server/routes/products');
const ordersRoutes = require('./server/routes/orders');

app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Root service'
  });
});

app.use('/products', productRoutes);

/*
########################################
                        Middlewares
########################################
*/

// Log handlers
// app.use(helpers.outputLog);
// app.use(helpers.errorLog);
// app.use(helpers.winstorLoggerWriter);

// HTTP 404 handler
// app.use(helpers.resourceMissing);
// app.use((req, res, next) => {
//   const error = new Error('Resource not found');
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   // Respond to client
//   // const err = app.get('env') === 'development' ? error : {};
//   const err = helpers.env.NODE_ENV === 'dev' ? error : {};
//   const status = err.status || 500;

//   res.status(status).json({
//     error: {
//       message: err.message
//     }
//   });
//   // Respond to myself
//   console.log(error);
// });

export default app;
