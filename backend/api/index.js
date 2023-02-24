const express = require('express');
const router = express.Router();

// GET /api/health
router.get('/health', async (req, res, next) => {
      res.send({
            message: 'Server is healthy',
      })
});

// ROUTER: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

// ROUTER: /api/products
const productsRouter = require('./products');
router.use('/activities', productsRouter);

// ROUTER: /api/cart
const cartRouter = require('./cart');
router.use('/routines', cartRouter);



module.exports = router;
