import { useEffect, useState } from "react"
import { showProducts } from "../Api.fetches";
import { Link } from "react-router-dom";

import HomeCss from '../css/Home.module.css';
import styles from "../css/Product.module.css";

const Home = ({ cookie }) => {
    const [products, setProducts] = useState([]);

    const showProd = async () => {
        const resp = await showProducts()
        setProducts(resp)
    }

    useEffect(() => {
        showProd()
    }, [])

    return (
        <div className={HomeCss.body}>
            <div className={styles.productContainer}>
                {products.map((p) => (
                    <Link
                    to="/product-view"
                    className={styles.link}
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
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Home;