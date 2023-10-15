import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='948702447301-tb96h7eie0gl3hp7hfoh90drkf7dck8h.apps.googleusercontent.com'>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
