import CartCss from '../css/Cart.module.css'
import { useState } from 'react'
import { addProduct } from '../Api.fetches'
const PriceChanger = ({ cookie, setRender, setEdit }) => {

    const [quantity, setQuantity] = useState(0)
    console.log(quantity)
    const product = cookie.get('product')
    const cart = cookie.get('cartId')
    const addToQuantity = () => {

        setQuantity(quantity + 1)

    }

    const minusFromQuantity = () => {

        if (quantity + product.quantity > 0) {
            setQuantity(quantity - 1)
        }


    }

    return (
        <div className={CartCss.buttons}>
            <div className={CartCss.closeButtonDiv}>
                <button 
                onClick={() => setEdit(false)}>close</button>
            </div>
            <div
                className={CartCss.quantity}>
                <button className={CartCss.minusPlus} 
                    onClick={() => { addToQuantity() }}>+</button>
                <div
                    className={CartCss.num}>
                    {quantity + product.quantity >= 0 ? quantity + product.quantity : 0}
                </div>
                <button className={CartCss.minusPlus} onClick={() => { minusFromQuantity() }}>-</button>
            </div>

            <button
                className={CartCss.button}
                onClick={() => {
                    addProduct(cart, quantity + product.quantity, product.product_id).then(() => setRender(crypto.randomUUID()))

                }}
            >Change Amount</button>

        </div>
    )
}

export default PriceChanger