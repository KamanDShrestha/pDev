import { axiosInstance } from '../../constants';
import { ErrorResponse } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useDeletePodcast() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (data: { podcastId: string; category: string }) =>
      axiosInstance
        .delete(`/learning_podcasts/${data.category}/${data.podcastId}`)
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
      queryClient.invalidateQueries(['learningPodcasts']);
      queryClient.invalidateQueries(['podcastCategories']);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error);
      toast.error(error.response?.data.message || 'An error occured');
    },
  });
  return response;
}
