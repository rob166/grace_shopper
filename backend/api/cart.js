const express = require('express');
const router = express.Router();
const {
  getAllItemsInCart,
  createNewCart,
  checkout,
  userCheckOut,
  getAllPreviousUserCarts
} = require('../db');

// GET
router.get('/user/:userId', async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const previousOrders = await getAllPreviousUserCarts(userId);
    res.send(previousOrders);
  } catch (error) {
    console.error(error);
  }
});


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

router.patch('/:cartId', async (req, res, next) => {
  try {
    const cartId = req.params.cartId
    const { quantity, total } = req.body

    console.log(quantity, parseInt(total), parseInt(cartId))
    const finishedCart = await checkout(parseInt(quantity), total, parseInt(cartId))
    console.log(finishedCart)
    res.send(finishedCart)
  } catch (error) {
    console.error(error)
  }
})

router.post('/:cartId', async (req, res, next) => {
  try {
    const cartId = req.params.cartId
    const { userId } = req.body

    const checkedOutCart = await userCheckOut(parseInt(cartId), parseInt(userId))
    console.log("this be checked out", checkedOutCart)
    res.send(checkedOutCart)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router;
