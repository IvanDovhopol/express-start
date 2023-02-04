const express = require('express');
const app = express();
const fs = require('fs/promises');
const moment = require('moment');
require('colors');

app.use(express.json());

const contactsRouter = require('./routes/api/contacts');
const productsRouter = require('./routes/api/products');

//TODO: router
app.use('/router', contactsRouter);
app.use('/router', productsRouter);

//TODO: response text-blog
app
  .route('/blog')
  .get((_, res) => {
    res.send('<h2>Get a list of blog</h2>');
  })
  .post((_, res) => {
    res.send('Add text for blog');
  })
  .put(() => {
    res.send('Update text');
  });

//TODO: add log in the file server.log
app.use(async (req, res, next) => {
  const { method, url } = req;
  const date = moment().format('DD-MM-YYYY_hh:mm:ss');
  await fs.appendFile('server.log', `\n${method} ${url} ${date}`);
  res.send('<h2>Server</h2>');
  next();
});

//TODO start server
app.listen(3000, () => {
  console.log('server running'.green, 'http://localhost:3000'.blue);
});
