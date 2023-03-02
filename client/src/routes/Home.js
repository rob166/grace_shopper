<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { showProducts } from '../Api.fetches';
const Home = () => {
  const [products, setProducts] = useState([]);
  const showProd = async () => {
    const resp = await showProducts();
    setProducts(resp);
  };
  useEffect(() => {
    showProd();
  }, []);

  return products ? (
    products.map((p) => <div>{p.name}</div>)
  ) : (
    <div>no work</div>
  );
};
=======
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
                onMouseDown={() => { cookie.set('productId', p.product_id) }}>
                <div

                    className={HomeCss.product}
                    key={crypto.randomUUID()}>
                    <h2> {p.name}</h2>
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
>>>>>>> 04b51caef53a1223c3bc5cdd7ad6e34a4c0eec31

export default Home;
