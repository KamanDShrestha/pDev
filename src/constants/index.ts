import axios from 'axios';

export const BACKEND_URL = import.meta.env.VITE_BACKEND;

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
