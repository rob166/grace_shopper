import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Product from './routes/Product.js';
import Landing from './routes/Landing.js';
import Home from './routes/Home.js';
import Signup from './routes/Signup';
import Login from './routes/Login.js';
import Cart from './routes/Cart.js';
import Profile from './routes/Profile.js';
import ProfileEdit from './routes/ProfileEdit.js';
import SingleProduct from './routes/SingleProduct.js';
import UserOrders from './routes/UserOrders.js';
import Admin from './routes/Admin.js';
import CheckoutPage from './routes/CheckoutPage.js';
import IsAdmin from './routes/IsAdmin.js';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import { showItemsInCart } from './Api.fetches.js';
import { useEffect } from 'react';

function App() {
  const [prodId, setProdId] = useState(null);
  const cookie = new Cookies();
  const [quantity,setQuantity] = useState(0)
  console.log(quantity)
  const [render,setRender] = useState(null)

  const getCartItems = async () => {

    const cartItems = await showItemsInCart(cookie.get('cartId'))
    const quan = cartItems.reduce((a, p) => a + p.quantity,0)
    setQuantity(quan)
   
}
useEffect(() => {
    getCartItems()
    // eslint-disable-next-line
}, [render])
  return (
    <div className='App'>
      <Routes>
        <Route exact path={'/'} element={<Landing cookie={cookie} />} />
        <Route
          path='/home'
          element={
            <>
              <Navbar quantity={quantity}/>
              <Home prodId={prodId} setProdId={setProdId} cookie={cookie} />
            </>
          }
        />
        <Route
          exact path={'/products'}
          element={
            <>
             <Navbar quantity={quantity}/>
              <Product prodId={prodId} setProdId={setProdId} cookie={cookie} />
            </>
          }
        />
        <Route
          path='/product-view'
          element={
            <>
               <Navbar quantity={quantity}/>
              <SingleProduct cookie={cookie}
                              setRender={setRender} />
            </>
          }
        />
        <Route
          exact
          path={'/login'}
          element={
            <>
              <Navbar quantity={quantity}/>
              <Login cookie={cookie} />
            </>
          }
        />
        <Route
          exact
          path={'/signup'}
          element={
            <>
              <Navbar quantity={quantity}/>
              <Signup cookie={cookie} />
            </>
          }
        />
        <Route
          exact
          path={'/profile'}
          element={
            <>
               <Navbar quantity={quantity}/>
              <Profile />
            </>
          }
        />
        <Route
          exact
          path={'/admin'}
          element={
            <>
              <Navbar quantity={quantity}/>
              <Admin cookie={cookie} />
            </>
          }
        />
        <Route
          path={'/cart'}
          element={
            <>
              <Navbar quantity={quantity}/>
              <Cart cookie={cookie} setQuantity={setQuantity}
                render={render} setRender={setRender}
              />
            </>
          }
        />
        <Route
          exact
          path={'/profile/edit'}
          element={
            <>
               <Navbar quantity={quantity}/>
              <ProfileEdit />
            </>
          }
        />
        <Route
          exact
          path={'/user/orders'}
          element={
            <>
              <Navbar quantity={quantity}/>
              <UserOrders cookie={cookie} />
            </>
          }
        />
        <Route
          exact
          path={'/isadmin'}
          element={
            <>
               <Navbar quantity={quantity}/>
              <IsAdmin />
            </>
          }
        />
        <Route
        path={'/checkout'}
        element={
          <>
            <Navbar quantity={quantity}/>
            <CheckoutPage cookie={cookie} setQuantity={setQuantity}/>
          </>
        }/>
      </Routes>
      <NotificationContainer />
    </div>
  );
}

export default App;
