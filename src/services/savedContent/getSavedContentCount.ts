import { axiosInstance } from '../../constants';
import { SavedContentCountData } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetSavedContentCount(userId: string) {
  const response = useQuery<SavedContentCountData>({
    queryKey: ['savedContentCount', userId],
    queryFn: () =>
      axiosInstance
        .get(`/saved_contents/count/${userId}`)
        .then((res) => res.data.data),
  });
  return response;
}
