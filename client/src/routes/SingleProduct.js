
import { useState } from "react";
import SingleProductCss from "../css/SingleProduct.module.css"
import { addProduct } from "../Api.fetches";

const SingleProduct = ({ cookie }) => {
    const [quantity, setQuantity] = useState(0)

    const productId = cookie.get('productId')
    const product = cookie.get('product')
    console.log(productId)
    const addToQuantity = () => {
        setQuantity(quantity + 1)
    }

    const minusFromQuantity = () => {
        if (quantity === 0) {
            setQuantity(0)
        } else {
            setQuantity(quantity - 1)
        }
    }

    return (product ? <div className={SingleProductCss.body}>

        <div className={SingleProductCss.container}>

            <div className={SingleProductCss.titleImgDesc}>

                <div className={SingleProductCss.titleImgDiv}>

                    <div>
                        <h1>{product.name}</h1>
                    </div>

                    <div
                        className={SingleProductCss.imgDiv}
                    >
                        <img
                            className={SingleProductCss.img}
                            src={require(`../img/${product.image}`)}
                            alt='drink' />
                    </div>



                </div>
                <div className={SingleProductCss.priceDesc}>

                    <div className={SingleProductCss.descDiv}>
                        <h2>{product.description}</h2>
                    </div>

                    <div className={SingleProductCss.buttons}>

                        <div className={SingleProductCss.price}>
                            {product.price}
                        </div>

                        <div
                            className={SingleProductCss.quantity}>
                            <button
                                onClick={() => addToQuantity()}>+</button>
                            <div className={SingleProductCss.num}>{quantity}</div>
                            <button className={SingleProductCss.minus} onClick={() => minusFromQuantity()}>-</button>
                        </div>

                        <button
                            className={SingleProductCss.button}
                            onClick={() => {
                                addProduct(cookie.get('cartId'),quantity,cookie.get('productId'))
                            }
                            }>Add to Cart</button>

                    </div>
                </div>
            </div>


        </div>
    </div> : <div>no prod</div>

    )
};

export default SingleProduct


