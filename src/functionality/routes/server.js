const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(9229, () =>
  console.log('Example app listening on port 9229!')
);
