import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../constants';
import { ErrorResponse, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: Date;
}

export function useRegisterUser() {
  const navigate = useNavigate();
  const response = useMutation({
    mutationFn: (data: RegisterData) =>
      axiosInstance
        .post('/auth/register', data)
        .then((response) => response.data),
    onSuccess: (response) => {
      console.log(response);
      navigate('/newUser');
    },
    onError: (error: AxiosError<ErrorResponse>) =>
      console.log(error.response?.data),
  });
  return response;
}
