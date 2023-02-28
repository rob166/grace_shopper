import React, { useState, useEffect } from "react";
import { showProducts } from "../Api.fetches";

const Product = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await showProducts(props.BASE_URL);
            setProducts(data);
        };
        fetchProducts();
    }, [props.BASE_URL]);

    return(
        <div>
            {products.map((product) => (
                <div key={product.product_id}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    <img src={product.image} alt={product.name} />
                </div>
            ))}
        </div>
    );
};

export default Product;