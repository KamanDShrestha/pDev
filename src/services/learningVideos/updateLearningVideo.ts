import { axiosInstance } from '../../constants';
import { ErrorResponse, UpdateLearningVideoData } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useUpdateLearningVideo() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (data: UpdateLearningVideoData) =>
      axiosInstance
        .patch(
          `/learningVideos/update/${data.category}/${data.videoId}`,
          data.video
        )
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
      queryClient.invalidateQueries(['learningVideos']);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error);
      toast.error(error.response?.data.message || 'An error occured.');
    },
  });
  return response;
}
