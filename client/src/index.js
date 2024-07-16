import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { allowReducer } from './reducers/reducers';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({
  reducer: {
    allow: allowReducer, // Ensure the correct key name
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='1047036268440-71f7064knen51eh4edbrfqqpjvta197o.apps.googleusercontent.com'>
    <BrowserRouter>
        <Provider store={store}>
       
          <App />
     
           
        </Provider>
        </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
