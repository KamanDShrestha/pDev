import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetPodcastCategories() {
  const response = useQuery<string[]>({
    queryKey: ['learningPodcastCategories'],
    queryFn: () =>
      axiosInstance
        .get('/learning_podcasts/categories')
        .then((res) => res.data.data),
  });
  return response;
}
