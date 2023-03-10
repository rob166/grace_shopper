import React, { useState, useEffect } from 'react';
import { showProducts } from '../Api.fetches';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await showProducts(process.env.BASE_URL);
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div>
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value=''>All Categories</option>
        <option value='vodka'>Vodka</option>
        <option value='tequila'>Tequila</option>
        <option value='non'>Non-Alcoholic</option>
      </select>
      {products.length > 0 ? (
        filteredProducts.map((product) => (
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
