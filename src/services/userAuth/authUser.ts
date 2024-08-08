import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';
import { User } from '../../types';

export default function useAuthUser() {
  const response = useQuery<User>({
    queryKey: ['authUser'],
    queryFn: () => axiosInstance.get('/auth/user').then((res) => res.data.data),
    retry: 0
  });
  return response;
}
