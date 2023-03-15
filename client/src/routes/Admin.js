/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminCss from '../css/Admin.module.css';

const Admin = () => {
  const [change, setChange] = useState('');
  const [users, setUsers] = useState('');
  const jwt = localStorage.getItem('jwt');
  
  useEffect(() => {
    fetchAllUsers();
  }, [change]);

  async function fetchAllUsers() {
    try {
      const response = await fetch('http://localhost:3001/api/users', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
      });
      const json = await response.json();
      setUsers(json);
    } catch (error) {
      console.error(error);
    }
  }

  async function killTheUser(id) {
    try {
      const response = await fetch(`http://localhost:3001/api/users/user/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      const result = await response.json();
      setUsers(result);
      setChange(crypto.randomUUID());
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className={AdminCss.body}>
        <div className={AdminCss.title}>Admin Board</div>
        <table className={AdminCss.userTable}>
          <caption>Customer-User Information</caption>
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Delete User</th>
              <th>Admin?</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map(
                ({
                  id,
                  first_name,
                  last_name,
                  username,
                  email,
                  address_line1,
                  city,
                  state,
                  zipcode,
                  phone,
                  is_admin
                }) => (
                  <tr key={id}>
                    <td>{id}</td>

                    <td>
                      {first_name} {last_name}
                    </td>

                    <td>{username}</td>

                    <td>{email}</td>

                    <td>
                      {address_line1} {city} {state} {zipcode}
                    </td>

                    <td>{phone}</td>

                    <td>
                      <button
                        className={AdminCss.deleteButton}
                        onClick={() => killTheUser(id)}
                      >
                        Delete
                      </button>
                    </td>
                    {is_admin === false ?
                      <td> <Link to='/isadmin' state={id}><button className={AdminCss.deleteButton}>No</button></Link></td>
                      :
                      <td>Yes</td>
                    }
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Admin;
