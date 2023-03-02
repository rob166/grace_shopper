const express = require('express');
const { getAllProducts, getProductById, addProductToCart } = require('../db');
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

router.get('/:prodId',async(req,res,next)=>{
    try{
        const prod = req.params.prodId 
        // console.log(prod)
        const singleProduct = await getProductById(prod)
        console.log(singleProduct)
        if(singleProduct){
            res.send(singleProduct)
        }else{
           res.send({name:"no product",message:"there is no product"})
        }
    }catch(error){
        console.error(error)
    }
})


router.patch('/:prodId',async(req,res,next)=>{
    try{
        const pId = req.params.prodId
        console.log(req.body)
        // const addedProduct = addProductToCart(cartId, quantity, pId)
    }catch(error){
        console.error(error)
    }
})
module.exports = router 
