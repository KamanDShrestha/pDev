import { User } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetSpecificUser(userId: string) {
  const response = useQuery<User>({
    queryKey: ['user', userId],
    queryFn: () =>
      axiosInstance.get(`/users/get/${userId}`).then((res) => res.data.user),
  });
  return response;
}
