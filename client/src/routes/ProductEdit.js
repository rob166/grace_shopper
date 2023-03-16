import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ProductEdit = () => {
  const location = useLocation();
  const propsData = location.state;
  const [name, setName] = useState(propsData.name);
  const [description, setDescription] = useState(propsData.description);
  const [price, setPrice] = useState(propsData.price);
  const [category, setCategory] = useState(propsData.category);
  
  const jwt = localStorage.getItem('jwt');

  async function editThisProduct(prodId) {
    try {
      const response = await fetch(
        `http://localhost:3001/api/products/${prodId}/edit`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
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
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            placeholder='Product Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            placeholder='Price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            placeholder='Category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <div>
            <Link to='/products'>
              <button onClick={editThisProduct}>Submit</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductEdit;
