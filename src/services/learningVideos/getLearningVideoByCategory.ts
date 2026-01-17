import { LearningVideo } from '../../types';
import { axiosInstance } from '../../constants';
import { useQuery } from '@tanstack/react-query';

export default function useGetVideosByCategory(category: string) {
  const response = useQuery<LearningVideo[]>({
    queryKey: ['learningVideos', category],
    queryFn: () =>
      axiosInstance
        .get(`/learning_videos/${category}`)
        .then((res) => res.data.data),
  });
  return response;
}
