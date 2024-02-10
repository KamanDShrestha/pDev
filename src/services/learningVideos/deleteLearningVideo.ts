import { axiosInstance } from '../../constants';
import { ErrorResponse } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useDeleteVideo() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (data: { videoId: string; category: string }) =>
      axiosInstance
        .delete(`/learningVideos/delete/${data.category}/${data.videoId}`)
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
      queryClient.invalidateQueries(['learningVideos']);
      queryClient.invalidateQueries(['learningVideoCategories']);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error);
      toast.error(error.response?.data.message || 'An error occured');
    },
  });
  return response;
}
