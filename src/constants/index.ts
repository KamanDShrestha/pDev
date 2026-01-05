import axios from 'axios';
import { getAccessToken, setAccessToken } from '../lib/tokenManager';

export const BACKEND_URL = import.meta.env.VITE_BACKEND;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ENV === 'development' ? `${BACKEND_URL}/api` : '/api',
  withCredentials: true,
});

let isRefreshing = false;
let queue: ((token: string) => void)[] = [];

axiosInstance.interceptors.request.use(config => {
  const token = getAccessToken();
  console.log(config.url, "interceptor called with token:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    // not intercepting the response from refresh request itself
    if (originalRequest.url?.includes("/auth/refresh")) {
      return;
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // FIRST request becomes the leader
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const res = await axiosInstance.post("/auth/refresh");
          const newToken = res.data.accessToken;
          console.log("Token refreshed from axios interceptor:", newToken);
          setAccessToken(newToken);

          // Wake up all waiting requests
          queue.forEach(cb => cb(newToken));
          queue = [];
        } catch (err) {
          // Refresh failed → logout everyone
          queue = [];
          setAccessToken(null);
          window.location.href = "/login";
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      // FOLLOWERS wait here
      return new Promise(resolve => {
        queue.push((token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(axiosInstance(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);


export const KHALTI_API_URL = import.meta.env.VITE_KHALTI_API_URL;
export const ESEWA_API_URL = import.meta.env.VITE_ESEWA_API_URL;

export const statusColoring = {
  pending: 'bg-yellow-100 text-yellow-500',
  resolved: 'bg-green-100 text-green-500',
  rejected: 'bg-red-100 text-red-500',
};

export const postCategoriesTheme = {
  reflection: 'bg-blue-300 text-blue-800',
  learning: 'bg-green-300 text-green-800',
  question: 'bg-gray-300 text-gray-800',
};

export const moods = [
  { mood: 'Terrible', emoji: '😰', score: 1 },
  { mood: 'Bad', emoji: '👎', score: 2 },
  { mood: 'Alright', emoji: '🙂', score: 3 },
  { mood: 'Good', emoji: '😁', score: 4 },
  { mood: 'Fantastic', emoji: '🥳', score: 5 },
];

export const moodEmoji = {
  1: '😰',
  2: '👎',
  3: '🙂',
  4: '😁',
  5: '🥳',
};
