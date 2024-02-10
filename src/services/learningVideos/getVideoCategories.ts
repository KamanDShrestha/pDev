import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetVideoCategories() {
  const response = useQuery<string[]>({
    queryKey: ['learningVideoCategories'],
    queryFn: () =>
      axiosInstance
        .get('/learningVideos/categories')
        .then((res) => res.data.data),
  });
  return response;
}
