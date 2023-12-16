import { axiosInstance } from '../../constants';
import { AddPostLikeData, ErrorResponse } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export default function useLikePost() {
  const response = useMutation({
    mutationFn: (data: AddPostLikeData) =>
      axiosInstance.patch('/posts/like', data).then((res) => res.data),
    onSuccess: (response) => {
      toast.success(response.message);
      console.log(response);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occured');
      console.log(error);
    },
  });
  return response;
}
