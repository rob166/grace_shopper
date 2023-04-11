import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import IsAdminCss from '../css/IsAdmin.module.css';

const IsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const propsData = location.state;
  const id = propsData;

  async function editMyUser() {
    try {
      const response = await fetch(
        'https://grace-shopper-buzzed.onrender.com/api/users/user/edit/admin',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
            is_admin: isAdmin,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  }

  const handleCheckbox = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className={IsAdminCss.body}>
      <div className={IsAdminCss.answerBox}>
        <h1>Edit Admin Privileges</h1>

        <label className={IsAdminCss.container}>
          Check to add admin status
          <input type='checkbox' checked={isAdmin} onChange={handleCheckbox} />
          <span className={IsAdminCss.checkmark}></span>
        </label>
        <div className={IsAdminCss.buttons}>
          <Link className={IsAdminCss.buttonLink} to='/admin'>
            <button className={IsAdminCss.buttonLink} onClick={editMyUser}>
              Return
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IsAdmin;
