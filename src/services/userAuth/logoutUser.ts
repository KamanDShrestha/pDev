import { axiosInstance } from '../../constants';
import { AuthContextType, useAuthContext } from '../../context/AuthProvider';
import { useMutation } from '@tanstack/react-query';

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
    },
  });

  return response;
}
