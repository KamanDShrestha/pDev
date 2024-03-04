import { LearningVideo } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetRandomVideoForMood(mood: number) {
  const response = useQuery<LearningVideo>({
    queryKey: ['randomVideo', mood],
    queryFn: () => {
      let moodDetails = '';

      if (mood === 1 || mood === 2) moodDetails = 'low';
      if (mood === 3) moodDetails = 'neutral';
      if (mood === 4 || mood === 5) moodDetails = 'high';

      const result = axiosInstance
        .get(`/learningVideos/videoForMood/${moodDetails}`)
        .then((res) => res.data.data);
      return result;
    },
  });
  return response;
}
