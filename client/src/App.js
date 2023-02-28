import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js'
import Product from './routes/Product.js';
import Landing from './routes/Landing.js';
import Home from './routes/Home.js'
import Signup from './routes/Signup'
import Login from './routes/Login.js'
import { useState } from 'react';


function App() {
  const BASE_URL = 'http://localhost:3001/api';
  // const jwt = localStorage.getItem('jwt');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="App">

      <Routes>
        <Route exact path={'/'} element={
          <Landing />}
        />

        <Route path='/home' element={
          <>
            <Navbar />
            <Home />
          </>
        } />
        <Route exact path={'/products'} element={
          <>
            <Navbar />
            <Product
            BASE_URL={BASE_URL}
            />
          </>
        } />
        <Route exact path={"/login"} element={
          <>
          <Navbar />
          <Login
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            BASE_URL={BASE_URL}
          />
          </>}
        />
        <Route exact path={"/signup"} element={
           <>
           <Navbar />
          <Signup
            password={password}
            setPassword={setPassword}
            username={username}
            setUsername={setUsername}
            BASE_URL={BASE_URL}
          />
        </>}
        />
      </Routes>
    </div>
  );
}

export default App;
