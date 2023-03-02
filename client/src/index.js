import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import './css/index.css';
=======
>>>>>>> 04b51caef53a1223c3bc5cdd7ad6e34a4c0eec31
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <CookiesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
);
