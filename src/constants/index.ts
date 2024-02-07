import axios from 'axios';

export const BACKEND_URL = 'http://localhost:3000';

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authentication');

      localStorage.removeItem('authorization');
      if (
        window.location.pathname !== '/login' &&
        window.location.pathname !== '/register'
      ) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const KHALTI_API_URL = 'https://a.khalti.com/api/v2';
export const ESEWA_API_URL =
  'https://rc-epay.esewa.com.np/api/epay/main/v2/form';

export const statusColoring = {
  pending: 'bg-yellow-100 text-yellow-500',
  resolved: 'bg-green-100 text-green-500',
  rejected: 'bg-red-100 text-red-500',
};
