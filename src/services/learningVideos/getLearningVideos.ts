import { axiosInstance } from '../../constants';
import { LearningVideoDocument } from '../../types';
import { useQuery } from '@tanstack/react-query';

export default function useGetAllVideos() {
  const response = useQuery<LearningVideoDocument[]>({
    queryKey: ['learningVideos'],
    queryFn: () =>
      axiosInstance.get('/learningVideos/get').then((res) => res.data.data),
  });
  return response;
}
