import { addProduct, previousUserOrders } from '../Api.fetches';
import { showItemsInCart } from "../Api.fetches"
import { useState, useEffect } from 'react';
import UserOrderCss from "../css/UserOrder.module.css"
import { DateTime } from 'luxon'
import { NotificationManager } from 'react-notifications';
// import { useNavigate } from 'react-router';

const UserOrders = ({ cookie, setRender }) => {
    const userId = cookie.get('userId')
    const [userOrders, setUserOrders] = useState([])



    const isInCart = async (product) => {
        const cart = await showItemsInCart(cookie.get('cartId'))
        const newcart = cart.filter(i => i.product_id === product.product_id)
        if (newcart.length) {
            await newcart.map(p => addProduct(cookie.get('cartId'), p.quantity + product.quantity, p.product_id))
        } else {
            addProduct(cookie.get('cartId'), product.quantity, product.product_id)
        }
    }

    const buyAgain = async (products) => {

        await products.map(p => isInCart(p))
       
        NotificationManager.success('Items Added to Cart')

    }

    const getUserOrders = async () => {
        const resp = await previousUserOrders(userId)
        setUserOrders(resp.reverse())
    };

    useEffect(() => {
        getUserOrders()
        // eslint-disable-next-line
    }, [])

    return (
        <div className={UserOrderCss.body}>
            <div className={UserOrderCss.container}>
                {userOrders ? userOrders.map(uo => {
                    return (
                        <div className={UserOrderCss.productDiv}
                            key={crypto.randomUUID()}>
                            <div className={UserOrderCss.dateAndBuy}>
                                <div>{DateTime.fromISO(uo.date).toLocaleString(DateTime.DATE_MED)}</div>
                                <button className={UserOrderCss.button} onMouseDown={() => {
                                    buyAgain(uo.products)
}
                              

                                }
                                onMouseUp={()=>setRender(crypto.randomUUID())}>order again?</button>
                            </div>
                            <div>
                                {uo.products.map(p => {
                                    return (<div key={crypto.randomUUID()}>
                                        <div>{p.quantity} : {p.name}</div>

                                    </div>
                                    )
                                })}
                            </div>
                            <div>{uo.total}</div>
                        </div>)
                }) : null}
            </div>
        </div>

    )
}

export default UserOrders