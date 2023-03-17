import { useEffect, useState } from 'react';
import { showProducts } from '../Api.fetches';
import { Link } from 'react-router-dom';
import HomeCss from '../css/Home.module.css';
import styles from "../css/Product.module.css";

const Home = ({ cookie }) => {
  const [products, setProducts] = useState([]);

  const showProd = async () => {
    const resp = await showProducts();
    setProducts(resp);
  };
  // eslint-disable-next-line
  useEffect(() => {
    showProd();
  }, []);

    return (
        <div className={HomeCss.body}>
        {/* <div className={HomeCss.image}>
            
            <img className={HomeCss.cheers} src={require("../img/cheers.jpeg")} alt="people cheersing"/>
            <div className={HomeCss.centered}>
            Be bold enough to use your voice,
             brave enough to listen to your heart,
             and strong enough to live the life you have always imagined.
            </div>
        </div> */}
        <div className={HomeCss.banner}><h1 className={HomeCss.bannerwords}>Drink More Canned Cocktails</h1></div>
        <div className={styles.productContainer}>
            {products ? products.map(p =>
                <Link to='/product-view' className={HomeCss.link}
                    key={crypto.randomUUID()}
                    onMouseDown={() => {
                        cookie.set("productId", p.product_id);
                        cookie.set("product", p);
                    }}
                >
                        <div className={styles.product} key={p.product_id}>
                            <div className={styles.productTitle}>{p.name}</div>
                            <div className={styles.productImage}>
                                <img
                                    className={HomeCss.img}
                                    src={require(`../img/${p.image}`)}
                                    alt="drink"
                                />
                            </div>
                        </div>
                </Link>)
                : <div>no work</div>}
                </div>
        </div>

    )
}

export default Home;
