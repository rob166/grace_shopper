import React from 'react';
import { Link } from 'react-router-dom';
import NavbarCss from '../css/Navbar.module.css'
const Navbar = () => {
  return (
    <div className={NavbarCss.body}>
      <nav>
        <h2>"GRACE SHOPPER E-SHOP"</h2>
        <Link to="/home">
          Home
        </Link>
      </nav>
    </div>
  )
}

export default Navbar;
