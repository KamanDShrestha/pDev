import { LearningPodcast } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetRandomPodcastForMood(mood: string) {
  const response = useQuery<LearningPodcast>({
    queryKey: ['randomPodcast', mood],
    queryFn: () =>
      axiosInstance
        .get(`/learningPodcasts/podcastForMood/${mood}`)
        .then((res) => res.data.data),
  });
  return response;
}
