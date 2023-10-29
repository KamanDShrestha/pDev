import { ErrorResponse, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../constants';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import setToLocalStorage from '../localStorage/setToLocalStorage';
import { AuthContextType, useAuthContext } from '../../context/AuthProvider';

interface LoginData {
  email: string;
  password: string;
}

export function useLoginUser() {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const response = useMutation({
    mutationFn: (data: LoginData) =>
      axiosInstance.post('/auth/login', data).then((response) => response.data),
    onSuccess: (response) => {
      console.log(response);
      setToLocalStorage('authentication', {
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        email: response.user.email,
        role: response.user.role,
        accessToken: response.token,
      });
      if (response && response.user && response.token && setUser) {
        setUser({
          firstName: response?.user?.firstName,
          lastName: response?.user?.lastName,
          email: response?.user?.email,
          role: response?.user?.role,
          accessToken: response?.token,
        } as AuthContextType);
        if (response.user.isNewUser) navigate('/newUser');
        else navigate('/home');
      } else {
        console.log('User not found in response');
      }
    },
    onError: (error: AxiosError<ErrorResponse>) =>
      console.log(error.response?.data),
  });
  return response;
}
