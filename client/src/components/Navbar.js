import React from 'react';
import { Link } from 'react-router-dom';
import NavbarCss from '../css/Navbar.module.css'

const Navbar = () => {

  return (
    <div className={NavbarCss.body}>
     
        <h1 className={NavbarCss.title}>Grace Shopper buzzed</h1>
        <div className={NavbarCss.links}>
        <Link className={NavbarCss.link} to="/home">
          Home
        </Link>
        <Link className={NavbarCss.link} to="/cart">
          Cart
        </Link>
        <Link className={NavbarCss.link} to="/login">
         login
        </Link>
        </div>
     
    </div>
  )
}

export default Navbar;