import { LearningPodcast } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetRandomPodcastForMood(mood: number) {
  const response = useQuery<LearningPodcast>({
    queryKey: ['randomPodcast', mood],
    queryFn: () => {
      let moodDetails = '';

      if (mood === 1 || mood === 2) moodDetails = 'low';
      if (mood === 3) moodDetails = 'neutral';
      if (mood === 4 || mood === 5) moodDetails = 'high';

      const result = axiosInstance
        .get(`/learningPodcasts/podcastForMood/${moodDetails}`)
        .then((res) => res.data.data);
      return result;
    },
  });
  return response;
}
