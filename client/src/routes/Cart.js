import CartCss from "../css/Cart.module.css"
import { showItemsInCart } from "../Api.fetches"
import { useState, useEffect } from 'react'
import PriceChanger from "../components/PriceChanger"
import { makePurchase, userPurchase, makeNewCart } from "../Api.fetches"
import { NotificationManager } from 'react-notifications';
import { useNavigate } from "react-router"
const Cart = ({ cookie }) => {

    const [cart, setCart] = useState([])
    const [edit, setEdit] = useState(false)
    const [render, setRender] = useState(null)
    const navigate = useNavigate()
    const cartTotal = Number.parseFloat(
        cart.reduce((a, p) => a + p.quantity * p.price, 0)
    ).toFixed(2)

    const cartQuantity = cart.reduce((a, p) => a + p.quantity, 0)

    const cartId = cookie.get('cartId')
    const userId = cookie.get('userId')

    const getCartItems = async () => {

        const cartItems = await showItemsInCart(cookie.get('cartId'))
        setCart(cartItems)
    }
    const newCart = async () => {
        const newCart = await makeNewCart(crypto.randomUUID())
        console.log(newCart)
        const cartId = newCart.cart_id
        cookie.set('cartId', cartId)
    }
    useEffect(() => {
        getCartItems()
        // eslint-disable-next-line
    }, [render])

    return (
        <div className={CartCss.body}>

            {edit ?
                <div className={CartCss.editPage}>
                    <PriceChanger
                        setEdit={setEdit}
                        setRender={setRender}
                        cookie={cookie} />
                </div> : null}

            <form
                className={CartCss.container}>

                {cart ? cart.map(p => p.quantity > 0 ?
                    <div
                        className={CartCss.productDiv}
                        key={crypto.randomUUID()}
                    >
                        <div
                            className={CartCss.name}>{p.name}<div>

                                <button
                                    className={CartCss.editButton}
                                    onMouseOver={() => cookie.set('product', p)}
                                    onClick={() => setEdit(true)}
                                >edit</button>

                            </div>
                        </div>

                        <div className={CartCss.buttonImg}>
                            <div className={CartCss.imgDiv}>
                                <img
                                    src={require(`../img/${p.image}`)}
                                    alt={'drink'}
                                    className={CartCss.img} />
                            </div>

                            <div>

                                <div>price: $ {Number.parseFloat(p.price * p.quantity).toFixed(2)}</div>
                                <div>quantity: {p.quantity}</div>

                            </div>

                        </div>

                    </div> : null

                ) : <div>nothing in cart</div>}
                <div className={CartCss.totalDiv}>
                    <div className={CartCss.total}>Total: $
                        {
                            cart ?
                                Number.parseFloat(
                                    cart.reduce((a, p) => a + p.quantity * p.price, 0)
                                ).toFixed(2) : null
                        }
                    </div>
                </div>
                <div className={CartCss.checkOutDiv}>
                    <button
                        className={CartCss.checkOutButton}
                        onClick={() => {userId ?
                            makePurchase(cartQuantity, cartTotal, cartId)
                                .then(() => userPurchase(cartId, userId))
                                .then(() => newCart()) :
                                makePurchase(cartQuantity, cartTotal, cartId)
                                .then(() => newCart())
                                NotificationManager.success('order complete')
                                navigate('/home') 
                        }}
                    >Check Out</button>
                </div>
            </form>

        </div>
    )
}

export default Cart