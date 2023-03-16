import { useState } from 'react';
import SingleProductCss from '../css/SingleProduct.module.css';
import { addProduct } from '../Api.fetches';
import { NotificationManager } from 'react-notifications';
import {GoDiffAdded} from 'react-icons/go'
import {GrSubtractCircle} from "react-icons/gr"
import {BsFillCartPlusFill} from 'react-icons/bs'

const SingleProduct = ({ cookie ,setRender}) => {
  

    const productId = cookie.get('productId')
    const product = cookie.get('product')
    const [quantity, setQuantity] = useState(product.quantity)
    console.log(productId)
    const addToQuantity = () => {
        setQuantity(quantity + 1)
    }

  const minusFromQuantity = () => {
    if (quantity === 0) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
    }
  };

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
          </div>
          <div className={SingleProductCss.priceDesc}>
            <div className={SingleProductCss.descDiv}>
              {product.description}
            </div>

            <div className={SingleProductCss.buttons}>
              <div className={SingleProductCss.price}>{quantity < 1 ? product.price:Number.parseFloat(product.price * quantity).toFixed(2)}</div>

              <div className={SingleProductCss.quantity}>
                <button
                  className={SingleProductCss.minusPlus}
                  onClick={() => addToQuantity()}
                >
                  <GoDiffAdded/>
                </button>
                <div className={SingleProductCss.num}>{quantity}</div>
                <button
                  className={SingleProductCss.minusPlus}
                  onClick={() => minusFromQuantity()}
                >
                  <GrSubtractCircle/>
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
                Add to Cart <br/>
                <BsFillCartPlusFill/>
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
