import { axiosInstance } from '../../constants';
import { AddLearningVideoData, ErrorResponse } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useAddLearningVideo() {
  const queryClient = useQueryClient();
  const response = useMutation({
    mutationFn: (data: AddLearningVideoData) =>
      axiosInstance.post('/learningVideos/add', data).then((res) => res.data),
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
