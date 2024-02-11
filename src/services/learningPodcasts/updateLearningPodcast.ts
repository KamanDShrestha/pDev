import { axiosInstance } from '../../constants';
import { ErrorResponse, UpdateLearningPodcastData } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useUpdateLearningPodcast() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (data: UpdateLearningPodcastData) =>
      axiosInstance
        .patch(
          `/learningPodcasts/update/${data.category}/${data.podcastId}`,
          data.podcast
        )
        .then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
      toast.success(response.message);
      queryClient.invalidateQueries(['learningPodcasts']);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error);
      toast.error(error.response?.data.message || 'An error occured.');
    },
  });
  return response;
}
