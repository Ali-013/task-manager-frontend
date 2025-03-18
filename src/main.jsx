import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from 'src/store/index.js';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
const googleID = import.meta.env.VITE_GOOGLE_CLIENT_ID
root.render(
  <GoogleOAuthProvider clientId={googleID}>
    <Provider store={store}>
      <BrowserRouter> 
        <ToastContainer /> 
        <App />
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>

  
);
