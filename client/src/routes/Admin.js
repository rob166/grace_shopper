import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import AdminCss from '../css/Admin.module.css';
import { showProducts } from '../Api.fetches';

const Admin = ({ cookie }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    async function fetchAllUsers() {
      try {
        const response = await fetch('http://localhost:3001/api/users', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();
        setUsers(json);
        // console.log(json);
        return json;
      } catch (error) {
        console.error(error);
      }
    }
    fetchAllUsers();

  }, []);

  return (
    <div className={AdminCss.body}>
      <div className={AdminCss.title}>Admin Board</div>
      
      {users.map((user) => (
        <ul key={user.id} className={AdminCss.allUsers}>
          <li>{user.first_name} {user.last_name} {user.username} {user.email} {user.address_line1} {user.city} {user.state} {user.zipcode} {user.phone} </li>
        </ul>
      ))}
      <div></div>
    </div>
  );
};

export default Admin;
