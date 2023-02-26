import { useState } from 'react'
import { Navigate } from 'react-router'
import LandingCss from '../css/Landing.module.css'

const Landing = () =>{
    const [adult,setAdult] = useState(false)
    return(adult?<Navigate to='/home'/>:
        <div className={LandingCss.body}> 
        <div><h1 className={LandingCss.header}>Grace Shopper buzzed</h1></div>
        <div className={LandingCss.answerBox}>
        <h1>Are you 21 or older?</h1>
            <div className={LandingCss.buttons}>
                <button className={LandingCss.button} onClick={()=>setAdult(true)}>Yes</button>
                <button className={LandingCss.button}>NO</button>
            </div>
        </div>
        </div>
    )
}

export default Landing 