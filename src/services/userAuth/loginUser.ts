import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../constants';
import { useMutation } from '@tanstack/react-query';

import setToLocalStorage from '../localStorage/setToLocalStorage';
import { AuthContextType, useAuthContext } from '../../context/AuthProvider';
import { ErrorResponse, LoginData } from '../../types';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
export function useLoginUser() {
  const { setUser } = useAuthContext();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || '/'; // either navigating to previous page from which login is redirected or going to root page

  const response = useMutation({
    mutationFn: (data: LoginData) =>
      axiosInstance.post('/auth/login', data).then((response) => response.data),
    onSuccess: (response) => {
      toast.success('You have successfully been logged in.');
      console.log(response);
      setToLocalStorage('authentication', {
        id: response.user._id,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        email: response.user.email,
        role: response.user.role,
        isNewUser: response?.user.isNewUser,
        accessToken: response.token,
        hasSubscribed: response.user.hasSubscribed,
        preferredJourney: response.user.preferredJourney,
        loggedMood: response.user.loggedMood,
        dateOfBirth: response.user.dateOfBirth,
      });
      if (response && response.user && response.token && setUser) {
        setUser({
          firstName: response?.user?.firstName,
          lastName: response?.user?.lastName,
          email: response?.user?.email,
          role: response?.user?.role,
          accessToken: response?.token,
          isNewUser: response?.user.isNewUser,
          id: response?.user?._id,
          hasSubscribed: response.user.hasSubscribed,
          preferredJourney: response.user.preferredJourney,
          loggedMood: response.user.loggedMood,
          dateOfBirth: response.user.dateOfBirth,
        } as AuthContextType);
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
