import {showSingleProd} from "../Api.fetches"
import { useEffect, useState } from "react";
import SingleProductCss from "../css/SingleProduct.module.css"


const SingleProduct =({cookie})=>{


 const [product,setProduct] = useState({})
 

 const getProd = async()=>{
     const prod = await showSingleProd(cookie.get("productId"))
     
     setProduct(prod)
 }
 // eslint-disable-next-line
 useEffect(()=>{
     getProd()
 },[])


 return(
     <div className={SingleProductCss.body}>
     {product?<div >
     <div>
         <h2>{product.name}</h2>
    </div>
     </div>:<div>no prod</div>}
     </div>
 )
};

export default SingleProduct

   
