import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetLikedStatus(QAId: string, userId: string) {
  const response = useQuery<boolean>({
    queryKey: ['likedStatus', QAId, userId],
    queryFn: () =>
      axiosInstance
        .get(`/QAs/hasLiked/${QAId}/${userId}`)
        .then((res) => res.data.status),
  });
  return response;
}
