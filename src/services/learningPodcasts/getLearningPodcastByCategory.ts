import { LearningPodcast } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetPodcastsByCategory(category: string) {
  const response = useQuery<LearningPodcast[]>({
    queryKey: ['learningPodcasts', category],
    queryFn: () =>
      axiosInstance
        .get(`/learningPodcasts/get/${category}`)
        .then((res) => res.data.data),
  });
  return response;
}
