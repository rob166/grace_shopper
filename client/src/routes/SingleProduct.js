import { useState } from 'react';
import { Link } from 'react-router-dom';
import SingleProductCss from '../css/SingleProduct.module.css';
import { addProduct } from '../Api.fetches';
import { NotificationManager } from 'react-notifications';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { FaRegMinusSquare } from 'react-icons/fa';
import { FaRegPlusSquare } from 'react-icons/fa';

const SingleProduct = ({ cookie, setRender }) => {
  const jwt = localStorage.getItem('jwt');
  const admin = cookie.get('isAdmin');
  const productId = cookie.get('productId');
  const product = cookie.get('product');
  const [quantity, setQuantity] = useState(product.quantity);

  console.log(productId);

  const addToQuantity = () => {
    setQuantity(quantity + 1);
  };

  const minusFromQuantity = () => {
    if (quantity === 0) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
    }
  };

  async function deleteTheProduct(productId) {
    try {
      const response = await fetch(
        `https://grace-shopper-buzzed.onrender.com/${productId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const result = await response.json();
      console.log(result);
      NotificationManager.info('Product Deleted');
    } catch (error) {
      console.error(error);
    }
  }

  return product ? (
    <div className={SingleProductCss.body}>
      <div className={SingleProductCss.container}>
        <div className={SingleProductCss.titleImgDesc}>
          <div className={SingleProductCss.titleImgDiv}>
            <div className={SingleProductCss.title}>{product.name}</div>

            <div className={SingleProductCss.imgDiv}>
              <img
                className={SingleProductCss.img}
                src={require(`../img/${product.image}`)}
                alt='drink'
              />
            </div>

            {admin === 'true' && (
              <div className={SingleProductCss.adminButtons}>
                <>
                  <Link
                    className={SingleProductCss.edit}
                    to='/product-view/edit'
                    state={product}
                  >
                    <FaEdit />
                    Edit
                  </Link>

                  <Link to='/products'>
                    <button
                      className={SingleProductCss.delete}
                      onClick={() => deleteTheProduct(productId)}
                    >
                      <RiDeleteBin2Fill /> Delete
                    </button>
                  </Link>
                </>
              </div>
            )}
          </div>
          <div className={SingleProductCss.priceDesc}>
            <div className={SingleProductCss.descDiv}>
              {product.description}
            </div>

            <div className={SingleProductCss.buttons}>
              <div className={SingleProductCss.price}>
                {quantity < 1
                  ? product.price
                  : Number.parseFloat(product.price * quantity).toFixed(2)}
              </div>

              <div className={SingleProductCss.quantity}>
                <button
                  className={SingleProductCss.minusPlus}
                  onClick={() => addToQuantity()}
                >
                  <FaRegPlusSquare />
                </button>
                <div className={SingleProductCss.num}>x : {quantity}</div>
                <button
                  className={SingleProductCss.minusPlus}
                  onClick={() => minusFromQuantity()}
                >
                  <FaRegMinusSquare />
                </button>
              </div>

              <button
                className={SingleProductCss.button}
                onClick={() => {
                  if (quantity > 0) {
                    addProduct(
                      cookie.get('cartId'),
                      quantity,
                      cookie.get('productId')
                    );
                    setRender(crypto.randomUUID());
                    NotificationManager.success(
                      `${product.name}, has been added to cart`
                    );
                  } else {
                    NotificationManager.success('Quantity 0');
                  }
                }}
              >
                Add to Cart <br />
                <BsFillCartPlusFill />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>no prod</div>
  );
};

export default SingleProduct;
