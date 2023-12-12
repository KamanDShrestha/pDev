import toast from 'react-hot-toast';
import { axiosInstance } from '../../constants';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/src/types';

export default function useDeletePost() {
  const response = useMutation({
    mutationFn: (postId: string) =>
      axiosInstance(`/posts/delete/${postId}`).then((res) => res.data.status),
    onSuccess: (response) => {
      toast.success(response.message);
      console.log(response);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message || 'An error occured.');
      console.log(error);
    },
  });
  return response;
}
