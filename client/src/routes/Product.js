import { useEffect, useState } from "react"
import { showProducts } from "../Api.fetches";
import { Link } from "react-router-dom";

import styles from "../css/Product.module.css";
import HomeCss from '../css/Home.module.css';

const Product = ({ cookie }) => {

    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");

    const showProd = async () => {
        const resp = await showProducts();
        setProducts(resp);
    };

    useEffect(() => {
        showProd()
    }, []);

    const filteredProducts = selectedCategory ? products.filter((p) => p.category === selectedCategory) : products;

    const sortedProducts = sortingOrder === "asc" ? [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name)) : [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));

    return (
        <div className={HomeCss.body}>
            <div>
                <select onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="tequila">Tequila</option>
                    <option value="vodka">Vodka</option>
                    <option value="rum">Rum</option>
                    <option value="whiskey">Whiskey</option>
                    <option value="malt liquor">Malt Liquor</option>
                    <option value="non alcoholic">Non-Alcoholic</option>
                </select>
                <select onChange={(e) => setSortingOrder(e.target.value)}>
                    <option value="asc">Sort A-Z</option>
                    <option value="desc">Sort Z-A</option>
                </select>
            </div>
            {sortedProducts ? (
                sortedProducts.map((p) => (
                    <Link
                        to="/product-view"
                        className={HomeCss.link}
                        key={crypto.randomUUID()}
                        onMouseDown={() => {
                            cookie.set("productId", p.product_id);
                            cookie.set("product", p);
                        }}
                    >
                        <div className={HomeCss.product} key={crypto.randomUUID()}>
                            <div className={HomeCss.title}> {p.name}</div>
                            <div className={HomeCss.imgDiv}>
                                <img
                                    className={HomeCss.img}
                                    src={require(`../img/${p.image}`)}
                                    alt="drink"
                                />
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <div>no work</div>
            )}
        </div>
    )
}

export default Product;