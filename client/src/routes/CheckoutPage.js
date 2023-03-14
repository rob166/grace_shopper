import CheckoutCss from '../css/Checkout.module.css'
import CheckoutForm from '../components/CheckOut'
import { Elements } from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js';
import { useState } from 'react';
const PUBLIC_KEY ="pk_test_51MjXWeHzJyNcKPcUVLxWJmAiqbEFfiFbAbq3AGsuUInu5wO3CxFMXd89jl8Q2h5wax7Q1ZyUdW8vuPwJVmnzz1xF00dVY5oRli"


const CheckoutPage = ({cookie})=>{
    const stripePromise = loadStripe(PUBLIC_KEY);
    
    const [loading, setLoading] = useState(false)
    return(
        <div className={CheckoutCss.body}>
        { loading ? <div className={CheckoutCss.loadingBody}>
            <div className={CheckoutCss.loadingContainer}>
                <h2>processing</h2>
            <div className={CheckoutCss.progress}>
  <div className={CheckoutCss.color}>
    
  </div>
</div>
            </div>
        </div> : null}
            <div className={CheckoutCss.container}>
           
                <Elements stripe={stripePromise}>
                 <CheckoutForm setLoading={setLoading} cookie={cookie}/>
                </Elements>
            </div>
   
        </div>
    )
}

export default CheckoutPage