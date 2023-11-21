import toast from 'react-hot-toast';
import { axiosInstance } from '../../constants';
import { AuthContextType, useAuthContext } from '../../context/AuthProvider';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types';

export default function useLogoutUser() {
  const { setUser } = useAuthContext();
  const response = useMutation({
    mutationFn: (data: string) =>
      axiosInstance
        .post('/auth/logout', data)
        .then((response) => response.data),
    onSuccess: (response) => {
      console.log(response);
      localStorage.removeItem('authentication');
      setUser && setUser({} as AuthContextType);
      toast.success('You have successfully been logged out.');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error.response?.data.message || 'An error occurred');
      toast.error(error.response?.data.message || 'An error occurred');
    },
  });

  return response;
}
