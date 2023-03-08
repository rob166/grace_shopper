import { previousUserOrders } from '../Api.fetches';
import { useState, useEffect } from 'react';
import UserOrderCss from "../css/UserOrder.module.css"
import {DateTime} from 'luxon'
const UserOrders = ({ cookie }) => {
    const userId = cookie.get('userId')
    const [userOrders, setUserOrders] = useState([])

    const getUserOrders = async () => {
        const resp = await previousUserOrders(userId)
        setUserOrders(resp.reverse())
    };

    useEffect(() => {
        getUserOrders()
    }, [])

    return (
        <div className={UserOrderCss.body}>
            <div className={UserOrderCss.container}>
            {userOrders ? userOrders.map(uo => {
                return (
                    <div className={UserOrderCss.productDiv}
                    key={crypto.randomUUID()}>
                        <div>{ DateTime.fromISO(uo.date).toLocaleString(DateTime.DATE_MED) }</div>
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