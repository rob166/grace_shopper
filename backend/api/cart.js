const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { getAllItemsInCart, createCartItem } = require("../db");

// GET

router.get('/:cartId', async (req, res, next) => {
    const { cartId } = req.params;

    try {
        const cart = await getAllItemsInCart(cartId);
        res.send(cart);
    } catch ({name, message}) {
        next({name, message})
    }
})

// POST

router.post('/:cartId', async (req, res, next) => {
    const { cartId } = req.params;
    const { userId, quantity, total, purchased } = req.body;

    try {
        const addCartItem = await createCartItem({
            cartId,
            userId,
            quantity,
            total,
            purchased,
        });
        res.send(addCartItem);
    } catch ({name, message}) {
        next({name, message})
    }
});


module.exports = router;