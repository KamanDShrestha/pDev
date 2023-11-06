import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.tsx';
import './index.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId='948702447301-tb96h7eie0gl3hp7hfoh90drkf7dck8h.apps.googleusercontent.com'>
      <React.StrictMode>
        <App />
        <Toaster
          position='top-center'
          reverseOrder={false}
          gutter={8}
          containerClassName=''
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },

            // Default options for specific types
            success: {
              duration: 3000,
              iconTheme: {
                primary: 'green',
                secondary: 'black',
              },
            },
            error: {
              duration: 3000,
              iconTheme: {
                primary: 'red',
                secondary: 'black',
              },
            },
          }}
        />
      </React.StrictMode>
    </GoogleOAuthProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
