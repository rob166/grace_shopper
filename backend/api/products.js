const express = require('express');
const { getAllProducts } = require('../db');
const router = express.Router();

router.use((req,res,next)=>{
    console.log('sending somthing from products')
    next()
})

router.get('/',async(req,res,next)=>{
    try{
        const products = await getAllProducts()
        if(products){
            res.send(products);
        }else{
            res.send({name:"no products",message:"there are no products"})
        }
    }catch(error){
        console.error(error)
    }
})



module.exports = router 