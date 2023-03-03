import { useState } from 'react'
import { Navigate } from 'react-router'
import LandingCss from '../css/Landing.module.css'
import { makeNewCart } from '../Api.fetches'

const Landing = ({ cookie }) => {
    const [adult, setAdult] = useState(false)

    const saveNewCart = async () => {
        const newCart = await makeNewCart(crypto.randomUUID())
        console.log(newCart)
        const cartId = newCart.cart_id
        cookie.set('cartId', cartId)
    }
    return (adult ? <Navigate to='/home' /> :
        <div className={LandingCss.body}>
            <div><h1 className={LandingCss.header}>Grace Shopper buzzed</h1></div>
            <div className={LandingCss.answerBox}>
                <h1 className={LandingCss.answerBoxText}>Are you 21 or older?</h1>
                <div className={LandingCss.buttons}>
                    <button className={LandingCss.button} onClick={() => { saveNewCart().then(() => setAdult(true)) }
                    }>Yes</button>
                    <button className={LandingCss.button}>NO</button>
                </div>
            </div>
        </div>
    )
}

export default Landing 