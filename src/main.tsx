import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { AxiosError } from 'axios';
import { Analytics } from '@vercel/analytics/react';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (_failureCount: number, error: unknown) => {
        if (error instanceof AxiosError) {
          return error.response?.status !== 401;
        }
        return false;
      },
    },
  },
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
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
            color: '#000000',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            style: {
              background: '#BFEA7C',
            },
            iconTheme: {
              primary: 'green',
              secondary: 'white',
            },
          },
          error: {
            duration: 3000,
            style: {
              background: '#FF8E8F',
            },
            iconTheme: {
              primary: 'red',
              secondary: 'white',
            },
          },
        }}
      />
      <Analytics />
    </React.StrictMode>

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
