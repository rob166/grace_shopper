import { showItemsInCart } from "../Api.fetches"
import CheckoutCss from '../css/Checkout.module.css'
import ReactDOM from 'react-dom';
import { React, useState, useEffect } from 'react'
import { makePurchase, userPurchase, makeNewCart } from "../Api.fetches"
import { NotificationManager } from 'react-notifications';
import { useNavigate } from "react-router"
import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "black",
            fontWieght: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: '#87bbfd' }
        }, invalid: {
            iconColor: "ffc7ee",
            color: 'ffc7ee'
        }
    }
}
const CheckoutForm = ({ cookie, setLoading }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cart, setCart] = useState([])

   
    const navigate = useNavigate()
    const cartId = cookie.get('cartId')
    const userId = cookie.get('userId')

    const cartTotal = Number.parseFloat(
        cart.reduce((a, p) => a + p.quantity * p.price, 0)
    ).toFixed(2)

    const cartQuantity = cart.reduce((a, p) => a + p.quantity, 0)

    const newCart = async () => {
        const newCart = await makeNewCart(crypto.randomUUID())
        console.log(newCart)
        const cartId = newCart.cart_id
        cookie.set('cartId', cartId)
    }

    const getCartItems = async () => {

        const cartItems = await showItemsInCart(cookie.get('cartId'))
        setCart(cartItems)

    }

    useEffect(() => {
        getCartItems()
        // eslint-disable-next-line
    }, [])



    const handleSubmit = async (event) => {
        event.preventDefault();
       
        if (elements == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (!error) {
            try {
                const { id } = paymentMethod
                const resp = await fetch("http://localhost:3001/api/payment", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        amount: cartTotal * 100,
                        id

                    }),
                })
                const data = await resp.json()
                
                console.log('this the data', data)
                if (data.success) {
                
                    console.log('successful payment')
             
                    userId ?
                        makePurchase(cartQuantity, cartTotal, cartId)
                            .then(() => userPurchase(cartId, userId))
                            .then(() => newCart()) :
                        makePurchase(cartQuantity, cartTotal, cartId)
                            .then(() => newCart())
                    NotificationManager.success('order complete')
                    navigate('/home')
                }
            } catch (error) {
                console.error(error)
            }
        } else {
            console.log(error.message)
        }
    };

    return (
       <div className={CheckoutCss.checkoutbox}>
            <div className={CheckoutCss.price}>total:  ${
                cart ?
                    Number.parseFloat(
                        cart.reduce((a, p) => a + p.quantity * p.price, 0)
                    ).toFixed(2) : null
            }</div>
            <form onSubmit={handleSubmit
                            }>
                <CardElement options={CARD_OPTIONS} />
                <button onMouseUp={()=>setLoading(true)} className={CheckoutCss.button} type="submit" disabled={!stripe || !elements}
              >
                    Pay
                </button>
            </form>
        </div>
    );
};





export default CheckoutForm