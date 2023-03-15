import { useEffect, useState } from 'react';
import { showProducts } from '../Api.fetches';
import { Link } from 'react-router-dom';
import styles from '../css/Product.module.css';
import HomeCss from '../css/Home.module.css';

const Product = ({ cookie }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortingOrder, setSortingOrder] = useState('asc');
  const admin = cookie.get('isAdmin');
  const jwt = localStorage.getItem('jwt');

  const showProd = async () => {
    const resp = await showProducts();
    setProducts(resp);
  };

  useEffect(() => {
    showProd();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const sortedProducts =
    sortingOrder === 'asc'
      ? [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name))
      : [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));

  async function deleteTheProduct(prodId) {
    try {
      const response = await fetch(
        `http://localhost:3001/api/products/${prodId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect(() => {
  //   deleteTheProduct();
  // }, [products]);

  return (
    <div className={HomeCss.body}>
      <div className={styles.filterContainer}>
        <div className={styles.filter}>
          <label htmlFor='filter-select'>Filter by:</label>
          <select onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value=''>All Categories</option>
            <option value='tequila'>Tequila</option>
            <option value='vodka'>Vodka</option>
            <option value='rum'>Rum</option>
            <option value='whiskey'>Whiskey</option>
            <option value='malt liquor'>Malt Liquor</option>
            <option value='non alcoholic'>Non-Alcoholic</option>
          </select>
        </div>
        <div className={styles.sort}>
          <label htmlFor='sort-select'>Sort by:</label>
          <select onChange={(e) => setSortingOrder(e.target.value)}>
            <option value='asc'>Sort A-Z</option>
            <option value='desc'>Sort Z-A</option>
          </select>
        </div>
      </div>
      <div className={styles.productContainer}>
        {sortedProducts ? (
          sortedProducts.map((p) => (
            <>
            <Link
              to='/product-view'
              className={styles.link}
              key={crypto.randomUUID()}
              onMouseDown={() => {
                cookie.set('productId', p.product_id);
                cookie.set('product', p);
              }}
            >
              <div className={styles.product} key={crypto.randomUUID()}>
                <div className={styles.productTitle}>{p.name}</div>
                <div className={styles.productImage}>
                  <img
                    className={styles.img}
                    src={require(`../img/${p.image}`)}
                    alt='drink'
                  />
                </div>
              </div>
            </Link>
            <div className={styles.editAndDelete}>
            {admin === 'true' && (
              <>
                <span>
                  <button className={styles.editButton}>Edit</button>
                </span>
                
                <span>
                  <button
                    className={styles.deleteButton}
                    onClick={() => deleteTheProduct(p.product_id)}
                  >
                    Delete
                  </button>
                </span>
              </>
            )}
          </div>
          </>
          ))
        ) : (
          <div>no work</div>
        )}
      </div>
    </div>
  );
};

export default Product;
