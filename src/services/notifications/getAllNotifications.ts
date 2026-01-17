import { axiosInstance } from '@/src/constants';
import { ObtainedNotification } from '@/src/types';
import { useQuery } from '@tanstack/react-query';

export default function useGetAllNotifications(userId: string) {
  const response = useQuery<ObtainedNotification[]>({
    queryKey: ['notifications', userId],
    queryFn: () =>
      axiosInstance
        .get(`/notifications/${userId}`, {
          withCredentials: true,
        })
        .then((response) => response.data.data),
  });
  return response;
}
