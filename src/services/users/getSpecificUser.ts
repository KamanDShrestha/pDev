import { User } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetSpecificUser(userId: string | null) {
  const response = useQuery<User>({
    queryKey: ['user', userId],
    queryFn: () =>
      axiosInstance.get(`/users/get/${userId}`).then((res) => res.data.user),
    enabled: userId != null || userId != undefined || !!userId,
  });
  return response;
}
