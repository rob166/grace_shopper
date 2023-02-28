import { useEffect, useState } from "react"
import { showProducts } from "../Api.fetches";
import HomeCss from '../css/Home.module.css'
const Home =()=>{
    const [products,setProducts] = useState([]);
    const showProd = async()=>{
        const resp = await showProducts()
        setProducts(resp)
    }
    useEffect(()=>{ 
        showProd()
 },[])

    return(<div className={HomeCss.body}>
       { products?products.map(p=>  
    <div className={HomeCss.product}key={crypto.randomUUID()}>
    <h2> {p.name}</h2>
    <div className={HomeCss.imgDiv}>
    <img className={HomeCss.img} src={require(`../img/${p.image}`)} alt='drink'></img>
    </div>
    </div>)
    :<div>no work</div>}
    </div>
      
    )
}

export default Home