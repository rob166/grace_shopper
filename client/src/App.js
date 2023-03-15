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

function App() {
  const [prodId, setProdId] = useState(null);
  const cookie = new Cookies();

  return (
    <div className='App'>
      <Routes>
        <Route exact path={'/'} element={<Landing cookie={cookie} />} />
        <Route
          path='/home'
          element={
            <>
              <Navbar />
              <Home prodId={prodId} setProdId={setProdId} cookie={cookie} />
            </>
          }
        />
        <Route
          exact path={'/products'}
          element={
            <>
              <Navbar />
              <Product prodId={prodId} setProdId={setProdId} cookie={cookie} />
            </>
          }
        />
        <Route
          path='/product-view'
          element={
            <>
              <Navbar />
              <SingleProduct cookie={cookie} />
            </>
          }
        />
        <Route
          exact
          path={'/login'}
          element={
            <>
              <Navbar />
              <Login cookie={cookie} />
            </>
          }
        />
        <Route
          exact
          path={'/signup'}
          element={
            <>
              <Navbar />
              <Signup cookie={cookie} />
            </>
          }
        />
        <Route
          exact
          path={'/profile'}
          element={
            <>
              <Navbar />
              <Profile />
            </>
          }
        />
        <Route
          exact
          path={'/admin'}
          element={
            <>
              <Navbar />
              <Admin cookie={cookie} />
            </>
          }
        />
        <Route
          path={'/cart'}
          element={
            <>
              <Navbar />
              <Cart cookie={cookie} />
            </>
          }
        />
        <Route
          exact
          path={'/profile/edit'}
          element={
            <>
              <Navbar />
              <ProfileEdit />
            </>
          }
        />
        <Route
          exact
          path={'/user/orders'}
          element={
            <>
              <Navbar />
              <UserOrders cookie={cookie} />
            </>
          }
        />
        <Route
          exact
          path={'/isadmin'}
          element={
            <>
              <Navbar />
              <IsAdmin />
            </>
          }
        />
        <Route
        path={'/checkout'}
        element={
          <>
            <Navbar/>
            <CheckoutPage cookie={cookie}/>
          </>
        }/>
      </Routes>
      <NotificationContainer />
    </div>
  );
}

export default App;
