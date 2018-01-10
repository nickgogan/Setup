// @ts-check

import express from 'express';
import * as helpers from './server/helpers';
import * as productRoutes from './server/routes/products';

const app = express();

/*
########################################
                        Routes
########################################
*/

app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Root service'
  });
  console.log(
    `~~~~~~~~~~~~~~~~~~~~\n\tAt root\n~~~~~~~~~~~~~~~~~~~~`
  );
});

app.use('/products', productRoutes.router);

/*
########################################
                        Middlewares
########################################
*/

// Log handlers
app.use(helpers.outputLog);
app.use(helpers.errorLog);
app.use(helpers.winstorLoggerWriter);

// HTTP 404 handler
app.use(helpers.resourceMissing);
// app.use((req, res, next) => {
//   const error = new Error('Resource not found');
//   error.status = 404;
//   next(error);
// });

app.use((error, req, res, next) => {
  // Respond to client
  // const err = app.get('env') === 'development' ? error : {};
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
