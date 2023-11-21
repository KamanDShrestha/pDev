import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { ErrorResponse, RegisterData } from '../../types';
import toast from 'react-hot-toast';

export function useRegisterUser() {
  const navigate = useNavigate();
  const response = useMutation({
    mutationFn: (data: RegisterData) =>
      axiosInstance
        .post('/auth/register', data)
        .then((response) => response.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success('You have successfully registered.');
      navigate('/newUser');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error.response?.data);
      toast.error(error.response?.data.message || 'An error occurred');
    },
  });
  return response;
}
