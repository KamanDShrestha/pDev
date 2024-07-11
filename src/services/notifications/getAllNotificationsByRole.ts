import { BACKEND_URL } from '@/src/constants';
import { ObtainedNotification } from '@/src/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useGetAllNotificationsByRole(userRole: string) {
  const response = useQuery<ObtainedNotification[]>({
    queryKey: ['notifications', userRole],
    queryFn: () =>
      axios
        .get(`${BACKEND_URL}/notifications/getByRole/${userRole}`, {
          withCredentials: true,
        })
        .then((response) => response.data.data),
  });
  return response;
}
