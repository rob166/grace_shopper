import { React, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { previousUserOrders } from '../Api.fetches';

const Profile = ({ cookie }) => {
  const [user, setUser] = useState('');
  const [userOrders, setUserOrders] = useState([])
console.log(userOrders)
  const jwt = localStorage.getItem('jwt');
  const userId = cookie.get('userId')
  useEffect(() => {
    async function showMyUser() {
      try {
        const response = await fetch('http://localhost:3001/api/users/user', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
          },
        });

        const json = await response.json();
        setUser(json);
        //console.log(json);

      } catch (error) {
        console.error(error);
      }
    };
    showMyUser();
  }, [jwt]);


  const getUserOrders = async () => {
    const resp = await previousUserOrders(userId)
    setUserOrders(resp)
  };

useEffect(()=>{
  getUserOrders()
},[])

  return (

    <div>
      <div>
        <span><h3>Email: {user.email}</h3></span>
        <span><h3>First Name: {user.first_name}</h3></span>
        <span><h3>Last Name: {user.last_name}</h3></span>
        <span><h3>Address: {user.address_line1}</h3></span>
        <span><h3>City: {user.city}</h3></span>
        <span><h3>State: {user.state}</h3></span>
        <span><h3>Zipcode: {user.zipcode}</h3></span>
        <span><h3>Phone Number: {user.phone}</h3></span>
      </div>
      <div>
        <Link to="/profile/edit" state={user}><button><h3>Edit Profile</h3></button></Link>
      </div>
      <div>
        {userOrders?userOrders.map(uo => {return(<div>{uo.total}</div>)}):null}
      </div>
    </div>

  )
}

export default Profile;