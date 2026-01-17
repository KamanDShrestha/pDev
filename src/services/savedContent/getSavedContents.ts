import { GetSavedContentData } from '@/src/types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetSavedContents(userId: string) {
  const response = useQuery<GetSavedContentData>({
    queryKey: ['savedContents', userId],
    queryFn: () =>
      axiosInstance
        .get(`/saved_contents/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
