import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import NavbarCss from '../css/Navbar.module.css';

const Navbar = () => {
const jwt = localStorage.getItem('jwt');
const cookies = new Cookies();
const admin = cookies.get('isAdmin');

  return (
    <div className={NavbarCss.body}>
     
        <h1 className={NavbarCss.title}>Grace Shopper buzzed</h1>
        <div className={NavbarCss.links}>
        <Link className={NavbarCss.link} to="/home">
          Home
        </Link>
        <Link className={NavbarCss.link} to="/products">
          Products
        </Link>
        <Link className={NavbarCss.link} to="/cart">
          Cart
        </Link>
        <Link className={NavbarCss.link} to="/login">
         Login/Logout
        </Link>
        {jwt && !admin &&
        <> 
        <Link className={NavbarCss.link} to="/profile">
         My Profile
        </Link>
        </>
        }
        {admin &&
        <> 
        <Link className={NavbarCss.link} to="/admin">
         Admin 
        </Link>
        </>
        }
        </div>
     
    </div>
  )
}

export default Navbar;