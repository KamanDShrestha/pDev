import axios from 'axios';

export const BACKEND_URL = 'http://localhost:3000';

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

export const KHALTI_API_URL = 'https://a.khalti.com/api/v2';
