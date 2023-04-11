import React, { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { Link, useLocation } from 'react-router-dom';
import styles from '../css/ProductEdit.module.css';

const ProductEdit = ({cookie}) => {
  const location = useLocation();
  const propsData = location.state;
  const [name, setName] = useState(propsData.name);
  const [description, setDescription] = useState(propsData.description);
  const [price, setPrice] = useState(propsData.price);
  const [category, setCategory] = useState(propsData.category);
  const productId = cookie.get('productId');
  const jwt = localStorage.getItem('jwt');

  async function editThisProduct(productId) {
    try {
      const response = await fetch(
        `https://grace-shopper-buzzed.onrender.com/api/products/edit/${productId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            name: name,
            description: description,
            price: price,
            category: category,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      NotificationManager.info('Product Updated');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className={styles.body}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className={styles.tag}>Product Name: </div>
          <input
            className={styles.inputName}
            placeholder='Product Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className={styles.tag}>Description: </span>
          <textarea
            className={styles.inputDesc}
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <span className={styles.tag}>Price: </span>
          <input
            className={styles.inputPrice}
            placeholder='Price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <span className={styles.tag}>Category: </span>
          <input
            className={styles.inputCat}
            placeholder='Category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <div className={styles.buttonContainer}>
            <Link to='/products'>
              <button 
              className={styles.editButton}
              onClick={() => editThisProduct(productId)}>Submit</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductEdit;
