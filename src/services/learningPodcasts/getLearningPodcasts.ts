import { axiosInstance } from '../../constants';
import { LearningPodcastDocument } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetAllPodcasts() {
  const response = useQuery<LearningPodcastDocument[]>({
    queryKey: ['learningPodcasts'],
    queryFn: () =>
      axiosInstance.get('/learning_podcasts').then((res) => res.data.data),
  });
  return response;
}
