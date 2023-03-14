const express = require('express');
const { getAllProducts, getProductById, addProductToCart, removeProductsFromCart, deleteProduct } = require('../db');
const router = express.Router();

router.use((req, res, next) => {
  console.log('sending something from products');
  next();
});

router.get('/', async (req, res, next) => {
  try {
    const products = await getAllProducts();
    if (products) {
      res.send(products);
    } else {
      res.send({ name: 'no products', message: 'there are no products' });
    }
  } catch (error) {
    console.error(error);
  }
});

router.get('/:prodId', async (req, res, next) => {
  try {
    const prod = req.params.prodId;
    // console.log(prod)
    const singleProduct = await getProductById(prod);
    // console.log(singleProduct);
    if (singleProduct) {
      res.send(singleProduct);
    } else {
      res.send({ name: 'no product', message: 'there is no product' });
    }
  } catch (error) {
    console.error(error);
  }
});
router.patch('/',async(req,res,next)=>{
  try{
    const removed = await removeProductsFromCart()
    if(removed){
    res.send({
      name:'success',
      message:"products removed"
    
    })
  }
  }catch(error){
    console.error(error)
  }
})

router.patch('/:prodId', async (req, res, next) => {
  try {
    const pId = parseInt(req.params.prodId);
    const { cart, quantity } = req.body;
    // console.log(pId, cart, quantity);

    const addedProduct = await addProductToCart(cart, quantity, pId);
    //console.log(addedProduct);
    if (addedProduct) {
      res.send(addedProduct);
    } else {
      res.send({ name: 'product not added', message: 'unable to add product' });
    }
  } catch (error) {
    console.error(error);
  }
});

router.delete('/:prodId', async (req, res, next) => {
  const { prodId } = req.params;

  try{
    const token = req.headers.authorization;

    if (token) {
      const deleteProd = await deleteProduct(prodId);
      res.send(deleteProd);
    }
  } catch (err) {
    console.log('err', err);
  }
});

module.exports = router;