import { ProfileCompletionData } from '../../types';
import { axiosInstance } from '../../constants/index';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, useAuthContext } from '../../context/AuthProvider';
import setToLocalStorage from '../localStorage/setToLocalStorage';

export function useProfileCompletion() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  const response = useMutation({
    mutationFn: (data: ProfileCompletionData) =>
      axiosInstance.post('/new_users', data).then((response) => response.data),
    onSuccess: (response) => {
      console.log(response);
      if (setUser) {
        setUser({
          ...user,
          isNewUser: false,
        } as AuthContextType);
        setToLocalStorage('authentication', { ...user, isNewUser: false });
        navigate('/preference');
      }
    },
    onError: (error) => console.log(error),
  });

  return response;
}
