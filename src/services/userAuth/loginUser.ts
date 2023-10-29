import { ErrorResponse, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../constants';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface LoginData {
  email: string;
  password: string;
}

export function useLoginUser() {
  const navigate = useNavigate();
  const response = useMutation({
    mutationFn: (data: LoginData) =>
      axiosInstance.post('/auth/login', data).then((response) => response.data),
    onSuccess: (response) => {
      console.log(response);

      if (response.user.isNewUser) navigate('/newUser');
      else navigate('/home');
    },
    onError: (error: AxiosError<ErrorResponse>) =>
      console.log(error.response?.data),
  });
  return response;
}
