import { useEffect, useState } from "react"
import { showProducts } from "../Api.fetches";
import { Link } from "react-router-dom";

import HomeCss from '../css/Home.module.css';

const Home = ({ cookie }) => {

    const [products, setProducts] = useState([]);

    const showProd = async () => {
        const resp = await showProducts()
        setProducts(resp)
    }
    // eslint-disable-next-line
    useEffect(() => {
        showProd()
    }, [])

    return (<div className={HomeCss.body}>
        {products ? products.map(p =>
            <Link to='/product-view' className={HomeCss.link}
                key={crypto.randomUUID()}
                onMouseDown={() => {
                    cookie.set('productId', p.product_id)
                    cookie.set('product', p)
                }}>
                <div

                    className={HomeCss.product}
                    key={crypto.randomUUID()}>
                    <div className={HomeCss.title}> {p.name}</div>
                    <div
                        className={HomeCss.imgDiv}>
                        <img
                            className={HomeCss.img}
                            src={require(`../img/${p.image}`)}
                            alt='drink'>

                        </img>
                    </div>
                </div>
            </Link>)
            : <div>no work</div>}
    </div>

    )
}

export default Home;