import { LearningVideo } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetRandomVideoForMood(mood: string) {
  const response = useQuery<LearningVideo>({
    queryKey: ['randomVideo', mood],
    queryFn: () =>
      axiosInstance
        .get(`/learningVideos/videoForMood/${mood}`)
        .then((res) => res.data.data),
  });
  return response;
}
