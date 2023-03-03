import CartCss from "../css/Cart.module.css"
import { showItemsInCart } from "../Api.fetches"
import { useState, useEffect } from 'react'

const Cart = ({ cookie }) => {

    const [cart, setCart] = useState([])

    const [quantity, setQuantity] = useState(0)

    const getCartItems = async () => {

        const cartItems = await showItemsInCart(cookie.get('cartId'))

        setCart(cartItems)
    }

    const addToQuantity = () => {

        setQuantity(quantity + 1)

    }

    const minusFromQuantity = () => {

        setQuantity(quantity - 1)

    }

    useEffect(() => {
        getCartItems()
        // eslint-disable-next-line
    }, [])

    return (
        <div className={CartCss.body}>
            <form className={CartCss.container}>
                {cart ? cart.map(p => p.quantity > 0 ?
                    <div
                        className={CartCss.productDiv}
                        key={crypto.randomUUID()}
                        value={p.quantity}>
                        <div className={CartCss.name}>{p.name}</div>

                        <div className={CartCss.buttonImg}>
                            <div className={CartCss.imgDiv}>
                                <img src={require(`../img/${p.image}`)} alt={'drink'} className={CartCss.img}></img>
                            </div>
                            <div>
                                <div className={CartCss.buttons}>

                                    <div className={CartCss.price}>
                                        {p.price * p.quantity}
                                    </div>

                                    <div
                                        className={CartCss.quantity}>
                                        <button onClick={() => { addToQuantity() }}>+</button>
                                        <div className={CartCss.num}> {quantity + p.quantity >= 0 ? quantity + p.quantity : 0} </div>
                                        <button className={CartCss.minus} onClick={() => { minusFromQuantity() }}>-</button>
                                    </div>

                                    <button
                                        className={CartCss.button}
                                    >Change Amount</button>

                                </div>
                            </div>
                        </div>
                    </div> : null
                ) : <div>nothing in cart</div>}
            </form>
        </div>
    )
}

export default Cart