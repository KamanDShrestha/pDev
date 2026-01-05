import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../constants';
import { useMutation } from '@tanstack/react-query';
import { AuthContextType, useAuthContext } from '../../context/AuthProvider';
import { ErrorResponse, LoginData } from '../../types';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { setAccessToken } from '../../lib/tokenManager';
export function useLoginUser() {
  const { setUser, setToken } = useAuthContext();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || '/'; // either navigating to previous page from which login is redirected or going to root page

  const response = useMutation({
    mutationFn: (data: LoginData) =>
      axiosInstance.post('/auth/login', data).then((response) => response.data),
    onSuccess: (response) => {
      toast.success('You have successfully been logged in.');
      if (response && response.user && response.accessToken && setUser) {
        setUser({
          ...response.user, id: response.user._id,
        } as AuthContextType);
        setToken(response.accessToken);
        setAccessToken(response.accessToken);
        if (response.user.isNewUser) navigate('/newUser');
        else navigate(from, { replace: true });
      } else {
        console.log('User not found in response');
      }
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occurred');
    },
  });
  return response;
}
