import {showSingleProd} from "../Api.fetches"
import { useEffect, useState } from "react";



const SingleProduct =({prodId})=>{
 // eslint-disable-next-line


   

    const [product,setProduct] = useState({})
    
 // eslint-disable-next-line
    const getProd = async()=>{
        const prod = await showSingleProd(prodId)
        
        setProduct(prod)
    }
    
    useEffect(()=>{
        getProd()
    },[])


    return(
        <>
        {product?<div>
            {product.name}
        </div>:<div>no prod</div>}
        </>
    )
};

export default SingleProduct