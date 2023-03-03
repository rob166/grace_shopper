const express = require('express');
const router = express.Router();
const {
  getAllItemsInCart,
  createCartItem,
  getCartBySessionId,
  createNewCart,
} = require('../db');

// GET

router.get('/:cartId', async (req, res, next) => {
  const { cartId } = req.params;

  try {
    const cart = await getAllItemsInCart(cartId);
    res.send(cart);
  } catch (error) {
    console.error(error);
  }
});

// router.get('/cart/:sessionId', async(req,res,next)=>{
//     try{
//         const sessId = req.params.sessionId
//         const cart =  await getCartBySessionId(sessId)

//         res.send(cart)
//     }catch(error){
//         console.error(error)
//     }
// })

// POST

router.post('/', async (req, res, next) => {
  try {
    const sessId = req.body;
    //console.log('session id', sessId.session);
    const newCart = await createNewCart(sessId.session);
    //console.log(newCart);
    res.send(newCart);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
