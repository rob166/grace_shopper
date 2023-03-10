import CheckoutCss from '../css/Checkout.module.css'
import CheckoutForm from '../components/CheckOut'
import { Elements } from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js';
const PUBLIC_KEY ="pk_test_51MjXWeHzJyNcKPcUVLxWJmAiqbEFfiFbAbq3AGsuUInu5wO3CxFMXd89jl8Q2h5wax7Q1ZyUdW8vuPwJVmnzz1xF00dVY5oRli"


const CheckoutPage = ({cookie})=>{
    const stripePromise = loadStripe(PUBLIC_KEY);
  
    return(
        <div className={CheckoutCss.body}>
            <div className={CheckoutCss.container}>
                <Elements stripe={stripePromise}>
                 <CheckoutForm cookie={cookie}/>
                </Elements>
            </div>
        </div>
    )
}

export default CheckoutPage