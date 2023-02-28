import React, { useState, useEffect } from "react";
import { showProducts } from "../Api.fetches";

const Product = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await showProducts(process.env.BASE_URL);
                setProducts(data);
            }
            catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            {products.length > 0 ? (
                products.map((product) => (
                    <div key={product.product_id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <img src={product.image} alt={product.name} />
                    </div>
                ))
            ) : (
                <p>No products to display.</p>
            )}
        </div>
    );
};

export default Product;