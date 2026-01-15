import { axiosInstance } from '../../constants';
import { AddLearningPodcastData, ErrorResponse } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useAddLearningPodcast() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (data: AddLearningPodcastData) =>
      axiosInstance.post('/learning_podcasts', data).then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
      queryClient.invalidateQueries(['learningPodcasts']);
      queryClient.invalidateQueries(['learningPodcastCategories']);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error);
      toast.error(error.response?.data.message || 'An error occured.');
    },
  });
  return response;
}
