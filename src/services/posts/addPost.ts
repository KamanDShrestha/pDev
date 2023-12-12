import { axiosInstance } from '../../constants';
import { AddPostData, ErrorResponse } from '../../types';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

export default function useAddPost() {
  const response = useMutation({
    mutationFn: (data: AddPostData) =>
      axiosInstance
        .post('/posts/add', { postFields: data })
        .then((res) => res.data),
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
