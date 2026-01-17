import { axiosInstance } from '@/src/constants';
import { ObtainedNotification } from '@/src/types';
import { useQuery } from '@tanstack/react-query';

export default function useGetAllNotificationsByRole(userRole: string) {
  const response = useQuery<ObtainedNotification[]>({
    queryKey: ['notifications', userRole],
    queryFn: () =>
      axiosInstance
        .get(`/notifications/roles/${userRole}`, {
          withCredentials: true,
        })
        .then((response) => response.data.data),
  });
  return response;
}
