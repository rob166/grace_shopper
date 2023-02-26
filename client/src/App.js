import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js'
import Product from './routes/Product.js';
import Landing from './routes/Landing.js';
import Home from './routes/Home.js'

function App() {
  return (
    <div className="App">
     
      <Routes>
        <Route exact path={'/'} element={
          <Landing/>}
        />
        
        <Route path='home' element={
          <>
          <Navbar/>
          <Home/>
          </>
        }/>
        <Route path='/products' elemenr={
             <>
          <Navbar/>
          <Product />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
