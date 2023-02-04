const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('<h1>Router</h1>');
});

router.get('/products', (req, res) => {
  res.send('<h1>Router/Products</h1>');
});

module.exports = router;
