import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetContentSavedStatus(
  userId: string,
  contentType: string,
  contentId: string
) {
  const response = useQuery<boolean>({
    queryKey: ['contentSavedStatus', userId, contentType, contentId],
    queryFn: () =>
      axiosInstance
        .get(`/saved_contents/status/${userId}/${contentType}/${contentId}`)
        .then((res) => res.data.status),
  });
  return response;
}
